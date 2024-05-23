<template>
  <v-app id="inspire">
    <v-app-bar app color="transparent" dark fixed scroll-behavior="hide" scroll-threshold="1">
      <!-- <v-btn text @click="goToHome">Home</v-btn> -->
      <img class="logo" src="./assets/logoimage.png" alt="logoimage" @click="goToHome" />
      <v-spacer></v-spacer>

      <!-- <v-app-bar-title class="title">Application</v-app-bar-title> -->

      <v-spacer></v-spacer>
      
      <v-btn v-if="!isLoggedIn" text color="#FF6347" @click="showLoginModal">Login</v-btn>
      <v-btn v-if="isLoggedIn" text color="#FF8C00" @click="goToMyPage">My Page</v-btn>
      <v-btn v-if="isLoggedIn" text color="#FF8C00" @click="logout">Logout</v-btn>
      <v-btn v-if="!isLoggedIn" text color="#FF6347" @click="goToRegister">Register</v-btn>
    </v-app-bar>

    <v-main class="main">
      <router-view/>
    </v-main>

    <LoginModal v-model="loginModalOpen" @update:isLoggedIn="isLoggedIn = $event" />
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LoginModal from './views/LoginModal.vue';
import axios from 'axios';

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

const goToRegister = () => {
  router.push({ name: 'register' });
};

const goToHome = () => {
  router.push({ name: 'home' });
};

const goToMyPage = () => {
  router.push({ name: 'mypage' });
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.title {
  display: flex;
  justify-content: center;
}

.v-app-bar {
  background-color: rgba(255, 255, 255, 0);
  box-shadow: none;
}

.logo {
  height: 105px;
  margin-left: 3px;
  cursor: pointer;
}

.main {
  background-color: #DDF3F5;
}

</style>
