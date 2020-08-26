<template>
  <div>
    <!-- PRETTY FILE INPUT HIDDEN -->
    <button
      @click="launchFilePicker"
      class="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-1 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
    >
      <Plus />
    </button>

    <!-- REAL FILE INPUT HIDDEN -->
    <input type="file" style="display:none" ref="file" v-uploader />
  </div>
</template>
<script>
import Plus from './svg/Plus.vue';

export default {
  components: {
    Plus,
  },
  directives: {
    uploader: {
      bind(el, binding, vnode) {
        el.addEventListener('change', (e) => {
          const [file] = e.target.files;
          vnode.context.file = file;
        });
      },
    },
  },
  watch: {
    file(val) {
      this.$emit('file-chosen', val);
    },
  },
  data() {
    return {
      file: '',
    };
  },
  methods: {
    launchFilePicker() {
      this.$refs.file.click();
    },
  },
};
</script>
