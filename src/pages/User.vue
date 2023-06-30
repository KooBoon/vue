<template>
  <div v-if="$store.getters['user/isLogin']">
    <div class="member">
      <div class="header-con">
        <router-link to="/user/login" class="mui-navigate-right">
          <div class="user-info">
            <div class="avatar-con">
              <div class="avatar">
                <img src="../assets/images/avatar_default.png" class="image-info">
              </div>
            </div>
            <div class="person-con">
              <span>{{$store.state.user.username}}</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media">
        <router-link :to="{name:'order_list'}" class="mui-navigate-right">
          <img class="mui-media-object mui-pull-left" src="../assets/images/avatar_default.png">
          <div class="mui-media-body">
            我的订单
          </div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media">
        <router-link to="/user/address" class="mui-navigate-right">
          <img class="mui-media-object mui-pull-left" src="../assets/images/avatar_default.png">
          <div class="mui-media-body">
            收货地址
          </div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media">
        <div class="mui-navigate-right" @click="logout">
          <img class="mui-media-object mui-pull-left" src="../assets/images/avatar_default.png">
          <div class="mui-media-body">
            退出登录
          </div>
        </div>
      </li>

    </ul>
  </div>

  <div class="member" v-else>
    <div class="header-con">
      <router-link to="/user/login" class="mui-navigate-right">
        <div class="user-info">
          <div class="avatar-con">
            <div class="avatar">
              <img src="../assets/images/avatar_default.png" class="image-info">
            </div>
          </div>
          <div class="person-con">
            <span>登录 / 注册</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>


<script>
export default {
  data () {
    return {

    };
  },
  created () {

  },
  mounted () {

  },
  methods: {
    logout () {
      //1.发送请求完成退出登录
      this.$http.get('logout')
      //2.将localStorage里面的Authorization干掉
      this.$auth.setAuthorization('')
      //3.将Vuex中的用户信息删除
      this.$store.commit('user/logout')
      //4.提示用户退出成功
      this.$toast('退出登录成功')
    }
  }

};
</script>
<style scoped lang="scss">
.mui-table-view .mui-media,
.mui-table-view .mui-media-body {
  line-height: 42px;
  text-align: left;
}
.mui-table-view-cell:after {
  left: 0px;
}
.member {
  margin-bottom: 15px;
  .header-con {
    padding: 10px;
    background-color: #fff;
    .user-info {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 120px;
      background: linear-gradient(90deg, #28a2ff, #ffd787);
      box-shadow: 0 0.1rem 0.25rem#f8e3c6;
      .avatar-con {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        .avatar {
          width: 60px;
          height: 60px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 15);
          border: 1px solid hsla(0, 0%, 100%, 0.4);
          border-radius: 50%;
          .image-info {
            width: 100%;
            height: 100%;
          }
        }
      }
      .person-con {
        position: absolute;
        left: 90px;
        top: 50%;
        transform: translateY(-50%);
        color: #fff;
      }
    }
  }
}
</style>
