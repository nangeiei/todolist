<template>
  <div class="p-4 pt-12 xs:w-3/4 w-full my-0 mx-auto bg-skin-base" :class="theme">
    <Header
      class="mb-8"
      title="todolist"
    />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import { mapGetters } from 'vuex';

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  computed: {
    ...mapGetters(['theme'])
  },
};
</script>

<style lang="scss">
#app {
  color: $text-primary;
}
</style>
