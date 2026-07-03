using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TestRunManagement.DTOs;
using TestRunManagement.Services;

namespace TestRunManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestRunsController : ControllerBase
    {
        private readonly ITestRunService _service;

        public TestRunsController(ITestRunService service)
        {
            _service = service;
        }

        // GET: api/testruns
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? status)
        {
            var testRuns = await _service.GetAllAsync(status);
            return Ok(testRuns);
        }

        // GET: api/testruns/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var testRun = await _service.GetByIdAsync(id);

            if (testRun == null)
                return NotFound();

            return Ok(testRun);
        }

        // POST: api/testruns
        [HttpPost]
        public async Task<IActionResult> Create(CreateTestRunDto dto)
        {
            var created = await _service.CreateAsync(dto);

            return CreatedAtAction(
                nameof(GetById),
                new { id = created.TestRunId },
                created);
        }

        // PUT: api/testruns/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateTestRunDto dto)
        {
            var updated = await _service.UpdateAsync(id, dto);

            if (!updated)
                return NotFound();

            return NoContent();
        }

        // DELETE: api/testruns/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);

            if (!deleted)
                return NotFound();

            return NoContent();
        }
    }
}
