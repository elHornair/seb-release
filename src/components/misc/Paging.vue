<template>
  <div class="wrapper">
    <div class="wrapper__inner">
      <p class="summary">
        Showing
        {{ " " }}
        <span class="font-medium">{{ paging.firstVisibleItem.value }}</span>
        {{ " " }}
        to
        {{ " " }}
        <span class="font-medium">{{ paging.lastVisibleItem.value }}</span>
        {{ " " }}
        of
        {{ " " }}
        <span class="font-medium">{{ paging.totalItems.value }}</span>
        {{ " " }}
        results
      </p>

      <nav class="nav" aria-label="Pagination">
        <a v-if="paging.prevPage.value !== 0" href="#" class="item item--first">
          <span class="sr-only">Previous</span>
          <div aria-hidden="true">
            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
          </div>
        </a>
        <a v-if="paging.showFirstPage.value" href="#" class="item">1</a>
        <span
          v-if="paging.showFillerAfterFirstPage.value"
          class="item item--filler"
          >...</span
        >
        <a v-if="paging.prevPage.value !== 0" href="#" class="item">{{
          paging.prevPage.value
        }}</a>
        <a href="#" aria-current="page" class="item item--current">{{
          paging.currentPage.value
        }}</a>
        <a v-if="paging.nextPage.value !== 0" href="#" class="item">{{
          paging.nextPage.value
        }}</a>
        <span
          v-if="paging.showFillerBeforeLastPage.value"
          class="item item--filler"
          >...</span
        >
        <a v-if="paging.showLastPage.value" href="#" class="item">{{
          paging.totalPages.value
        }}</a>
        <a v-if="paging.nextPage.value !== 0" href="#" class="item item--last">
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
import { useInstitutions } from "@/composables/institution/useInstitutions";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/solid";

export default {
  name: "Paging",
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
  },
  setup() {
    const { paging } = useInstitutions();

    return {
      paging,
    };
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
