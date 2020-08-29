<template>
  <div class="timer">
    <h1 class="text-center">{{ text }}</h1>
    <ul v-if="showTimer">
      <li>
        <span class="text-center">{{ days }}</span
        >Days
      </li>
      <li>
        <span class="text-center">{{ hours }}</span
        >Hours
      </li>
      <li>
        <span class="text-center">{{ minutes }}</span
        >Minutes
      </li>
      <li>
        <span class="text-center">{{ seconds }}</span
        >Seconds
      </li>
    </ul>
  </div>
</template>

<script>
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

export default {
  props: {
    enddate: {
      type: String,
      default() {
        return '';
      },
    },
    text: {
      type: String,
      default() {
        return 'TEST';
      },
    },
    showTimer: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },

  watch: {
    enddate(val) {
      this.startTimer(val);
    },
    deep: true,
  },

  data() {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      countDown: 0,
    };
  },

  methods: {
    startTimer(enddate) {
      this.countDown = new Date(enddate).getTime();
      const x = setInterval(() => {
        const now = new Date().getTime();
        const distance = this.countDown - now;

        this.days = Math.floor(distance / day);
        this.hours = Math.floor((distance % day) / hour);
        this.minutes = Math.floor((distance % hour) / minute);
        this.seconds = Math.floor((distance % minute) / second);

        if (distance < 0 || Number.isNaN(distance)) {
          this.reset();
          clearInterval(x);
          this.$emit('timerEnd');
        }
      }, second);
    },

    reset() {
      this.days = 0;
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
    },
  },
};
</script>

<style>
/* .timer * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
} */

.timer li {
  display: inline-block;
  font-size: 0.5em;
  list-style-type: none;
  padding: 1em;
  text-transform: uppercase;
}

.timer li span {
  display: block;
  font-size: 1.5rem;
}
</style>
