<template>
  <v-dialog v-model="showModal" max-width="500px">
    <v-card>
      <v-card-title class="headline">로그인</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field v-model="email" label="아이디" required></v-text-field>
          <v-text-field v-model="password" label="비밀번호" type="password" required></v-text-field>
          <v-btn type="submit" color="primary">확인</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const showModal = ref(false);
const email = ref('');
const password = ref('');
const snackbar=ref(false);
const snackbarMessage=ref('');

const login = async () => {
  try {
    const response = await axios.post('/api/login', { email: email.value, password: password.value });
    if (response.data.success) {
      snackbarMessage.value = '로그인이 성공했습니다.';
      snackbar.value = true;
    } else {
      snackbarMessage.value = response.data.message || '로그인이 실패했습니다.';
      snackbar.value = true;
    }
  } catch (error) {
    console.error('로그인 오류:', error);
    snackbarMessage.value = '로그인 중 오류가 발생했습니다.';
    snackbar.value = true;
  }
};
</script>

<script>
export default {
  name: 'LoginModal'
};
</script>
