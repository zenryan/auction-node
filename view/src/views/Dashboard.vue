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
        <main class="h-full overflow-y-auto">
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
      console.log('togglesitemenu');
      this.isSideMenuOpen = !this.isSideMenuOpen;
    },
  },
};
</script>
