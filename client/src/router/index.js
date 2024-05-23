import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue';
import Resultpage from '../views/Resultpage.vue';
import Imageupload from '../views/Imageupload.vue';
import Mypage from '../views/Mypage.vue';
import Introductionpage from '../views/Introductionpage.vue';
import Inquirypage from '../views/Inquirypage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView // 회원가입 페이지
  },
  {
    path: '/imageupload',
    name: 'imageupload',
    component: Imageupload // 이미지 업로드 페이지
  },
  {
    path: '/result',
    name: 'result',
    component: Resultpage // 결과 페이지
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: Mypage // 마이 페이지
  },
  {
    path: '/introduction',
    name: 'introduction',
    component: Introductionpage // 소개 페이지
  },
  {
    path:'/inquirypage',
    name:'Inquirypage',
    component:Inquirypage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router