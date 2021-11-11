<template>
  <view-split label-aside="Additional actions for this institution.">
    <template #main>
      <form-institution
        :existing-institution="institutionState"
        @submit="handleSubmit"
      ></form-institution>
    </template>
    <template #aside>
      <div class="panel">
        <h2 class="mb-3">Actions</h2>
        <div class="flex flex-col space-y-2">
          <toggle-institution-status-action
            :id="institutionState.id"
            :active="institutionState.active"
            @institution:change="fetchInstitutionData"
          ></toggle-institution-status-action>
          <action-button
            label="View institution"
            type="link"
            :primary="false"
            :full="true"
            :route-obj="{
              name: 'institution-view',
              params: { id: $route.params.id },
            }"
          >
            <template #icon>
              <SearchIcon class="-ml-1 mr-2 h-5 w-5 text-gray-700"></SearchIcon>
            </template>
          </action-button>
        </div>
      </div>
    </template>
  </view-split>
</template>

<script>
import { SearchIcon } from "@heroicons/vue/solid";
import FormInstitution from "@/components/form/FormInstitution";
import ViewSplit from "@/components/layout/ViewSplit";
import ToggleInstitutionStatusAction from "@/components/institution/ToggleInstitutionStatusAction";
import { useInstitutionAPI } from "@/composables/institution/useInstitutionAPI";
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import ActionButton from "@/components/misc/ActionButton";

export default {
  name: "InstitutionCreate",
  components: {
    ActionButton,
    SearchIcon,
    ToggleInstitutionStatusAction,
    ViewSplit,
    FormInstitution,
  },
  setup() {
    const { readInstitution, updateInstitution } = useInstitutionAPI();
    const router = useRouter();
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

    const handleSubmit = async (formState) => {
      try {
        const response = await updateInstitution(
          formState.id,
          formState.name,
          formState.urlSuffix
        );

        if (!response.id) {
          throw new Error("Unexpected result from server after submit");
        }

        // TODO: maybe also show an alert on that page ("institution successfully created")
        await router.push({
          name: "institution-view",
          params: { id: response.id },
        });
      } catch (error) {
        // TODO: show error message and properly style it
      }
    };

    fetchInstitutionData();

    return {
      institutionState,
      fetchInstitutionData,
      handleSubmit,
    };
  },
};
</script>
