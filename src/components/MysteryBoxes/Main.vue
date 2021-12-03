<template>
  <div class="mystery-box-container" :style="'width: ' + settings.machine.width + 'px; height: ' + settings.machine.height + 'px'">
    <img :src="settings.machine.img">
    <img
      v-if="!!settings.title.img"
      :src="settings.title.img"
      :style="'left: ' + settings.title.left + 'px; top:' + settings.title.top + 'px; width:' + settings.title.width + 'px;height:' + settings.title.height + 'px;z-index: 10'"
    >
    <template v-for="(item, index) in boxArray">
      <img
        :key="'b' + index"
        :src="index === currentFocus ? settings.mysteryBox.focusImg : settings.mysteryBox.img"
        :style="'left: ' + (index === currentFocus ? (item.left - focusOffsetX) : item.left) + 'px; top:' + (index === currentFocus ? (item.top - focusOffsetY) : item.top) + 'px; width:' + (index === currentFocus ? settings.mysteryBox.focusWidth : settings.mysteryBox.width) + 'px;height:' + (index === currentFocus ? settings.mysteryBox.focusHeight : settings.mysteryBox.height) + 'px;z-index: 20'"
      >
    </template>
    <template v-for="(item, index) in settings.imgs">
      <img
        v-if="!!item.img"
        :key="'i' + index"
        :src="item.img"
        :style="'left: ' + item.left + 'px; top:' + item.top + 'px; width:' + item.width + 'px;height:' + item.height + 'px;z-index: 30'"
      >
    </template>
    <div
      v-for="(item, index) in settings.text"
      :key="index"
      :style="'left: ' + item.left + 'px; top:' + item.top + 'px; width:' + item.width + 'px;height:' + item.height + 'px;line-height:' + item.height + 'px;font-size:' + item.fontSize + 'px;font-weight:' + item.fontWeight + ';color:' + item.color + ';z-index: 40'"
    >
      {{ item.text }}
    </div>
    <img
      class="button"
      :src="settings.button.img"
      :style="'left: ' + settings.button.left + 'px; top:' + settings.button.top + 'px; width:' + settings.button.width + 'px;height:' + settings.button.height + 'px;z-index: 100' + (readonly ? ';cursor: default' : '')"
      @click="draw"
    >
    <div
      class="prize-exit"
      :class="{ active: prizeExiting }"
      :style="'left: ' + settings.prizeExit.left + 'px; top:' + settings.prizeExit.top + 'px; width:' + settings.prizeExit.width + 'px; height:' + settings.prizeExit.height + 'px;z-index: 50'"
    >
      <img
        :src="settings.mysteryBox.img"
        :style="'width:' + settings.mysteryBox.width + 'px;height:' + settings.mysteryBox.height + 'px;z-index: 20'"
      >
    </div>
    <img
      class="prize-exit-awning"
      :src="settings.prizeExitAwning.img"
      :style="'left: ' + settings.prizeExitAwning.left + 'px; top:' + settings.prizeExitAwning.top + 'px; width:' + settings.prizeExitAwning.width + 'px;height:' + settings.prizeExitAwning.height + 'px;z-index: 60'"
    >
  </div>
</template>

<script>
export default {
  name: 'MysteryBoxes',
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    settings: {
      type: Object,
      default: () => {
        return {
          machine: {
            img: 'https://zdgg-scrm.oss-cn-shanghai.aliyuncs.com/frontend/home/marketing-tool/mystery-box-machine.png',
            width: 710,
            height: 1162
          },
          title: {
            img: 'https://zdgg-scrm.oss-cn-shanghai.aliyuncs.com/frontend/home/marketing-tool/mystery-box-title.png',
            left: 60,
            top: 28,
            width: 590,
            height: 86
          },
          mysteryBox: {
            rowCount: 4,
            colCount: 3,
            img: 'https://zdgg-scrm.oss-cn-shanghai.aliyuncs.com/frontend/home/marketing-tool/mystery-box.png',
            firstLeft: 64,
            firstTop: 278,
            width: 102,
            height: 142,
            rowSpace: 73,
            colSpace: 28,
            focusImg: 'https://zdgg-scrm.oss-cn-shanghai.aliyuncs.com/frontend/home/marketing-tool/mystery-box-focus.png',
            focusWidth: 142,
            focusHeight: 184
          },
          text: [
            {
              text: '累计 9999999999 人次参与',
              left: 0,
              top: 164,
              width: 710,
              height: 34,
              fontSize: 22,
              color: '#212121'
            },
            {
              text: '一等奖',
              left: 530,
              top: 226,
              width: 92,
              height: 32,
              fontSize: 16,
              color: '#ffffff',
              fontWeight: 400
            },
            {
              text: '二等奖',
              left: 530,
              top: 376,
              width: 92,
              height: 32,
              fontSize: 16,
              color: '#ffffff',
              fontWeight: 400
            },
            {
              text: '三等奖',
              left: 530,
              top: 526,
              width: 92,
              height: 32,
              fontSize: 16,
              color: '#ffffff',
              fontWeight: 400
            },
            {
              text: '剩余次数 3',
              left: 474,
              top: 810,
              width: 204,
              height: 34,
              fontSize: 22,
              color: '#212121'
            }
          ],
          imgs: [
            {
              // 玻璃
              img: 'https://zdgg-scrm.oss-cn-shanghai.aliyuncs.com/frontend/home/marketing-tool/mystery-box-glass.png',
              left: 36,
              top: 374,
              width: 418,
              height: 680
            },
            {
              // 奖品1
              img: 'https://zdgg-scrm.oss-cn-shanghai.aliyuncs.com/frontend/home/marketing-tool/draw-button.png',
              // img: '',
              left: 530,
              top: 264,
              width: 92,
              height: 92
            },
            {
              // 奖品2
              img: 'https://zdgg-scrm.oss-cn-shanghai.aliyuncs.com/frontend/home/marketing-tool/draw-button.png',
              left: 530,
              top: 414,
              width: 92,
              height: 92
            },
            {
              // 奖品3
              img: 'https://zdgg-scrm.oss-cn-shanghai.aliyuncs.com/frontend/home/marketing-tool/draw-button.png',
              left: 530,
              top: 570,
              width: 92,
              height: 92
            }
          ],
          button: {
            // 按钮
            img: 'https://zdgg-scrm.oss-cn-shanghai.aliyuncs.com/frontend/home/marketing-tool/draw-button.png',
            left: 474,
            top: 694,
            width: 204,
            height: 112
          },
          prizeExit: {
            // 奖品出口
            left: 468,
            top: 852,
            width: 216,
            height: 230
          },
          prizeExitAwning: {
            // 奖品出口的遮阳棚
            img: 'https://zdgg-scrm.oss-cn-shanghai.aliyuncs.com/frontend/home/marketing-tool/prize-exit-awning.png',
            left: 468,
            top: 852,
            width: 216,
            height: 66
          }
        }
      }
    }
  },
  data() {
    return {
      currentFocus: -1,
      timer: null,
      asyncWaiting: false,
      drawing: false,
      prizeExiting: false,
      prizeExitOffsetX: '10px'
    }
  },
  computed: {
    boxArray() {
      if (this.settings && this.settings.mysteryBox) {
        const ret = []
        for (let i = 0; i < this.settings.mysteryBox.rowCount; i++) {
          for (let j = 0; j < this.settings.mysteryBox.colCount; j++) {
            ret.push({
              left: this.settings.mysteryBox.firstLeft + j * (this.settings.mysteryBox.width + this.settings.mysteryBox.colSpace),
              top: this.settings.mysteryBox.firstTop + i * (this.settings.mysteryBox.height + this.settings.mysteryBox.rowSpace)
            })
          }
        }
        return ret
      }
      return []
    },
    focusOffsetX() {
      return (this.settings.mysteryBox.focusWidth - this.settings.mysteryBox.width) / 2
    },
    focusOffsetY() {
      return (this.settings.mysteryBox.focusHeight - this.settings.mysteryBox.height) / 2
    }
  },
  methods: {
    draw() {
      if (this.readonly) {
        console.log('readonly')
        return
      }
      if (this.drawing) {
        console.log('抽奖未结束！')
        return
      }
      if (this.asyncWaiting) {
        console.log('异步等待中')
        return
      }
      this.asyncWaiting = true
      const _this = this

      const callbackData = {
        canGo: (go) => {
          _this.asyncWaiting = false
          if (go) {
            _this.doDraw()
          }
        }
      }
      this.$emit('beforeDraw', callbackData)
    },
    doDraw() {
      this.drawing = true
      const prizeIndex = Math.trunc(Math.random() * this.settings.mysteryBox.rowCount * this.settings.mysteryBox.colCount)
      let index = 0
      this.timer = setInterval(() => {
        if (index > prizeIndex && this.timer) {
          this.currentFocus = -1
          window.clearInterval(this.timer)
          this.onPrize(prizeIndex)
        } else {
          this.currentFocus = index++
        }
      }, 200)
    },
    onPrize(index) {
      // const blinkMs = [0.5, 0.6, 0.3, 0.8]
      const blinkMs = [100, 200, 100, 400]
      this.blink(index, blinkMs[0], blinkMs[1])
      this.blink(index, blinkMs[0] + blinkMs[1] + blinkMs[2], blinkMs[3])
      let sum = 0.1 // 盲盒熄灭到奖品进入出口的时间
      blinkMs.forEach(v => { sum += v })
      setTimeout(() => {
        this.showExitPrize()
      }, sum)
    },
    blink(index, offMs, onMs) {
      // 盲盒闪烁动画
      setTimeout(() => {
        this.currentFocus = index
      }, offMs)
      setTimeout(() => {
        this.currentFocus = -1
      }, offMs + onMs)
    },
    showExitPrize() {
      // 奖品从出口掉出动画
      this.prizeExiting = true
      setTimeout(() => {
        this.prizeExiting = false
        this.resetButton()
        // this.showPopPrize()
        this.$emit('drawn')
      }, 500)
    },
    resetButton() {
      setTimeout(() => {
        this.drawing = false
      }, 700)
    }
  }
}
</script>

<!--
  vars="{ prizeExitOffsetX }"
 -->
<style scoped>
.mystery-box-container {
  position: relative;
  text-align: center;
}
.mystery-box-container > img {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.mystery-box-container > div {
  position: absolute;
}
.mystery-box-container > .button {
  cursor: pointer;
}
.mystery-box-container > .prize-exit {
  position: relative;
  overflow: hidden;
}
.mystery-box-container > .prize-exit > img {
  position: absolute;
  /* left: var(--prizeExitOffsetX); */
    left: 50%;
    top: 0;
    transform: translate(-50%, -100%);
}
.mystery-box-container > .prize-exit.active > img {
  animation: prizeDropDown 1.2s;
}
@keyframes prizeDropDown {
  0%  {
    top: 0;
    transform: translate(-50%, -100%) scale(1, 1);
  }
  /* 10%  {
    top: 0;
    transform: translate(-50%, 0) scale(1, 1);
  }
  20% {
    top: 50%;
    transform: translate(-50%, -50%) scale(1, 1);
  } */
  10% {
    top: 100%;
    transform: translate(-50%, -100%) scale(1, 1);
  }
  15% {
    top: 100%;
    transform: translate(-50%, -90%) scale(1.1, 0.9);
  }
  20% {
    top: 100%;
    transform: translate(-50%, -110%) scale(0.9, 1.1);
  }
  25% {
    top: 100%;
    transform: translate(-50%, -100%) scale(1, 1);
  }
  100% {
    top: 100%;
    transform: translate(-50%, -100%) scale(1, 1);
  }
}
.mystery-box-container > .pop-layer,
.mystery-box-container > .pop-layer-mask {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #000;
  visibility: hidden;
}
.mystery-box-container > .pop-layer-mask {
  opacity: 0.5;
}
.mystery-box-container > .pop-layer {
  background: transparent;
}
.mystery-box-container > .pop-layer.visible,
.mystery-box-container > .pop-layer-mask.visible {
  visibility: visible;
}
.mystery-box-container > .pop-layer > img {
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  visibility: hidden;
}
.mystery-box-container > .pop-layer > img.visible {
  visibility: visible;
}
</style>
