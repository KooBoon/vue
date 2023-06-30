<template>
  <div>
    <div class="menu">
      <div class="menu-left">
        <ul>
          <li class="menu-item" v-for="(item,index) in menus" :key="index" @click="clickList(index)"
            :class="{current:index===currentIndex}">
            <p class="text">{{item.name}}</p>
          </li>
        </ul>
      </div>
      <div class="menu-right" ref="itemList">
        <ul>
          <li class="cate" v-for="(menu,index1) in menus" :key="index1">
            <h4 class="cate-title">{{menu.name}}</h4>
            <ul class="cate-item">
              <li v-for="(item,index2) in menu.sub" :key="index2">
                <router-link :to="'/goodsList/'+item.id" class="cate-item-wrapper">
                  <div class="cate-item-img">
                    <img :src="item.image" alt="" />
                  </div>
                  <span>{{item.name}}</span>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      menus: [],
      //记录用户点中的那一个一级分类的索引
      currentIndex: 0,
      rightLiTops: []
    }
  },
  created () {
    this.getMenu()
  },
  mounted () {

  },
  methods: {
    getMenu () {
      this.$indicator.open({
        text: '加载中...'
      })
      //发送请求，获取分类信息
      this.$http.get('category').then(res => {
        //console.log(res.data)
        this.$indicator.close()
        this.menus = res.data.data
      })
    },
    clickList (index) {
      this.currentIndex = index
      //根据索引，去定位右侧盒子的定位值
      let y = -this.rightLiTops[index]
      this.rightBScroll.scrollTo(0, y)
    },
    _initBScroll () {
      this.leftBScroll = new BScroll('.menu-left', {
        click: true,
        mouseWheel: true
      })
      this.rightBScroll = new BScroll('.menu-right', {
        click: true,
        mouseWheel: true,
        probeType: 3
      })
      // 添加一段代码监听二级分类滚动区域的滚动事件
      this.rightBScroll.on('scroll', pos => {
        // console.log(pos)
        const scrollY = Math.abs(pos.y)
        // console.log(scrollY)
        for (var i = 0; i < this.rightLiTops.length - 1; i++) {
          // 判断滚动的Y值
          if (
            scrollY >= this.rightLiTops[i] &&
            scrollY < this.rightLiTops[i + 1]
          ) {
            // console.log('min:' + this.rightLiTops[i])
            // console.log('max:' + this.rightLiTops[i + 1])
            // console.log('我现在滚动到的位置是第' + i + '个位置')
            this.currentIndex = i
          }
        }
      })
    },
    _initRightHeight () {
      const itemArray = []
      let top = 0
      //将第一个二级分类的定位值加入itemArray数组
      itemArray.push(top)
      //获取所有的二级分类盒子
      const allList = this.$refs.itemList.getElementsByClassName('cate')
      for (var i = 0; i < allList.length; i++) {
        top += allList[i].clientHeight
        itemArray.push(top)
      }
      //console.log(itemArray)
      this.rightLiTops = itemArray
    }
  },
  watch: {
    menus () {
      //this.$nextTick函数会在页面渲染完成之后进行调用
      this.$nextTick(() => {
        this._initBScroll()
        this._initRightHeight()
      })
    }
  }
}
</script>
<style scoped lang="scss">
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
.menu {
  display: flex;
  position: absolute;
  text-align: center;
  top: 40px;
  bottom: 50px;
  width: 100%;
  overflow: hidden;
  .menu-left {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
    .menu-item {
      height: 54px;
      width: 100%;
      .text {
        width: 100%;
        line-height: 54px;
        margin-bottom: 0;
      }
    }
    .current {
      width: 100%;
      background: #fff;
      .text {
        color: red;
      }
    }
  }
  .menu-right {
    flex: 1;
    background: #fff;
  }
  .menu-right {
    flex: 1;
    background: #fff;
    .cate {
      height: 100%;
      .cate-title {
        margin: 0;
        text-align: left;
        font-size: 14px;
        color: #333;
        font-weight: bold;
        padding: 10px;
      }
      .cate-item {
        padding: 7px 10px 10px;
        display: flex;
        overflow: hidden;
        flex-flow: row wrap;
        li {
          width: 33.3%;
          .cate-item-wrapper {
            .cate-item-img {
              width: 100%;
              img {
                width: 70px;
                height: 70px;
              }
            }
            span {
              display: inline-block;
              font-size: 14px;
              color: #333;
            }
          }
        }
      }
    }
  }
}
</style>