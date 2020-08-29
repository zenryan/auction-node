<template>
  <div class="gradient text-white min-h-screen flex items-center">
    <div class="container mx-auto p-4 flex flex-wrap items-center">
      <div class="w-full md:w-5/12 text-center p-4">
        <monroe style="max-width: 100%; height: auto;" />
      </div>
      <div class="w-full md:w-7/12 text-center md:text-left p-4">
        <div class="text-6xl font-medium">404</div>
        <div class="text-xl md:text-3xl font-medium mb-4">
          Oops. This page has gone missing.
        </div>
        <div class="text-lg mb-8">
          You may have mistyped the address or the page may have moved.
        </div>
        <a @click="$router.go(-1)">
          <button class="border border-white rounded p-2">Go Back</button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import monroe from '../components/svg/monroe.vue';

export default {
  components: {
    monroe,
  },
};
</script>
<style>
.gradient {
  background-image: linear-gradient(135deg, #684ca0 35%, #1c4ca0 100%);
}
</style>
