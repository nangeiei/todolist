<template>
  <div class="p-4 pt-12 sm:border mt-8 sm:w-3/4 w-full my-0 mx-auto">
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

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
#app {
  color: $text-primary;
}
</style>
