import { useMemo } from "react";

const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];

export default function Pagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // Build page number array with ellipsis
  const pages = useMemo(() => {
    const items = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) items.push(i);
    } else {
      items.push(1);

      if (currentPage > 3) items.push("…left");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) items.push(i);

      if (currentPage < totalPages - 2) items.push("…right");

      items.push(totalPages);
    }

    return items;
  }, [currentPage, totalPages]);

  const from = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 px-3 py-3">
      {/* Left: info + page size */}
      <div className="d-flex align-items-center gap-3">
        <small className="text-muted">
          Showing <strong>{from}–{to}</strong> of <strong>{totalItems}</strong>
        </small>

        <div className="d-flex align-items-center gap-1">
          <label htmlFor="pageSize" className="form-label mb-0 small text-muted">
            Rows:
          </label>
          <select
            id="pageSize"
            className="form-select form-select-sm"
            style={{ width: "70px" }}
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            {PAGE_SIZE_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right: page buttons */}
      <nav aria-label="Test runs pagination">
        <ul className="pagination pagination-sm mb-0">
          {/* Previous */}
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous"
            >
              <i className="bi bi-chevron-left"></i>
            </button>
          </li>

          {/* Page numbers */}
          {pages.map((p) =>
            typeof p === "string" ? (
              <li key={p} className="page-item disabled">
                <span className="page-link">…</span>
              </li>
            ) : (
              <li
                key={p}
                className={`page-item ${p === currentPage ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => onPageChange(p)}>
                  {p}
                </button>
              </li>
            )
          )}

          {/* Next */}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
