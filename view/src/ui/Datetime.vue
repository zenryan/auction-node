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
  padding: 0.75rem 1rem;
  margin-bottom: 0.75rem;
  line-height: 1.25;
  display: block;
  border-width: 1px;
  border-radius: 0.25rem;
  border-color: rgba(229, 231, 235, var(--border-opacity));
  appearance: none;
  background-color: #e5e7eb;
  border-color: #e5e7eb;
}
</style>
