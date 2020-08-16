<template>
<div class="home">
    <div class="max-w-sm mx-auto flex p-6 bg-white rounded-lg shadow-xl">
        <div class="flex-shrink-0">
            <img class="h-12 w-12" src="../assets/logo.svg" alt="Logo">
        </div>
        <div class="ml-6 pt-1">
            <h4 class="text-xl text-gray-900 leading-tight">ChitChat</h4>
            <p class="text-base text-gray-600 leading-normal">You have a new message!</p>
        </div>
    </div>

    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" />
</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
};
</script>
