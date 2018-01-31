<template>
  <div class="content" v-if="listDetail">
    <h1 class="title">{{listDetail.moduleContent.name}}</h1>
    <div class="list-wrapper" ref="list">
      <ul class="wrapper" ref="wrapper">
        <li @click="goToDetail(item.productId)" class="item" v-for="item in listDetail.moduleContent.products">
          <img width="110" height="110" v-lazy="item.productImg">
          <p class="productTitle">{{item.productTitle}}</p>
          <p class="sellPrice">￥{{item.sellPrice | money}}<span
            v-if="item.sellPrice !== item.originalPrice">￥{{item.originalPrice | money}}</span></p>
          <p class="discount" :class="{'otherDiscount': item.signs[0].id===4 ? true : false}" v-if="item.signs">
            <span>{{item.signs[0].desc}}<i v-if="item.signs[0].id===2">折</i></span>
          </p>
        </li>
      </ul>
    </div>
    <div class="more">
      查看更多 ▶
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {computedPrice, goToDetail} from '../../common/js/mixin'
  export default {
    mixins: [computedPrice, goToDetail],
    props: {
      listDetail: {
        type: Object
      }
    },
    mounted () {
      if (this.listDetail.moduleContent.products.length > 0) {
        let picWidth = 110
        let margin = 10
        let width = (picWidth + (2 * margin)) * this.listDetail.moduleContent.products.length
        this.$refs.wrapper.style.width = width + 'px'
        this.scroll = new BScroll(this.$refs.list, {
          click: true,
          scrollX: true,
          eventPassthrough: 'vertical',
          scrollbar: {
            fade: true,
            interactive: false
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .content
    .title
      padding: 30px 0 25px 0
      text-align: center
      font-size: 18px
      font-weight: 700
      color: black
    .list-wrapper
      width: 100%
      overflow: hidden
      white-space: nowrap
      position: relative
      padding-bottom: 8px
      .wrapper
        position: relative
        .item
          display: inline-block
          width: 110px
          margin: 0 10px
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
              text-decoration: line-through
              font-size: 10px
              color: #ccc
          .discount, .otherDiscount
            margin: 10px 0 10px 0
            font-size: 12px
            color: white
            span
              padding: 2px 6px
              background: #FF7070
          .otherDiscount
            span
              padding: 2px 6px
              background: black
    .more
      color: black
      line-height: 30px
      text-align: center
      font-size: 16px
      font-weight: 600
      padding: 10px 0

</style>
