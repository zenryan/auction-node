<template>
  <li class="relative px-6 py-3 hover:bg-purple-700 ">
    <span
      v-show="isCurrent"
      class="absolute inset-y-0 left-0 w-1 bg-orange-600 rounded-tr-lg rounded-br-lg"
      aria-hidden="true"
    ></span>
    <router-link
      :to="linkTo"
      class="inline-flex items-center w-full font-semibold transition-colors duration-150
      dark:hover:text-gray-200"
    >
      <slot></slot>
      <span class="ml-4">{{ linkName }}</span>
    </router-link>
  </li>
</template>

<script>
export default {
  props: ['linkTo', 'linkName'],
  data() {
    return {
      isCurrent: false,
    };
  },
  watch: {
    $route(to) {
      this.isCurrent = this.linkTo === to.path;
    },
  },
};
</script>

<style></style>
