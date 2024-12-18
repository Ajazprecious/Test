// Variables
const newTodoInput = document.getElementById('new-todo');
const todoList = document.getElementById('todo-list');
const itemsLeft = document.getElementById('items-left');
const clearCompletedButton = document.getElementById('clear-completed');
const filters = document.querySelectorAll('.filters button');
const toggleModeButton = document.getElementById('toggle-mode');
let todos = [];

// Add Todo
newTodoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && newTodoInput.value.trim()) {
        todos.push({ text: newTodoInput.value, completed: false });
        newTodoInput.value = '';
        renderTodos();
    }
});

// Render Todos
function renderTodos(filter = 'all') {
    todoList.innerHTML = '';
    let filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    filteredTodos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <span onclick="toggleComplete(${index})">${todo.text}</span>
            <button onclick="deleteTodo(${index})">X</button>
        `;
        todoList.appendChild(li);
    });

    itemsLeft.textContent = `${todos.filter(t => !t.completed).length} items left`;
}

// Toggle Complete
function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}

// Delete Todo
function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}

// Clear Completed
clearCompletedButton.addEventListener('click', () => {
    todos = todos.filter(todo => !todo.completed);
    renderTodos();
});

// Filter Todos
filters.forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.filters .active').classList.remove('active');
        button.classList.add('active');
        renderTodos(button.id.split('-')[1]);
    });
});

// Initial Render
renderTodos();
