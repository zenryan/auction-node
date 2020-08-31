<template>
  <!-- carousel -->
  <div class="carousel relative container mx-auto" style="max-width:1600px;">
    <div class="carousel-inner relative overflow-hidden w-full">
      <!--Slide 1-->
      <input
        class="carousel-open"
        type="radio"
        id="carousel-1"
        name="carousel"
        aria-hidden="true"
        hidden=""
        checked="checked"
      />
      <div class="carousel-item absolute opacity-0" style="height:50vh;">
        <div
          class="block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-right"
          style="background-image: url('https://images.unsplash.com/photo-1422190441165-ec2956dc9ecc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80');"
        >
          <div class="container mx-auto">
            <div
              class="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide"
            >
              <p class="text-black text-xl my-4">
                {{ auction.title }}
              </p>

              <p class="text-gray-500 text-xs my-4">
                {{ auction.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <label
        for="carousel-3"
        class="prev control-1 w-6 h-6 ml-2 md:ml-10 absolute cursor-pointer hidden text-xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 left-0 my-auto"
        >‹</label
      >
      <label
        for="carousel-2"
        class="next control-1 w-6 h-6 mr-2 md:mr-10 absolute cursor-pointer hidden text-xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 right-0 my-auto"
        >›</label
      >
      <!--Slide 2-->
      <input
        class="carousel-open"
        type="radio"
        id="carousel-2"
        name="carousel"
        aria-hidden="true"
        hidden=""
      />
      <div
        class="carousel-item absolute opacity-0 bg-cover bg-right"
        style="height:50vh;"
      >
        <div
          class="block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-right"
          style="background-image: url('https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjM0MTM2fQ&auto=format&fit=crop&w=1600&q=80');"
        >
          <div class="container mx-auto">
            <div
              class="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide"
            >
              <p class="text-black text-2xl my-4">Real Bamboo Wall Clock</p>
              <a
                class="text-xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black"
                href="#"
                >view product</a
              >
            </div>
          </div>
        </div>
      </div>
      <label
        for="carousel-1"
        class="prev control-2 w-6 h-6 ml-2 md:ml-10 absolute cursor-pointer hidden text-xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 left-0 my-auto"
        >‹</label
      >
      <label
        for="carousel-3"
        class="next control-2 w-6 h-6 mr-2 md:mr-10 absolute cursor-pointer hidden text-xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 right-0 my-auto"
        >›</label
      >

      <!--Slide 3-->
      <input
        class="carousel-open"
        type="radio"
        id="carousel-3"
        name="carousel"
        aria-hidden="true"
        hidden=""
      />
      <div class="carousel-item absolute opacity-0" style="height:50vh;">
        <div
          class="block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-bottom"
          style="background-image: url('https://images.unsplash.com/photo-1519327232521-1ea2c736d34d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80');"
        >
          <div class="container mx-auto">
            <div
              class="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide"
            >
              <p class="text-black text-2xl my-4">
                Brown and blue hardbound book
              </p>
              <a
                class="text-xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black"
                href="#"
                >view product</a
              >
            </div>
          </div>
        </div>
      </div>
      <label
        for="carousel-2"
        class="prev control-3 w-6 h-6 ml-2 md:ml-10 absolute cursor-pointer hidden text-xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 left-0 my-auto"
        >‹</label
      >
      <label
        for="carousel-1"
        class="next control-3 w-6 h-6 mr-2 md:mr-10 absolute cursor-pointer hidden text-xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 right-0 my-auto"
        >›</label
      >
      <!-- Add additional indicators for each slide-->
      <ol class="carousel-indicators">
        <li class="inline-block mr-3">
          <label
            for="carousel-1"
            class="carousel-bullet cursor-pointer block text-l text-gray-400 hover:text-gray-900"
            >•</label
          >
        </li>
        <li class="inline-block mr-3">
          <label
            for="carousel-2"
            class="carousel-bullet cursor-pointer block text-l text-gray-400 hover:text-gray-900"
            >•</label
          >
        </li>
        <li class="inline-block mr-3">
          <label
            for="carousel-3"
            class="carousel-bullet cursor-pointer block text-l text-gray-400 hover:text-gray-900"
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

export default {
  components: {
    Timer,
  },
  props: {
    auction: {
      required: true,
    },
  },

  data() {
    return {
      auctionStatus: {
        status: '',
        msg: '',
        timer: '',
      },
    };
  },

  watch: {
    auction() {
      this.auctionStatus = this.getStatus();
    },
  },

  computed: {
    showTimer() {
      return ['STARTED', 'STARTING'].indexOf(this.auctionStatus.status) >= 0;
    },
  },

  methods: {
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
      if (startdate < now && now < enddate) {
        status.status = 'STARTING';
        status.msg = 'Auction starts in';
        status.timer = this.auction.startdate;
      } else if (startdate > now && now < enddate) {
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
  },
};
</script>

<style>
.worksans {
  font-family: 'Work Sans', sans-serif;
}

#menu-toggle:checked + #menu {
  display: block;
}

.hover\:grow {
  transition: all 0.3s;
  transform: scale(1);
}

.hover\:grow:hover {
  transform: scale(1.02);
}

.carousel-open:checked + .carousel-item {
  position: static;
  opacity: 100;
}

.carousel-item {
  -webkit-transition: opacity 0.6s ease-out;
  transition: opacity 0.6s ease-out;
}

#carousel-1:checked ~ .control-1,
#carousel-2:checked ~ .control-2,
#carousel-3:checked ~ .control-3 {
  display: block;
}

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

#carousel-1:checked
  ~ .control-1
  ~ .carousel-indicators
  li:nth-child(1)
  .carousel-bullet,
#carousel-2:checked
  ~ .control-2
  ~ .carousel-indicators
  li:nth-child(2)
  .carousel-bullet,
#carousel-3:checked
  ~ .control-3
  ~ .carousel-indicators
  li:nth-child(3)
  .carousel-bullet {
  color: #000;
  /*Set to match the Tailwind colour you want the active one to be */
}
</style>
