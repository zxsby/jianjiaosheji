<template>
  <transition name="slide">
    <div class="product-content">
      <toTop @scrolltoTop="scrollTOTOP" ref="totop" top="45px"></toTop>
      <div class="back">
        <p class="goToBack" @click="goToBack"><</p>
        <p class="iconfont ">转发</p>
      </div>
      <Scroll  v-if="productDetails.mainMsg" @touchEnd="touchEnd" :touch="true"
              :interactive="true" class="main-content" :probeType="2"
              :listenScroll="true" :data="productDetails" ref="scroll">
        <div class="productDetails-content" v-if="productDetails.mainMsg">
          <img @load="imageLoad" class="image" :src="productDetails.mainMsg.productImg+'?imageView2/1/w/375/h/300'"
               alt="">
          <h1 class="productTitle">{{productDetails.mainMsg.productTitle}}
            <span class="discount" :class="{'otherDiscount': productDetails.mainMsg.signs[0].id===4 ? true : false}"
                  v-if="productDetails.mainMsg.signs[0].id !== 6">
              <span>{{productDetails.mainMsg.signs[0].desc}}<i
                v-if="productDetails.mainMsg.signs[0].id===2">折</i></span>
            </span>
          </h1>
          <p class="sellPrice" :style="{color: productDetails.mainMsg.signs[0].id===2 ? '#FF7070' : 'black'}">
            ￥{{productDetails.mainMsg.sellPrice | money}}<span
            v-if="productDetails.mainMsg.sellPrice !== productDetails.mainMsg.originalPrice">￥{{productDetails.mainMsg.originalPrice | money}}</span>
          </p>
          <div class="signs" v-if="productDetails.mainMsg.signs.length">
            <p class="signs-left">
              <span>促销</span>
              <img src="./fullCutTag.png">
            </p>
            <p class="signs-right">
              <span>{{productDetails.mainMsg.signs[productDetails.mainMsg.signs.length - 1].desc}}<br>{{productDetails.mainMsg.signs[productDetails.mainMsg.signs.length - 1].extra}}</span>
            </p>
          </div>
          <split></split>
          <div v-if="productDetails.mainMsg.productImgs.length" class="productImgs" ref="productImgs">
            <ul class="wrapper" ref="wrapper">
              <li @click="showImage(item.productImg)" class="item" v-for="item in productDetails.mainMsg.productImgs">
                <img width="110" :src="item.productImg" alt="">
                <p>{{item.specDesc}}</p>
              </li>
            </ul>
          </div>
          <split></split>
          <div class="designer">
            <div v-if="productDetails.mainMsg.brandAndDesigner[0].country" class="address">
              <img width="20" src="./icon-location.png" alt="">
              <span>{{productDetails.mainMsg.brandAndDesigner[0].country}}</span>
            </div>
            <img class="lazy" :src="productDetails.mainMsg.brandAndDesigner[0].img" alt="">
            <p class="small-title">{{productDetails.mainMsg.brandAndDesigner[0].name}}</p>
            <p class="desc">{{productDetails.mainMsg.brandAndDesigner[0].desc}}</p>
            <div class="readMore">
              <span>阅读更多 ></span>
            </div>
          </div>
          <div v-if="productDetails.mainMsg.brandAndDesigner[1]" class="projector">
            <img width="60" :src="productDetails.mainMsg.brandAndDesigner[1].img" alt="">
            <span>{{productDetails.mainMsg.brandAndDesigner[1].desc}}</span>
            <i> ></i>
          </div>
          <split v-if="productDetails.mainMsg.brandAndDesigner[1]"></split>
          <h1 class="product-slide-title">{{productDetails.mainMsg.productTitle}}</h1>
          <div class="product-slide" v-if="productDetails.imageMsg.introductions.length"
               v-for="item in productDetails.imageMsg.introductions">
            <p class="product-slide-smTitle" v-if="item.type === 0">{{item.content}}</p>
            <img @load="imageLoad" class="detail-image" v-if="item.type === 2" :src="item.content" alt="">
            <p class="product-slide-TitleDetail" v-if="item.type === 1">{{item.content}}</p>
          </div>
          <div class="detail-parameter">
            <h1 class="detail-parameter-title">详细参数规格</h1>
            <div class="detail-parameter-content">
              <p class="detail-parameter-wrapper" v-for="item in productDetails.mainMsg.parameters">
                <span class="detail-parameter-name">{{item.parameterShowName}}</span>
                <span class="detail-parameter-value">{{item.parameterValue}}</span>
              </p>
            </div>
          </div>
          <split></split>
          <div class="hint-content">
            <h1 class="hint-title">温馨提示</h1>
            <div class="hint-wrapper">
              <p class="hint-detail">
                <b class="hint-name">商品退换：</b>
                <span class="hint-value">
                  除定制产品、特价产品外，尖叫设计所售产品均提供7天退换货服务。
                </span>
              </p>
              <p class="hint-detail">
                <b class="hint-name">商品质量：</b>
                <span class="hint-value">
                  尖叫设计所售商品均为原创正品，如遇商品签收后发现质量问题，请您签收后24小时内拍照取证并向客服提出反馈，尽快联系客服申请退换货。
                </span>
              </p>
              <p class="hint-detail">
                <b class="hint-name">配送费用：</b>
                <span class="hint-value">
                  单个订单高于¥99元包邮，低于¥99元价格为15元，订单中的多件产品，可能会根据发货期的不同进行合理拆单。拆单所产生的额外配送费将由尖叫设计承担。
                </span>
              </p>
              <p class="hint-detail">
                <b class="hint-name">发货范围：</b>
                <span class="hint-value">
                  全国可送（除新疆、西藏、甘肃、青海） 特殊地区（香港、台湾等地）发货与内地发货的邮费计算方式不同，您可于付款前联系客服确认。
                </span>
              </p>
            </div>
          </div>
          <split></split>
          <div v-if="productDetails.commentMsg.productCommentList.length" class="user-comment">
            <h1 class="comment-title">评论与晒图</h1>
            <div v-for="item in productDetails.commentMsg.productCommentList" class="comment-content">
              <img width="30" class="user-image" src="./me.png" alt="">
              <div class="comment-wrapper">
                <p class="user-detail">
                  <span class="user-name">{{item.nickName}}</span>
                  <span class="user-time">{{item.publishTimeFormat}}</span>
                </p>
              </div>
              <p class="comment-detail">{{item.comments}}</p>
              <p class="color">{{item.specAttributes[0]}}</p>
              <img class="comment-image" width="50" height="50" v-if="item.commentImgs.length"
                   v-for="value in item.commentImgs" :src="value" alt="">
            </div>
          </div>
          <split v-if="productDetails.commentMsg.productCommentList.length"></split>
          <MiddleList v-if="this.middleList.moduleContent.products.length" :showMore="showMore"
                      :middleList="middleList"></MiddleList>
          <split></split>
          <div class="tell-help">
            <span class="help">需求帮助</span>
            <span class="time">周一至周五 9:00~18:30</span>
            <img class="help-image" width="30" src="./icon-service.png" alt="">
          </div>
          <split></split>
        </div>
        <div v-show="!productDetails.mainMsg" class="loading">
          <Loading></Loading>
        </div>
      </Scroll>
      <div v-if="productDetails.mainMsg" class="cart-content">
        <div class="cart-bottom showCart">
          <div class="join-hart">
            <i @click="joinProductCollect(productDetails.mainMsg)"
               :class="checkedProductCollect(productDetails.mainMsg)" class="heart">♡</i>
          </div>
          <div class="join-hart">
            <i class="iconfont icon-gouwuche">
              <i class="count-num" v-show="getCart.length > 0">{{getCart.length}}</i>
            </i>
          </div>
        </div>
        <div @click="joinCart" class="cart-bottom join-cart">
          加入购物车
        </div>
        <div class="cart-bottom goTo-pay">
          立即购买
        </div>
      </div>
      <joinCartDetail @changeChecked="changeChecked" :cartDetail="productDetails.cartDetail"
                      ref="joinCatDetail"></joinCartDetail>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import Scroll from '../scroll/scroll.vue'
  import Loading from '../loading/loading.vue'
  import toTop from '../toTop/toTop.vue'
  import split from '../split/split.vue'
  import MiddleList from '../middleList/middleList.vue'
  import joinCartDetail from '../joinCartDetail/joinCartDetail.vue'
  import {loadImage, computedPrice, productCollect} from '../../common/js/mixin'
  export default {
    mixins: [loadImage, computedPrice, productCollect],
    props: {
      id: {type: String}
    },
    data () {
      return {
        productDetails: [],
        middleList: {
          moduleName: '- 大家都在看 -',
          moduleDescription: '',
          moduleContent: {
            products: []
          }
        },
        showMore: false
      }
    },
    created () {
      this._getProductGroup()
    },
    mounted () {
    },
    methods: {
      _getProductGroup () {
        this.$http.get('./api/productDetails', {
          params: {
            id: this.id
          }
        }).then((result) => {
          if (result.data.resCode === 0) {
            this.productDetails = result.data
            this.middleList.moduleContent.products = result.data.recommendMsg.productVoList
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      //  返回上一页
      goToBack () {
        this.$router.back(-1)
      },
      // 点击切换图片
      showImage (url) {
        this.productDetails.mainMsg.productImg = url
      },
      //  显示购物车详情
      joinCart () {
        this.$refs.joinCatDetail.showDetail()
      },
      //  购物车选中切换
      changeChecked (val) {
        this.productDetails.mainMsg.productTitle = val.productTitle
        this.productDetails.mainMsg.productImg = val.productImg
        this.productDetails.mainMsg.sellPrice = val.sellPrice
        this.productDetails.mainMsg.originalPrice = val.originalPrice
      }
    },
    watch: {
      productDetails () {
        if (!this.scroll) {
          this.scroll.refresh()
        } else {
          if (this.productDetails.mainMsg.productImgs.length) {
            setTimeout(() => {
              let picWidth = 110
              let margin = 10
              let width = (picWidth + (2 * margin)) * this.productDetails.mainMsg.productImgs.length
              this.$refs.wrapper.style.width = width + 'px'
              this.scroll = new BScroll(this.$refs.productImgs, {
                click: true,
                scrollX: true,
                eventPassthrough: 'vertical'
              })
            }, 20)
          }
        }
      }
    },
    components: {
      Scroll,
      Loading,
      toTop,
      split,
      MiddleList,
      joinCartDetail
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .product-content
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
        width: 35px
        height: 35px
        border-radius: 50%
        background: rgba(0, 0, 0, 0.3)
        text-align: center
        font-size: 30px
        line-height: 27px
        font-weight: 400
        color: white
      .iconfont
        float: right
        font-size: 25px
        line-height: 35px
        font-weight: 100

    .main-content
      position: fixed
      top: 0
      right: 0
      left: 0
      bottom: 50px
      overflow: hidden
      .productDetails-content
        .image
          width: 100%
        .productTitle
          padding: 0px 0 20px 0
          margin-left: 20px
          font-size: 19px
          font-weight: 700
          color: black
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
        .sellPrice
          margin: 0 20px
          padding-bottom: 15px
          border-bottom: 1px solid #F5F5F5
          font-size: 18px
          font-weight: 500
          color: black
          span
            text-decoration: line-through
            font-size: 14px
            font-weight: 300
            color: #ccc
        .signs
          margin: 0 20px
          padding: 8px 0
          font-size: 12px
          .signs-left
            display: inline-block
            img
              vertical-align: top
              width: 35px
              margin: 0 4px
          .signs-right
            vertical-align: top
            display: inline-block
        .productImgs
          width: 100%
          overflow: hidden
          white-space: nowrap
          position: relative
          padding-bottom: 8px
          .wrapper
            position: relative
            .item
              display: inline-block
              padding-bottom: 10px
              width: 110px
              margin: 0 10px
              text-overflow: ellipsis
              white-space: nowrap
              p
                text-align: center
                font-size: 14px
        .designer
          background: url('./bg.png') no-repeat left top
          background-size: 100%
          padding: 1.4rem 1.5rem 1.5rem
          font-size: 0
          height: 19.14rem
          position: relative
          .address
            text-align: right
            span
              font-size: 16px
              vertical-align: top
              color: white
          .lazy
            width: 3.8rem
            height: 3.8rem
            border-radius: 100%
            margin: 1.2rem auto .8rem
            display: block
          .small-title
            text-align: center
            font-size: 16px
            font-weight: 400
            padding-bottom: 15px
            color: white
          .desc
            text-align: center
            font-size: 13px
            width: 100%
            color: white
            line-height 20px
            position: relative
            display: -webkit-box
            -webkit-line-clamp: 4
            -webkit-box-orient: vertical
            overflow: hidden
          .readMore
            text-align: right
            margin-top: 25px
            span
              font-size: 16px
              color: white
        .projector
          padding: 5px 15px
          img
            vertical-align: middle
          span
            vertical-align: middle
            display: inline-block
            padding-left: 15px
            border-left: 2px solid #F5F5F5
            width: 70%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 14px;
        .product-slide-title
          padding: 25px 0 15px 0
          letter-spacing: 3px
          text-align: center
          font-size: 22px
          font-weight: 700
          color: black
        .product-slide
          background: #f5f5f5
          .detail-image
            width: 100%
            margin: 20px 0
          .product-slide-smTitle
            padding: 10px 0 0 0
            text-align: center
            font-family: PingFangSC-Regular;
            color: #000
            font-size: 17px
          .product-slide-TitleDetail
            padding: 0 20px 10px 20px
            font-size: 14px
            line-height: 18px
        .detail-parameter
          margin: 0 20px
          .detail-parameter-title
            padding: 12px 0
            font-size: 18px
            line-height: 45px
            font-weight: 540
            color: black
          .detail-parameter-content
            padding: 0 0 20px 0
            .detail-parameter-wrapper
              border-top: 1px solid #F5F5F5
              line-height: 30px
              font-size: 12px
              color: #a8a8a8
              .detail-parameter-name
                display: inline-block
                width: 30%
        .hint-content
          margin: 0 20px
          .hint-title
            padding: 12px 0
            font-size: 18px
            line-height: 45px
            font-weight: 540
            color: black
          .hint-wrapper
            padding: 0 0 20px 0
            line-height: 20px
            text-align: justify
            .hint-detail
              padding: 3px 0
              .hint-name
                font-size: 16px
                font-weight: 550
                color: #494949
              .hint-value
                font-size: 14px
        .user-comment
          margin: 0 20px
          .comment-title
            padding: 12px 0
            font-size: 18px
            line-height: 45px
            font-weight: 540
            color: black
          .comment-content
            position: relative
            padding: 0 0 20px 0
            line-height: 20px
            text-align: justify
            .user-image
              display: inline-block
              vertical-align: bottom
              border: 1px solid black
              border-radius: 50%
            .comment-wrapper
              margin-left: 10px
              display: inline-block
              vertical-align: top
              .user-detail
                padding: 10px
                font-size: 12px
                line-height: 16px
                color: #C1C0C6
                .user-name
                  text-align: left
                  color: #65686C
                .user-time
                  position: absolute
                  top: 10px
                  right: 0
            .comment-detail, .color, .comment-image
              margin-left: 40px
            .comment-detail
              border-top: 2px solid #F5F5F5
              font-size: 15px
              padding: 10px 0
              color: #65686C
            .color
              font-size: 12px
              padding-bottom: 5px
        .tell-help
          height: 30px
          margin: 0 20px
          padding: 20px 0
          font-size: 12px
          .help
            color: black
          .time
            margin-left: 20px
            color: red
          .help-image
            float: right
      .loading
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
    .cart-content
      position: fixed
      display: flex
      bottom: 0
      left: 0
      right: 0
      height: 50px
      .cart-bottom
        line-height: 50px
        text-align: center
        flex: 1
      .join-cart
        font-size: 16px
        font-weight: 600
        background: #f5f5f5
      .goTo-pay
        font-size: 16px
        font-weight: 600
        background: #FFD444
      .showCart
        display: flex
        background: white
        .join-hart
          flex: 1
          .heart
            font-size: 30px
            &.red
              color: red
            &.black
              color: black
          .iconfont
            font-size: 30px
            position: relative
            .count-num
              position: absolute
              top: -7px
              right: -7px
              width: 20px
              height: 20px
              line-height: 20px
              text-align: center
              border-radius: 50%
              font-size: 6px
              font-weight: 700
              color: #000
              background: #FFD444
              box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4)
</style>
