<template>
  <div class="p-2">
    <p>
      <label class="bg-gray-100 rounded-full py-1 px-2 text-bold text-xs">
        {{ name }}
      </label>
    </p>
    <p class="p-2">{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: ['name', 'message'],
};
</script>
