using GraphQL;
using Server.Business.Entities;
using Server.Interfaces;

namespace Server.Api.Queries;

public class TodoQueries
{
    public static List<TodoModel> GetCompleted([FromServices] IDataProviderResolver dataProviderResolver, int? categoryId)
    {
        var todoDataProvider = dataProviderResolver.GetTodoDataProvider();
        return todoDataProvider.GetCompleted(categoryId);
    }

    public static List<TodoModel> GetUnCompleted([FromServices] IDataProviderResolver dataProviderResolver, int? categoryId)
    {
        var todoDataProvider = dataProviderResolver.GetTodoDataProvider();
        return todoDataProvider.GetUnCompleted(categoryId);
    }

    public static TodoModel GetById([FromServices] IDataProviderResolver dataProviderResolver, int id)
    {
        var todoDataProvider = dataProviderResolver.GetTodoDataProvider();
        return todoDataProvider.GetById(id);
    }
}