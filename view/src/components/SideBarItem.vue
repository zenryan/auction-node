<template>
  <div class="py-4 text-gray-500 dark:text-gray-400">
    <a class="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="#">
      Windmill
    </a>
    <ul class="mt-6">
      <SideBarListItem link-name="Dashboard" link-to="/app">
        <component :is="homeSvg" />
      </SideBarListItem>
    </ul>
    <ul>
      <SideBarListItem link-name="Auction" link-to="/app/auction">
        <component :is="modalSvg" />
      </SideBarListItem>

      <SideBarListItem link-name="Item" link-to="/app/item">
        <component :is="itemSvg" />
      </SideBarListItem>

      <SideBarListItem link-name="Bid auction" link-to="/app/bid/auction">
        <component :is="mouseClickSvg" />
      </SideBarListItem>

      <SideBarListItem link-name="Bid History" link-to="/app/bid/history">
        <component :is="threeLineSvg" />
      </SideBarListItem>

      <SideBarListItem link-name="Pages" link-to="/app/pages">
        <component :is="pagesSvg" />
      </SideBarListItem>
    </ul>
    <div class="px-6 my-6">
      <button
        class="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
      >
        Create account
        <span class="ml-2" aria-hidden="true">+</span>
      </button>
    </div>
  </div>
</template>

<script>
import SideBarListItem from './SideBarListItem.vue';
import ItemSvg from './svg/Item.vue';
import ModalSvg from './svg/Modal.vue';
import MouseClickSvg from './svg/MouseClick.vue';
import ThreeLineSvg from './svg/ThreeLine.vue';
import PagesSvg from './svg/Pages.vue';
import HomeSvg from './svg/Home.vue';

export default {
  components: {
    SideBarListItem,
    ItemSvg,
    ModalSvg,
    MouseClickSvg,
    ThreeLineSvg,
    PagesSvg,
    HomeSvg,
  },
  data() {
    return {
      itemSvg: 'ItemSvg',
      modalSvg: 'ModalSvg',
      mouseClickSvg: 'MouseClickSvg',
      threeLineSvg: 'ThreeLineSvg',
      pagesSvg: 'PagesSvg',
      homeSvg: 'HomeSvg',
    };
  },
};
</script>

<style></style>
