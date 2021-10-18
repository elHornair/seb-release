<template>
  <button
    type="button"
    class="
      inline-flex
      items-center
      px-4
      py-2
      border border-gray-300
      rounded-md
      shadow-sm
      text-sm
      font-medium
      text-gray-700
      bg-white
      hover:bg-gray-50
      focus:outline-none
      focus:ring-2
      focus:ring-offset-2
      focus:ring-offset-gray-50
      focus:ring-purple-500
    "
  >
    <plus-circle-icon
      class="-ml-1 mr-2 h-5 w-5 text-gray-400"
      aria-hidden="true"
    />
    {{ label }}
  </button>
</template>

<script>
import { PlusCircleIcon } from "@heroicons/vue/solid";

export default {
  name: "AddButton",
  components: { PlusCircleIcon },
  props: {
    label: {
      type: String,
      required: true,
    },
  },
};
</script>
