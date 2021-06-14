<template>
  <header
    class="
      sm:w-1/2
      w-full
      my-0
      mx-auto
      flex
      items-center
      justify-between
      flex-wrap
    "
  >
    <h1 class="text-2xl font-semibold flex items-center">
      <ClipboardListIcon class="h-8 w-8 text-skin-primary" />
      <span class="text-skin-primary ml-2">{{ title }}</span>
    </h1>
    <div class="flex w-2/5 justify-between items-center">
      <label class="w-3/4 tracking-wide text-skin-base text-md font-medium">Select Theme</label>
      <select
        class="
          bg-skin-light
          text-skin-gray
        "
        id="grid-state"
        @change="onChangeTheme($event)"
      >
        <option
          v-for="(theme, index) in themeLists"
          :key="index"
          :value="theme.value"
        >
          {{ theme.name }}
        </option>
      </select>
    </div>
  </header>
</template>

<script>
import { ClipboardListIcon } from "@heroicons/vue/outline";
import { mapMutations } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      themeLists: [
        {
          value: "green-theme",
          name: "Green",
        },
        {
          value: "blue-theme",
          name: "Blue",
        },
        {
          value: "dark-theme",
          name: "Dark",
        },
      ],
    };
  },
  props: {
    title: String,
  },
  components: {
    ClipboardListIcon,
  },
  methods: {
    ...mapMutations(["setTheme"]),
    onChangeTheme(event) {
      this.setTheme(event.target.value);
    },
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
