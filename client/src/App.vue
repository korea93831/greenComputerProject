<template>
  <v-app id="inspire">
    <v-app-bar app color="transparent" dark fixed scroll-behavior="hide" scroll-threshold="1">
      <!-- <v-btn text @click="goToHome">Home</v-btn> -->
      <img class="logo" src="./assets/logo_a-removebg-preview.png" alt="logoimage" @click="goToHome" />
      <v-spacer></v-spacer>

      <!-- <v-app-bar-title class="title">Application</v-app-bar-title> -->

      <v-spacer></v-spacer>
      
      <v-btn size="x-large" v-if="!this.isLoggedIn" text color="#000000" @click="showLoginModal" style="font-weight: bold">Login</v-btn>
      <v-btn size="x-large" v-if="this.isLoggedIn" text color="#000000"  @click="goToMyPage" style="font-weight: bold">My페이지</v-btn>
      <v-btn size="x-large" v-if="this.isLoggedIn" text color="#000000"  @click="logout" style="font-weight: bold">Logout</v-btn>
      <v-btn size="x-large" v-if="!this.isLoggedIn" text color="#000000"  @click="goToRegister" style="font-weight: bold">회원가입</v-btn>
    </v-app-bar>

    <v-main class="main">
      <router-view/>
    </v-main>
    <LoginModal v-model="loginModalOpen" @cancle="hideModal" @login="loginModal" />
    <!-- <LoginModal v-model="loginModalOpen" @update:isLoggedIn="isLoggedIn = $event" /> -->
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
      let mydata=[]
      for(let i=0;i<response.data.length;i++){
        mydata.push(response.data[i])
      }
      router.push({ name: 'mypage', query :{myData:JSON.stringify(response.data)}});
    });
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

.logo {
  height: 105px;
  margin-top: 5px;
  margin-left: 20px;
  cursor: pointer;
}

.main {
  background-color: #DDF3F5;
}

</style>
