using MongoDB.Driver;
using TodoApi.Models;

namespace TodoApi.Repositories
{
    public class TodoRepository : ITodoRepository
    {
        private readonly IMongoCollection<Todo> _todos;

        public TodoRepository(IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase("TodoDb");
            _todos = database.GetCollection<Todo>("Todos");
        }

        public async Task<IEnumerable<Todo>> GetAllAsync()
        {
            return await _todos.Find(_ => true).ToListAsync();
        }

        public async Task<Todo?> GetByIdAsync(string id)
        {
            var filter = Builders<Todo>.Filter.Eq(t => t.Id, id);
            return await _todos.Find(filter).FirstOrDefaultAsync();
        }

        public async Task<Todo> CreateAsync(Todo todo)
        {
            await _todos.InsertOneAsync(todo);
            return todo;
        }

        public async Task<bool> UpdateAsync(string id, Todo todo)
        {
            var filter = Builders<Todo>.Filter.Eq(t => t.Id, id);
            var update = Builders<Todo>.Update
                .Set(t => t.Name, todo.Name)
                .Set(t => t.Description, todo.Description)
                .Set(t => t.IsComplete, todo.IsComplete)
                .Set(t => t.AllocationTime, todo.AllocationTime)
                .Set(t => t.UpdatedAt, todo.UpdatedAt);

            var result = await _todos.UpdateOneAsync(filter, update);
            return result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var filter = Builders<Todo>.Filter.Eq(t => t.Id, id);
            var result = await _todos.DeleteOneAsync(filter);
            return result.DeletedCount > 0;
        }
    }
}