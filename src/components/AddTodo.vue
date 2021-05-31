<template>
  <h1 v-if="populateWith.empty" class="text-lg font-medium mb-5 uppercase">
    Add Todo
  </h1>
  <form
    :class="[
      !populateWith.empty ? 'p-4 bg-gray-100' : 'w-full',
      {
        'border-l-4 border-green-400': !populateWith.empty && todoItem.reminder,
      },
    ]"
    @submit.prevent="onSubmit"
  >
    <div
      :class="
        !populateWith.empty
          ? 'flex flex-wrap'
          : 'flex flex-wrap mb-6  bg-gray-100 py-8 px-4 rounded-lg shadow-md'
      "
    >
      <div
        v-if="!populateWith.empty"
        @click="close"
        class="text-red-400 inline-flex justify-end mx-3 mb-3 cursor-pointer w-full"
      >
        <XIcon class="w-6 h-6" />
      </div>
      <div :class="!populateWith.empty ? 'w-full' : 'w-1/2'" class="px-3 mb-6">
        <label
          class="block tracking-wide text-gray-600 text-md font-medium mb-2"
          for="grid-first-name"
        >
          Todo Title
        </label>
        <input
          class=""
          id="title"
          type="text"
          placeholder="eg: Dentist Appointment"
          name="title"
          v-model="todoItem.title"
        />
      </div>
      <div
        :class="!populateWith.empty ? 'w-full' : 'w-1/2'"
        class="px-3 mb-6 md:mb-6"
      >
        <label
          class="block tracking-wide text-gray-600 text-md font-medium mb-2"
          for="grid-first-name"
        >
          Date & Time
        </label>
        <input
          class=""
          id="day"
          type="text"
          placeholder="eg: 12 June 2021 at 3:00pm"
          name="day"
          v-model="todoItem.day"
        />
      </div>
      <div :class="!populateWith.empty ? 'w-full' : 'w-1/2'" class="px-3 mb-6">
        <label class="md:w-2/3">
          <input
            class="mr-1"
            id="reminder"
            type="checkbox"
            name="reminder"
            v-model="todoItem.reminder"
          />
          <span class="text-gray-600 text-md font-medium"> Set reminder </span>
        </label>
      </div>
      <div :class="!populateWith.empty ? 'w-full' : 'w-1/2'" class="px-3 mb-6">
        <button class="btn-primary w-full" type="submit">
          {{ loading ? "Submitting..." : "Submit" }}
        </button>
      </div>
    </div>
  </form>
  <Popup ref="popup" />
</template>

<script>
import todo from "../modules/Todo";
import { XIcon } from "@heroicons/vue/outline";
import Popup from "./Popup";

export default {
  name: "AddTodo",
  props: {
    populateWith: {
      type: Object,
      default: () => ({ empty: true }),
    },
  },
  data() {
    return {
      todoItem: {
        title: "",
        day: "",
        reminder: false,
      },
      loading: false,
    };
  },
  components: {
    XIcon,
    Popup,
  },
  methods: {
    clearForm() {
      this.todoItem = {
        title: "",
        day: "",
        reminder: false,
      };
    },
    async onSubmit() {
      if (this.todoItem.title !== "" && this.todoItem.day !== "") {
        if (this.populateWith.empty) {
          const { result, error } = await todo.addItem(this.todoItem);
          if (!error) {
            this.$emit("submit", result);
            this.clearForm();
            this.close();
          }
        } else {
          const payload = {
            title: this.todoItem.title,
            day: this.todoItem.day,
            reminder: this.todoItem.reminder,
          };
          const { result, error } = await todo.updateItem(
            this.todoItem.id,
            payload
          );
          if (!error) {
            const dialog = this.$refs.popup;
            dialog.open = true;
            await dialog.displayDialog({
              type: "success",
              title: "Successfully edited!",
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
            this.close();
          }
        }
      }
    },
    close() {
      this.$emit("close");
    },
  },
  created() {
    if (!this.populateWith.empty) {
      this.todoItem = this.populateWith;
    }
  },
  emits: ["saved-item", "close", "submit"],
};
</script>