namespace TodoApi.DTOs
{
    public class UpdateTodoDto
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public bool? IsComplete { get; set; }
        public DateTime? AllocationTime { get; set; }
    }
}