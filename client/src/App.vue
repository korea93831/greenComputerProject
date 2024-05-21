<template>
  <v-app id="inspire">
    <v-app-bar app>
      <v-btn text @click="goToHome">Home</v-btn>
      <v-spacer></v-spacer>

      <v-app-bar-title class="title">Application</v-app-bar-title>

      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="goToNoticeboard">게시판</v-btn>

      <v-btn v-if="!isLoggedIn" text color="primary" @click="showLoginModal">Login</v-btn>
      <v-btn v-if="isLoggedIn" text color="primary" @click="goToMyPage">mypage</v-btn>
      <v-btn v-if="isLoggedIn" text color="primary" @click="logout">Logout</v-btn>
      <v-btn v-if="!isLoggedIn" text color="primary" @click="goToRegister">회원 가입</v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

    <LoginModal v-model="loginModalOpen" @update:isLoggedIn="isLoggedIn = $event" />
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LoginModal from './views/LoginModal.vue';
import axios, { Axios } from 'axios';

const isLoggedIn = ref(false);
const loginModalOpen = ref(false);
const router = useRouter();

const login = async (credentials) => {
  try {
    const response = await axios.post('/login', credentials);
    if (response.data.success) {
      isLoggedIn.value = true;
    } else {
      console.error('로그인 실패:', response.data.message);
    }
  } catch (error) {
    console.error('로그인 오류:', error);
  }
};

const logout = () => {
  isLoggedIn.value = false;
  router.push({ name: 'home' });
};

const showLoginModal = () => {
  loginModalOpen.value = true;
};

const goToNoticeboard = () => {
  router.push({ name: 'BoardList' });
};

const goToRegister = () => {
  router.push({ name: 'register' });
};

const goToHome = () => {
  router.push({ name: 'home' });
};

const goToMyPage = () => {
  const response=axios.post('/')
  axios.post('http://localhost:3000/mypage',{userid})
  router.push({ name: 'mypage' }); // 마이페이지로 이동
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.title {
  display: flex;
  justify-content: center;
}
</style>
