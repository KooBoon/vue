import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './pages/Home.vue'
import Category from './pages/Category.vue'
import Shopcart from './pages/Shopcart.vue'
import User from './pages/User.vue'
import Login from './pages/user/Login.vue'
import Register from './pages/user/Register.vue'
import GoodsList from './pages/goods/GoodsList.vue'
import GoodsInfo from './pages/goods/GoodsInfo.vue'
import Address from './pages/user/Address.vue'
import AddressEdit from './pages/user/AddressEdit.vue'
import OrderCreate from './pages/order/OrderCreate.vue'
import OrderList from './pages/order/OrderList.vue'
import OrderShow from './pages/order/OrderShow.vue'
import NewsList from './pages/news/NewsList.vue'
import NewsInfo from './pages/news/NewsInfo.vue'
import PhotoList from './pages/photo/PhotoList.vue'
import PhotoInfo from './pages/photo/PhotoInfo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    component: Home,
    meta: { title: '首页' }
  }, {
    path: '/category',
    component: Category,
    meta: { title: '分类' }
  }, {
    path: '/shopcart',
    component: Shopcart,
    meta: { title: '购物车' }
  }, {
    path: '/user',
    component: User,
    meta: { title: '我的' }
  }, {
    path: '/user/login',
    component: Login,
    meta: { title: '登录' }
  }, {
    path: '/user/register',
    component: Register,
    meta: { title: '注册' }
  }, {
    path: '/goodsList/:category_id',
    component: GoodsList,
    props: true,
    meta: { title: '商品列表' }
  }, {
    path: '/goodsinfo/:id',
    component: GoodsInfo,
    props: true,
    name: 'goods_info',
    meta: { title: '商品信息' }
  }, {
    path: '/user/address',
    component: Address,
    meta: { title: '收货地址列表' }
  }, {
    path: '/user/address/add',
    component: AddressEdit,
    meta: { title: '新增收货地址' }
  }, {
    path: '/user/address/edit/:id',
    component: AddressEdit,
    name: 'address_edit',
    props: true,
    meta: { title: '编辑收货地址' }
  }, {
    path: '/order/create',
    component: OrderCreate,
    name: 'order_create',
    meta: { title: '下订单' }
  }, {
    path: '/user/address/select',
    component: Address,
    name: 'address_select',
    meta: { title: '选择收货地址' }
  }, {
    path: '/order/list',
    component: OrderList,
    name: 'order_list',
    meta: { title: '我的订单' }
  }, {
    path: '/order/show/:id',
    component: OrderShow,
    name: 'order_show',
    props: true,
    meta: { title: '查看订单' }
  }, {
    path: '/news/list',
    component: NewsList,
    name: 'news_list',
    meta: { title: '新闻资讯列表' }
  }, {
    path: '/news/show/:id',
    component: NewsInfo,
    name: 'news_show',
    props: true,
    meta: { title: '查看新闻资讯' }
  }, {
    path: '/photo/list',
    component: PhotoList,
    name: 'photo_list',
    meta: { title: '图片分享列表' }
  }, {
    path: '/photo/show/:id',
    component: PhotoInfo,
    name: 'photo_show',
    props: true,
    meta: { title: '查看图片' }
  }
]
const router = new VueRouter({
  routes,
  //给当前的路由添加一个类名
  linkActiveClass: 'mui-active'
})

//添加路由导航守卫，用来动态设置标题内容
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
