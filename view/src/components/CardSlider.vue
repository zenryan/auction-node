<template>
  <div class="py-6 md:flex-1 md:overflow-x-hidden">
    <div>
      <div>
        <h3 class="text-gray-900 text-xl">{{ title }}</h3>
        <p class="text-gray-600">{{ desc }}</p>
      </div>
      <div class="mt-6 sm:overflow-x-auto sm:overflow-y-hidden">
        <div class="sm:inline-flex sm:pt-2 sm:pb-8">
          <div
            v-for="(item, i) in items"
            v-bind:key="i"
            :class="{ 'mt-10 sm:ml-4': i > 0 }"
            class="sm:mt-0 sm:w-80 sm:flex-shrink-0"
          >
            <ItemCard :item="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCard from './ItemCard.vue';

export default {
  components: {
    ItemCard,
  },
  props: {
    title: {
      required: true,
    },
    desc: {
      required: true,
    },
    items: {
      required: true,
      default: () => [],
    },
  },
};
</script>
