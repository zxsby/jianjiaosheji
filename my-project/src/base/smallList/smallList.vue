<template>
  <div class="smallList-content">
    <h1 class="title">{{smallList.moduleName}}</h1>
    <div class="wrapper">
      <div class="detail" v-for="(item,index) in smallList.moduleContent.banners" v-if="index<3">
        <img width="110" height="110" :src="item.bannerImgSrc" alt="">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      smallList: null
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .smallList-content
    .title
      padding: 30px 0 30px 0
      text-align: center
      font-size: 18px
      font-weight: 700
      color: black
    .wrapper
      display: flex
      padding-bottom: 15px
      width: 100%
      .detail
        flex: 1
        text-align: center
</style>
