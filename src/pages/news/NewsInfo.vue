<template>
  <div class="newsinfo-container">
    <h1 class="title"> {{ newsInfo.title}} </h1>
    <p class="newsinfo-nav">
      <span>发表时间:{{newsInfo.add_time}}</span>
      <span>点击:{{newsInfo.click}}次</span>
    </p>
    <div class="content" v-html="newsInfo.content"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newsInfo: {}
    }
  },
  props: ['id'],
  created () {
    this.getNewsInfo()
  },
  mounted () { },
  methods: {
    getNewsInfo () {
      //根据新闻id获取到新闻的详情信息
      this.$http.get('news/show', { params: { id: this.id } }).then(res => {
        if (res.data.status === 0) {
          this.newsInfo = res.data.message[0]
        } else {
          this.$toast('加载失败')
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.newsinfo-container {
  padding: 0 5px;
  text-align: left;
  .title{
    font-size: 16px;
    text-align: center;
    margin: 10px 0;
    color: orangered;
  }
  .newsinfo-nav{
    display: flex;
    justify-content: space-between;
    color: #25a2ff;
  }
  .content{
    img{
        width: 100%;
    }
  }
}
</style>>

