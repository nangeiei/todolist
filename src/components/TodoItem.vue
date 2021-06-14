<template>
  <div
    @dblclick="onToggle(todoItem)"
    :class="[
      todoItem.reminder ? 'border-l-4 border-skin-base' : '',
      'todo-item p-4 bg-skin-light my-3',
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
          class="h-5 w-5 text-gray-500 mr-1 hover:text-gray-700"
          aria-hidden="true"
        />

        <!-- Delete -->
        <TrashIcon
          @click="onDelete(todoItem.id)"
          class="h-5 w-5 items-end text-skin-secondary cursor-pointer"
          aria-hidden="true"
        />
      </div>
    </h3>
    <p class="font-light text-sm py-2">{{ todoItem.day }}</p>
  </div>
  <AddTodo v-else :populateWith="todoItem" @close="onEdit" />
  <Popup ref="popup" />
</template>

<script>
import { PencilAltIcon, TrashIcon } from "@heroicons/vue/outline";
import AddTodo from "./AddTodo";
import Popup from "./Popup";
import { mapActions } from "vuex";

export default {
  name: "TodoItem",
  props: {
    todoItem: {
      type: Object,
      required: true,
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
    Popup,
  },
  methods: {
    ...mapActions(["deleteTodo", "toggleReminder"]),
    onToggle(todo) {
      this.toggleReminder({ ...todo, reminder: !todo.reminder });
    },
    onEdit() {
      this.editing = !this.editing;
    },
    async onDelete(id) {
      const dialog = this.$refs.popup;
      dialog.open = true;
      const ok = await dialog.displayDialog({
        type: "warning",
        title: "Deleting a todo list",
        description: "Are you sure you want to delete this?",
        actions: [
          {
            text: "Yes",
            button: "submit",
            class: "btn-primary",
          },
          {
            text: "No",
            button: "cancel",
            class: "btn-primary-outline",
          },
        ],
      });
      if (ok) {
        this.deleteTodo(id);
      }
    },
  },
  emits: ["toggle-reminder"],
};
</script>
<style scoped>
.todo-item {
  @apply cursor-pointer shadow-md;
}
</style>