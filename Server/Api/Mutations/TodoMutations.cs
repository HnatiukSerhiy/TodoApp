using AutoMapper;
using GraphQL;
using Server.Business.Entities;
using Server.Interfaces;
using Server.Models;

namespace Server.Api.Mutations;

public class TodoMutations
{
    public static TodoModel Add(
        [FromServices] IDataProviderResolver dataProviderResolver, 
        [FromServices] IMapper mapper, 
        AddTodoInputModel inputTodoModel
        )
    {
        var todoDataProvider = dataProviderResolver.GetTodoDataProvider();
        
        var todoModel = mapper.Map<TodoModel>(inputTodoModel);
        var id = todoDataProvider.Add(todoModel);
        
        return todoDataProvider.GetById(id);
    }

    public static TodoModel Update(
        [FromServices] IDataProviderResolver dataProviderResolver,
        [FromServices] IMapper mapper,
        UpdateTodoInputModel todoInputModel)
    {
        var todoDataProvider = dataProviderResolver.GetTodoDataProvider();

        var todoModel = mapper.Map<TodoModel>(todoInputModel);
        var id = todoDataProvider.Update(todoModel);
        
        return todoDataProvider.GetById(id);
    }

    public static SolveTodoResponseModel Solve([FromServices] IDataProviderResolver dataProviderResolver, int id)
    {
        var todoDataProvider = dataProviderResolver.GetTodoDataProvider();
        var solvedTodoId = todoDataProvider.Solve(id);
        var todo = todoDataProvider.GetById(solvedTodoId);

        return new SolveTodoResponseModel()
        {
            Id = todo.Id,
            DoneTime = (DateTime) todo.DoneTime!
        };
    }

    public static int Delete([FromServices] IDataProviderResolver dataProviderResolver, int id)
    {
        var todoDataProvider = dataProviderResolver.GetTodoDataProvider();
        return todoDataProvider.Delete(id);
    }
}