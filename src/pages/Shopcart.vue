<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 购物策划商品列表 -->
      <div class="mui-card">
        <div class="mui-card-content" v-for="item in goodslist" :key="item.id">
          <div class="mui-card-content-inner flex">
            <!-- 复选框 -->
            <div class="mui-input-row mui-checkbox mui-left">
              <label>&nbsp;</label>
              <input type="checkbox" v-model="getGoodsSelected[item.id]"
                @change="selectChanged(item.id, getGoodsSelected[item.id])" :disabled="item.num===0" />
            </div>
            <!-- 商品图片 -->
            <img :src="item.image" />
            <!-- 商品详情 -->
            <div class="info">
              <h1>{{ item.name }}</h1>
              <p class="flex">
                <span class="price">¥{{ item.price }}</span>
                <numbox :max="item.num" :initCount="getGoodsCount[item.id]" :goodsid="item.id" @count="countChanged"
                  size="min"></numbox>
                <a href="#" @click.prevent="remove(item.id)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- 结算区域 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner balance">
            <div class="left">
              <p>总计不包含运费</p>
              <p>已勾选商品 <span class="red">{{getSelectedCount}}</span>件，
                总价 <span class="red">￥{{getSelectAmount}}</span>元
              </p>
            </div>
            <mt-button type="primary" @click="createOrder">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import numbox from "../components/numbox.vue";
export default {
  data () {
    return {
      goodslist: [],

    };
  },
  components: {
    numbox,
  },
  computed: {
    ...mapState('shopcart', ['car']),
    ...mapGetters('shopcart', ['getGoodsCount', 'getGoodsSelected', 'getSelectedCount', 'getSelectedGoods']),
    getSelectAmount () {
      const selectedGoods = this.getSelectedGoods
      let amount = 0
      this.goodslist.forEach(item => {
        if (selectedGoods[item.id]) {
          amount += item.price * selectedGoods[item.id].count
        }
      })
      return amount
    }
  },
  created () {
    this.getGoodsList()
  },
  mounted () { },
  methods: {
    getGoodsList () {
      //获取Vuex中购物车数据
      //console.log(this.car);
      const idArr = [];
      this.car.forEach((item) => idArr.push(item.id));
      //console.log(idArr)

      this.$http.get("shopcart", { params: { ids: idArr } }).then((res) => {
        //console.log(res.data);
        this.goodslist = res.data.data
        this.goodslist.forEach(item => {
          if (item.num === 0) {
            //将购物车中的商品之前的默认状态修改为false
            this.selectChanged(item.id, false)
          }
        })
      });
    },
    countChanged (goodsinfo) {
      //console.log(goodsinfo)
      this.$store.commit("shopcart/updateGoodsInfo", goodsinfo);
    },
    selectChanged (id, selected) {
      this.$store.commit("shopcart/updateGoodsSelected", {
        id: id,
        selected: selected
      })
    },
    remove (id) {
      //删除goodslist中的商品数据
      this.goodslist.some((item, index) => {
        if (parseInt(item.id) === parseInt(id)) {
          this.goodslist.splice(index, 1)
          return true
        }
      })
      //根据id参数做删除购物车的操作
      this.$store.commit('shopcart/removeShopcart', id)
    },
    createOrder () {
      if (this.getSelectedCount <= 0) {
        //没有选中商品，无需进行下订单
        this.$toast('您没有选择需要的购买的商品')
        return
      }
      //执行shopcart模块中的setbuy，将选中物品添加到buy
      this.$store.commit('shopcart/setBuy')
      this.$router.push('/order/create')
    },

  }
};
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
}
.shopcar-container {
  background: #eee;
  overflow: hidden;
  .goods-list {
    .balance {
      display: flex;
      justify-self: space-between;
      align-items: center;
      text-align: left;
      .red {
        color: red;
        font-weight: bold;
        font-size: 16px;
      }
    }
    .mui-card-content-inner {
      align-items: center;
      padding: 10px;
      .mui-checkbox.mui-left input[type="checkbox"] {
        left: 0px;
      }
      .mui-radio.mui-left label,
      .mui-checkbox.mui-left label {
        padding-left: 20px;
        padding-right: 35px;
        padding-bottom: 22px;
      }
    }
    img {
      width: 60px;
    }
    .info {
      margin-left: 10px;
      width: 100%;
      overflow: hidden;
      box-sizing: border-box;
      h1 {
        font-size: 13px;
        font-weight: bold;
        line-height: 20px;
        padding-top: 10px;
      }
      p {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .price {
          text-align: left;
          font-size: 14px;
          font-weight: 700;
          color: red;
          flex: 1;
        }
        a {
          line-height: 25px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>