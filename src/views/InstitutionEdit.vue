<template>
  <view-basic>
    <form-institution
      :existing-institution="institutionState"
    ></form-institution>
  </view-basic>
</template>

<script>
import ViewBasic from "@/components/layout/ViewBasic";
import FormInstitution from "@/components/form/FormInstitution";
import { useAPI } from "@/composables/useAPI";
import { reactive } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "InstitutionCreate",
  components: {
    ViewBasic,
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
    };
  },
};
</script>
