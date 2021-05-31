import { reactive, toRefs } from "vue";

const state = reactive({
  error: null,
  todoItems: null,
  result: null,
});
const todo = {
  getItems() {

    const load = async () => {
      try {
        const res = await fetch("api/todoItems");
        state.todoItems = await res.json();
      } catch (e) {
        state.error = e;
      }
    };

    return { ...toRefs(state), load };
  },

  async addItem(item) {
    let result = null;
    let error = null;
    try {
        const res = await fetch("api/todoItems", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(item),
          });
        result = await res.json();
      } catch (e) {
        error = e;
      }

    return { result, error };
  },
  async deleteItem(id){
    const res = await fetch(`api/todoItems/${id}`, {
                method: "DELETE",
              });
    return res;
  },
  async updateItem(id, item) {
    let result = null;
    let error = null;
    try {
        const res = await fetch(`api/todoItems/${id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(item),
        });
        result = await res.json();
      } catch (e) {
        error = e;
      }

    return { result, error };
  },
  async fetchItem(id) {
      const res = await fetch(`api/todoItems/${id}`);
      const data = await res.json();
      return data;
  }

}

export default todo;