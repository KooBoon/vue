<template>
  <div class="photo-con">
    <!-- 顶部的横向滑动区域 -->
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a :class="['mui-control-item',cateId===item.id ? 'mui-active':'']" v-for="item in cates" :key="item.id"
            @tap="getPhotoListByCateId(item.id)">
            {{item.title}}</a>
        </div>
      </div>
    </div>
    <!-- 中间图片列表内容 -->
    <ul class="photo-list">
      <li v-for="item in list" :key="item.id">
        <router-link :to="{name:'photo_show', params:{id:item.id}}">
          <img v-lazy="item.img_url" alt />
          <div class="info">
            <h1 class="info-title">{{item.title}}</h1>
            <div class="info-body">{{item.zhaiyao}}</div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cates: [],//保存所有的分类
      list: [],//保存图片的列表
      cateId: 0//保存需要查询的分类id
    }
  },
  created () {
    this.getAllCategory()
    this.getPhotoListByCateId(0)//传入的id参数为0，表示查询全部的图片列表
  },
  mounted () { },
  methods: {
    getAllCategory () {
      //发送请求获取所有的图片分享分类
      this.$http.get('photo/getimgcategory').then(res => {
        if (res.data.status === 0) {
          this.cates = res.data.message
          this.cates.unshift({ id: 0, title: '全部' })
          //console.log(this.cates)
        } else {
          this.$toast('加载失败')
        }
      })
    },
    getPhotoListByCateId (cateId) {
      this.cateId = cateId
      //根据分类id发送请求获取图片列表
      this.$http.get('photo/getimages', { params: { id: this.cateId } }).then(res => {
        if (res.data.status === 0) {
          this.list = res.data.message
        } else {
          this.$toast('加载失败')
        }
      })
    }
  }

}
</script>

<style scoped lang="scss" >
* {
  touch-action: pan-y;
}
.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #eee;
    text-align: center;
    margin-bottom: 5px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>

