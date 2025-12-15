using TodoApi.DTOs;
using TodoApi.Models;
using TodoApi.Repositories;

namespace TodoApi.Services
{
    public class TodoService
    {
        private readonly ITodoRepository _todoRepository;

        public TodoService(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }

        public async Task<IEnumerable<Todo>> GetAllAsync()
        {
            return await _todoRepository.GetAllAsync();
        }

        public async Task<Todo?> GetByIdAsync(string id)
        {
            return await _todoRepository.GetByIdAsync(id);
        }

        public async Task<Todo> CreateAsync(CreateTodoDto createTodoDto)
        {
            var todo = new Todo
            {
                Name = createTodoDto.Name,
                Description = createTodoDto.Description,
                AllocationTime = createTodoDto.AllocationTime,
                IsComplete = false,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            return await _todoRepository.CreateAsync(todo);
        }

        public async Task<bool> UpdateAsync(string id, UpdateTodoDto updateTodoDto)
        {
            var existingTodo = await _todoRepository.GetByIdAsync(id);
            if (existingTodo == null)
                return false;

            // Only update fields that are provided
            if (updateTodoDto.Name != null)
                existingTodo.Name = updateTodoDto.Name;
                
            if (updateTodoDto.Description != null)
                existingTodo.Description = updateTodoDto.Description;

            if (updateTodoDto.IsComplete.HasValue)
                existingTodo.IsComplete = updateTodoDto.IsComplete.Value;
                
            if (updateTodoDto.AllocationTime.HasValue)
                existingTodo.AllocationTime = updateTodoDto.AllocationTime.Value;
                
            // Update the UpdatedAt timestamp
            existingTodo.UpdatedAt = DateTime.UtcNow;

            return await _todoRepository.UpdateAsync(id, existingTodo);
        }

        public async Task<bool> DeleteAsync(string id)
        {
            return await _todoRepository.DeleteAsync(id);
        }
    }
}