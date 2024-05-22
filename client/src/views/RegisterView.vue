<template>
  <div class="register-view">
    <h1>회원 가입</h1>
    <v-form ref="form">
      <v-text-field v-model="email" label="이메일" type="email" required></v-text-field>
      <v-text-field v-model="password" label="비밀번호" type="password" required></v-text-field>
      <v-text-field v-model="confirmPassword" label="비밀번호 확인" type="password" required></v-text-field>
    </v-form>
    <div class="button-container">
      <v-btn @click="register" color="primary">회원 가입</v-btn>
      <v-btn class="explore-btn" color="red" @click="goToHome">취소</v-btn>
    </div>
    
    <v-snackbar v-model="snackbar" multi-line top>
      {{ snackbarMessage }}
      
      <template v-slot:actions>
        <v-btn color="red" variant="text" @click="handleSnackbarAction()">확인</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios'; 
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const snackbar = ref(false);
const snackbarMessage = ref('');

const router = useRouter();

const register = async () => {
  if (!email.value || !password.value || !confirmPassword.value) {
    snackbarMessage.value = '이메일과 비밀번호를 입력하세요.';
    snackbar.value = true;
    return;
  }
  
  if (password.value !== confirmPassword.value) {
    snackbarMessage.value = '비밀번호가 일치하지 않습니다.';
    snackbar.value = true;
    return;
  }
  
  const userData = {
    email: email.value,
    password: password.value,
  };
  try {
    const response = await axios.post('http://localhost:3000/register', userData);
    console.log('회원가입이 완료되었습니다.', response.data);
    snackbarMessage.value = '회원가입이 완료되었습니다.';
    snackbar.value = true;
  } catch (error) {
    if (error.response.status === 409) { // 아이디 중복 오류
      snackbarMessage.value = '이미 사용 중인 이메일입니다. 다른 이메일을 입력해주세요.';
    } else {
      snackbarMessage.value = '회원가입 중 오류가 발생했습니다.';
    }
    snackbar.value = true;
  }
};

const goToHome = () => {
  router.push({ name: 'home' });
};

const handleSnackbarAction = () => {
  if (snackbarMessage.value === '회원가입이 완료되었습니다.') {
    goToHome();
  } else {
    snackbar.value = false;
  }
};
</script>

<style scoped>
.register-view {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 10%;
  margin-right: 10%;
  height: 100vh;
  margin-top: -5%;
}

.button-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
}

.button-container .v-btn {
  margin-right: 20px;
}
</style>
