using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestRunManagement.Mappings;

namespace TestRunManagement.Tests.Helpers
{
    public class AutoMapperProfile:Profile
    {
            public static IMapper GetMapper()
            {
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.AddProfile<MappingProfile>();
                });

                return config.CreateMapper();
            }
    }
}
