<template>
  <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="max" :style="myStyle">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="initCount" ref="num" @change="countChanged" />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from '../lib/mui/js/mui.min.js'
export default {
  props: ['max', 'initCount', 'goodsid', 'size'],
  data () {
    return {
      myStyle: {}
    }
  },
  created () { },
  mounted () {
    // 数字输入框必须进行初始化之后才能正常使用
    mui('.mui-numbox').numbox()
    if (this.$prop.size === 'min') {
      this.myStyle = { width: '100px', height: '25px', margin: '0 10px 0 10px' }
    }
  },
  methods: {
    countChanged () {
      // 将数字输入框中的数量返回给GoodsInfo页面
      const count = parseInt(this.$refs.num.value)
      this.$emit('count', { count: count, id: this.goodsid })
    }
  },
  watch: {
    max (newVal) {
      mui('.mui-numbox')
        .numbox()
        .setOption('max', newVal)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
