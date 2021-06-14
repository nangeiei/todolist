import axios from 'axios';

const state = () => ({
	todoItems: [],
	theme: 'green-theme',
});

const getters = {
	todoItems: (state) => state.todoItems,
	theme: (state) => state.theme,
};

const actions = {
	async fetchTodos({ commit }) {
		const response = await axios.get('api/todoItems');
		if (response) {
			const sortData = response.data.sort((a, b) => b.id - a.id);
			commit('setTodos', sortData);
		}
	},
	async addTodo({ commit }, payload) {
		return await axios
			.post('api/todoItems', payload)
			.then((res) => {
				commit('newTodo', res.data);
				return res.status;
			})
			.catch((err) => {
				console.log(err);
			});
	},
	async updateTodo({ commit }, todo) {
		return await axios
			.put(`api/todoItems/${todo.id}`, todo)
			.then((res) => {
				commit('updateTodo', res.data);
				return res.status;
			})
			.catch((err) => {
				console.log(err);
			});
	},
	async deleteTodo({ commit }, id) {
		return await axios
			.delete(`api/todoItems/${id}`)
			.then((res) => {
				commit('deleteTodo', id);
				return res.status;
			})
			.catch((err) => {
				console.log(err);
			});
	},
	async toggleReminder({ commit }, todo) {
		await axios.put(`api/todoItems/${todo.id}`, todo).then((res) => {
			commit('toggleReminder', res.data);
		});
	},
};

const mutations = {
	setTodos: (state, todos) => (state.todoItems = todos),
	newTodo: (state, todo) => state.todoItems.unshift(todo),
	updateTodo: (state, updTodo) => {
		const index = state.todoItems.findIndex(
			(todo) => todo.id === updTodo.id
		);
		if (index !== -1) {
			state.todoItems.splice(index, 1, updTodo).unshift();
		}
	},
	deleteTodo: (state, id) =>
		(state.todoItems = state.todoItems.filter((item) => item.id !== id)),
	toggleReminder: (state, todo) => {
		state.todoItems = state.todoItems.map((item) =>
			item.id === todo.id
				? {
						...item,
						reminder: todo.reminder,
				  }
				: item
		);
	},
	setTheme: (state, theme) => (state.theme = theme),
};

export default {
	state,
	getters,
	actions,
	mutations,
};
