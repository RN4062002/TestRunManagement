const STATUS_OPTIONS = ["All", "Pending", "Running", "Passed", "Failed"];

export default function StatusFilter({ selected, onChange }) {
  return (
    <div className="d-flex align-items-center gap-2">
      <label htmlFor="statusFilter" className="form-label mb-0 fw-semibold text-secondary">
        <i className="bi bi-funnel me-1"></i>Status:
      </label>
      <select
        id="statusFilter"
        className="form-select form-select-sm"
        style={{ width: "160px" }}
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}
