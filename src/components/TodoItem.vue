<template>
  <div
    @dblclick="$emit('toggle-reminder', todoItem.id)"
    :class="[
      todoItem.reminder ? 'border-l-4 border-green-400' : '',
      'todo-item p-4 bg-gray-100 my-3',
    ]"
    v-if="!editing"
  >
    <h3 class="flex justify-between">
      <span class="text-lg">{{ todoItem.title }}</span>
      <!-- Right Side Action Icons -->
      <div class="flex items-center">
        <!-- Edit -->
        <PencilAltIcon
          @click="onEdit(todoItem.id)"
          class="h-5 w-5 text-gray-400 mr-1 hover:text-gray-500"
          aria-hidden="true"
        />

        <!-- Delete -->
        <TrashIcon
          @click="onDelete(todoItem.id)"
          class="h-5 w-5 items-end text-red-400 cursor-pointer"
          aria-hidden="true"
        />
      </div>
    </h3>
    <p class="font-light text-sm py-2">{{ todoItem.day }}</p>
  </div>
  <AddTodo v-else :populateWith="todoItem" @close="onEdit" />
</template>

<script>
import { PencilAltIcon, TrashIcon } from "@heroicons/vue/outline";
import AddTodo from "./AddTodo";

export default {
  name: "TodoItem",
  props: {
    todoItem: {
      type: Object,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editing: false,
    };
  },
  components: {
    PencilAltIcon,
    TrashIcon,
    AddTodo,
  },
  methods: {
    onDelete(id) {
      this.$emit("delete-item", id);
    },
    onEdit() {
      this.editing = !this.editing;
    },
  },
  emits: ["toggle-reminder", "delete-item"],
};
</script>
<style scoped>
.todo-item {
  @apply cursor-pointer shadow-md;
}
</style>