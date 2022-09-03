using Server.Business.Interfaces;

namespace Server.Interfaces;

public interface IDataProviderResolver
{
    public ITodoDataProvider GetTodoDataProvider();
    public ICategoryDataProvider GetCategoryDataProvider();
}