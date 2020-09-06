<template>
  <!-- carousel -->
  <div class="carousel relative container mx-auto" style="max-width:1600px;">
    <div class="carousel-inner relative overflow-hidden w-full">
      <div class="carousel-item bg-gray-100" style="height:50vh;">
        <div
          class="block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-contain bg-center bg-no-repeat"
          :style="avatar"
        >
          <div class="container mx-auto">
            <div
              class="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide"
            >
              <p class="text-black text-xl my-4">
                {{ title }}
              </p>

              <p class="text-black text-xs my-4">
                {{ desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <span @click="previous">
        <CarouselArrow direction="left" />
      </span>
      <span @click="next">
        <CarouselArrow direction="right" />
      </span>

      <!-- Add additional indicators for each slide-->
      <ol class="carousel-indicators">
        <li
          v-for="(item, idx) in items"
          v-bind:key="item.id"
          class="inline-block mr-3"
        >
          <label
            for="carousel-2"
            class="carousel-bullet cursor-pointer block
              text-l text-gray-400 hover:text-gray-900"
            :style="choosenIndicator(idx)"
            @click="choosen = idx"
            >•</label
          >
        </li>
      </ol>

      <div class="absolute text-right" style="bottom: 0; right: 0;">
        <Timer
          :enddate="auctionStatus.timer"
          :text="auctionStatus.msg"
          :showTimer="showTimer"
          @timerEnd="onTimerEnd"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Timer from '../ui/Timer.vue';
import CarouselArrow from './CarouselArrow.vue';

export default {
  components: {
    Timer,
    CarouselArrow,
  },
  props: {
    auction: {
      required: true,
    },
    items: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  data() {
    return {
      auctionStatus: {
        status: '',
        msg: '',
        timer: '',
      },
      choosen: 0,
    };
  },

  watch: {
    auction() {
      this.auctionStatus = this.getStatus();
    },
    choosen(idx) {
      this.$emit('itemChanged', idx);
    },
  },

  mounted() {},

  computed: {
    showTimer() {
      return ['STARTED', 'STARTING'].indexOf(this.auctionStatus.status) >= 0;
    },

    title() {
      return this.item ? this.item.title : '';
    },

    desc() {
      return this.item ? this.item.desc : '';
    },

    avatar() {
      const item = this.items[this.choosen];
      return item && item.avatar
        ? `background-image: url("${item.avatar}");`
        : 'background-image: url("https://images.unsplash.com/photo-1422190441165-ec2956dc9ecc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80");';
    },

    item() {
      return this.items[this.choosen];
    },
  },

  methods: {
    prevId(currentIdx) {
      const idx = currentIdx === 0 ? this.items.length - 1 : currentIdx - 1;
      return this.items[idx].id || 0;
    },

    nextId(currentIdx) {
      const idx = currentIdx === this.items.length - 1 ? 0 : currentIdx + 1;
      return this.items[idx].id || 0;
    },

    checked(currentIdx) {
      const a = currentIdx === 0;
      return a;
    },

    getStatus() {
      const status = {
        status: 'ENDED',
        msg: 'Auction has ended',
        timer: '',
      };
      if (!this.auction.startdate || !this.auction.enddate) return status;

      const startdate = new Date(this.auction.startdate);
      const now = new Date();
      const enddate = new Date(this.auction.enddate);

      if (startdate > now && now < enddate) {
        status.status = 'STARTING';
        status.msg = 'Auction starts in';
        status.timer = this.auction.startdate;
      } else if (startdate < now && now < enddate) {
        status.status = 'STARTED';
        status.msg = 'Auction ends in';
        status.timer = this.auction.enddate;
      }

      this.$emit('auctionStatusChanged', status);
      return status;
    },

    onTimerEnd() {
      this.auctionStatus = this.getStatus();
    },

    previous() {
      const idx = this.choosen === 0 ? this.items.length - 1 : this.choosen - 1;
      this.choosen = idx;
    },

    next() {
      const idx = this.choosen === this.items.length - 1 ? 0 : this.choosen + 1;
      this.choosen = idx;
    },

    choosenIndicator(idx) {
      return idx === this.choosen ? { color: 'black' } : null;
    },
  },
};
</script>

<style>
.carousel-indicators {
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 2%;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 10;
}
</style>
