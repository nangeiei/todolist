<template>
  <AddTodo @submit="$emit('submit')" />
  <!-- divider -->
  <div class="border border-gray-50 my-8 mt-12"></div>
  <h1 class="text-lg font-medium mb-5 uppercase">Todo Lists</h1>
  <div :key="todoItem.id" v-for="todoItem in todoItems">
    <TodoItem
      @toggle-reminder="$emit('toggle-reminder', todoItem.id)"
      @delete-item="$emit('delete-item', todoItem.id)"
      :todoItem="todoItem"
    />
  </div>
</template>

<script>
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";

export default {
  name: "TodoItems",
  props: {
    todoItems: Array,
    editItem: Object,
  },
  components: {
    TodoItem,
    AddTodo,
  },
  methods: {},
  emits: ["delete-item", "toggle-reminder", "submit"],
};
</script>