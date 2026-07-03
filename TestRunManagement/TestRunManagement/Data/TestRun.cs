using System;
using System.Collections.Generic;

namespace TestRunManagement.Data;

public partial class TestRun
{
    public int TestRunId { get; set; }

    public string? TestName { get; set; }

    public int? ChannelNumber { get; set; }

    public string? OperatorName { get; set; }

    public DateTime? StartDateTime { get; set; }

    public string? Status { get; set; }

    public string? Remarks { get; set; }
}
