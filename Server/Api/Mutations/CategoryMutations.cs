using AutoMapper;
using GraphQL;
using Server.Business.Entities;
using Server.Interfaces;
using Server.Models;

namespace Server.Api.Mutations;

public class CategoryMutations
{
    public static CategoryModel Add(
        [FromServices] IDataProviderResolver dataProviderResolver,
        [FromServices] IMapper mapper,
        AddCategoryInputModel categoryInputModel
        )
    {
        var categoryDataProvider = dataProviderResolver.GetCategoryDataProvider();

        var categoryModel = mapper.Map<CategoryModel>(categoryInputModel);
        int id = categoryDataProvider.Add(categoryModel);
        
        return categoryDataProvider.GetById(id);
    }

    public static CategoryModel Update(
        [FromServices] IDataProviderResolver dataProviderResolver,
        [FromServices] IMapper mapper,
        UpdateCategoryInputModel categoryInputModel
        )
    {
        var categoryDataProvider = dataProviderResolver.GetCategoryDataProvider();
        
        var categoryModel = mapper.Map<CategoryModel>(categoryInputModel);
        int id = categoryDataProvider.Update(categoryModel);
        
        return categoryDataProvider.GetById(id);
    }

    public static int Delete([FromServices] IDataProviderResolver dataProviderResolver, int id)
    {
        var categoryDataProvider = dataProviderResolver.GetCategoryDataProvider();
        return categoryDataProvider.Delete(id);
    }
}