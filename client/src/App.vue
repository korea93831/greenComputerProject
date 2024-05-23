<template>
  <v-app id="inspire">
    <v-app-bar app color="transparent" dark fixed>
      <v-btn text @click="goToHome">Home</v-btn>
      <v-spacer></v-spacer>

      <v-app-bar-title class="title">Application</v-app-bar-title>

      <v-spacer></v-spacer>
      
      <v-btn v-if="!this.isLoggedIn" text color="primary" @click="showLoginModal">Login</v-btn>
      <v-btn v-if="this.isLoggedIn" text color="primary" @click="goToMyPage">My Page</v-btn>
      <v-btn v-if="this.isLoggedIn" text color="primary" @click="logout">Logout</v-btn>
      <v-btn v-if="!this.isLoggedIn" text color="primary" @click="goToRegister">Register</v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

    <LoginModal v-model="loginModalOpen" @cancle="hideModal" @login="loginModal" />
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LoginModal from './views/LoginModal.vue';
import axios from 'axios';

// const isLoggedIn = ref(false);
// const loginModalOpen = ref(false);
const router = useRouter();

// const login = async (credentials) => {
//   try {
//     const response = await axios.post('/login', credentials);
//     if (response.data.success) {
//       isLoggedIn.value = true;
//     } else {
//       console.error('로그인 실패:', response.data.message);
//     }
//   } catch (error) {
//     console.error('로그인 오류:', error);
//   }
// };

const goToRegister = () => {
  router.push({ name: 'register' });
};

const goToHome = () => {
  router.push({ name: 'home' });
};

const goToMyPage = () => {
  axios.get('http://localhost:3000/mypage',{
      headers:{
        'authorization':`Bearer ${localStorage.getItem('token')}`
      }
    }).then(response=>{
      response.
    })
  router.push({ name: 'mypage' });
};
</script>

<script>
export default {
  data() {
    return {
      isLoggedIn:Boolean,
      loginModalOpen:Boolean
    };
  },
  components:{
    LoginModal,
  },
  mounted() {
    this.isLoggedIn=localStorage.getItem('token')!==null ? true : false;
  },
  created(){
    this.isLoggedIn=false
    this.loginModalOpen=false
  },
  methods: {
    showLoginModal(){
      this.loginModalOpen = true;
    },
    hideModal(){
      this.loginModalOpen=false;
    },
    async loginModal(email,password){
      try {
        const response = await axios.post('http://localhost:3000/login', { email: email, password: password });
        console.log(response)
        if(response.status==200){
          localStorage.setItem('token',response.data['token'])
          alert('로그인 성공')
          console.log(localStorage.getItem('token'))
          this.loginModalOpen=false;
          this.isLoggedIn=true
        }
        else{
          alert('로그인 실패')
        }
      } 
      catch (error) {
        console.error('로그인 오류:', error);
        alert('로그인 오류')
      }
    },
    logout(){
      localStorage.removeItem('token')
      this.isLoggedIn=false
      this.$router.replace({ name: 'home' });
    }

  }
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
</style>
