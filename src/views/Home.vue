<template>
  <div class="w-full md:w-1/2 md:my-0 md:mx-auto">
    <TodoItems
      :todoItems="todoItems"
    />
  </div>
</template>

<script>
import AddTodo from "../components/AddTodo";
import TodoItems from "../components/TodoItems";
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "Home",
  components: {
    TodoItems,
    AddTodo
  },
  computed: {
    ...mapGetters(['todoItems'])
  },
  methods: {
    ...mapActions(["fetchTodos"])
  },
  created() {
    this.fetchTodos();
  },
};
</script>