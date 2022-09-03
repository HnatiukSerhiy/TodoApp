namespace Server.TodoTests.JsonObjectModels;

public class ErrorJsonModel
{
    public string Message { set; get; } = string.Empty;
    public ErrorJsonExtensionsModel Extensions { set; get; }
}