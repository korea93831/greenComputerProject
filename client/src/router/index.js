import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue';
import Resultpage from '../views/Resultpage.vue';
import Imageupload from '../views/Imageupload.vue';
import Mypage from '../views/Mypage.vue';

import BoardList from '../views/boardpage/BoardList.vue';
import BoardView from '../views/boardpage/BoardView.vue';
import BoardWriter from '../views/boardpage/BoardWriter.vue';

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
    path: '/board',
    name: 'BoardList',
    component: BoardList // 게시판 목록 페이지
  },
  {
    path: '/view/:seq',
    name: 'BoardView',
    component: BoardView // 게사판 상세 페이지
  },
  {
    path: '/writer',
    name: 'BoardWriter',
    component: BoardWriter // 게시판 작성 페이지
  }, 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router