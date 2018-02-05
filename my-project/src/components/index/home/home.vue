<template>
  <transition name="fold" mode="out-in">
  <div>
    <toTop @scrolltoTop="scrollTOTOP" ref="totop"></toTop>
    <Scroll v-if="home.length" @touchEnd="touchEnd" @scroll="scroll" :touch="true" :interactive="true" :data="home" :probeType="2"
            :listenScroll="true" ref="scroll" class="furniture-content">
      <div >
        <Silder>
          <div @click.stop="goTOProductGroup(item.bannerLinkTargetId,item.bannerLinkType)" v-for="item in home[0].moduleContent.banners">
            <img @load="loadImage" :src="item.bannerImgSrc" alt="">
          </div>
        </Silder>
        <Split></Split>
        <ListSilder :listDetail="home[1]"></ListSilder>
        <Split></Split>
        <Recommend @imagload="imageLoad" :recommend="home[2]"></Recommend>
        <Split></Split>
        <SmallList :smallList="home[3]"></SmallList>
        <Split></Split>
        <div v-for="item in homeList">
          <MiddleList :middleList="item"></MiddleList>
          <Split></Split>
        </div>
      </div>
    </Scroll>
    <div v-show="!home.length" class="loading">
      <Loading></Loading>
    </div>
  </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../../../base/scroll/scroll.vue'
  import Silder from '../../../base/silder/slider.vue'
  import toTop from '../../../base/toTop/toTop.vue'
  import Split from '../../../base/split/split.vue'
  import ListSilder from '../../../base/silder1/silder1.vue'
  import Recommend from '../../../base/recommend/recommend.vue'
  import Loading from '../../../base/loading/loading.vue'
  import SmallList from '../../../base/smallList/smallList.vue'
  import MiddleList from '../../../base/middleList/middleList.vue'
  import {loadImage, goTOProductGroup} from '../../../common/js/mixin'
  const ERR_OK = '0'
  export default {
    mixins: [loadImage, goTOProductGroup],
    data () {
      return {
        home: [],
        homeList: []
      }
    },
    created () {
      this._getHome()
    },
    methods: {
      _getHome () {
        this.$http.get('./api/home').then((result) => {
          //  console.log(result)
          if (result.data.resCode === ERR_OK) {
            this.home = result.data.data.modules
            this.homeList = result.data.data.modules.slice(4)
            console.log(this.homeList)
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    components: {
      Scroll,
      Silder,
      toTop,
      Split,
      ListSilder,
      Recommend,
      Loading,
      SmallList,
      MiddleList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .fold-enter-active, .fold-leave-active
    transition: all 0.4s linear
    transform: translate3d(0%, 0, 0)

  .fold-enter
    transition: all 0s linear
    transform: translate3d(100%, 0, 0)
    opacity: 0

  .fold-leave-to
    transition: all 0s linear
    transform: translate3d(-100%, 0, 0)
    opacity: 0
  .furniture-content
    position: fixed
    top: 84px
    right: 0
    left: 0
    bottom: 50px
    overflow: hidden
  .loading
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
