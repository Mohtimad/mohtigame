import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Game from '../views/Game.vue'
import Profil from '../views/Profil.vue'
import Rooms from '../views/Rooms.vue'

const authenticate = (to, from, next) => {
  const regexUsername = /^[a-zA-Z0-9.,'\-àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]{3,8}$/;
  const dataStorage = JSON.parse(localStorage.getItem("username"))
  if (!dataStorage) {
    next('/profil');
    return
  } else if (!regexUsername.test(dataStorage.username)) {
    next('/profil');
    return
  } else {
    next()
    return
  }
}
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: authenticate,
  },
  {
    path: '/Rooms',
    name: 'Rooms',
    component: Rooms,
    beforeEnter: authenticate,
  },
  {
    path: '/game/:id',
    name: 'Game',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    component: Game,
    beforeEnter: authenticate,
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
