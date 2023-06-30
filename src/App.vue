<template>
  <div id="app">
    <div class="container">
      <mt-header fixed :title="$route.meta.title">
        <span slot="left" @click="goBack" v-show="showBack">
          <mt-button icon="back">返回</mt-button>
        </span>
      </mt-header>
      <transition name="fade">
        <router-view />
      </transition>
      <tabbar></tabbar>
    </div>
  </div>
</template>

<script>
//导入tabbar.vue
import tabbar from './components/tabber.vue'
export default {
  data () {
    return {
      showBack: false
    }
  },
  created () {
    //判断当前是否为首页，如果是首页，就将showBack改为false，否则改为true
    this.showBack = this.$route.path !== '/home'
    this.checkLogin()
  },
  watch: {
    '$route.path' (newVal) {
      this.showBack = newVal !== '/home'
    }
  },
  methods: {
    goBack () {
      //通过go方法退后一个访问页面
      this.$router.go(-1)
    },
    checkLogin(){
      this.$http.get('user').then(res =>{
        if(res.data.code === 1){
          //如果用户已经登录了，那么就将用户信息保存到vuex中
          this.$store.commit('user/setUser',res.data.data)
        }
      })
    }
  },
  components: {
    tabbar
  }
}
</script>


<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
}

.container {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
}

.fade-enter {
  opacity: 0;
  transform: translateX(100%);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
</style>
