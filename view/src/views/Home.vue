<template>
  <div class="home">
    <HomeNav />

    <h1>This is an home page</h1>

    <div class="max-w-sm mx-auto flex p-6 bg-white rounded-lg shadow-xl">
      <div class="flex-shrink-0">
        <img class="h-12 w-12" src="../assets/logo.svg" alt="Logo" />
      </div>
      <div class="ml-6 pt-1">
        <h4 class="text-xl text-gray-900 leading-tight">Lets login here</h4>
        <p class="text-base text-gray-600 leading-normal">
          You have a new message!
        </p>
      </div>
    </div>

    <button
      class="bg-transparent hover:bg-blue-500 text-blue-700 mx-auto
            font-semibold hover:text-white py-2 px-4 border border-blue-500
            hover:border-transparent rounded"
      @click="onLogin"
    >
      Login
    </button>
  </div>
</template>

<script>
import HomeNav from '@/components/HomeNav.vue';

export default {
  name: 'Home',
  components: { HomeNav },
  methods: {
    async onLogin() {
      this.$router.push('/app');
    },
  },
};
</script>
