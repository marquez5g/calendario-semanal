import Vue from 'vue'
import Router from 'vue-router'
import Calendario from '@/components/Calendario'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Calendario',
      component: Calendario
    }
  ]
})
