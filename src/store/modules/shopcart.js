function setItem (name, item) {
  localStorage.setItem(name, JSON.stringify(item))
}
function getItem (name) {
  return JSON.parse(localStorage.getItem(name) || '[]')
}

export default {
  state: {
    // car: [ { id:商品id, count:购买的数量， selected:是否选中 }, {}, {}]
    car: getItem('car'),
    // buy数组中存放的是需要购买的商品(即选中的商品)
    // 当我们点击去结算按钮的时候，将buy数组的商品去做结算操作。
    buy: getItem('buy')
  },
  mutations: {
    addShopcart (state, goodsinfo) {
      // 注意：如果购物车中已经有了goodsinfo对应的商品，那么就应该商品数量增加
      // 否则购物车中没有goodsinfo的商品，就应该把goodsinfo添加到购物车中
      // 当flag为false的时候表示购物车中没有相同的商品，如果flag为true表示有相同的商品
      let flag = false
      // 判断购物车中是否有goodsinfo对应的商品，如果有，就增加数量
      state.car.some(item => {
        if (parseInt(item.id) === parseInt(goodsinfo.id)) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })

      if (!flag) {
        // 购物车中没有相同的商品，将goodsinfo直接保存到购物车就行了
        state.car.push(goodsinfo)
      }

      // 调研setItem方法将购物车数据保存到localStorage
      setItem('car', state.car)
    },
    //修改商品数量
    updateGoodsInfo (state, goodsinfo) {
      state.car.some(item => {
        if (parseInt(item.id) === parseInt(goodsinfo.id)) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })

      setItem('car', state.car)
    },
    //修改商品的选中状态
    updateGoodsSelected (state, goodsinfo) {
      state.car.some(item => {
        if (parseInt(item.id) === parseInt(goodsinfo.id)) {
          item.selected = goodsinfo.selected
        }
      })
      setItem('car', state.car)
    },
    //根据id删除商品
    removeShopcart (state, id) {
      state.car.some((item, index) => {
        if (parseInt(item.id) === parseInt(id)) {
          state.car.splice(index, 1)
          return true
        }
      })
      setItem('car', state.car)

    },
    //将购物车中选中的商品添加到buy数组中
    setBuy (state, goods) {
      state.buy = []
      if (goods) {
        //是将要购买的那一个商品（goods）加到buy数组
        state.buy.push(goods)
      } else {
        //将购物车中选中的商品添加到buy数组
        state.car.forEach(item => {
          if (item.selected) {
            state.buy.push(item)
          }
        })
      }
      setItem('buy', state.buy)
    }
  },
  actions: {},
  getters: {
    // 获取商品数量
    getGoodsCount (state) {
      // goods:[ 701:2 , 888:3 ]
      var goods = {}
      state.car.forEach(item => {
        goods[item.id] = item.count
      })
      return goods
    },
    // 获取商品有没有选中的状态值（selected）
    getGoodsSelected (state) {
      // goods:[ 701:true , 888:false ]
      var goods = {}
      state.car.forEach(item => {
        goods[item.id] = item.selected
      })
      return goods
    },
    // 获取选中的商品的件数
    getSelectedCount (state) {
      var count = 0
      state.car.forEach(item => {
        if (item.selected) {
          count += item.count
        }
      })
      return count
    },
    // 获取选中的商品
    getSelectedGoods (state) {
      // goods:[ 701:{id:701, count:2, selected:true } ]
      var goods = {}
      state.car.forEach(item => {
        if (item.selected) {
          goods[item.id] = item
        }
      })
      //goods:[ 107:{ },111:{}]
      return goods
    },
    // 获取要购买的商品
    getBuy (state) {
      var goods = {}
      state.buy.forEach(item => {
        goods[item.id] = item
      })
      return goods
    }

  },
  namespaced: true
}