<template>
  <div class="address-container">
    <div>
      <div class="mui-card" v-for="item in addressList" :key="item.id">
        <ul class="selected">
          <li @click="select(item.id)">
            <strong>{{item.name}}</strong> &nbsp;
            <strong>{{item.tel}}</strong>
          </li>
          <li @click="select(item.id)">{{item.area}} {{item.detail}}</li>
          <li>
            <router-link :to="{ name:'address_edit',params:{ id: item.id} }" class="edit">编辑</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="mod_btns fixed">
      <router-link to="address/add" class="mod_btn">
        新增收货地址
      </router-link>
    </div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      addressList: []
    }
  },
  created () {
    this.getAddressList()
  },
  mounted () { },
  methods: {
    getAddressList () {
      //发送请求得到收获地址列表数据
      this.$http.get('address').then(res => {
        //console.log(res.data)
        this.addressList = res.data.data
      })
    },
    select (id) {
      //如果是从下订单页面跳过来的，那么我们的路由就是address_select
      if (this.$route.name !== 'address_select') {
        return
      }
      this.$router.push({ name: 'order_create', params: { id: id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.address-container {
  background: #eee;
  overflow: hidden;
  .mod_btn {
    font-size: 16px;
    line-height: 46px;
    height: 46px;
    text-align: center;
    background: #3884ff;
    flex: 1;
    display: block;
    color: #fff;
  }
  .mod_btns .fixed {
    display: flex;
    overflow: hidden;
  }
  .mui-card {
    padding: 7px 40px;
    position: relative;
    overflow: hidden;
    padding: 15px;
    color: #666;
    .selected {
      margin: 0;
      padding: 0;
      list-style: none;
      padding-right: 50px;
      //.text {
      // font-size: 16px;
      // }
      li {
        font-size: 16px;
        text-align: left;
      }
      .edit {
        color: #e93b3d;
        width: 50px;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
