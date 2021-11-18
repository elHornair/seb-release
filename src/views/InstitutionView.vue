<template>
  <view-split label-aside="General actions concerning this institution">
    <template #main>
      <p id="info" class="sr-only" aria-hidden="true">
        List of key / value pairs describing this institution
      </p>
      <dl class="panel" aria-describedby="info">
        <div class="item">
          <dt class="term">Name</dt>
          <dd class="details">
            {{ institutionState.name }}
          </dd>
        </div>
        <div class="item">
          <dt class="term">URL Suffix</dt>
          <dd v-if="institutionState.urlSuffix" class="details">
            {{ institutionState.urlSuffix }}
          </dd>
          <dd v-else class="details">
            <span class="sr-only">empty</span><span aria-hidden="true">–</span>
          </dd>
        </div>
        <div class="item">
          <dt class="term">Status</dt>
          <dd class="details">
            <StatusBadge :value="institutionState.active"></StatusBadge>
          </dd>
        </div>
        <div class="item">
          <dt class="term">Logo Image</dt>
          <dd class="details">
            <span class="sr-only">empty</span><span aria-hidden="true">–</span>
          </dd>
        </div>
      </dl>
    </template>
    <template #aside>
      <div class="panel">
        <h2 class="mb-3">Actions</h2>
        <action-button
          v-if="showEditAction"
          label="Edit institution"
          type="link"
          :primary="false"
          :full="true"
          :route-obj="{
            name: 'institution-edit',
            params: { id: $route.params.id },
          }"
        >
        </action-button>
      </div>
    </template>
  </view-split>
</template>

<script>
import { useInstitutionAPI } from "@/composables/institution/useInstitutionAPI";
import { useRoute } from "vue-router";
import { reactive } from "vue";
import { useAccessControl } from "@/composables/useAccessControl";
import ViewSplit from "@/components/layout/ViewSplit";
import ActionButton from "@/components/misc/ActionButton";
import StatusBadge from "@/components/misc/StatusBadge";

export default {
  name: "InstitutionView",
  components: {
    ViewSplit,
    ActionButton,
    StatusBadge,
  },
  setup() {
    const { readInstitution } = useInstitutionAPI();
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
.item {
  @apply pb-3;

  @apply sm:grid;
  @apply sm:grid-cols-3;
  @apply sm:items-start;
  @apply sm:border-b;
  @apply sm:border-gray-200;
  @apply sm:py-3;

  &:last-child {
    @apply sm:border-b-0;
  }
}

.term,
.details {
  @apply relative;
  @apply text-sm;
  @apply text-gray-500;
}

.term {
  @apply font-medium;
  @apply text-gray-900;
}

.details {
  @apply sm:col-span-2;
  @apply pt-1;
  @apply sm:pt-0;
}
</style>
