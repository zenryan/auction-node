<template>
  <span :class="colorStyle">
    {{ text }}
  </span>
</template>

<script>
export default {
  props: ['type'],
  data() {
    return {
      mainClass: 'px-3 py-1 leading-tight rounded-full',
      colors: {
        NOT_ACTIVE: `text-gray-500 bg-gray-300
            dark:text-gray-100 dark:bg-gray-700`,
        ACTIVE: `text-blue-500 bg-blue-300
            dark:text-gray-100 dark:bg-gray-700`,
        FOR_AUCTION: `text-orange-500 bg-orange-300
            dark:text-gray-100 dark:bg-gray-700`,
        ON_AUCTION: `text-red-500 bg-red-300
            dark:text-gray-100 dark:bg-gray-700`,
      },
    };
  },
  computed: {
    colorStyle() {
      console.log(this.type);
      const color = this.colors[this.type];
      return `${this.mainClass} ${color}`;
    },
    text() {
      switch (this.type) {
        case 'NOT_ACTIVE':
          return 'Inactive';
        case 'ACTIVE':
          return 'Active';
        case 'FOR_AUCTION':
          return 'For auction';
        case 'ON_AUCTION':
          return 'On auction';
        default:
          return 'Not Active';
      }
    },
  },
};
</script>
