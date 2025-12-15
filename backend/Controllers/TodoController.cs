using Microsoft.AspNetCore.Mvc;
using TodoApi.DTOs;
using TodoApi.Models;
using TodoApi.Services;
using TodoApi.Utils;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly TodoService _todoService;

        public TodoController(TodoService todoService)
        {
            _todoService = todoService;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<Todo>>>> GetAll()
        {
            try
            {
                var todos = await _todoService.GetAllAsync();
                return Ok(ApiResponse<IEnumerable<Todo>>.Ok(todos, "Todos retrieved successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<IEnumerable<Todo>>.Fail($"Internal server error: {ex.Message}"));
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<Todo>>> GetById(string id)
        {
            try
            {
                var todo = await _todoService.GetByIdAsync(id);
                if (todo == null)
                {
                    return NotFound(ApiResponse<Todo>.Fail("Todo not found"));
                }
                return Ok(ApiResponse<Todo>.Ok(todo, "Todo retrieved successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<Todo>.Fail($"Internal server error: {ex.Message}"));
            }
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<Todo>>> Create(CreateTodoDto createTodoDto)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(createTodoDto.Name))
                {
                    return BadRequest(ApiResponse<Todo>.Fail("Todo name is required"));
                }

                var todo = await _todoService.CreateAsync(createTodoDto);
                return CreatedAtAction(nameof(GetById), new { id = todo.Id }, ApiResponse<Todo>.Ok(todo, "Todo created successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<Todo>.Fail($"Internal server error: {ex.Message}"));
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<Todo>>> Update(string id, UpdateTodoDto updateTodoDto)
        {
            try
            {
                var updated = await _todoService.UpdateAsync(id, updateTodoDto);
                if (!updated)
                {
                    return NotFound(ApiResponse<Todo>.Fail("Todo not found"));
                }

                var todo = await _todoService.GetByIdAsync(id);
                return Ok(ApiResponse<Todo>.Ok(todo!, "Todo updated successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<Todo>.Fail($"Internal server error: {ex.Message}"));
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> Delete(string id)
        {
            try
            {
                var deleted = await _todoService.DeleteAsync(id);
                if (!deleted)
                {
                    return NotFound(ApiResponse<bool>.Fail("Todo not found"));
                }
                return Ok(ApiResponse<bool>.Ok(true, "Todo deleted successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<bool>.Fail($"Internal server error: {ex.Message}"));
            }
        }
    }
}