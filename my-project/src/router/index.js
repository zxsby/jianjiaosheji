import Vue from 'vue'
import Router from 'vue-router'
import main from '../components/main/main.vue'
import index from '../components/index/index.vue'
import sort from '../components/sort/sort.vue'
import inspiration from '../components/inspiration/inspiration.vue'
import brand from '../components/brand/brand.vue'
import user from '../components/user/user.vue'
import recommend from '../components/index/recommend/recommend.vue'
import furniture from '../components/index/furniture/furniture.vue'
import home from '../components/index/home/home.vue'
import activity from '../components/index/activity/activity.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: main,
      redirect: '/index/recommend',
      children: [
        {
          path: 'index',
          component: index,
          children: [
            {
              path: 'recommend',
              component: recommend
            },
            {
              path: 'furniture',
              component: furniture
            },
            {
              path: 'home',
              component: home
            },
            {
              path: 'activity',
              component: activity
            }
          ]
        },
        {
          path: 'sort',
          component: sort
        },
        {
          path: 'inspiration',
          component: inspiration
        },
        {
          path: 'brand',
          component: brand
        },
        {
          path: 'user',
          component: user
        }
      ]
    }
  ]
})