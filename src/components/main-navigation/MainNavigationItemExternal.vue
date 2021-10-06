<template>
  <li>
    <a
      :href="href"
      class="flex items-center mx-0 my-2 px-6 py-1"
      target="_blank"
    >
      <slot />
    </a>
  </li>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true,
    },
  },
};
</script>
