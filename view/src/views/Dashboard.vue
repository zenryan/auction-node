<template>
  <div>
    <div
      class="flex h-screen bg-gray-50 dark:bg-gray-900"
      :class="{ 'overflow-hidden': isSideMenuOpen }"
    >
      <SideBar
        v-on:closeSideMenu="onCloseSideMenu"
        :isSideMenuOpen="isSideMenuOpen"
      />

      <div class="flex flex-col flex-1 w-full">
        <TopMenu v-on:toggleSideMenu="onToggleSideMenu" />
        <main class="gradient h-full overflow-y-auto">
          <router-view></router-view>
        </main>
      </div>

      <Main />
    </div>
  </div>
</template>

<script>
import SideBar from '../components/SideBar.vue';
import TopMenu from '../components/TopMenu.vue';

export default {
  components: {
    SideBar,
    TopMenu,
  },
  data() {
    return {
      isSideMenuOpen: false,
    };
  },
  methods: {
    onCloseSideMenu() {
      this.isSideMenuOpen = false;
    },

    onToggleSideMenu() {
      this.isSideMenuOpen = !this.isSideMenuOpen;
    },
  },
};
</script>

<style>
.gradient {
  background-image: linear-gradient(135deg, #684ca0 35%, #1c4ca0 100%);
}
</style>
