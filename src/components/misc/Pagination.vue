<template>
  <div
    class="
      bg-white
      px-4
      py-3
      flex
      items-center
      justify-between
      border-t border-gray-200
      sm:px-6
    "
  >
    <p class="text-sm text-gray-700">
      Showing page
      {{ " " }}
      <span class="font-medium">{{ currentPage }}</span>
      {{ " " }}
      of
      {{ " " }}
      <span class="font-medium">{{ totalPages }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    currentPage: {
      type: Number,
      default: 0,
    },
    totalPages: {
      type: Number,
      default: 0,
    },
  },
};
</script>
