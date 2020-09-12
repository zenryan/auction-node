<template>
  <div>
    <div class="relative pb-1/6">
      <LightBox :items="itemImages" />
    </div>
    <div class="relative px-4 -mt-16">
      <div class="bg-white rounded-lg px-4 py-4 shadow-lg">
        <h4
          class="mt-1 text-gray-900 font-semibold text-lg cursor-pointer
          hover:bg-gray-200"
          @click="clicked"
        >
          {{ item.title }}
        </h4>
        <div>
          {{ item.desc }}
        </div>
        <div class="flex items-baseline">
          <div
            class="py-2 text-xs text-gray-600 font-semibold uppercase tracking-wide"
          >
            {{ item.startdate }} &bull; {{ item.enddate }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LightBox from './LightBox.vue';

export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          startdate: '',
          enddate: '',
          title: '',
          desc: '',
          auctionItems: [],
        };
      },
    },
  },
  components: {
    LightBox,
  },
  computed: {
    formattedPrice() {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      return formatter.format(this.item.price / 100);
    },

    itemImages() {
      // const img = 'https://i.wifegeek.com/200426/5ce1e1c7.jpg';
      const img = `${process.env.VUE_APP_API_HOST}/images/image-add-fill.jpg`;
      const images = this.item.auctionItems.map((i) => {
        return `${process.env.VUE_APP_API_HOST}/${i.item.avatar}`;
      });

      if (images.length === 0) return [img];
      return images;
    },
  },
  methods: {
    clicked() {
      this.$router.push(`/app/bid/${this.item.id}`);
    },
  },
};
</script>
