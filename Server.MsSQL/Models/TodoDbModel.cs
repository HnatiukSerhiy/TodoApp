namespace Server.MsSQL.Models;

public class TodoDbModel
{
    public int Id { get; set; }
    public string Description { get; set; } = string.Empty;
    public DateTime? Deadline { get; set; }
    public DateTime? DoneTime { get; set; }
    public int? CategoryId { set; get; } = null;
    public bool? IsCompleted { set; get; }
}