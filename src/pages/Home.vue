<template>
  <div class="home">
    <swiper :imgList="imgList"></swiper>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link :to="{name:'news_list'}">
          <img src="../assets/images/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link :to="{name:'photo_list' }">
          <img src="../assets/images/menu2.png" alt="">
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/category">
          <img src="../assets/images/menu3.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/category">
          <img src="../assets/images/menu4.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/category">
          <img src="../assets/images/menu5.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/category">
          <img src="../assets/images/menu6.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import swiper from '../components/swiper.vue'

export default {
  data () {
    return {
      imgList: [
        { id: 1, img: 'http://tpadmin.test/static/uploads/goods/swiper/2019/09/17/eef7e476a7422fecd637217d85d77f68.jpg' },
        { id: 2, img: 'http://tpadmin.test/static/uploads/goods/swiper/2019/09/17/eef7e476a7422fecd637217d85d77f68.jpg' },
      ]
    }
  },
  created () {
    this.getImgList()
  },
  methods: {
    getImgList () {
      this.$indicator.open({ text: '加载中....' })
      this.$http.get('imglist').then(res => {
        // console.log(res)
        this.$indicator.close()
        if (res.data.code === 0) {
          this.$toast('加载轮播图数据失败')
        } else {
          this.imgList = res.data.data
        }
      })
    }
  },
  components: {
    swiper
  }
}
</script>

<style alng="scss" scoped>
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;
}
img {
  width: 60px;
  height: 60px;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
}
.mui-media-body {
  font-size: 14px;
}
</style>
