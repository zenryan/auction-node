<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
a.router-link-exact-active {
  color: #3182ce;
}
</style>

<script>
import 'vue-datetime/dist/vue-datetime.css';

export default {
  components: {},
  data() {
    return {
      loggedIn: false,
    };
  },
};
</script>
