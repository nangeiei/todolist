<template>
  <header
    class="sm:w-1/2 w-full my-0 mx-auto flex items-center justify-between flex-wrap"
  >
    <h1 class="text-2xl font-semibold flex items-center">
      <ClipboardListIcon class="h-8 w-8 text-green-500" />
      <span class="text-green-500 ml-2">{{ title }}</span>
    </h1>
  </header>
</template>

<script>
import { ClipboardListIcon } from "@heroicons/vue/outline";

export default {
  name: "Header",
  props: {
    title: String,
  },
  components: {
    ClipboardListIcon,
  },
  computed: {
    homePage() {
      if (this.$route.path === "/") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
