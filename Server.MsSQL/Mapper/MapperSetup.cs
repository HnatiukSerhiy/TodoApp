using AutoMapper;
using Server.MsSQL.Mapper.Profiles;

namespace Server.MsSQL.Mapper;

public class MapperSetup
{
    public readonly IMapper Mapper;
    
    public MapperSetup()
    {
        var config = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<TodoProfile>();
        });

        Mapper = config.CreateMapper();
    }
}