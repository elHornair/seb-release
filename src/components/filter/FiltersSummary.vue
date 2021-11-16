<template>
  <Disclosure v-slot="{ open }">
    <div class="flex mb-1 text-sm">
      <button class="link mr-2" @click="removeAllFilters">
        Remove all <span class="sr-only">filters</span>
      </button>
      <DisclosureButton class="link mr-2">
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
      <DisclosurePanel class="mb-1">
        <active-filter
          v-for="activeFilter in activeFilters"
          :key="activeFilter.field"
          :field="activeFilter.field"
          :value="activeFilter.value"
          class="my-0.5 sm:mr-1"
        ></active-filter>
      </DisclosurePanel>
    </transition>
  </Disclosure>
</template>

<script>
import { useInstitutionFiltering } from "@/composables/institution/useInstitutionFiltering";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import ActiveFilter from "@/components/filter/ActiveFilter";

export default {
  name: "FiltersSummary",
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    ActiveFilter,
  },
  setup() {
    const { removeAllFilters, activeFilters } = useInstitutionFiltering();

    return {
      removeAllFilters,
      activeFilters,
    };
  },
};
</script>
