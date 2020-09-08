<template>
  <div class="py-6 xl:flex-1 xl:overflow-x-hidden">
    <div>
      <div class="px-4 xl:px-8">
        <h3 class="text-gray-900 text-xl">{{ title }}</h3>
        <p class="text-gray-600">{{ desc }}</p>
      </div>
      <div class="mt-6 sm:overflow-x-auto sm:overflow-y-hidden">
        <div class="px-4 sm:inline-flex sm:pt-2 sm:pb-8 xl:px-8">
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
      default() {
        return [
          {
            imageUrl:
              'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            length: 42,
            weight: 600,
            rating: 4,
            price: 190000,
            reviewCounts: 199,
          },
          {
            imageUrl:
              'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            length: 42,
            weight: 600,
            rating: 4,
            price: 190000,
            reviewCounts: 199,
          },
        ];
      },
    },
  },
};
</script>

<style></style>
