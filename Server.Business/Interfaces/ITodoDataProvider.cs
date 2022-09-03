using Server.Business.Entities;

namespace Server.Business.Interfaces;

public interface ITodoDataProvider
{
    List<TodoModel> GetCompleted(int? categoryId);
    List<TodoModel> GetUnCompleted(int? categoryId);
    TodoModel GetById(int id);
    int Add(TodoModel todoModel);
    int Update(TodoModel todoModel);
    int Solve(int id);
    int Delete(int id);
}