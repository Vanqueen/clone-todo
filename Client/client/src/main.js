import { createApp, ref } from 'vue';

createApp({
    setup() {
        const inputValue = ref("");
        const todoArray = ref([]);
        const editingId = ref(null);

        const fetchTodos = async () => {
            const response = await fetch('/api/todos');
            todoArray.value = await response.json();
        };

        const addList = async () => {
            const response = await fetch('/api/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: inputValue.value })
            });
            const newTodo = await response.json();
            todoArray.value.push(newTodo);
            inputValue.value = "";
        };

        const toggle = async (todo) => {
            const response = await fetch(`/api/todos/${todo.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ etat: !todo.etat })
            });
            const updatedTodo = await response.json();
            const index = todoArray.value.findIndex(t => t.id === updatedTodo.id);
            todoArray.value[index] = updatedTodo;
        };

        const modif = (todo) => {
            editingId.value = todo.id;
        };

        const saveModif = async (todo) => {
            const response = await fetch(`/api/todos/${todo.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(todo)
            });
            const updatedTodo = await response.json();
            const index = todoArray.value.findIndex(t => t.id === updatedTodo.id);
            todoArray.value[index] = updatedTodo;
            editingId.value = null;
        };

        const supp = async (todo) => {
            await fetch(`/api/todos/${todo.id}`, { method: 'DELETE' });
            todoArray.value = todoArray.value.filter(t => t.id !== todo.id);
        };

        fetchTodos();

        return { inputValue, todoArray, addList, toggle, modif, saveModif, supp, editingId };
    }
}).mount('#app');
