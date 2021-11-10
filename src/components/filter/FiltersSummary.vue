<template>
  <div>
    <Disclosure v-if="hasActiveFilters" v-slot="{ open }">
      <div class="flex mb-2">
        <span class="label">
          <span aria-hidden="true">
            <FilterIcon class="icon"></FilterIcon
          ></span>
          {{ activeFiltersLabel }}
        </span>
        <button class="button" @click="removeAllFilters">
          Remove all <span class="sr-only">filters</span>
        </button>
        <DisclosureButton class="button">
          <span v-if="!open">Show</span>
          <span v-if="open">Hide</span>
          details
          <span v-if="!open" class="sr-only">to remove some filters</span>
        </DisclosureButton>
      </div>
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-out"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <DisclosurePanel class="mb-4">
          <active-filter
            v-for="activeFilter in activeFilters"
            :key="activeFilter.field"
            :field="activeFilter.field"
            :value="activeFilter.value"
            class="mt-2"
          ></active-filter>
        </DisclosurePanel>
      </transition>
    </Disclosure>
  </div>
</template>

<script>
import { useInstitutionFiltering } from "@/composables/institution/useInstitutionFiltering";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { FilterIcon } from "@heroicons/vue/solid";
import ActiveFilter from "@/components/filter/ActiveFilter";

export default {
  name: "FiltersSummary",
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    FilterIcon,
    ActiveFilter,
  },
  setup() {
    const {
      removeAllFilters,
      activeFilters,
      hasActiveFilters,
      activeFiltersLabel,
    } = useInstitutionFiltering();

    return {
      removeAllFilters,
      activeFilters,
      hasActiveFilters,
      activeFiltersLabel,
    };
  },
};
</script>

<style lang="scss" scoped>
.label {
  @apply flex;
  @apply mr-2;
  @apply pr-2;
  @apply border-r border-gray-600;
  @apply text-gray-700;
  @apply font-medium;
}

.icon {
  @apply h-5;
  @apply w-5;
  @apply mt-0.5;
  @apply mr-2;
  @apply text-gray-400;
}

.button {
  @apply text-gray-900;
  @apply border-b;
  @apply border-gray-600;
  @apply mr-2;
}
</style>
