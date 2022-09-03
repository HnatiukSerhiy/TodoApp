namespace Server.TodoTests.JsonObjectModels;

public class ResponseModel<T> where T : class
{
    public HttpResponseMessage ResponseMessage { get; set; }
    public T Json { set; get; }
}