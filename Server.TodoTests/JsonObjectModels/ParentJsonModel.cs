namespace Server.TodoTests.Services;

public class ParentJsonModel<T> where T : class, new()
{
    public T Data { set; get; } = new();
}