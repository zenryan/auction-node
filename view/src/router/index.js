import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/app',
    name: 'Dashboard',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Dashboard.vue'),
    children: [
      {
        path: '',
        name: 'DashboardMain',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '../components/DashboardMain.vue'),
      },
      {
        path: 'item',
        name: 'Item',
        component: () =>
          import(/* webpackChunkName: "item" */ '../components/Item.vue'),
      },
      {
        path: 'item/create',
        name: 'EditItem',
        component: () =>
          import(/* webpackChunkName: "item" */ '../components/EditItem.vue'),
      },
      {
        path: 'auction',
        name: 'Auction',
        component: () =>
          import(/* webpackChunkName: "auction" */ '../components/Auction.vue'),
      },
      {
        path: 'auction/create',
        name: 'EditAuction',
        component: () =>
          import(/* webpackChunkName: "auction" */ '../components/EditAuction.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
