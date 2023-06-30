<template>
  <div class="photoinfo-container">
    <h3>{{photoinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间:{{photoinfo.add_time}}</span>
      <span>点击:{{photoinfo.click}}次</span>
    </p>
    <div class="thumbs">
      <vue-preview :slides="list" @close="getPhotoList"></vue-preview>
    </div>
    <div class="content" v-html="photoinfo.content"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      //保存图片资讯详情
      photoinfo: {},
      //图片列表
      list: []
    }
  },
  props: ['id'],
  created () {
    this.getPhotoInfo()
    this.getPhotoList()
  },
  mounted () { },
  methods: {
    //获取图片资讯详情
    getPhotoInfo () {
      //console.log(this.id)
      //发送请求根据资讯id查询图片资讯详情
      this.$http.get('photo/getimageInfo', { params: { id: this.id } }).then(res => {
        if (res.data.status === 0) {
          this.photoinfo = res.data.message[0]
          //console.log(this.photoinfo)
        } else {
          this.$toast('查询失败')
        }
      })
    },
    //获取图片资讯的图片列表
    getPhotoList () {
      this.$http.get('photo/getthumimages', { params: { id: this.id } }).then(res => {
        if (res.data.status === 0) {
          res.data.message.forEach(item => {
            item.w = 600
            item.h = 400
            item.msrc = item.src
          })
          this.list = res.data.message
          //console.log(this.list)
        } else {
          this.$toast('查询失败')
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtible {
    display: flex;
    justify-self: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
    text-align: left;
  }
  .thumbs {
    .my-gallert {
      width: 100%;
      display: flex;
      flex-flow: row wrap;
    }
    figure {
      margin: 0 2em;
    }
    img {
      width: 5 6em;
      box-shadow: 0 0 8px #999;
    }
  }
}
</style>