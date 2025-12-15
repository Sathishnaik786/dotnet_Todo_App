using TodoApi.Models;

namespace TodoApi.Repositories
{
    public interface ITodoRepository
    {
        Task<IEnumerable<Todo>> GetAllAsync();
        Task<Todo?> GetByIdAsync(string id);
        Task<Todo> CreateAsync(Todo todo);
        Task<bool> UpdateAsync(string id, Todo todo);
        Task<bool> DeleteAsync(string id);
    }
}