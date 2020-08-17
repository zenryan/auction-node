<template>
  <div class="about">
    <HomeNav />
    <h1>This is an about page</h1>

    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
import HomeNav from '@/components/HomeNav.vue';

export default {
  components: { HelloWorld, HomeNav },
};
</script>
