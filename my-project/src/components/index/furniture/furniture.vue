<template>
  <div>
    <toTop @scrolltoTop="scrollTOTOP" ref="totop"></toTop>
    <Scroll v-if="Furniture.length" @touchEnd="touchEnd" @scroll="scroll" :touch="true" :interactive="true" :data="Furniture" :probeType="2"
            :listenScroll="true" ref="scroll" class="furniture-content">
      <div >
        <Silder>
          <div @click.stop="goTOProductGroup(item.bannerLinkTargetId,item.bannerLinkType)" v-for="item in Furniture[0].moduleContent.banners">
            <img @load="loadImage" :src="item.bannerImgSrc" alt="">
          </div>
        </Silder>
        <Split></Split>
        <ListSilder :listDetail="Furniture[1]"></ListSilder>
        <Split></Split>
        <Recommend @imagload="imageLoad" :recommend="Furniture[2]"></Recommend>
        <Split></Split>
        <SmallList :smallList="Furniture[3]"></SmallList>
        <Split></Split>
        <div v-for="item in FurnitureList">
          <MiddleList :middleList="item"></MiddleList>
          <Split></Split>
        </div>
      </div>
    </Scroll>
    <div v-show="!FurnitureList.length" class="loading">
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
  import SmallList from '../../../base/smallList/smallList.vue'
  import MiddleList from '../../../base/middleList/middleList.vue'
  import Loading from '../../../base/loading/loading.vue'
  import {loadImage, goTOProductGroup} from '../../../common/js/mixin'
  const ERR_OK = '0'
  export default {
    mixins: [loadImage, goTOProductGroup],
    data () {
      return {
        Furniture: [],
        FurnitureList: []   //   可循环的
      }
    },
    created() {
      this._getFurniture()
    },
    methods: {
      _getFurniture () {
        this.$http.get('./api/furniture').then((result) => {
          //  console.log(result)
          if (result.data.resCode === ERR_OK) {
           // console.log(1)
            this.Furniture = result.data.data.modules
            this.FurnitureList = result.data.data.modules.slice(4)
           // console.log(this.FurnitureList)
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
      SmallList,
      MiddleList,
      Loading
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
  .loading
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
