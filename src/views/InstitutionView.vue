<template>
  <view-split label-aside="General actions concerning this institution">
    <template #main> Hello institution view world </template>
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
import { SearchIcon } from "@heroicons/vue/solid";

export default {
  name: "InstitutionView",
  components: {
    ViewSplit,
    ActionButton,
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
