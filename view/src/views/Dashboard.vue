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
          <div class="grid grid-cols-12">
            <div class="col-span-12 lg:col-span-8">
              <router-view></router-view>
            </div>
            <div class="col-span-12 lg:col-span-4 h-full p-4 lg:p-4 shadow-lg">
              <Event />
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '../components/SideBar.vue';
import TopMenu from '../components/TopMenu.vue';
import Event from '../components/Event.vue';

export default {
  components: {
    SideBar,
    TopMenu,
    Event,
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
