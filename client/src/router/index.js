import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/Home'
import login from '@/components/Login'
import detailArtile from '@/components/DetailArticle'
import updateblog from '@/components/UpdateBlog'
import testing from '@/components/TestingSocket'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: home,
      children: [{
        path: '/DetailArticle/:blogid',
        name: 'DetailArticle',
        component: detailArtile,
        props: true
      }]
    },
    {
      path: '/UpdateArticle/:blogid',
      name: 'UpdateBlog',
      component: updateblog,
      props: true
    },
    {
      path: '/login',
      name: 'Login',
      component: login
    },
    {
      path: '/testing',
      name: 'Testing',
      component: testing
    }
  ]
})
