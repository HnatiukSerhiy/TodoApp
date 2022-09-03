namespace Server.Business.Entities;

public class TodoModel
{
    public int Id { get; set; }
    public string Description { get; set; } = string.Empty;
    public DateTime? Deadline { get; set; }
    public DateTime? DoneTime { get; set; }
    public CategoryModel Category { set; get; } = new();
    public bool? IsCompleted { set; get; }
}