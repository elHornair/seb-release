<template>
  <div class="wrapper">
    <div class="wrapper__inner">
      <p class="summary">
        Showing
        {{ " " }}
        <span class="font-medium">1</span>
        {{ " " }}
        to
        {{ " " }}
        <span class="font-medium">10</span>
        {{ " " }}
        of
        {{ " " }}
        <span class="font-medium">97</span>
        {{ " " }}
        results
      </p>

      <nav class="nav" aria-label="Pagination">
        <a href="#" class="item item--first">
          <span class="sr-only">Previous</span>
          <div aria-hidden="true">
            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
          </div>
        </a>
        <a href="#" aria-current="page" class="item item--current">1</a>
        <a href="#" class="item">2</a>
        <span class="item item--filler">...</span>
        <a href="#" class="item">9</a>
        <a href="#" class="item">10</a>
        <a href="#" class="item item--last">
          <span class="sr-only">Next</span>
          <div aria-hidden="true">
            <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
          </div>
        </a>
      </nav>
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/solid";

export default {
  name: "Paging",
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
  },
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

<style lang="scss" scoped>
.wrapper {
  @apply bg-white;
  @apply px-2;
  @apply py-3;
  @apply flex;
  @apply items-center;
  @apply justify-between;
  @apply border-t border-gray-200;
  @apply sm:px-3;
}

.wrapper__inner {
  @apply sm:flex-1;
  @apply sm:flex;
  @apply sm:items-center;
  @apply sm:justify-between;
}

.summary {
  @apply text-sm;
  @apply text-gray-700;
  @apply mb-2;
  @apply sm:mb-0;
}

.nav {
  @apply relative;
  @apply z-0;
  @apply inline-flex;
  @apply -space-x-px;
}

.item {
  @apply bg-white;
  @apply border-gray-300;
  @apply text-gray-500;
  @apply hover:bg-primary-50;
  @apply relative;
  @apply inline-flex;
  @apply items-center;
  @apply px-4;
  @apply py-2;
  @apply border;
  @apply text-sm;
  @apply font-normal;

  &:focus {
    @apply z-10;
  }

  &.item--current {
    @apply z-10;
    @apply bg-primary-50;
    @apply border-primary-500;
    @apply text-primary-600;
    @apply font-medium;
  }

  &.item--filler {
    @apply pointer-events-none;
    @apply hover:bg-white;
  }

  &.item--first {
    @apply rounded-l-sm;
    @apply px-2;
  }

  &.item--last {
    @apply rounded-r-sm;
    @apply px-2;
  }
}
</style>
