<template>
  <button
    class="bg-transparent flex py-2 px-4
      text-orange-400 font-semibold rounded border border-orange-500
      hover:text-white hover:border-transparent
      hover:bg-orange-500"
  >
    <Plus class="mr-2" />
    <span>{{ text }}</span>
  </button>
</template>

<script>
import Plus from './svg/Plus.vue';

export default {
  components: {
    Plus,
  },
  props: ['text'],
};
</script>
