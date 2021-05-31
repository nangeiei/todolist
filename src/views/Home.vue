<template>
  <div class="w-full md:w-1/2 md:my-0 md:mx-auto">
    <TodoItems
      @toggle-reminder="toggleReminder"
      @delete-item="deleteTodo"
      :todoItems="sortedTodos"
      @submit="addTodo"
    />
  </div>
  <Popup ref="popup" />
</template>

<script>
import AddTodo from "../components/AddTodo";
import Popup from "../components/Popup.vue";
import TodoItems from "../components/TodoItems";
import todo from "../modules/Todo";

export default {
  name: "Home",
  data() {
    return {
      todoItems: [],
    };
  },
  components: {
    TodoItems,
    AddTodo,
    Popup,
  },
  computed: {
    sortedTodos() {
      return this.todoItems && this.todoItems.slice().sort((a, b) => b.id - a.id);
    },
  },
  async created() {
    this.todoItems = await this.fetchItems();
  },
  methods: {
    async addTodo() {
      this.todoItems = await this.fetchItems();
      const dialog = this.$refs.popup;
      dialog.open = true;
      await dialog.displayDialog({
        type: "success",
        title: "Successfully added!",
        description: "",
        actions: [
          {
            text: "Ok",
            button: "submit",
            class: "btn-primary",
          },
        ],
      });
      dialog.open = false;
    },
    async deleteTodo(id) {
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
        todo.deleteItem(id).then((res) => {
          if (res && res.status == 200) {
            this.todoItems = this.todoItems.filter((item) => item.id !== id);
            dialog.open = false;
          }
        });
      }
    },
    async toggleReminder(id) {
      const itemToggle = await todo.fetchItem(id);
      const update = { ...itemToggle, reminder: !itemToggle.reminder };

      const { result, error } = await todo.updateItem(id, update);

      if (!error && result) {
        this.todoItems = this.todoItems.map((item) =>
          item.id === id ? { ...item, reminder: result.reminder } : item
        );
      }
    },
    async fetchItems() {
      const { todoItems, error, load } = todo.getItems();

      await load();
      return todoItems;
    },
  },
};
</script>