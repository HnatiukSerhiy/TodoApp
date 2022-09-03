using Server.Business.Entities;

namespace Server.Models;

public class AddTodoInputModel
{
    public string Description { get; set; } = string.Empty;
    public DateTime? Deadline { get; set; }
    public CategoryModel Category { set; get; } = new();
}