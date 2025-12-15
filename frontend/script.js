// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// DOM Elements
let todoForm, newTodoInput, todoDescription, allocationTime, todoList, emptyMessage, loadingSpinner, errorMessage, errorText, currentYearElement;
let editModal, editForm, editTodoId, editTodoTitle, editTodoDescription, editAllocationTime, editTodoComplete, closeBtn, saveEditBtn;

// State
let todos = [];

// Initialize the app
document.addEventListener('DOMContentLoaded', async () => {
    // Get DOM elements after DOM is loaded
    todoForm = document.getElementById('todo-form');
    newTodoInput = document.getElementById('new-todo');
    todoDescription = document.getElementById('todo-description');
    allocationTime = document.getElementById('allocation-time');
    todoList = document.getElementById('todo-list');
    emptyMessage = document.getElementById('empty-message');
    loadingSpinner = document.getElementById('loading-spinner');
    errorMessage = document.getElementById('error-message');
    errorText = document.getElementById('error-text');
    currentYearElement = document.getElementById('current-year');
    
    // Edit modal elements
    editModal = document.getElementById('edit-modal');
    editForm = document.getElementById('edit-form');
    editTodoId = document.getElementById('edit-todo-id');
    editTodoTitle = document.getElementById('edit-todo-title');
    editTodoDescription = document.getElementById('edit-todo-description');
    editAllocationTime = document.getElementById('edit-allocation-time');
    editTodoComplete = document.getElementById('edit-todo-complete');
    closeBtn = document.querySelector('.close');
    saveEditBtn = document.getElementById('save-edit-btn');
    
    // Set current year in footer
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    await fetchTodos();
    
    // Event Listeners
    if (todoForm) {
        todoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const todoName = newTodoInput.value.trim();
            if (todoName) {
                createTodo({
                    name: todoName,
                    description: todoDescription.value,
                    allocationTime: allocationTime.value ? new Date(allocationTime.value).toISOString() : null
                });
            }
        });
    }
    
    // Edit form submission
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateTodo(editTodoId.value, {
                name: editTodoTitle.value,
                description: editTodoDescription.value,
                allocationTime: editAllocationTime.value ? new Date(editAllocationTime.value).toISOString() : null,
                isComplete: editTodoComplete.checked
            });
        });
    }
    
    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            if (editModal) {
                editModal.classList.add('hidden');
            }
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (editModal && event.target === editModal) {
            editModal.classList.add('hidden');
        }
    });

    // Close error message when clicking on it
    if (errorMessage) {
        errorMessage.addEventListener('click', function() {
            errorMessage.classList.add('hidden');
        });
    }
});

// Fetch all todos
async function fetchTodos() {
    showLoading();
    
    try {
        const response = await fetch(`${API_BASE_URL}/todo`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        todos = data.data || [];
        renderTodoList();
    } catch (error) {
        console.error('Error fetching todos:', error);
        showError('Failed to load todos: ' + error.message);
    } finally {
        hideLoading();
    }
}

// Create a new todo
async function createTodo(todoData) {
    if (!todoData.name.trim()) return;
    
    const addBtn = document.getElementById('add-btn');
    const originalText = addBtn ? addBtn.textContent : 'Add Todo';
    
    try {
        if (addBtn) {
            addBtn.disabled = true;
            addBtn.textContent = 'Adding...';
        }
        
        const response = await fetch(`${API_BASE_URL}/todo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: todoData.name,
                description: todoData.description || '',
                allocationTime: todoData.allocationTime || null
            }),
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        todos.push(data.data);
        renderTodoList();
        
        // Clear form
        if (newTodoInput) newTodoInput.value = '';
        if (todoDescription) todoDescription.value = '';
        if (allocationTime) allocationTime.value = '';
        
    } catch (error) {
        console.error('Error creating todo:', error);
        showError('Failed to create todo: ' + error.message);
    } finally {
        if (addBtn) {
            addBtn.disabled = false;
            addBtn.textContent = originalText;
        }
    }
}

// Update a todo
async function updateTodo(id, updates) {
    try {
        const response = await fetch(`${API_BASE_URL}/todo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const index = todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            todos[index] = data.data;
            renderTodoList();
        }
        
        // Close modal
        if (editModal) {
            editModal.classList.add('hidden');
        }
    } catch (error) {
        console.error('Error updating todo:', error);
        showError('Failed to update todo: ' + error.message);
    }
}

// Delete a todo
async function deleteTodo(id) {
    if (!confirm('Are you sure you want to delete this todo?')) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/todo/${id}`, {
            method: 'DELETE',
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        todos = todos.filter(todo => todo.id !== id);
        renderTodoList();
    } catch (error) {
        console.error('Error deleting todo:', error);
        showError('Failed to delete todo: ' + error.message);
    }
}

// Open edit modal
function openEditModal(todo) {
    if (!editModal) return;
    
    // Populate form with todo data
    if (editTodoId) editTodoId.value = todo.id;
    if (editTodoTitle) editTodoTitle.value = todo.name;
    if (editTodoDescription) editTodoDescription.value = todo.description || '';
    if (editTodoComplete) editTodoComplete.checked = todo.isComplete;
    
    // Format allocation time for datetime-local input
    if (editAllocationTime) {
        if (todo.allocationTime) {
            // Convert ISO string to local datetime format
            const date = new Date(todo.allocationTime);
            // Format to YYYY-MM-DDTHH:mm
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            editAllocationTime.value = `${year}-${month}-${day}T${hours}:${minutes}`;
        } else {
            editAllocationTime.value = '';
        }
    }
    
    // Show modal
    editModal.classList.remove('hidden');
}

// Render the todo list
function renderTodoList() {
    if (!todoList || !emptyMessage) return;
    
    if (todos.length === 0) {
        emptyMessage.classList.remove('hidden');
        todoList.innerHTML = '';
        todoList.appendChild(emptyMessage);
        return;
    }
    
    emptyMessage.classList.add('hidden');
    
    // Clear the todo list
    todoList.innerHTML = '';
    
    // Add each todo item to the list
    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.className = `todo-item ${todo.isComplete ? 'completed' : ''}`;
        
        // Format dates
        const createdAt = new Date(todo.createdAt);
        const allocationDate = todo.allocationTime ? new Date(todo.allocationTime) : null;
        const updatedAt = new Date(todo.updatedAt);
        
        // Calculate completion time if todo is completed
        let completionInfo = '';
        if (todo.isComplete && todo.updatedAt) {
            const completionTime = Math.round((updatedAt - createdAt) / (1000 * 60)); // Minutes
            if (completionTime < 60) {
                completionInfo = `Completed in ${completionTime} min`;
            } else if (completionTime < 1440) { // Less than a day
                const hours = Math.floor(completionTime / 60);
                const minutes = completionTime % 60;
                completionInfo = `Completed in ${hours}h ${minutes}m`;
            } else { // More than a day
                const days = Math.floor(completionTime / 1440);
                completionInfo = `Completed in ${days} day${days > 1 ? 's' : ''}`;
            }
        }
        
        todoItem.innerHTML = `
            <div class="todo-header">
                <div class="todo-content">
                    <div class="todo-checkbox-wrapper">
                        <div class="todo-checkbox ${todo.isComplete ? 'checked' : ''}" 
                             data-id="${todo.id}"
                             data-completed="${todo.isComplete}">
                        </div>
                    </div>
                    <div class="todo-info">
                        <div class="todo-title-text">${escapeHtml(todo.name)}</div>
                        ${todo.description ? `<div class="todo-description">${escapeHtml(todo.description)}</div>` : ''}
                    </div>
                </div>
                <div class="todo-actions">
                    <button class="edit-btn" data-id="${todo.id}">Edit</button>
                    <button class="delete-btn" data-id="${todo.id}">Delete</button>
                </div>
            </div>
            <div class="todo-meta">
                <div class="todo-date">
                    <span>Created: ${formatDate(createdAt)}</span>
                    ${allocationDate ? `<span> | Due: ${formatDate(allocationDate)}</span>` : ''}
                    ${todo.isComplete && completionInfo ? `<span> | ${completionInfo}</span>` : ''}
                </div>
            </div>
        `;
        
        todoList.appendChild(todoItem);
    });
    
    // Add event listeners to checkboxes
    document.querySelectorAll('.todo-checkbox').forEach(checkbox => {
        checkbox.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const isCompleted = this.getAttribute('data-completed') === 'true';
            updateTodo(id, { isComplete: !isCompleted });
        });
    });
    
    // Add event listeners to edit buttons
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const todo = todos.find(t => t.id === id);
            if (todo) {
                openEditModal(todo);
            }
        });
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            deleteTodo(id);
        });
    });
}

// Helper function to escape HTML
function escapeHtml(text) {
    if (!text) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Helper function to format dates
function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Show loading spinner
function showLoading() {
    if (loadingSpinner) {
        loadingSpinner.classList.remove('hidden');
    }
}

// Hide loading spinner
function hideLoading() {
    if (loadingSpinner) {
        loadingSpinner.classList.add('hidden');
    }
}

// Show error message
function showError(message) {
    if (errorText && errorMessage) {
        errorText.textContent = message;
        errorMessage.classList.remove('hidden');
        
        // Hide error after 5 seconds
        setTimeout(() => {
            errorMessage.classList.add('hidden');
        }, 5000);
    }
}