using GraphQL;
using Server.Business.Entities;
using Server.Interfaces;

namespace Server.Api.Queries;

public class CategoryQueries
{
    public static List<CategoryModel> GetCategories([FromServices] IDataProviderResolver dataProviderResolver)
    {
        var categoryDataProvider = dataProviderResolver.GetCategoryDataProvider();
        return categoryDataProvider.GetCategories();
    }

    public static CategoryModel GetById([FromServices] IDataProviderResolver dataProviderResolver, int id)
    {
        var categoryDataProvider = dataProviderResolver.GetCategoryDataProvider();
        return categoryDataProvider.GetById(id);
    }
}