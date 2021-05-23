import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import '../assets/css/global.css'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Userlist from '../components/user/Userlist.vue'
import Menu from '../components/power/Menu.vue'
import Role from '../components/power/Role.vue'
import Index from '../components/Index.vue'
import Jianjie from '../components/Jianjie.vue'
import Szdw from '../components/Szdw.vue'
import Studyfiles from '../components/study/Studyfiles.vue'
import HomeContent from '../components/home/HomeContent.vue'
import DataAnalysis from '../components/data/DataAnalysis.vue'
import Article from '../components/news/Article.vue'
import ShowNews from '../components/news/ShowNews.vue'
import Check from '../components/news/Check.vue'
import Edit from '../components/news/Edit.vue'
import Suggest from '../components/suggestion/Suggest.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    },
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome,
        meta: {
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        }
      },
      {
        path: '/user_list',
        component: Userlist
      },
      {
        path: '/menu_list',
        component: Menu
      },
      {
        path: '/role_list',
        component: Role
      },
      {
        path: '/data_analysis',
        component: DataAnalysis
      },
      {
        path: '/check_article',
        component: Check
      },
      {
        path: '/edit_article',
        component: Edit
      },
      {
        path: '/suggestion_list',
        component: Suggest
      }
    ]
  },
  {
    path: '/index',
    component: Index,
    redirect: '/homecontent',
    children: [
      {
        path: '/jianjie',
        component: Jianjie
      },
      {
        path: '/szdw',
        component: Szdw,
        meta: {
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        }
      },
      {
        path: '/studyfiles',
        component: Studyfiles
      },
      {
        path: '/homecontent',
        component: HomeContent
      },
      {
        path: '/article',
        component: Article
      },
      {
        path: '/shownews',
        name: 'shownews',
        component: ShowNews
      }
    ]
  },
  {
    path: '/',
    component: Index,
    redirect: '/index'
  }
]

const router = new VueRouter({
  routes
})

export default router
// 让页面在访问之前 做个相应的判断
router.beforeEach((to, from, next) => {
  // if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  // if (!tokenStr) return next('/login')
  if (to.meta.requireAuth) { // 判断跳转的路由是否需要登录
    if (tokenStr) { // vuex.state判断token是否存在
      next()
    } else {
      alert('请登陆后再试！')
      location.href = '/#/index'
    }
  } else {
    next()
  }
})

// 避免重复点击报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
