namespace TestRunManagement.DTOs
{
    public class TestRunDto
    {
        public int TestRunId { get; set; }

        public string? TestName { get; set; }

        public int? ChannelNumber { get; set; }

        public string? OperatorName { get; set; }

        public DateTime? StartDateTime { get; set; }

        public string? Status { get; set; }

        public string? Remarks { get; set; }
    }
}
