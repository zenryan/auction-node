<template>
  <div v-if="show">
    <div
      class="bg-white text-sm text-gray-500
      px-5 py-2 shadow border border-gray-300
      text-center bg-gray-100"
    >
      <div class="font-bold">{{ item.title }}</div>
      <div class="italic">{{ item.desc }}</div>
    </div>
    <div class="bg-white shadow px-4 pt-4 text-xs text-right text-gray-600">
      <label class="uppercase">current price:</label>
      <div class="">{{ item.bid_price }}</div>
    </div>
    <div class="bg-white shadow px-4 pt-6">
      <div
        class="border focus-within:border-blue-500
        focus-within:text-blue-500 transition-all duration-500 relative rounded p-1"
      >
        <div class="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
          <p>
            <label for="name" class="bg-white text-gray-600 px-1 text-xs"
              >Bid price *</label
            >
          </p>
        </div>
        <p>
          <input
            v-model="form.price"
            autocomplete="false"
            class="py-1 px-1 text-gray-900 outline-none
            block h-full w-full text-right text-xs"
            @focus="$event.target.select()"
          />
        </p>
      </div>
      <div class="py-2">
        <SaveButton
          ref="savebutton"
          class="self-right"
          text="Submit bid"
          @click="submitBid"
          :is-disabled="isDisabled"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SaveButton from './SaveButton.vue';

export default {
  components: {
    SaveButton,
  },
  props: {
    show: {
      type: Boolean,
    },
    item: {
      type: Object,
      default() {
        return {
          bid_price: 0,
        };
      },
    },
  },
  data() {
    return {
      form: {
        price: 100,
      },
      invalidPrice: false,
      isDisabled: true,
    };
  },
  watch: {
    'form.price': function(val) {
      this.checkBid(val);
    },
    'item.price': function() {
      this.form.price = +this.item.bid_price + 100;
    },
  },
  computed: {},
  methods: {
    checkBid(val) {
      this.invalidPrice = Number.isNaN(+val);
      this.isDisabled = this.invalidPrice || +val < +this.item.bid_price;
    },

    submitBid() {
      if (!this.isDisabled) this.$emit('submitBid', this.form.price);
      this.form.price += 100;
    },
  },
};
</script>
