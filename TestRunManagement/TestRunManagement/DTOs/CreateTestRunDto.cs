using System.ComponentModel.DataAnnotations;

namespace TestRunManagement.DTOs
{
    public class CreateTestRunDto
    {
        [Required]
        public string TestName { get; set; } = string.Empty;

        [Required]
        public int ChannelNumber { get; set; }

        [Required]
        public string OperatorName { get; set; } = string.Empty;

        [Required]
        public DateTime StartDateTime { get; set; }

        [Required]
        public string Status { get; set; } = string.Empty;

        public string? Remarks { get; set; }
    }
}
