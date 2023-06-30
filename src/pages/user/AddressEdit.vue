<template>
  <form class="mui-input-group">
    <div class="mui-input-row">
      <label class="title">收件人</label>
      <input type="text" v-model="form.name" class="mui-input-clear" placeholder="请输入收件人">
    </div>
    <div class="mui-input-row">
      <label class="title">联系方式</label>
      <input type="text" v-model="form.tel" class="mui-input-clear" placeholder="请输入手机号">
    </div>
    <div class="mui-input-row">
      <label class="title">所在地区</label>
      <input type="text" v-model="form.area" class="mui-input-clear" placeholder="请选择所在地区" @click="choose" />
      <div class="divwrap">
        <div class="mask" v-show="show" @click="choose"></div>
        <v-distpicker v-show="show" type="mobile" @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"
          :province="addressInfo.province" :city="addressInfo.city" :area="addressInfo.area"></v-distpicker>
      </div>
    </div>
    <div class="mui-input-row">
      <label class="title">详细地址</label>
      <input type="text" v-model="form.detail" class="mui-input-clear" placeholder="请输入详细地址">
    </div>
    <div class="mui-button-row">
      <button @click="save" type="button" class="mui-btn mui-btn-primary mui-btn-block">确认</button>
      <button v-show="id" @click="del" type="button" class="mui-btn mui-btn-danger mui-btn-block">删除</button>
    </div>
  </form>
</template>

<script>
import VDistpicker from 'v-distpicker'
export default {

  data () {
    return {
      form: {
        name: '',
        tel: '',
        area: '',
        detail: '',
      },
      show: false,
      addressInfo: {
        privince: '',
        city: '',
        area: ''
      }
    }
  },
  components: {
    'v-distpicker': VDistpicker
  },
  props: ['id'],
  created () {
    this.getAddress()
  },
  mounted () { },
  methods: {
    del () {
      //发送请求完成删除收货地址的操作
      this.$http.post('address/del', { id: this.id }).then(res => {
        if (res.data.code === 0) {
          this.$toast(res.data.msg)
        } else if (res.data.code === 1) {
          this.$toast(res.data.msg)
          this.$router.go(-1)
        } else if (res.data.code === 2) {
          this.$router.push('/user/login')
        }
      })
    },
    getAddress () {
      if (!this.id) {
        return
      }
      //发送请求根据id获取收货地址信息
      this.$http.get('address/edit', { params: { id: this.id } }).then(res => {
        //console.log(res.data)
        if (res.data.code === 0) {
          this.$toast(res.data.msg)
        } else if (res.data.code === 1) {
          this.form = res.data.data
        } else if (res.data.code === 2) {
          this.$router.push('/user/login')
        }
      })
    },
    save () {
      //检查收货人姓名、电话号码等内容是否输入
      //制作新增收货地址功能
      this.form.id = this.id
      this.$http.post('address/save', this.form).then(res => {
        if (res.data.code === 0) {
          //新增失败
          this.$toast(res.data.msg)
        } else if (res.data.code === 1) {
          //新增成功，退回到收货地址列表页面
          this.$toast(res.data.msg)
          this.$router.go(-1)
        } else if (res.data.code === 2) {
          //没有登录，导航至登录页面
          this.$router.push('/user/login')
        }
      })
    }, onChangeProvince (data) {
      this.addressInfo.privince = data.value
    },
    onChangeCity (data) {
      this.addressInfo.city = data.value
    },
    onChangeArea (data) {
      this.addressInfo.area = data.value
      this.form.area = this.addressInfo.privince + '-' + this.addressInfo.city + '-' + this.addressInfo.area
      this.show = false
    },
    choose () {
      this.show = !this.show
    }
  }
}
</script>

<style lang="scss" scoped>
.mui-input-group .mui-button-row {
  height: auto;
}
.mui-input-clear {
  font-size: 14px;
}
.mui-input-group:before {
  list-style: none;
}
.mui-button-row {
  margin-top: 20px;
  button {
    margin: 20px 0;
    padding: 10px 0;
  }
}
.tit {
  color: #999;
}
input::-webkit-input-placeholder {
  color: #999;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #999;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #999;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #999;
}
.divwrap > .mask {
  background: #000;
  opacity: 0.3;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.divwrap > .distpicker-address-wrapper {
  color: #999;
  background: #fff;
  border-top: 1px solid #ccc;
  z-index: 1;
  height: 300px;
  overflow-y: auto;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>
