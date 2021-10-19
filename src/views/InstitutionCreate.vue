<template>
  <view-basic>
    <form-institution></form-institution>
  </view-basic>
</template>

<script>
import ViewBasic from "@/components/layout/ViewBasic";
import FormInstitution from "@/components/form/FormInstitution";

export default {
  name: "InstitutionCreate",
  components: {
    ViewBasic,
    FormInstitution,
  },
};
</script>
