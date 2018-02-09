<template>
  <div class="cart-content">
    <div class="cart-header">
      <p class="cart-back" @click="goTOBack"><</p>
      <p class="cart-header-title">购物车</p>
      <p @click="detail=!detail" v-if="!detail" class="cart-header-click">编辑</p>
      <p @click="detail=!detail" v-if="detail" class="cart-header-click">完成</p>
    </div>
    <scroll v-if="getCart" @touchEnd="touchEnd" :touch="true"
            :interactive="true" :probeType="2"
            :listenScroll="true" :data="getCart" ref="scroll" class="cart-body">
      <div>
        <div class="cart-body-item" v-for="(item,index) in getCart">
          <split></split>
          <div class="item-count">
            <p @click="checkedProduct(index)" class="check" :class="{checked: check[index]}">
              <span v-show="check[index]" class="check-text">✔</span>
            </p>
            <span @click="changeCount(false, item.detail.productId, item.count)" class="detail-count-btn">-</span>
            <span class="detail-count-count">{{item.count}}</span><span class="detail-count-btn"
                                                                        @click="changeCount(true, item.detail.productId, item.count)">+</span>
          </div>
          <div class="item-detail">
            <img width="80" height="80" :src="item.detail.productImg" alt="">
            <div class="detail-right">
              <p class="right-title">{{item.detail.productTitle}}</p>
              <p class="right-ms">
                <span class="ms" v-for="val in item.detail.attributes">{{val.attributeValue}}</span>
              </p>
              <p class="right-price">￥{{item.detail.sellPrice | money}}
                <span class="right-count">x{{item.count}}</span>
              </p>
            </div>
          </div>
        </div>
        <split></split>
        <div>— 为你推荐—</div>
        <productList :productLists="productList" :showMore="productLoading"></productList>
      </div>
    </scroll>
    <div class="cart-footer">
      <span @click="allCheckedProduct" :class="{checked : allChecked}" class="check">
        <span v-show="allChecked">✔</span>
      </span>
      <span>全选</span>
      <p @click="detailChecked" class="cart-footer-right" :style="{background: detail ? 'black' : 'yellow' }">
        <span v-show="!detail">去结算</span>
        <span class="detail" v-show="detail">删除</span>
      </p>
      <p v-show="!detail" class="cart-footer-center">合计
        <span>￥{{computedAllPrice | money}}</span>
      </p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getCartList, loadImage, computedPrice} from '../../common/js/mixin'
  import split from '../../base/split/split.vue'
  import scroll from '../../base/scroll/scroll.vue'
  import productList from '../../base/productList/productList.vue'
  export default {
    mixins: [getCartList, loadImage, computedPrice],
    data () {
      return {
        check: [],
        detail: false, // 删除按钮
        currentPage: 1,  //  当前推荐页数
        productLoading: true, // 加载更多显示
        productList: {}  //  为你推荐数据
      }
    },
    created () {
      this.getProductList()
    },
    mounted () {
      for (let i = 0; i < this.getCart.length; i++) {
        this.check.push(true)
      }
    },
    computed: {
      // 全选状态关联
      allChecked: function () {
        let all = this.check.every((val, i, arr) => {
          return arr[i] === true
        })
        console.log(all, this.check.length === this.getCart.length)
        // console.log(this.check.length === this.getCart.length, this.all, this.check)
        return this.check.length === this.getCart.length && all
      },
      //  计算价格总和
      computedAllPrice: function () {
        let allPrice = 0
        for (let i = 0; i < this.check.length; i++) {
          if (this.check[i]) {
            allPrice += this.getCart[i].count * this.getCart[i].detail.sellPrice
          }
        }
        return allPrice
      }
    },
    methods: {
      goTOBack () {
        this.$router.go(-1)
      },
      //   购物车列表单个点击选中
      checkedProduct (index) {
        this.$set(this.check, index, !this.check[index])
      },
      //  全选按钮的控制
      allCheckedProduct () {
        if (this.allChecked) {
          this.check = []
          for (let i = 0; i < this.getCart.length; i++) {
            this.check.push(false)
          }
        } else {
          this.check = []
          for (let i = 0; i < this.getCart.length; i++) {
            this.check.push(true)
          }
        }
      },
      // 单个商品数量的修改
      changeCount (bool, id, count) {
        if (bool) {
          let obj = {}
          obj.productId = id
          obj.count = count + 1
          this.changeCartDetailCount(obj)
        } else {
          if (count !== 1) {
            let obj = {}
            obj.productId = id
            obj.count = count - 1
            this.changeCartDetailCount(obj)
          }
        }
      },
      // 删除选中的商品
      detailChecked () {
        if (this.detail) {
          let detailIndex = []
          for (let index in this.check) {
            if (this.check[index]) {
              detailIndex.push(this.getCart[index].detail.productId)
              this.check.splice(index, 1)
            }
          }
          this.detailCartItem(detailIndex)
        }
      },
      // 获取为你推荐信息
      getProductList () {
        this.$http.get('./api/productList', {
          params: {
            currentPage: this.currentPage++
          }
        }).then((result) => {
          console.log(result)
          if (this.currentPage === 1) {
            this.productList = result.data
          } else {
            this.productList.data.products = this.productList.data.products.concat(result.data.products)
          }
          console.log(result)
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    components: {
      split,
      scroll,
      productList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cart-content
    position: relative
    .cart-header
      position: relative
      height: 45px
      font-size: 17px
      text-align: center
      .cart-back
        position: absolute
        top: 10px
        left: 10px
      .cart-header-title
        font-weight: 700
      .cart-header-click
        position: absolute
        top: 10px
        right: 10px
    .cart-body
      position: fixed
      top: 45px
      left: 0
      right: 0
      bottom: 50px
      overflow: hidden
      .cart-body-item
        .item-count
          height: 35px
          line-height: 35px
          margin: 0 15px
          padding: 10px 0 3px 3px
          text-align: right
          border-bottom: 1px solid #f5f5f5
          .check
            float: left
            width: 26px
            height: 26px
            margin-top: 2px
            text-align: center
            line-height: 26px
            border-radius: 50%
            border: 1px solid black
            &.checked
              color: white
              background: black
          .detail-count-btn
            display: inline-block
            width: 30px
            height: 30px
            background: #f5f5f5
            text-align: center
            font-size: 19px
            line-height: 30px
          .detail-count-count
            padding: 0 20px
        .item-detail
          padding: 10px
          display: flex
          .detail-right
            margin-left: 20px
            flex: 1
            .right-title
              width: 100%
              margin-bottom: 5px
              font-size: 15px
              line-height: 17px
              display: -webkit-box
              -webkit-line-clamp: 1
              -webkit-box-orient: vertical
              overflow: hidden
            .right-ms
              .ms
                font-size: 9px
                color: #808080
                display: inline-block
                margin: 10px 10px 10px 0
                padding: 5px 5px
                background: #f5f5f5
            .right-price
              position: relative
              font-size: 14px
              .right-count
                position: absolute
                top: 0
                right: 10px
                font-size: 13px
                line-height: 19px
                color: #808080
    .cart-footer
      position: fixed
      left: 0
      bottom: 0
      right: 0
      height: 50px
      line-height: 50px
      .check
        float: left
        width: 26px
        height: 26px
        line-height: 27px
        margin: 12px 10px 0 10px
        text-align: center
        border-radius: 50%
        border: 1px solid #000
        &.checked
          color: white
          background: black
      .cart-footer-right, .cart-footer-center
        float: right
      .cart-footer-right
        width: 90px
        height: 50px
        background: yellow
        text-align: center
        .detail
          color: white
      .cart-footer-center
        span
          display: inline-block
          margin: 0 20px 0 10px
</style>
