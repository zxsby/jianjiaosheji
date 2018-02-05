<template>
  <div>
    <toTop @scrolltoTop="scrollTOTOP" ref="totop"></toTop>
    <Scroll v-if="activity.length" @touchEnd="touchEnd" @scroll="scroll" :touch="true" :interactive="true" :data="activity" :probeType="2"
            :listenScroll="true" ref="scroll" class="furniture-content">
      <div >
        <Silder>
          <div @click.stop="goTOProductGroup(item.bannerLinkTargetId,item.bannerLinkType)" v-for="item in activity[0].moduleContent.banners">
            <img @load="loadImage" :src="item.bannerImgSrc" alt="">
          </div>
        </Silder>
        <Split></Split>
        <div v-for="item in activityListImage">
          <img @click="goTOProductGroup(item.moduleContent.bannerLinkTargetId,item.moduleContent.bannerLinkType)" class="image" @load="loadImage" :src="item.moduleContent.bannerImgSrc" alt="">
          <Split></Split>
        </div>
        <!--<ListSilder :listDetail="activity[1]"></ListSilder>-->
        <!--<Split></Split>-->
        <Recommend @imagload="imageLoad" :recommend="activity[5]"></Recommend>
        <Split></Split>
        <Recommend @imagload="imageLoad" :recommend="activity[6]"></Recommend>
        <!--<Split></Split>
        <!--<SmallList :smallList="activity[3]"></SmallList>-->
        <!--<Split></Split>-->
        <div v-for="item in activityList">
        <MiddleList :middleList="item"></MiddleList>
        <Split></Split>
        </div>
      </div>
    </Scroll>
    <div v-show="!activity.length" class="loading">
      <Loading></Loading>
    </div>
  </div>
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
        activity: [],
        activityListImage: [],
        activityList: []
      }
    },
    created () {
      this._getActivity()
    },
    methods: {
      _getActivity () {
        this.$http.get('./api/activity').then((result) => {
          //  console.log(result)
          if (result.data.resCode === ERR_OK) {
            this.activity = result.data.data.modules
            this.activityListImage = result.data.data.modules.slice(1, 5)
            this.activityList = result.data.data.modules.slice(7)
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
  .furniture-content
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
</style>
