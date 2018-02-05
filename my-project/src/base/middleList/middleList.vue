<template>
  <div v-if="middleList" class="middleList-content">
    <h1 class="bg-title">{{middleList.moduleName}}</h1>
    <p class="sm-title">{{middleList.moduleDescription}}</p>
    <div class="middleList-wrapper">
      <div @click="goToDetail(item.productId)" class="middleList-detail"
           v-for="(item, index) in middleList.moduleContent.products"
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
    <div @click="goTOProductGroup(middleList.moduleContent.id,10)" v-if="showMore" class="more">
      查看更多  <span class="right">▶</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {computedPrice, goToDetail, goTOProductGroup, productCollect} from '../../common/js/mixin'
  export default {
    mixins: [computedPrice, goToDetail, goTOProductGroup, productCollect],
    props: {
      middleList: null,
      showMore: {
        type: Boolean,
        default: true
      }
    },
    computed: {},
    mounted () {
    },
    methods: {
      imageLoad () {
        this.$emit('imageLoad')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .middleList-content
    .bg-title
      padding: 30px 0 20px 0
      text-align: center
      font-size: 18px
      font-weight: 700
      color: black
    .sm-title
      text-align: center
      font-size: 12px
      padding-bottom: 20px
    .middleList-wrapper
      width: 100%
      border-bottom: 1px solid #F5F5F5
      .middleList-detail
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
          margin: 10px 15px 10px
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
          height: 34px
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
    .more
      color: #4A4A4A
      line-height: 30px
      text-align: center
      font-size: 12px
      padding: 15px 0
      span
        font-size: 16px
</style>
