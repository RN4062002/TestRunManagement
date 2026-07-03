using AutoMapper;
using TestRunManagement.Data;
using TestRunManagement.DTOs;
using TestRunManagement.Repositories;

namespace TestRunManagement.Services
{
    public class TestRunService: ITestRunService
    {
        private readonly ITestRunRepository _repository;
        private readonly IMapper _mapper;

        public TestRunService(ITestRunRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<List<TestRunDto>> GetAllAsync(string? status)
        {
            var testRuns = await _repository.GetAllAsync(status);

            return _mapper.Map<List<TestRunDto>>(testRuns);
        }

        public async Task<TestRunDto?> GetByIdAsync(int id)
        {
            var testRun = await _repository.GetByIdAsync(id);

            if (testRun == null)
                return null;

            return _mapper.Map<TestRunDto>(testRun);
        }

        public async Task<TestRunDto> CreateAsync(CreateTestRunDto dto)
        {
            var entity = _mapper.Map<TestRun>(dto);

            var created = await _repository.AddAsync(entity);

            return _mapper.Map<TestRunDto>(created);
        }

        public async Task<bool> UpdateAsync(int id, UpdateTestRunDto dto)
        {
            var existing = await _repository.GetByIdAsync(id);

            if (existing == null)
                return false;

            existing.Status = dto.Status;
            existing.Remarks = dto.Remarks;

            await _repository.UpdateAsync(existing);

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var existing = await _repository.GetByIdAsync(id);

            if (existing == null)
                return false;

            await _repository.DeleteAsync(existing);

            return true;
        }
    }
}
