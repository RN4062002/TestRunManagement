using TestRunManagement.DTOs;

namespace TestRunManagement.Services
{
    public interface ITestRunService
    {
        Task<List<TestRunDto>> GetAllAsync(string? status);

        Task<TestRunDto?> GetByIdAsync(int id);

        Task<TestRunDto> CreateAsync(CreateTestRunDto dto);

        Task<bool> UpdateAsync(int id, UpdateTestRunDto dto);

        Task<bool> DeleteAsync(int id);
    }
}
