const BADGE_MAP = {
  Pending: "bg-secondary",
  Running: "bg-primary",
  Passed: "bg-success",
  Failed: "bg-danger",
};

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TestRunDetails({ testRun }) {
  if (!testRun) return null;

  const fields = [
    { label: "Test Run ID", value: testRun.testRunId, icon: "bi-hash" },
    { label: "Test Name", value: testRun.testName, icon: "bi-file-earmark-text" },
    { label: "Channel Number", value: testRun.channelNumber, icon: "bi-broadcast" },
    { label: "Operator Name", value: testRun.operatorName, icon: "bi-person" },
    { label: "Start Date & Time", value: formatDate(testRun.startDateTime), icon: "bi-calendar-event" },
    {
      label: "Status",
      value: (
        <span className={`badge ${BADGE_MAP[testRun.status] || "bg-secondary"} fs-6`}>
          {testRun.status}
        </span>
      ),
      icon: "bi-flag",
    },
    { label: "Remarks", value: testRun.remarks || "—", icon: "bi-chat-left-text" },
  ];

  return (
    <div className="card border-0 shadow">
      <div className="card-header bg-dark text-white d-flex align-items-center gap-2">
        <i className="bi bi-clipboard-data fs-5"></i>
        <h5 className="mb-0">Test Run Details</h5>
      </div>
      <div className="card-body p-0">
        <table className="table table-striped mb-0">
          <tbody>
            {fields.map(({ label, value, icon }) => (
              <tr key={label}>
                <th className="ps-4" style={{ width: "200px" }}>
                  <i className={`bi ${icon} me-2 text-primary`}></i>
                  {label}
                </th>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
