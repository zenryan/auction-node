<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

a.router-link-exact-active {
  color: #3182ce;
}
</style>

<script>
export default {
  components: {},
  data() {
    return {
      loggedIn: false,
    };
  },
};
</script>
