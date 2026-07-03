using Microsoft.EntityFrameworkCore;
using TestRunManagement.Data;

namespace TestRunManagement.Repositories
{
    public class TestRunRepository:ITestRunRepository
    {
        private readonly TestRunsDbContext _context;

        public TestRunRepository(TestRunsDbContext context)
        {
            _context = context;
        }

        public async Task<List<TestRun>> GetAllAsync(string? status)
        {
            var query = _context.TestRuns.AsQueryable();

            if (!string.IsNullOrWhiteSpace(status))
            {
                query = query.Where(x => x.Status == status);
            }

            return await query.OrderByDescending(x => x.StartDateTime).ToListAsync();
        }

        public async Task<TestRun?> GetByIdAsync(int id)
        {
            return await _context.TestRuns.FindAsync(id);
        }

        public async Task<TestRun> AddAsync(TestRun testRun)
        {
            _context.TestRuns.Add(testRun);
            await _context.SaveChangesAsync();
            return testRun;
        }

        public async Task UpdateAsync(TestRun testRun)
        {
            _context.TestRuns.Update(testRun);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(TestRun testRun)
        {
            _context.TestRuns.Remove(testRun);
            await _context.SaveChangesAsync();
        }
    }
}
