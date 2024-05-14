import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue';
import Resultpage from '../views/Resultpage.vue';
import Imageupload from '../views/Imageupload.vue';
import House from '../views/pages/House.vue';
import Person from '../views/pages/Person.vue';
import Tree from '../views/pages/Tree.vue';
import Noticeboard from '../views/Noticeboard.vue';


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView // 회원가입 페이지
  },
  {
    path: '/result',
    name: 'result',
    component: Resultpage // 결과 페이지
  },
  {
    path: '/imageupload',
    name: 'imageupload',
    component: Imageupload // 이미지 업로드 페이지
  },
  {
    path: '/house',
    name: 'house',
    component: House // 집 이미지 업로드 페이지
  },
  {
    path: '/person',
    name: 'person',
    component: Person // 사람 이미지 업로드 페이지
  },  
  {
    path: '/tree',
    name: 'tree',
    component: Tree // 나무 이미지 업로드 페이지
  },
  {
    path: '/noticeboard',
    name: 'noticeboard',
    component: Noticeboard // 개시판 페이지
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
