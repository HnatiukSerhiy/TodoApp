using AutoMapper;
using Server.Business.Entities;
using Server.Models;

namespace Server.Mapper;

public class CategoryProfile : Profile
{
    public CategoryProfile()
    {
        CreateMap<CategoryModel, AddCategoryInputModel>().ReverseMap();
        CreateMap<CategoryModel, UpdateCategoryInputModel>().ReverseMap();
    }
}