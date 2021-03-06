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
import productGroup from '../base/productGroup/productGroup.vue'
import toPic from '../base/toPic/toPic.vue'
import productDetails from '../base/productDetails/productDetails.vue'
import shoppingCart from '../components/shoppingCart/shoppingCart.vue'
import search from '../components/search/search.vue'
import sortBrand from '../components/sort/brand/brand.vue'
import sortCategory from '../components/sort/category/category.vue'
import sortStylist from '../components/sort/stylist/stylist.vue'
import categoryDetail from '../components/sort/category/categoryDetail/categoryDetail.vue'

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
          redirect: '/index/recommend',
          children: [
            {
              path: 'recommend',
              component: recommend
            },
            {
              path: '/index/furniture',
              component: furniture
            },
            {
              path: '/index/home',
              component: home
            },
            {
              path: '/index/activity',
              component: activity
            }
          ]
        },
        {
          path: 'sort',
          component: sort,
          redirect: '/sort/category',
          children: [
            {
              path: 'category',
              component: sortCategory
            },
            {
              path: 'brand',
              component: sortBrand
            },
            {
              path: 'stylist',
              component: sortStylist
            }
          ]
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
    },
    {
      path: '/productGroup/:id',
      component: productGroup,
      props: true
    },
    {
      path: '/toPic/:id',
      component: toPic,
      props: true
    },
    {
      path: '/productDetails/:id',
      component: productDetails,
      props: true
    },
    {
      path: '/cart',
      component: shoppingCart
    },
    {
      path: '/search',
      component: search
    },
    {
      path: '/categoryDetail/:id',
      component: categoryDetail,
      props: true
    }
  ]
})
