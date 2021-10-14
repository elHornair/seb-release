<template>
  <view-basic>
    <alert
      title="Error 404 – Not found"
      message="We couldn't find the page you requested. Is there a type in the URL?"
    ></alert>
  </view-basic>
</template>

<script>
import Alert from "@/components/misc/Alert";
import ViewBasic from "@/components/layout/ViewBasic";

export default {
  name: "NotFound",
  components: { Alert, ViewBasic },
};
</script>
