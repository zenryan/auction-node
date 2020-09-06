<template>
  <div class="p-2">
    <p>
      <label class="bg-gray-300 rounded-full p-2 text-bold text-xs">
        {{ name }}
      </label>
    </p>
    <p class="p-2 text-sm">{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: ['name', 'message'],
};
</script>
