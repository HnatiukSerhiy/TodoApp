using AutoMapper;
using Server.Business.Entities;
using Server.MsSQL.Models;

namespace Server.MsSQL.Mapper.Profiles;

public class TodoProfile : Profile
{
    public TodoProfile()
    {
        CreateMap<TodoModel, TodoDbModel>()
            .ForMember(dest => dest.CategoryId, 
                opt => 
                    opt.MapFrom(source => 
                        source.Category == null ? (int?)null : source.Category.Id));
    }
    
}