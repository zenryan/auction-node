<template>
  <div class="flex h-screen dark:bg-gray-900">
    <!-- Desktop sidebar -->
    <aside
      class="gradient z-20 hidden w-64 overflow-y-auto dark:bg-gray-800 xl:block flex-shrink-0"
    >
      <SideBarItem />
    </aside>
    <!-- Mobile sidebar -->
    <!-- Backdrop -->
    <div
      v-show="isSideMenuOpen"
      class="fixed inset-0 z-10 flex items-end bg-opacity-50 sm:items-center sm:justify-center"
    ></div>
    <transition name="slide-fade">
      <aside
        class="gradient fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 xl:hidden"
        v-show="isSideMenuOpen"
        @click="$emit('closeSideMenu')"
        @keydown.escape="$emit('closeSideMenu')"
      >
        <SideBarItem />
      </aside>
    </transition>
  </div>
</template>

<script>
import SideBarItem from './SideBarItem.vue';

export default {
  components: {
    SideBarItem,
  },
  props: ['isSideMenuOpen'],
  data() {
    return {};
  },
  methods: {
    closeSideMenu() {
      this.$emit('closeSideMenu');
    },
  },
};
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-leave-active {
  transition: all 0.7s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-50px);
  opacity: 0;
}
</style>
