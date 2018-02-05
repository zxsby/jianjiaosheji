<template>
  <transition name="fold" mode="out-in">
    <div class="recommend">
      <toTop @scrolltoTop="scrollTOTOP" ref="totop"></toTop>
      <Scroll v-if="firstLunBo.length" @touchEnd="touchEnd" @scroll="scroll" :touch="true" :interactive="true" class="main-content"
              :probeType="2"
              :listenScroll="true" :data="RecommendMsg" ref="scroll">
        <div >
          <Silder>
            <div @click.stop="goTOProductGroup(item.bannerLinkTargetId,item.bannerLinkType)" v-for="item in firstLunBo">
              <img @load="loadImage" :src="item.bannerImgSrc" alt="">
            </div>
          </Silder>
          <Split></Split>
          <ListSilder :listDetail="RecommendMsg[1]"></ListSilder>
          <Split></Split>
          <Recommend  @imagload="imageLoad" v-if="RecommendMsg.length" :recommend="RecommendMsg[2]"></Recommend>
          <Split></Split>
          <ListSilder :listDetail="RecommendMsg[3]"></ListSilder>
          <Split></Split>
          <div v-for="item in RecommendList">
            <Recommend @imagload="imageLoad" :recommend="item"></Recommend>
            <Split></Split>
          </div>
          <img class="image" @load="loadImage" :src="RecommendMsg[RecommendMsg.length - 1].moduleContent.bannerImgSrc"
               alt="">
          <Split></Split>
        </div>
      </Scroll>
      <div v-show="!RecommendMsg.length" class="loading">
        <Loading></Loading>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Silder from '../../../base/silder/slider.vue'
  import Split from '../../../base/split/split.vue'
  import ListSilder from '../../../base/silder1/silder1.vue'
  import Scroll from '../../../base/scroll/scroll.vue'
  import Recommend from '../../../base/recommend/recommend.vue'
  import Loading from '../../../base/loading/loading.vue'
  import toTop from '../../../base/toTop/toTop.vue'
  import {loadImage, goTOProductGroup} from '../../../common/js/mixin'
  const ERR_OK = '0'
  export default {
    mixins: [loadImage, goTOProductGroup],
    data () {
      return {
        firstLunBo: '',  // 第一个轮播数据
        RecommendMsg: [], // 总数据
        RecommendList: [],  //  可循环数据
        toTop: false  //  返回顶部按钮
      }
    },
    created () {
      this._getRecommend()
    },
    computed: {},
    methods: {
      _getRecommend () {
        this.$http.get('./api/recommend').then((resoult) => {
          if (resoult.data.resCode === ERR_OK) {
            console.log(resoult.data)
            this.firstLunBo = resoult.data.data.modules[0].moduleContent.banners   //  第一个轮播数据
            this.RecommendMsg = resoult.data.data.modules
            this.RecommendList = resoult.data.data.modules.slice(4, -1)
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    components: {
      Silder,
      Split,
      ListSilder,
      Scroll,
      Recommend,
      Loading,
      toTop
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .recommend
    min-height: 100px
    &.fold-enter-active, &.fold-leave-active
      transition: all 0.4s linear
      transform: translate3d(0%, 0, 0)

    &.fold-enter
      transition: all 0s linear
      transform: translate3d(100%, 0, 0)
      opacity: 0

    &.fold-leave-to
      transition: all 0s linear
      transform: translate3d(-100%, 0, 0)
      opacity: 0
    .main-content
      position: fixed
      top: 84px
      right: 0
      left: 0
      bottom: 50px
      overflow: hidden
      .image
        width: 100%

    .loading
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
    .toTop
      position: fixed
      top: 90px
      left: 0
      right: 0
      z-index: 10
      &.top-enter-active, .top-leave-active
        transition: all 0.2s linear
        transform: translate3d(0%, 0, 0)
      &.top-enter
        transition: all 0.2s linear
        transform: translate3d(0, -100%, 0)
        opacity: 0
      &.top-leave-to
        transition: all 0.2s linear
        transform: translate3d(0, -100%, 0)
        opacity: 0
      .title
        text-align: center
        margin: 0 auto
        width: 80px
        height: 22px
        background: rgba(0, 0, 0, 0.7)
        color: white
        font-size: 12px
        line-height: 22px
        border-radius: 10px
</style>
