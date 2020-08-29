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
    path: '/app3',
    name: 'App3',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/App3.vue'),
  },
  {
    path: '/app2',
    name: 'Dashboard2',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '../views/Dashboard2.vue'),
    children: [
      {
        path: '',
        name: 'DashboardMain2',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '../components/DashboardMain2.vue'
          ),
      },
    ],
  },
  {
    path: '/app',
    name: 'Dashboard',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    children: [
      {
        path: '',
        name: 'DashboardMain',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '../components/DashboardMain.vue'
          ),
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
        path: 'item/edit/:itemId',
        name: 'ShowItem',
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
          import(
            /* webpackChunkName: "auction" */ '../components/EditAuction.vue'
          ),
      },
      {
        path: 'auction/edit/:auctionId',
        name: 'ShowAuction',
        component: () =>
          import(
            /* webpackChunkName: "auction" */ '../components/EditAuction.vue'
          ),
      },
      {
        path: 'bid/:auctionId',
        name: 'Bid',
        component: () =>
          import(/* webpackChunkName: "bid" */ '../components/Bid.vue'),
        children: [
          {
            path: 'mobile',
            name: 'BidMobile',
            component: () =>
              import(
                /* webpackChunkName: "bid" */ '../components/BidMobile.vue'
              ),
          },
          {
            path: 'web',
            name: 'BidWeb',
            component: () =>
              import(/* webpackChunkName: "bid" */ '../components/BidWeb.vue'),
          },
          {
            path: '',
            redirect: 'mobile', // default child path
          },
        ],
      },
    ],
  },
  {
    path: '*',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '../views/NotFound.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
