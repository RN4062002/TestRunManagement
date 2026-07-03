using TestRunManagement.Data;

namespace TestRunManagement.Repositories
{
    public interface ITestRunRepository
    {
        Task<List<TestRun>> GetAllAsync(string? status);

        Task<TestRun?> GetByIdAsync(int id);

        Task<TestRun> AddAsync(TestRun testRun);

        Task UpdateAsync(TestRun testRun);

        Task DeleteAsync(TestRun testRun);

    }
}
