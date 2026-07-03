using AutoMapper;
using Moq;
using FluentAssertions;
using TestRunManagement.Data;
using TestRunManagement.DTOs;
using TestRunManagement.Repositories;
using TestRunManagement.Services;
using TestRunManagement.Tests.Helpers;

namespace TestRunManagement.Tests.Services
{
    public class TestRunServiceTests
    {
        private readonly Mock<ITestRunRepository> _repository;
        private readonly IMapper _mapper;
        private readonly TestRunService _service;

        public TestRunServiceTests()
        {
            _repository = new Mock<ITestRunRepository>();
            _mapper = AutoMapperProfile.GetMapper();
            _service = new TestRunService(_repository.Object, _mapper);
        }

        [Fact]
        public async Task GetAllAsync_ShouldReturnList()
        {
            // Arrange
                 var list = new List<TestRun>
                {
                    new TestRun
                    {
                        TestRunId = 1,
                        TestName = "Smoke Test",
                        Status = "Pending"
                    }
                };

            _repository.Setup(x => x.GetAllAsync(null)).ReturnsAsync(list);

            // Act
            var result = await _service.GetAllAsync(null);

            // Assert
            result.Should().HaveCount(1);
        }

        [Fact]
        public async Task GetById_ShouldReturnObject()
        {
            var entity = new TestRun
            {
                TestRunId = 1,
                TestName = "Smoke Test"
            };

            _repository.Setup(x => x.GetByIdAsync(1)).ReturnsAsync(entity);

            var result = await _service.GetByIdAsync(1);

            result.Should().NotBeNull();
            result!.TestName.Should().Be("Smoke Test");
        }

        [Fact]
        public async Task Create_ShouldReturnCreatedObject()
        {
            var dto = new CreateTestRunDto
            {
                TestName = "Regression",
                ChannelNumber = 1,
                OperatorName = "Rohan",
                Status = "Pending"
            };

            _repository.Setup(x => x.AddAsync(It.IsAny<TestRun>()))
                       .ReturnsAsync(new TestRun
                       {
                           TestRunId = 1,
                           TestName = dto.TestName
                       });

            var result = await _service.CreateAsync(dto);

            result.TestRunId.Should().Be(1);
        }

        [Fact]
        public async Task Update_ShouldReturnTrue()
        {
            var entity = new TestRun
            {
                TestRunId = 1,
                Status = "Pending"
            };

            _repository.Setup(x => x.GetByIdAsync(1)).ReturnsAsync(entity);

            var dto = new UpdateTestRunDto
            {
                Status = "Completed"
            };

            var result = await _service.UpdateAsync(1, dto);

            result.Should().BeTrue();
        }

        [Fact]
        public async Task Delete_ShouldReturnTrue()
        {
            var entity = new TestRun
            {
                TestRunId = 1
            };

            _repository.Setup(x => x.GetByIdAsync(1)).ReturnsAsync(entity);

            var result = await _service.DeleteAsync(1);

            result.Should().BeTrue();
        }
    }
}
