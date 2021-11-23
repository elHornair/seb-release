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

      <nav v-if="paging.totalPages > 1" class="nav" aria-label="Pagination">
        <button
          v-if="paging.prevPage.value !== 0"
          class="item item--first"
          @click="goToPage(paging.prevPage.value, false)"
        >
          <span class="sr-only">Previous</span>
          <div aria-hidden="true">
            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
          </div>
        </button>
        <button
          v-if="paging.showFirstPage.value"
          class="item"
          @click="goToPage(1)"
        >
          1
        </button>
        <span
          v-if="paging.showFillerAfterFirstPage.value"
          class="item item--filler"
          >...</span
        >
        <button
          v-if="paging.prevPage.value !== 0"
          class="item"
          @click="goToPage(paging.prevPage.value)"
        >
          {{ paging.prevPage.value }}
        </button>
        <button
          ref="currentPageNode"
          aria-current="page"
          class="item item--current"
        >
          {{ paging.currentPage.value }}
        </button>
        <button
          v-if="paging.nextPage.value !== 0"
          class="item"
          @click="goToPage(paging.nextPage.value)"
        >
          {{ paging.nextPage.value }}
        </button>
        <span
          v-if="paging.showFillerBeforeLastPage.value"
          class="item item--filler"
          >...</span
        >
        <button
          v-if="paging.showLastPage.value"
          class="item"
          @click="goToPage(paging.totalPages.value)"
        >
          {{ paging.totalPages.value }}
        </button>
        <button
          v-if="paging.nextPage.value !== 0"
          class="item item--last"
          @click="goToPage(paging.nextPage.value, false)"
        >
          <span class="sr-only">Next</span>
          <div aria-hidden="true">
            <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
          </div>
        </button>
      </nav>
    </div>
  </div>
</template>

<script>
import { useInstitutions } from "@/composables/institution/useInstitutions";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/solid";
import { ref, watch } from "vue";

export default {
  name: "Paging",
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
  },
  setup() {
    const { paging } = useInstitutions();
    const currentPageNode = ref(null);

    const goToPage = (index, focusCurrentPageAfterUpdate = true) => {
      if (focusCurrentPageAfterUpdate) {
        const stopWatching = watch(paging.currentPage, () => {
          currentPageNode.value.focus();
          stopWatching();
        });
      }

      paging.goToPage(index);
    };

    return {
      paging,
      goToPage,
      currentPageNode,
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
  @apply px-2.5;
  @apply py-1;
  @apply border;
  @apply text-sm;
  @apply font-normal;

  &:focus {
    @apply z-20;
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
    @apply px-1;
  }

  &.item--last {
    @apply rounded-r-sm;
    @apply px-1;
  }
}
</style>
