<template>
  <label
    class="control-1 w-6 h-6 absolute
          cursor-pointer text-xl font-bold text-black hover:text-white
          rounded-full bg-white hover:bg-gray-900 leading-tight text-center
          z-10 inset-y-0 my-auto"
    :class="extraClass"
    >{{ arrow }}</label
  >
</template>

<script>
export default {
  props: ['direction'],
  computed: {
    arrow() {
      return this.direction.toLowerCase() === 'left' ? '‹' : '›';
    },
    extraClass() {
      return this.direction.toLowerCase() === 'left'
        ? this.classPrev
        : this.classNext;
    },
  },
  data() {
    return {
      classPrev: 'previous ml-2 md:ml-10 left-0',
      classNext: 'next mr-2 md:mr-10 right-0',
    };
  },
};
</script>
