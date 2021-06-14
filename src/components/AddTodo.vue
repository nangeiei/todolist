<template>
  <h1
    v-if="populateWith.empty"
    class="text-lg font-medium mb-5 uppercase text-skin-base"
  >
    Add Todo
  </h1>
  <form
    :class="[
      !populateWith.empty ? 'p-4 bg-skin-light' : 'w-full',
      {
        'border-l-4 border-skin-base': !populateWith.empty && todoItem.reminder,
      },
    ]"
    @submit.prevent="onSubmit"
  >
    <div
      :class="
        !populateWith.empty
          ? 'flex flex-wrap'
          : 'flex flex-wrap mb-6  bg-skin-light py-8 px-4 rounded-lg shadow-md'
      "
    >
      <div
        v-if="!populateWith.empty"
        @click="close"
        class="
          text-skin-secondary
          inline-flex
          justify-end
          mx-3
          mb-3
          cursor-pointer
          w-full
        "
      >
        <XIcon class="w-6 h-6" />
      </div>
      <div :class="!populateWith.empty ? 'w-full' : 'w-1/2'" class="px-3 mb-6">
        <label
          class="block tracking-wide text-skin-gray text-md font-medium mb-2"
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
          class="block tracking-wide text-skin-gray text-md font-medium mb-2"
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
          <span class="text-skin-gray text-md font-medium"> Set reminder </span>
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
import { XIcon } from "@heroicons/vue/outline";
import Popup from "./Popup";
import { mapActions } from "vuex";

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
    ...mapActions(["addTodo", "updateTodo"]),
    async onSubmit(e) {
      e.preventDefault();
      if (this.todoItem.title !== "" && this.todoItem.day !== "") {
        if (this.populateWith.empty) {
          const res = await this.addTodo(this.todoItem);
          if (res == "201") {
            this.openDialog("Successfully Added!");
          }
          this.clearForm();
          this.close();
        } else {
          const res = await this.updateTodo(this.todoItem);
          if (res == "201") {
            this.openDialog("Successfully Edited!");
          }
          this.close();
        }
      }
    },
    async openDialog(msg) {
      const dialog = this.$refs.popup;
      dialog.open = true;
      await dialog.displayDialog({
        type: "success",
        title: msg,
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
    clearForm() {
      this.todoItem = {
        title: "",
        day: "",
        reminder: false,
      };
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
  emits: ["close", "submit"],
};
</script>
