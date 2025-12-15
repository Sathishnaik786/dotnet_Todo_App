namespace TodoApi.DTOs
{
    public class CreateTodoDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime? AllocationTime { get; set; }
    }
}