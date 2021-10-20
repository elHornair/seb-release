<template>
  <view-split label-aside="General actions concerning this institution">
    <template #main>
      <p id="info" class="sr-only" aria-hidden="true">
        List of key / value pairs describing this institution
      </p>
      <dl class="list" aria-describedby="info">
        <div class="list__item">
          <dt class="term">Name</dt>
          <dd class="details">
            {{ institutionState.name }}
          </dd>
        </div>
        <div class="list__item">
          <dt class="term">URL Suffix</dt>
          <dd v-if="institutionState.urlSuffix" class="details">
            {{ institutionState.urlSuffix }}
          </dd>
          <dd v-else class="details">
            <span class="sr-only">empty</span><span aria-hidden="true">–</span>
          </dd>
        </div>
        <div class="list__item">
          <dt class="term">Status</dt>
          <dd class="details">
            <status-batch :active="institutionState.active"></status-batch>
          </dd>
        </div>
        <div class="list__item">
          <dt class="term">Logo Image</dt>
          <dd class="details">
            <span class="sr-only">empty</span><span aria-hidden="true">–</span>
          </dd>
        </div>
      </dl>
    </template>
    <template #aside>
      <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
        <h2 class="mb-3">Actions</h2>
        <action-button
          v-if="showEditAction"
          label="Edit institution"
          type="link"
          :primary="false"
          :route-obj="{
            name: 'institution-edit',
            params: { id: $route.params.id },
          }"
        >
          <template #icon>
            <search-icon class="-ml-1 mr-2 h-5 w-5 text-gray-700"></search-icon>
          </template>
        </action-button>
      </div>
    </template>
  </view-split>
</template>

<script>
import { useAPI } from "@/composables/useAPI";
import { useRoute } from "vue-router";
import { reactive } from "vue";
import { useAccessControl } from "@/composables/useAccessControl";
import ViewSplit from "@/components/layout/ViewSplit";
import ActionButton from "@/components/misc/ActionButton";
import StatusBatch from "@/components/misc/StatusBatch";
import { SearchIcon } from "@heroicons/vue/solid";

export default {
  name: "InstitutionView",
  components: {
    ViewSplit,
    ActionButton,
    StatusBatch,
    SearchIcon,
  },
  setup() {
    const { readInstitution } = useAPI();
    const { availablePrivileges, availableActions, hasBasePrivilege } =
      useAccessControl();
    const route = useRoute();

    const institutionState = reactive({
      id: parseInt(route.params.id),
      name: null,
      urlSuffix: null,
      active: false,
    });

    const fetchInstitutionData = async () => {
      const institutionData = await readInstitution(institutionState.id);

      Object.assign(institutionState, {
        id: institutionData["id"],
        name: institutionData["name"],
        urlSuffix: institutionData["urlSuffix"],
        active: institutionData["active"],
      });
    };

    fetchInstitutionData();

    return {
      institutionState,
      availablePrivileges,
      availableActions,
      hasBasePrivilege,
    };
  },
  computed: {
    showEditAction() {
      return this.hasBasePrivilege(
        this.availablePrivileges.INSTITUTION,
        this.availableActions.MODIFY
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.list {
  @apply bg-white;
  @apply px-4;
  @apply py-5;
  @apply shadow;
  @apply sm:rounded-lg;
  @apply sm:px-6;
}

.list__item {
  @apply pb-5;

  @apply sm:grid;
  @apply sm:grid-cols-3;
  @apply sm:items-start;
  @apply sm:border-b;
  @apply sm:border-gray-200;
  @apply sm:py-5;
}

.term,
.details {
  @apply relative;
  @apply whitespace-nowrap;
  @apply text-sm;
  @apply text-gray-500;
}

.term {
  @apply font-medium;
  @apply text-gray-900;
}
.details {
  @apply sm:col-span-2;
}
</style>
