<template>
  <v-app id="inspire">
    <v-app-bar app>
      <v-btn text @click="goToHome">Home</v-btn>
      <v-spacer></v-spacer>

      <v-app-bar-title class="title">Application</v-app-bar-title>
     
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="goToNoticeboard">개시판</v-btn>

      <v-btn v-if="!isLoggedIn" text color="primary" @click="showLoginModal">Login</v-btn>
      <v-btn v-if="isLoggedIn" text color="primary" @click="logout">Logout</v-btn>

      <v-btn text color="primary" @click="goToRegister">회원 가입</v-btn>

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

    <LoginModal v-model="loginModalOpen" />

  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LoginModal from './views/LoginModal.vue';

// 사용자 로그인 상태를 관리하는 변수
const isLoggedIn = ref(false);
// 로그인 모달 창을 관리하는 변수
const loginModalOpen = ref(false);
const router = useRouter();

const login = async (credentials) => {
  try {
    const response = await axios.post('/login', credentials);
    // 로그인 로직을 구현합니다.
    // 로그인 성공 시 isLoggedIn을 true로 변경합니다.
    if (response.data.success) {
      isLoggedIn.value = true;
    // 기타 로그인 후의 작업을 수행합니다.
  } else {
    console.error('로그인 실패:', response.data.message);
  } 
} catch (error) {
    console.error('로그인 오류:', error);
    // 로그인 실패 시 적절한 처리를 수행합니다.
  }
};

const logout = () => {
  // 로그아웃 로직을 구현합니다.
  // 로그아웃 성공 시 isLoggedIn을 false로 변경합니다.
  isLoggedIn.value = false;
  // 기타 로그아웃 후의 작업을 수행합니다.
};

const showLoginModal = () => {
  loginModalOpen.value = true; // Login 모달
};

const goToNoticeboard = () => {
  router.push({ name: 'BoardList' }); // 게시판 페이지
};

const goToRegister = () => {
  router.push({ name: 'register' }); // 회원가입 페이지
};

const goToHome = () => {
  router.push({ name: 'home' }); // 홈 페이지
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