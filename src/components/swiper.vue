<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in imgList" :key="item.id">
        <img :src="item.img" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  props: ['imgList'],
  data () {
    return {

    };
  },
  created () {

  },
  mounted () {

  },
  methods: {

  }
};
</script>

<style scoped lang="scss">
.mint-swipe {
    height: 200px;
    color: #fff;
    .mint-swipe-items-warp{
        .mint-swipe-item{
            text-align:center;
        }
        }
        img{
            width:100%;
            height:100%;
    }
}
</style>