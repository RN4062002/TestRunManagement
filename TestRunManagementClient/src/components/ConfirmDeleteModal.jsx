export default function ConfirmDeleteModal({ show, testRun, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop fade show" onClick={onCancel}></div>

      {/* Modal */}
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">
                <i className="bi bi-exclamation-triangle me-2"></i>
                Confirm Delete
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onCancel}
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <p className="mb-1">
                Are you sure you want to delete the following test run?
              </p>
              {testRun && (
                <div className="alert alert-light border mt-3 mb-0">
                  <strong>{testRun.testName}</strong>
                  <br />
                  <small className="text-muted">
                    Operator: {testRun.operatorName} &bull; Channel:{" "}
                    {testRun.channelNumber}
                  </small>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onCancel}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={onConfirm}>
                <i className="bi bi-trash me-1"></i>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
