import Vue from 'vue'
import Router from 'vue-router'
import MenuBar from '../components/MenuBar'
import HomePage from '../page/HomePage'
import AnswerOnline from '../page/AnswerOnline'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      name:'HomePage',
      component:HomePage
    },
    {
      path:'/AnswerOnline',
      name:'AnswerOnline',
      component:AnswerOnline
    },
    {
      path:'/MenuBar',
      name:'MenuBar',
      component:MenuBar
    }
  ]
})
