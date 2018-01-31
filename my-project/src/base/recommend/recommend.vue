<template>
  <div class="content">
    <h1 class="title">{{recommend.moduleName}}</h1>
    <img @click="goTOProductGroup(recommend.moduleContent.banners[0].bannerLinkTargetId,recommend.moduleContent.banners[0].bannerLinkType)"  @load="imageLoad" class="image" :src="recommend.moduleContent.banners[0].bannerImgSrc">
    <div class="wrapper">
      <div @click="goToDetail(item.productId)" class="detail" v-for="(item,index) in recommend.moduleContent.products" v-if="index<3">
        <img width="110" height="110" v-lazy="item.productImg">
        <p class="productTitle">{{item.productTitle}}</p>
        <p class="sellPrice">￥{{item.sellPrice | money}}<span v-if="item.sellPrice !== item.originalPrice">￥{{item.originalPrice | money}}</span></p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {computedPrice, goToDetail, goTOProductGroup} from '../../common/js/mixin'
  export default {
    mixins: [computedPrice, goToDetail, goTOProductGroup],
    props: {
      recommend: {
        type: Object
      }
    },
    methods: {
      imageLoad () {
        this.$emit('imagload')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .content
    .title
      padding: 30px 0 35px 0
      text-align: center
      font-size: 18px
      font-weight: 700
      color: black
    .image
      width: 100%
    .wrapper
      display: flex
      .detail
        flex: 1
        width: 90px
        margin: 0 10px 15px 10px
        text-overflow: ellipsis
        white-space: nowrap
        .productTitle
          width: 100%
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
          font-size: 12px
          margin-bottom: 6px
        .sellPrice
          font-size: 12px
          color: black
          span
            text-decoration:line-through
            font-size: 10px
            color: #ccc
</style>
