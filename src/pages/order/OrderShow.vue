<template>
  <div class="shopcart-container">
    <!--商品列表-->
    <div class="goods-list">
      <!--商品列表项区域-->
      <div class="mui-card">
        <div class="mui-card-content" v-for="(item) in order.user_order_goods" :key="item.id">
          <div class="mui-card-content-inner flex">
            <img :src="item.goods_goods.image" />
            <div class="info">
              <h1>{{item.goods_goods.name}}</h1>
              <p class="flex">
                <span class="price">￥{{item.price}}</span>
                <span>x{{item.count}}</span>
              </p>
            </div>
          </div>
        </div>
        <!--订单备注-->
        <div class="process-info">
          <p>
            <strong>订单备注</strong>
          </p>
          <p>
            <span>{{order.note}}</span>
          </p>
        </div>
        <!--配送信息-->
        <div class="process-info">
          <p>
            <strong>配送服务</strong>
            <strong>快递运输</strong>
          </p>
          <p>
            <span>中小件送货时间</span>
            <span>工作日，双休日与节假日均可送货</span>
          </p>
        </div>
        <!--收货地址-->
        <div class="process-info">
          <p>
            <strong>收获地址</strong>
          </p>
          <p>
            <span>{{order.address_name}} {{order.address_tel}}</span>
          </p>
          <p>
            <span>{{order.address_area}} {{order.address_detail}}</span>
          </p>
        </div>
        <!--运费信息-->
        <ul class="fare-info mui-card">
          <li class="fare-price flex">
            <span>商品金额</span>
            <span class="red">￥{{order.price}}</span>
          </li>
          <li class="fare-price flex">
            <span>运费</span>
            <span class="red">￥0.00</span>
          </li>
          <li class="fare-price flex">
            <span>
              <strong>总价</strong>
            </span>
            <span class="red">￥{{order.price}}</span>
          </li>
          <!--去支付按钮-->
          <div v-if="order.id && !order.is_cancel" class="flex">
            <button class="mui-btn mui-btn-primary mui-btn-block">去支付</button>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      order: {}
    }
  },
  props: ['id'],
  created () {
    this.getOrder()
  },
  mounted () { },
  methods: {
    getOrder () {
      this.$http.get('order/show', { params: { id: this.id } }).then(res => {
        if (res.data.code === 0) {
          this.$toast(res.data.msg)
        } else if (res.data.code === 1) {
          //判断有无订单列表信息，如果有就保存，否则，提示订单为空
          this.order = res.data.data
        }
        else if (res.data.code === 2) {
          //提示创建订单成功，跳转到登录
          this.$router.push('/user/login')
        }
      })
    }
  }

}
</script>

<style scoped lang="scss">
.flex {
  display: flex;
}
.shopcart-container {
  background: #eee;
  overflow: hidden;
  //商品列表
  .goods-list {
    margin-top: 10px;
    .mui-card {
      margin: 0;
      .mui-card-content {
        border-bottom: 1px solid #eee;
        .mui-card-content-inner {
          align-items: center;
          padding: 10px;
          img {
            width: 60px;
          }
          .info {
            margin-left: 10px;
            box-sizing: border-box;
            width: 100%;
            overflow: hidden;
            text-align: left;
            h1 {
              font-size: 13px;
              font-weight: bold;
              line-height: 20px;
              padding-top: 22px;
            }
            p {
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
              .price {
                font-size: 16px;
                font-weight: 700;
                color: red;
                flex: 1;
              }
            }
          }
        }
      }

      //配送信息
      .process-info {
        padding: 10px;
        border-bottom: 1px solid #eee;
        p {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          color: #333;
          span {
            color: #999;
          }
        }
      }
    }
  }
  //运费信息
  .fare-info {
    padding: 10px;
    margin: 10px 0 0 0;
    .fare-price {
      padding: 5px 0;
      display: flex;
      justify-content: space-between;
      .red {
        color: red;
        font-size: 16px;
      }
    }
  }
}
</style>
