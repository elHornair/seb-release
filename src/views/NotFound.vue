<template>
  <div>
    <alert
      title="Error 404 – Not found"
      message="We couldn't find the page you requested. Is there a type in the URL?"
    ></alert>
  </div>
</template>

<script>
import Alert from "@/components/misc/Alert";
export default {
  name: "NotFound",
  components: { Alert },
};
</script>
