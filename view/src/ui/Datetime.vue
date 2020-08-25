<template>
  <Datetime type="datetime" :value="inputValue" @input="setValue"></Datetime>
</template>

<script>
import { Datetime } from 'vue-datetime';

export default {
  components: {
    Datetime,
  },
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      inputValue: this.value,
    };
  },
  methods: {
    setValue(val) {
      this.$emit('input', val);
    },
  },
};
</script>

<style>
.vdatetime-input {
  width: 100%;
  --text-opacity: 1;
  color: rgba(36, 38, 45, var(--text-opacity));
  line-height: 1.25;
  display: block;
  appearance: none;
}
</style>
