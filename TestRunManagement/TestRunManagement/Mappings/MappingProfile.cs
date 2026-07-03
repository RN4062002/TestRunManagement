using AutoMapper;
using TestRunManagement.Data;
using TestRunManagement.DTOs;

namespace TestRunManagement.Mappings
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<TestRun, TestRunDto>();

            CreateMap<CreateTestRunDto, TestRun>();

            CreateMap<UpdateTestRunDto, TestRun>();
        }
    }
}
