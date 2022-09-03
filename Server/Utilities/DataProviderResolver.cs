using Server.Business.Interfaces;
using Server.Interfaces;
using Server.MsSQL.DataProviders;
using Server.XmlStorage.DataProviders;

namespace Server.Utilities;

public class DataProviderResolver : IDataProviderResolver
{
    private readonly IServiceProvider _serviceProvider;

    private static string _dataProviderName = DataProviders.SQL_SERVER;
    public static string DataProviderName
    {
        set
        {
            if (IsValidDataProviderName(value))
            {
                _dataProviderName = value;
            }
        }
        get => _dataProviderName;
    }

    public DataProviderResolver(IServiceProvider serviceProvider)
    {
        this._serviceProvider = serviceProvider;
    }

    public ICategoryDataProvider GetCategoryDataProvider()
    {
        switch (_dataProviderName)
        {
            case DataProviders.SQL_SERVER:
                return _serviceProvider.GetRequiredService<CategorySqlDataProvider>();
            case DataProviders.XML_STORAGE:
                return _serviceProvider.GetRequiredService<CategoryXmlDataProvider>();
        }

        throw new InvalidOperationException();
    }

    public ITodoDataProvider GetTodoDataProvider()
    {
        switch (_dataProviderName)
        {
            case DataProviders.SQL_SERVER:
                return _serviceProvider.GetRequiredService<TodoSqlDataProvider>();
            case DataProviders.XML_STORAGE:
                return _serviceProvider.GetRequiredService<TodoXmlDataProvider>();
        }

        throw new InvalidOperationException();
    }

    private static bool IsValidDataProviderName(string name)
    {
        switch (name)
        {
            case DataProviders.XML_STORAGE:
            case DataProviders.SQL_SERVER:
                return true;
        }

        return false;
    }
}