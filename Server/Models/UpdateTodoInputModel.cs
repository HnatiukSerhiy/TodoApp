using Server.Business.Entities;

namespace Server.Models;

public class UpdateTodoInputModel
{
    public int Id { set; get; }
    public string Description { get; set; } = string.Empty;
    public DateTime? Deadline { get; set; }
    public int CategoryId { set; get; }
}