import Vue from 'vue'
import Router from 'vue-router'
import MenuBar from '../components/MenuBar'
import HomePage from '../page/HomePage'
import AnswerOnline from '../page/Personal/AnswerOnline'
import AnswerHomePage from '../page/Personal/AnswerHomePage'
import Administrators_business from '../page/Administrators/Business'
import Administrators_question from '../page/Administrators/Question'
import QuestionForm from '../page/Enterprise/QuestionForm'
import Administrators_QuestionForm from '../page/Administrators/QuestionForm'
import Administrators_system from '../page/Administrators/System'
import Administrators_talent from '../page/Administrators/Talent'
import Enterprise_talent from '../page/Enterprise/Talent'
import Enterprise_TalentForm from '../page/Enterprise/TalentForm'
import Enterprise_question from '../page/Enterprise/Question'
import Enterprise_home from '../page/Enterprise/Home'
import Enterprise_examination from '../page/Enterprise/Examination'
import ReleaseTest from '../page/Enterprise/ReleaseTest'
import PersonalHome from '../page/Personal/PersonalHome'
import DispalyGrade from '../page/Enterprise/DisplayGrade'
import UserForm from '../page/Administrators/UserForm'
import ces from '../page/ces'
import Home from '../page/Enterprise/Home'


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
      path:'/ces',
      name:'ces',
      component:ces
    },
    {
      path:'/Home',
      name:'Home',
      component:Home
    },
    {
      path:'/HomePage',
      name:'HomePage',
      component:HomePage
    },
    {
      path:'/AnswerOnline',
      name:'AnswerOnline',
      component:AnswerOnline
    },{
      path:'/AnswerHomePage',
      name:'AnswerHomePage',
      component:AnswerHomePage
    },
    {
      path:'/Administrators_business',
      name:'Administrators_business',
      component:Administrators_business,
    },
    {
      path:'/Administrators_question',
      name:'Administrators_question',
      component:Administrators_question
    },
    {
      path:'/Administrators_system',
      name:'Administrators_system',
      component:Administrators_system,
    },
    {
      path:'/Administrators_talent',
      name:'Administrators_talent',
      component:Administrators_talent,
    },
    {
      path:'/Enterprise_examination',
      name:'Enterprise_examination',
      component:Enterprise_examination,
    },
    {
      path:'/Enterprise_question',
      name:'Enterprise_question',
      component:Enterprise_question,
    },
    {
      path:'/Enterprise_home',
      name:'Enterprise_home',
      component:Enterprise_home,
    },
    {
      path:'/Enterprise_talent',
      name:'Enterprise_talent',
      component:Enterprise_talent,
    }
    ,
    {
      path:'/Enterprise_TalentForm',
      name:'Enterprise_TalentForm',
      component:Enterprise_TalentForm,
    }
    ,
    {
      path:'/PersonalHome',
      name:'PersonalHome',
      component:PersonalHome,
    }
    ,
    {
      path:'/ReleaseTest',
      name:'ReleaseTest',
      component:ReleaseTest,
    }
    ,
    {
      path:'/Administrators_QuestionForm',
      name:'Administrators_QuestionForm',
      component:Administrators_QuestionForm,
    } ,
    {
      path:'/QuestionForm',
      name:'QuestionForm',
      component:QuestionForm,
    }
    ,
    {
      path:'/DispalyGrade',
      name:'DispalyGrade',
      component:DispalyGrade,
    },
    {
      path:'/UserForm',
      name:'UserForm',
      component:UserForm,
    }
  ]
})
