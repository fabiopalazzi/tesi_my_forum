import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import WritePost from '../views/WritePost'
import Profile from '../views/Profile'
import Index from '../views/Index'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index 
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path:'/user',
    name: 'User',
    component: User
  },
  {
    path:'/write',
    name: 'WritePost',
    component: WritePost
  },
  {
    path:'/profile',
    name: 'Profile',
    component: Profile
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
