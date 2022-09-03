namespace Server.TodoTests.JsonObjectModels;

public class ErrorJsonExtensionsModel
{
    public string Code { set; get; }
    public string[] Codes { set; get; }
    public string Details { set; get; } = string.Empty;
}