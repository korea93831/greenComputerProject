<template>
  <div class="home-view">
    <div class="background-image"></div>
    <div class="content">
      <h1 class="main-title"><span class="htp-text">HTP</span>&nbsp;그림검사로 알아보는 아이의 숨은 이야기</h1>
      <p class="sub-title">"Heal Your Heart Through Drawing"</p>

      <div class="btn-row">
        <v-btn class="explore-btn" to="/introduction" color="#FFAE42">소개글</v-btn>
        <v-btn class="explore-btn" @click="testing" color="#FFAE42">검사 시작</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sampleData: '',
      page:1,
      totalpage:5,
      totalItem:[],
      pageItem:[],
      first:0,
      last:9
      
    }
  },
  computed:{},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    testing(){
      if(localStorage.getItem('token')!==null){
        this.$router.push({ name: 'imageupload'});
      }
      else{
        alert('회원가입 후 검사를 하실 수 있습니다.')
        this.$router.replace({name:'home'});
      }
      
    },
  }
}
</script>


<style scoped>
.home-view {
  position: relative;
  height: 93vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../images/KakaoTalk_20240522_093654215.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.5;
}

.content {
  z-index: 1;
  text-align: center;
}

.main-title {
  font-size: 50px;
  font-family: "Do Hyeon", sans-serif;
  font-weight: 350;
}

.htp-text {
  color: #f5917a;
}

.sub-title {
  font-size: 35px;
  font-family: "Noto Sans KR", sans-serif;
}

.btn-row {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.explore-btn {
  margin: 0 10px;
  font-size: 24px;
}
</style>
