<template>
  <transition name="list-fade">
    <div v-if="joinCartDetailShow" class="joinCartDetail" @click="hideDetail">
      <div class="Detail-content" @click.stop>
        <div class="Detail-wrapper">
          <div class="Detail-header">
            <img class="Detail-header-image" width="70" height="70"
                 :src="cartDetail.products[defaultChecked].productImg"
                 alt="">
            <div class="Detail-header-content">
              <h1 class="Detail-header-title">{{cartDetail.products[defaultChecked].productTitle}}</h1>
              <p class="Detail-header-sellPrice">￥{{cartDetail.products[defaultChecked].sellPrice | money}}<span
                v-if="cartDetail.products[defaultChecked].sellPrice !== cartDetail.products[defaultChecked].originalPrice">￥{{cartDetail.products[defaultChecked].originalPrice | money}}</span>
              </p>
              <p class="Detail-header-describe">
                <span>尺寸：</span>L{{cartDetail.products[defaultChecked].length}}xW{{cartDetail.products[defaultChecked].width}}xH{{cartDetail.products[defaultChecked].height}}cm  <span> 重量：</span>{{cartDetail.products[defaultChecked].netWeight}}kg
              </p>
            </div>
          </div>
          <Scroll :interactive="true" class="main-content" :probeType="2" :data="cartDetail">
            <div>
              <div class="Detail-body">
                <div class="Detail-body-content" v-for="(item, i) in cartDetail.attributes">
                  <p class="Detail-body-title">{{item.attributeName}}</p>
                  <span @click="changeChecked(i, index, value, item)"
                        :class="{'active' : i === 0 ? defaultOneChecked === index : defaultTowChecked === index}"
                        class="Detail-body-value" v-for="(value, index) in item.attributeValues">{{value}}</span>
                </div>
              </div>
              <div class="detail-count">
                <p class="detail-count-title">数量</p>
                <span @click="changeCount(false)" :style="{color : computedStyle}"
                      class="detail-count-btn">-</span>
                <span class="detail-count-count">{{count}}</span><span class="detail-count-btn"
                                                                       @click="changeCount(true)">+</span>
              </div>
            </div>
          </Scroll>
        </div>
        <div @click="insertCart" class="join-ok">确定</div>
        <div @click="hideDetail" class="close">X</div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {computedPrice} from '../../common/js/mixin'
  import Scroll from '../scroll/scroll.vue'
  import {mapActions, mapGetters} from 'vuex'
  export default {
    mixins: [computedPrice],
    props: {
      cartDetail: {
        type: Object
      }
    },
    data () {
      return {
        joinCartDetailShow: false,
        //  默认选中第一个
        defaultChecked: 0,
        //  第一行被选中状态
        defaultOneChecked: 0,
        // 第二行被选中状态
        defaultTowChecked: 0,
        // 购物数量
        count: 1
      }
    },
    computed: {
      computedStyle: function () {
        return this.count === 1 ? 'rgb(204, 204, 204)' : '#ccc'
      },
      ...mapGetters([
        'getCart'
      ])
    },
    methods: {
      showDetail () {
        this.joinCartDetailShow = true
      },
      hideDetail () {
        this.joinCartDetailShow = false
      },
      // 数据关联找不到只能这样写了  有点乱 有些有问题
      changeChecked (i, index, value) {
        var vall = ''
        if (i === 0 && this.cartDetail.attributes.length > 1) {
          vall += this.cartDetail.attributes[1].attributeValues[this.defaultTowChecked]
          this.defaultOneChecked = index
          if (this.cartDetail.attributes[1].attributeValues.length > 1) {
            value = value + vall
          }
        } else {
          console.log('x', index)
          this.defaultOneChecked = index
          this.defaultChecked = index
          console.log(this.defaultChecked)
        }
        if (i === 1) {
          vall += this.cartDetail.attributes[0].attributeValues[this.defaultOneChecked]
          this.defaultTowChecked = index
          if (this.cartDetail.attributes[1].attributeValues.length > 1) {
            value = vall + value
          } else {
            value = vall
          }
        }
        for (var z = 0; z < this.cartDetail.products.length; z++) {
          if (!this.cartDetail.products[z].specDesc) {
            this.defaultChecked = 0
          }
          if (this.cartDetail.products[z].specDesc === value) {
            this.defaultChecked = z
            this.$emit('changeChecked', this.cartDetail.products[z])
          }
        }
      },
      // 数量的修改
      changeCount (bool) {
        if (bool) {
          this.count++
        } else {
          if (this.count > 1) {
            this.count--
          }
        }
      },
      //  添加到购物车
      insertCart () {
        var cart = {}
        console.log(this.defaultChecked)
        cart.detail = this.cartDetail.products[this.defaultChecked]
        cart.count = this.count
        this.joinToCart(cart)
      },
      ...mapActions([
        'joinToCart'
      ])
    },
    components: {
      Scroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .joinCartDetail
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 102
    background: rgba(0, 0, 0, .3)
    &.list-fade-enter-active, &.list-fade-leave-active
      transition: opacity 0.3s
      .Detail-content
        transition: all 0.3s
    &.list-fade-enter, &.list-fade-leave-to
      opacity: 0
      .Detail-content
        transform: translate3d(0, 100%, 0)
    .Detail-content
      padding: 20px 40px 0 20px
      position: fixed
      left: 0
      right: 0
      bottom: 0
      z-index: 102
      background: white
      .Detail-wrapper
        min-height: 410px
        .Detail-header
          display: flex
          .Detail-header-image
            padding-top: 0px
          .Detail-header-content
            margin-left: 20px
            flex: 1
            .Detail-header-title
              margin-bottom: 5px
              min-height: 30px
              font-size: 20px
              font-weight: bold
              width: 100%
              line-height 25px
              position: relative
              display: -webkit-box
              -webkit-line-clamp: 2
              -webkit-box-orient: vertical
              overflow: hidden
            .Detail-header-sellPrice
              font-size: 14px
              color: black
              span
                text-decoration: line-through
                font-size: 10px
                color: #707070
            .Detail-header-describe
              color: #707070
              font-size: 11px
              span
                font-size: 13px
        .main-content
          position: absolute
          top: 120px
          left: 30px
          right: 0
          bottom: 40px
          overflow: hidden
          .Detail-body
            .Detail-body-content
              margin-bottom: 15px
              .Detail-body-title
                font-size: 17px
              .Detail-body-value
                font-size: 15px
                color: black
                display: inline-block
                margin: 10px 20px 10px 0
                padding: 10px 15px
                background: #F5F5F5
                &.active
                  background: #FFD444
          .detail-count
            padding-bottom: 20px
          .detail-count-title
            font-size: 17px
            margin-bottom: 10px
          .detail-count-btn
            display: inline-block
            width: 30px
            height: 30px
            background: #f5f5f5
            text-align: center
            font-size: 19px
            line-height: 30px
          .detail-count-put
            width: 60px
          .detail-count-count
            padding: 0 30px

      .join-ok
        position: absolute
        bottom: 0
        left: 0
        right: 0
        line-height: 40px
        text-align: center
        background: #FFD444
        font-weight: 550
      .close
        position: absolute
        top: 0
        right: 0
        padding: 10px
        font-weight: 550
</style>
