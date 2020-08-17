<template>
  <div class="h-screen w-full flex overflow-hidden">
    <Navigation />

    <main class="pt-2 pb-2 px-10 flex-1 bg-orange-200 dark:bg-black rounded-l-lg
        transition duration-500 ease-in-out overflow-y-auto">
      <router-view></router-view>
    </main>

    <PanelRight />
  </div>
</template>

<script>
import Navigation from '../components/Navigation.vue';
import PanelRight from '../components/PanelRight.vue';

export default {
  components: {
    Navigation,
    PanelRight,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
