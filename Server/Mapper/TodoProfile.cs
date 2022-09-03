using AutoMapper;
using Server.Business.Entities;
using Server.Models;

namespace Server.Mapper;

public class TodoProfile : Profile
{
    public TodoProfile()
    {
        CreateMap<TodoModel, AddTodoInputModel>().ReverseMap();
        CreateMap<TodoModel, UpdateTodoInputModel>().ReverseMap();
    }
}