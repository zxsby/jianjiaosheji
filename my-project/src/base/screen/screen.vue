<template>
  <transition name="list-fade">
    <div @click="hidden" v-if="screenShow" class="screen-content">
      <div class="screen-wrapper" @click.stop>
        <h1 class="screen-wrapper-header">筛选条件</h1>
        <Scroll
          :interactive="true"
          :data="screen" :probeType="2"
          ref="scroll" class="screen-wrapper-body">
          <div class="body-content">
            <div class="body-wrapper">
              <h1 class="wrapper-header">价格范围 <span @click="showItem('price')"><span v-show="itemShow.price">—</span><span v-show="!itemShow.price">+</span></span></h1>
              <div v-show="itemShow.price" class="wrapper-body"></div>
            </div>
            <div class="body-wrapper">
              <h1 class="wrapper-header">场景 <span @click="showItem('scene')"><span v-show="itemShow.scene">—</span><span v-show="!itemShow.scene">+</span></span></h1>
              <div v-show="itemShow.scene" class="wrapper-body">
                <div @click="scenesChecked(item.id)" class="body-item" v-for="item in screen.scenes">
                  <p class="check" :class="{checked: !checkScenesChecked(item.id)}">
                    <span class="check-text" v-show="!checkScenesChecked(item.id)">✔</span>
                  </p>
                  <span class="text">{{item.name}}</span>
                </div>
              </div>
            </div>
            <div class="body-wrapper">
              <h1 class="wrapper-header">颜色 <span @click="showItem('color')"><span v-show="itemShow.color">—</span><span v-show="!itemShow.color">+</span></span></h1>
              <div v-show="itemShow.color" class="wrapper-body">
                <div @click="colorsChecked(item.id)" v-for="item in screen.colors" class="color-item"
                     :style="{backgroundImage :`url(${item.icon})`}">
                  <p v-show="!checkColorsChecked(item.id)" class="color-ok"
                     :style="{color: item.name === '白色' ? 'black' : 'weight'}">✔</p>
                </div>
              </div>
            </div>
            <div class="body-wrapper">
              <h1 class="wrapper-header">风格<span @click="showItem('style')"><span v-show="itemShow.style">—</span><span v-show="!itemShow.style">+</span></span></h1>
              <div v-show="itemShow.style" class="wrapper-body">
                <div @click="stylesChecked(item.id)" class="body-item" v-for="item in screen.styles">
                  <p class="check" :class="{checked: !checkStylesChecked(item.id)}">
                    <span class="check-text" v-show="!checkStylesChecked(item.id)">✔</span>
                  </p>
                  <span class="text">{{item.name}}</span>
                </div>
              </div>
            </div>
          </div>
        </Scroll>
        <div class="screen-wrapper-footer">
          <div @click="clearScreen" class="footer-text footer-left">重置</div>
          <div @click="subScreen" class="footer-text footer-right">确定</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../scroll/scroll.vue'
  export default {
    props: {
      screen: {
        type: Object
      }
    },
    data () {
      return {
        screenShow: false,
        rangeValue: 11,
        itemShow: {
          price: true,
          color: true,
          scene: true,
          style: true
        },  //  列表项的显示隐藏
        colorIds: [],
        sceneIds: [],
        styleIds: []
      }
    },
    computed: {},
    methods: {
      show() {
        this.screenShow = true
      },
      hidden () {
        this.screenShow = false
      },
      //  场景添加
      scenesChecked (id) {
        let index = this.sceneIds.findIndex((item) => {
          return item === id
        })
        if (index > -1) {
          this.sceneIds.splice(index, 1)
        } else {
          this.sceneIds.push(id)
        }
      },
      //  验证场景是否已经添加
      checkScenesChecked(id) {
        let index = this.sceneIds.findIndex((item) => {
          return item === id
        })
        if (index > -1) {
          return false
        } else {
          return true
        }
      },
      // 风格添加
      stylesChecked(id) {
        let index = this.styleIds.findIndex((item) => {
          return item === id
        })
        if (index > -1) {
          this.styleIds.splice(index, 1)
        } else {
          this.styleIds.push(id)
        }
      },
      //  验证风格是否添加
      checkStylesChecked(id) {
        let index = this.styleIds.findIndex((item) => {
          return item === id
        })
        if (index > -1) {
          return false
        } else {
          return true
        }
      },
      // 颜色添加
      colorsChecked (id) {
        let index = this.colorIds.findIndex((item) => {
          return item === id
        })
        if (index > -1) {
          this.colorIds.splice(index, 1)
        } else {
          this.colorIds.push(id)
        }
      },
      // 验证颜色是否添加
      checkColorsChecked (id) {
        let index = this.colorIds.findIndex((item) => {
          return item === id
        })
        if (index > -1) {
          return false
        } else {
          return true
        }
      },
      //  提交筛选
      subScreen () {
        this.hidden()
        this.$emit('subScreen', this.colorIds, this.sceneIds, this.styleIds)
      },
      //  重置筛选
      clearScreen () {
        this.colorIds = []
        this.sceneIds = []
        this.styleIds = []
      },
      //  列表项的显示隐藏
      showItem (item) {
        this.itemShow[item] = !this.itemShow[item]
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .screen-content
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 100
    background: rgba(0, 0, 0, .3)
    &.list-fade-enter-active, &.list-fade-leave-active
      transition: opacity 0.3s
      .screen-wrapper
        transition: all 0.3s
    &.list-fade-enter, &.list-fade-leave-to
      opacity: 0
      .screen-wrapper
        transform: translate3d(100%, 0, 0)
    .screen-wrapper
      position: absolute
      top: 0
      right: 0
      left: 20%
      bottom: 0
      padding: 0 15px
      background: white
      .screen-wrapper-header
        text-align: center
        height: 50px
        font-size: 17px
        font-weight: 550
        line-height: 50px
        border-bottom: 1px solid #f5f5f5
      .screen-wrapper-body
        position: absolute
        top: 50px
        left: 0
        bottom: 50px
        right: 0
        overflow: hidden
        .body-content
          .body-wrapper
            .wrapper-header
              padding: 0 16px 0 13px
              height: 50px
              line-height: 50px
              font-size: 17px
              font-weight: 550
              span
                float: right
                font-size: 12px
            .wrapper-body
              background: #f4f4f4
              min-height: 50px
              padding: 10px 0
              .color-item
                vertical-align: middle
                box-sizing: border-box
                margin: 10px 0
                display: inline-block
                width: 20%
                height: 30px
                text-align: center
                line-height: 30px
                background-size: 30px 30px
                background-repeat: no-repeat
                background-position: center
                .color-ok
                  color: white
              .body-item
                display: inline-block
                width: 50%
                .text
                  display: inline-block
                  margin: 6px 0
                .check
                  float: left
                  width: 18px
                  height: 18px
                  line-height: 17px
                  margin: 6px 20px 6px 20px
                  text-align: center
                  border-radius: 50%
                  border: 1px solid #d2d2d2
                  &.checked
                    color: white
                    background: black
      .screen-wrapper-footer
        position: absolute
        bottom: 0
        right: 0
        left: 0
        height: 50px
        text-align: center
        line-height: 50px
        display: flex
        .footer-text
          flex: 1
          font-weight: 550
        .footer-right
          background: #FFD444

</style>
