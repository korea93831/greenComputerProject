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

    <v-dialog v-model="showModal" max-width="500px">
      <template v-slot:activator="{props:activatorProps}">
        
      
      </template>
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

    <!-- <LoginModal v-model="loginModalOpen" @update:isLoggedIn="isLoggedIn = $event" /> -->
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// import LoginModal from './views/LoginModal.vue';
import axios from 'axios';

const isLoggedIn = ref(false);
const router = useRouter();



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

<script>
export default {
  components: {},
  data() {
    return {
      sampleData: ''
    }
  },
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    login() {
      try {
        axios.post('http://localhost:3000/auth/login');
         if (response.data.success) {
          isLoggedIn.value = true;
        } else {
          console.error('로그인 실패:', response.data.message);
        }
      } catch (error) {
        console.error('로그인 오류:', error);
      }}
  }
}
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
