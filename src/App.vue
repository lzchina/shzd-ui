<template>
  <div id="app">
    <div class="lottery-mystery-boxes" :style="'background-image:url(' + imgSettings.background + ')'">
      <div class="lottery-button-container">
        <div>
          <img :src="imgSettings.myPrize">
        </div>
        <div>
          <img :src="imgSettings.gameExpl">
        </div>
      </div>
      <div class="lottery-machine-container">
        <mystery-boxes @beforeDraw="beforeDraw" @drawn="showPopPrize" />
      </div>
      <div class="pop-layer-mask" style="z-index: 190" :class="{ visible: currentFrame !== -1 }" />
      <div class="pop-layer" style="z-index: 200" :class="{ visible: currentFrame !== -1 }">
        <img
          v-for="(item, index) in popFileNameArray"
          :key="'ani' + index"
          :class="{ visible: index === currentFrame }"

          :src="'https://zdgg-scrm.oss-cn-shanghai.aliyuncs.com/frontend/home/marketing-tool/mb-pp-' + item + '.png'"
        >
        <!-- :style="'width: ' + settings.animation.width + 'px;height: ' + settings.animation.height + 'px'" -->
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      imgSettings: {
        background: 'https://zdgg-scrm.oss-cn-shanghai.aliyuncs.com/frontend/home/marketing-tool/mystery-box-bg.png',
        gameExpl: 'https://zdgg-scrm.oss-cn-shanghai.aliyuncs.com/frontend/home/marketing-tool/mystery-game-expl.png',
        myPrize: 'https://zdgg-scrm.oss-cn-shanghai.aliyuncs.com/frontend/home/marketing-tool/mystery-my-prize.png',
        title: 'https://zdgg-scrm.oss-cn-shanghai.aliyuncs.com/frontend/home/marketing-tool/mystery-box-title.png'
      },
      settings: {
        animation: {
          // 奖品弹出动画设置，动画帧图url固定为前缀加上从0到imgMaxCount的5位数字，扩展名固定为png
          imgPrefix: 'https://zdgg-scrm.oss-cn-shanghai.aliyuncs.com/frontend/home/marketing-tool/mb-p-',
          imgMaxCount: 64,
          // 动画图片大小
          // width: 750,
          // height: 1296,
          // 每帧毫秒数
          msPerFrame: 40
        }
      },
      // 奖品弹出动画
      currentFrame: -1
    }
  },
  computed: {
    popFileNameArray() {
      const ret = []
      for (let i = 0; i <= this.settings.animation.imgMaxCount; i++) {
        ret.push(i.toString().padStart(5, '0'))
      }
      return ret
    }
  },
  mounted() {
  },
  methods: {
    beforeDraw(data) {
      console.log('beforeDraw')
      data.canGo(true)
      console.log('canceled')
    },
    showPopPrize() {
      // 奖品弹窗动画
      let stackMs = 0
      let index = 1
      let lastTime = performance.now()
      // 每帧40ms
      const frameMs = this.settings.animation.msPerFrame
      const maxCount = this.settings.animation.imgMaxCount
      const _this = this
      function showImage() {
        _this.currentFrame = index
      }
      function callback(timestamp) {
        console.log('callback' + timestamp)
        stackMs += (timestamp - lastTime)
        lastTime = timestamp
        if (stackMs < frameMs) {
          window.requestAnimationFrame(callback)
        } else {
          // console.log(`1 index: ${index} stackMs: ${stackMs} frameMs: ${frameMs}`)
          index += Math.trunc(stackMs / frameMs)
          stackMs %= frameMs
          showImage()
          console.log(`index: ${index} stackMs: ${stackMs} frameMs: ${frameMs}`)
          if (index < maxCount) {
            window.requestAnimationFrame(callback)
          } else {
            index = -1
            showImage()
          }
        }
      }
      showImage()
      window.requestAnimationFrame(callback)
      this.drawing = false
    }
  }
}
</script>

<style scoped>
.lottery-mystery-boxes {
  font-family: PingFangSC-Regular, PingFang SC;
  width: 710px;
  height: 1258px;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  position: relative;
  padding: 8px 20px 30px;
}
.lottery-button-container {
  display: flex;
  justify-content: space-between;
  z-index: 0;
}
.lottery-button-container > div {
  width: 234px;
  height: 96px;
}
.lottery-button-container > div > img {
  width: 100%;
  height: 100%;
}
.lottery-machine-container {
  z-index: 0;
}

.pop-layer,
.pop-layer-mask {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #000;
  visibility: hidden;
}
.pop-layer-mask {
  opacity: 0.5;
}
.pop-layer {
  overflow: hidden;
  background: transparent;
}
.pop-layer.visible,
.pop-layer-mask.visible {
  visibility: visible;
}
.pop-layer > img {
  width: 100%;
  height: auto;
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  visibility: hidden;
}
.pop-layer > img.visible {
  visibility: visible;
}
</style>
