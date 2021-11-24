<template>
  <li>
    <router-link
      class="flex items-center mx-0 my-2 px-6 py-1"
      active-class="bg-primary-800 text-white"
      :to="{ name: route }"
      exact
    >
      {{ displayName }}
    </router-link>
  </li>
</template>

<script>
import { getDisplayNameByRouteName } from "@/router";

export default {
  props: {
    route: {
      type: String,
      required: true,
    },
  },
  computed: {
    displayName() {
      return getDisplayNameByRouteName(this.$props.route);
    },
  },
};
</script>
