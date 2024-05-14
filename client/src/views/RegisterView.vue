<template>
  <div class="register-view">
    <h1>회원 가입</h1>
    <v-form @submit.prevent="register">
      <v-text-field v-model="username" label="아이디" required></v-text-field>
      <v-text-field v-model="nickname" label="닉네임" required></v-text-field>
      <v-text-field v-model="email" label="이메일" type="email" required></v-text-field>
      <v-text-field v-model="password" label="비밀번호" type="password" required></v-text-field>
    </v-form>
    <div class="button-container">
      <v-btn type="submit" color="primary">회원 가입</v-btn>
      <v-btn class="explore-btn" color="red" @click="goToHome">취소</v-btn>
    </div>
    
    <v-snackbar v-model="snackbar" multi-line top>
      {{ snackbarMessage }}
      
      <template v-slot:actions>
        <v-btn color="red" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios'; 
import { useRouter } from 'vue-router';

const username = ref('');
const email = ref('');
const password = ref('');
const nickname = ref('');

const snackbar = ref(false);
const snackbarMessage = ref('');

const router = useRouter();

const register = async () => {
  const userData = {
    username: username.value,
    email: email.value,
    password: password.value,
    nickname: nickname.value
  };

  try {
    const response = await axios.post('https://your-server-url.com/register', userData);
    console.log('회원가입이 완료되었습니다.', response.data);
    snackbarMessage.value = '회원가입이 완료되었습니다.';
    snackbar.value = true;
  } 

  catch (error) {
    console.error('회원가입 중 오류가 발생했습니다.', error);
    snackbarMessage.value = '회원가입 중 오류가 발생했습니다.';
    snackbar.value = true;
  }
};

const goToHome = () => {
  router.push({ name: 'home' });
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
