<template>
  <transition name="slide">
    <div class="ToP-content">
      <toTop @scrolltoTop="scrollTOTOP" ref="totop" top="45px"></toTop>
      <div class="back">
        <p class="goToBack" @click="goToBack"><</p>
        <p @click="goToSearch" class="iconfont icon-gouwuche">
          <i class="count-num" v-show="getCart.length > 0">{{getCart.length}}</i>
        </p>
      </div>
      <Scroll v-if="toPic.data && toPic.data1" @touchEnd="touchEnd" @scroll="scroll" :touch="true"
              :interactive="true" class="main-content" :probeType="2"
              :listenScroll="true" :data="toPic" ref="scroll">
        <div >
          <img class="image" :src="toPic.data1.data.topicImg" alt="">
          <div class="toPic-content">
            <h1 class="bg-title">{{toPic.data1.data.topicName}}</h1>
            <h1 class="sm-title">{{toPic.data1.data.topicDesc}}</h1>
            <div class="toPic-wrapper">
              <div @click="goToDetail(item.productId)" class="toPic-detail" v-for="(item, index) in toPic.data.productList"
                   :class="{'right' : (index+1) % 2 === 0}">
                <div class="join-detail-hart">
                  <i @click.stop="joinProductCollect(item)"
                     :class="checkedProductCollect(item)" class="heart">♡</i>
                </div>
                <img @load="imageLoad" class="image" v-lazy="item.productImg" alt="">
                <p class="discount" :class="{'otherDiscount': item.signs[0].id===4 ? true : false}" v-if="item.signs">
                  <span>{{item.signs[0].desc}}<i v-if="item.signs[0].id===2">折</i></span>
                </p>
                <!--<p class="otherDiscount" v-if="item.signs && item.signs[0].id === 4">-->
                <!--<span>{{item.signs[0].desc}}</span>-->
                <!--</p>-->
                <p class="noDiscount" v-if="!item.signs"></p>
                <p class="name">{{item.productTitle}}</p>
                <p class="price">￥{{item.sellPrice | money}}<span
                  v-if="item.sellPrice !== item.originalPrice">￥{{item.originalPrice | money}}</span></p>
                <p class="list-title">{{item.prizeOrSlogan}}</p>
              </div>
            </div>
          </div>
        </div>
      </Scroll>
      <div v-show="!toPic.data" class="loading">
        <Loading></Loading>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../../base/scroll/scroll.vue'
  import Loading from '../../base/loading/loading.vue'
  import toTop from '../../base/toTop/toTop.vue'
  import {loadImage, computedPrice, goToDetail, productCollect} from '../../common/js/mixin'
  const ERR_OK = '0'
  export default {
    mixins: [loadImage, computedPrice, goToDetail, productCollect],
    props: {
      id: {type: String}
    },
    data () {
      return {
        pageNumber: 1,
        toPic: []
      }
    },
    created () {
      this._getProductGroup()
    },
    computed: {
    },
    methods: {
      _getProductGroup () {
        this.$http.get('./api/toPic', {
          params: {
            id: this.id
          }
        }).then((result) => {
          if (result.data.resCode === ERR_OK) {
            this.toPic = result.data
            console.log(this.toPic)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      //  返回上一页
      goToBack () {
        this.$router.back(-1)
      },
      goToSearch () {
        this.$router.push('/cart')
      }
    },
    components: {
      Scroll,
      Loading,
      toTop
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .ToP-content
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 100
    background: white
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .back
      position: fixed
      top: 10px
      left: 20px
      right: 20px
      z-index: 101
      overflow: hidden
      .goToBack, .iconfont
        display: inline-block
        width: 40px
        height: 40px
        border-radius: 50%
        background: rgba(0, 0, 0, 0.3)
        text-align: center
        font-size: 30px
        line-height: 32px
        font-weight: 400
        color: white
      .iconfont
        float: right
        font-size: 25px
        line-height: 40px
        font-weight: 100
        &.icon-gouwuche
          position: relative
          .count-num
            position: absolute
            top: -1px
            right: 2px
            width: 15px
            height: 15px
            line-height: 15px
            text-align: center
            border-radius: 50%
            font-size: 6px
            font-weight: 700
            color: #000
            background: #FFD444
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4)
    .loading
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
    .main-content
      position: fixed
      top: 0
      right: 0
      left: 0
      bottom: 0
      overflow: hidden
      .image
        width: 100%
      .toPic-content
        .bg-title
          padding: 20px 0 20px 0
          margin-left: 20px
          font-size: 19px
          font-weight: 700
          color: black
        .sm-title
          margin:0 20px
          font-size: 13px
          line-height: 17px
          padding-bottom: 20px
        .toPic-wrapper
          width: 100%
          border-bottom: 1px solid #F5F5F5
          .toPic-detail
            position: relative
            display: inline-block
            vertical-align: top
            width: 50%
            box-sizing: border-box
            border-top: 1px solid #F5F5F5
            .join-detail-hart
              position: absolute
              top: 10px
              right: 10px
            .heart
              font-size: 30px
              padding: 10px
              &.red
                color: red
              &.black
                color: black
            .image
              width: 100%
            .discount, .otherDiscount
              margin: 0 15px 10px
              font-size: 12px
              color: white
              span
                padding: 2px 6px
                background: #FF7070
            .otherDiscount
              span
                padding: 2px 6px
                background: black
            .noDiscount
              height: 24px
            .name
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
              font-size: 14px
              padding: 0 15px 10px
            .price
              color: black
              font-size: 14px
              padding: 0 17px 10px
              span
                text-decoration: line-through
                font-size: 12px
                color: #ccc
            .list-title
              width: 100%
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
              font-size: 12px
              padding: 0 15px 15px
          .right
            border-left: 1px solid #F5F5F5
</style>
