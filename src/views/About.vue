<template>
  <div class="container card mb-6 w-full md:w-1/2 my-0 mx-auto">
    <h3>Version 1.0.0</h3>
    <router-link class="flex items-center" to="/">
      <ArrowSmLeftIcon class="h-5 w-5" />
      Go Back</router-link
    >
  </div>
</template>

<script>
import { ArrowSmLeftIcon } from "@heroicons/vue/solid";

export default {
  name: "About",
  components: {
    ArrowSmLeftIcon,
  },
};
</script>
