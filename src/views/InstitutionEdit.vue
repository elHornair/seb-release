<template>
  <view-split label-aside="Additional actions for this institution.">
    <template #main>
      <form-institution
        :existing-institution="institutionState"
      ></form-institution>
    </template>
    <template #aside>
      <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
        <h2 class="mb-3">Actions</h2>
        <toggle-institution-status-action
          :id="institutionState.id"
          :active="institutionState.active"
          @institution:change="fetchInstitutionData"
        ></toggle-institution-status-action>
      </div>
    </template>
  </view-split>
</template>

<script>
import FormInstitution from "@/components/form/FormInstitution";
import ViewSplit from "@/components/layout/ViewSplit";
import { useAPI } from "@/composables/useAPI";
import { reactive } from "vue";
import { useRoute } from "vue-router";
import ToggleInstitutionStatusAction from "@/components/institution/ToggleInstitutionStatusAction";

export default {
  name: "InstitutionCreate",
  components: {
    ToggleInstitutionStatusAction,
    ViewSplit,
    FormInstitution,
  },
  setup() {
    const { readInstitution } = useAPI();
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
      fetchInstitutionData,
    };
  },
};
</script>
