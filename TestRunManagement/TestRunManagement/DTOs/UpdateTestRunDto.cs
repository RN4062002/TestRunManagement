using System.ComponentModel.DataAnnotations;

namespace TestRunManagement.DTOs
{
    public class UpdateTestRunDto
    {
        [Required]
        public string Status { get; set; } = string.Empty;

        public string? Remarks { get; set; }
    }
}
