using AutoMapper;
using Server.Business.Entities;
using Server.Models;

namespace Server.Mapper;

public class TodoProfile : Profile
{
    public TodoProfile()
    {
        CreateMap<TodoModel, AddTodoInputModel>()
            .ForMember(dest => dest.CategoryId, 
            opt => 
                opt.MapFrom(source => 
                    source.Category == null ? (int?)null : source.Category.Id)).ReverseMap();
        
        CreateMap<TodoModel, UpdateTodoInputModel>()
            .ForMember(dest => dest.CategoryId, 
            opt => 
                opt.MapFrom(source => 
                    source.Category == null ? (int?)null : source.Category.Id)).ReverseMap();
    }
}