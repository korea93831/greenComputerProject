<template>
  <v-app id="inspire">
    <v-app-bar app>
      <v-btn text @click="goToHome">Home</v-btn>
      <v-spacer></v-spacer>

      <v-app-bar-title class="title">Application</v-app-bar-title>
     
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="goToNoticeboard">개시판</v-btn>

      <v-btn text color="primary" @click="showLoginModal">로그인</v-btn>

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

// import router from './router';

import { useRouter } from 'vue-router';
import LoginModal from './views/LoginModal.vue';
import Noticeboardpage from './views/Noticeboard.vue';

const drawer = false

const loginModalOpen = ref(false);
const router = useRouter();

const showLoginModal = () => {
  loginModalOpen.value = true;
};

const goToNoticeboard = () => {
  router.push({ name: 'noticeboard' }); // 개시판 페이지
};

const goToRegister = () => {
  router.push({ name: 'register' }); // 회원가입 페이지
};

const goToHome = () => {
  router.push({ name: 'home' }); // 홈 페이지
};

</script>

<!-- <script>
  export default {
    data: () => ({ drawer: false }),

    methods: {
      about() {
        router.push ({ name:'about'});
      }
    
  }
  }
</script> -->

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
