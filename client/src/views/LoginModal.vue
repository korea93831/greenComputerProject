<template>
  <v-dialog v-model="showModal" max-width="500px">
    <v-card>
      <v-card-title class="headline">로그인</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field v-model="email" label="이메일" required></v-text-field>
          <v-text-field v-model="password" label="비밀번호" type="password" required></v-text-field>
          <v-btn @click="login" color="primary">확인</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <v-snackbar v-model="snackbar" multi-line top>
      {{ snackbarMessage }}
      <v-btn color="red" variant="text" @click="handleSnackbarClose">확인</v-btn>
    </v-snackbar>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const props = defineProps({
  modelValue: Boolean
});

const emit = defineEmits(['update:modelValue', 'update:isLoggedIn']);

const showModal = ref(props.modelValue);
const email = ref('');
const password = ref('');
const snackbar = ref(false);
const snackbarMessage = ref('');
const router = useRouter();

watch(() => props.modelValue, (newVal) => {
  showModal.value = newVal;
});

watch(showModal, (newVal) => {
  emit('update:modelValue', newVal);
});

const login = async () => {
  try {
    const response = await axios.post('http://localhost:3000/login', { email: email.value, password: password.value });
    console.log(response)
    if(response.status==200){
      localStorage.setItem('token',response.data['token'])
      snackbarMessage.value = '로그인이 성공했습니다.';
      snackbar.value = true;
      emit('update:isLoggedIn', true);
      console.log(localStorage.getItem('token'))
    }
    else{
      snackbarMessage.value = response.data.message || '로그인이 실패했습니다.';
      snackbar.value = true;
    }
  } 
  catch (error) {
    console.error('로그인 오류:', error);
    snackbarMessage.value = '로그인 중 오류가 발생했습니다.';
    snackbar.value = true;
  }
};

const handleSnackbarClose = () => {
  snackbar.value = false;
  showModal.value = false;
};
</script>

<script>
export default {
  name: 'LoginModal',
};
</script>
