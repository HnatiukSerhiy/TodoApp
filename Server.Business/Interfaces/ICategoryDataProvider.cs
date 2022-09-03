using Server.Business.Entities;

namespace Server.Business.Interfaces;

public interface ICategoryDataProvider
{
    List<CategoryModel> GetCategories();
    CategoryModel GetById(int id);
    int Add(CategoryModel categoryModel);
    int Update(CategoryModel categoryModel);
    int Delete(int id);
}