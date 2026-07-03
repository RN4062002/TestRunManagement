import { Link } from "react-router-dom";

const BADGE_MAP = {
  Pending: "bg-secondary",
  Running: "bg-primary",
  Passed: "bg-success",
  Failed: "bg-danger",
};

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TestRunTable({ testRuns, startIndex = 0, onEdit, onDelete }) {
  if (!testRuns.length) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-inbox fs-1 text-muted"></i>
        <p className="mt-3 text-muted fs-5">No Test Runs Found</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Test Name</th>
            <th>Operator</th>
            <th>Channel</th>
            <th>Start Date</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {testRuns.map((tr, idx) => (
            <tr key={tr.testRunId}>
              <td className="text-muted">{startIndex + idx + 1}</td>
              <td className="fw-semibold">{tr.testName}</td>
              <td>{tr.operatorName}</td>
              <td>
                <span className="badge bg-light text-dark border">
                  Ch {tr.channelNumber}
                </span>
              </td>
              <td>{formatDate(tr.startDateTime)}</td>
              <td>
                <span className={`badge ${BADGE_MAP[tr.status] || "bg-secondary"}`}>
                  {tr.status}
                </span>
              </td>
              <td>
                <div className="d-flex justify-content-center gap-1 flex-wrap">
                  <Link
                    to={`/details/${tr.testRunId}`}
                    className="btn btn-sm btn-outline-info"
                    title="View Details"
                  >
                    <i className="bi bi-eye"></i>
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-warning"
                    title="Edit Status"
                    onClick={() => onEdit(tr)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    title="Delete"
                    onClick={() => onDelete(tr)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
