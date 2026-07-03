import { useState, useEffect } from "react";

const STATUSES = ["Pending", "Running", "Passed", "Failed"];

const emptyForm = {
  testName: "",
  channelNumber: "",
  operatorName: "",
  startDateTime: "",
  status: "Pending",
  remarks: "",
};

export default function TestRunForm({ show, onClose, onSave, editData }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const isEditMode = !!editData;

  // Populate form when editing
  useEffect(() => {
    if (editData) {
      setForm({
        testName: editData.testName || "",
        channelNumber: editData.channelNumber || "",
        operatorName: editData.operatorName || "",
        startDateTime: editData.startDateTime
          ? editData.startDateTime.slice(0, 16) // trim for datetime-local input
          : "",
        status: editData.status || "Pending",
        remarks: editData.remarks || "",
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [editData, show]);

  const validate = () => {
    const errs = {};
    if (!isEditMode) {
      if (!form.testName.trim()) errs.testName = "Test Name is required.";
      if (!form.channelNumber || Number(form.channelNumber) < 1)
        errs.channelNumber = "Channel Number must be ≥ 1.";
      if (!form.operatorName.trim())
        errs.operatorName = "Operator Name is required.";
      if (!form.startDateTime)
        errs.startDateTime = "Start Date & Time is required.";
    }
    if (!STATUSES.includes(form.status)) errs.status = "Select a valid status.";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // clear field error on change
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setSaving(true);
    try {
      const payload = isEditMode
        ? {
            ...editData,
            status: form.status,
            remarks: form.remarks,
          }
        : {
            ...form,
            channelNumber: Number(form.channelNumber),
          };

      await onSave(payload, isEditMode);
      setForm(emptyForm);
      onClose();
    } catch {
      // error handled by parent
    } finally {
      setSaving(false);
    }
  };

  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop fade show" onClick={onClose}></div>

      {/* Modal */}
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow">
            <div className={`modal-header ${isEditMode ? "bg-warning" : "bg-primary"} text-white`}>
              <h5 className="modal-title">
                <i className={`bi ${isEditMode ? "bi-pencil-square" : "bi-plus-circle"} me-2`}></i>
                {isEditMode ? "Edit Test Run" : "Add New Test Run"}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {/* ── Full form for Add mode ── */}
                {!isEditMode && (
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Test Name</label>
                      <input
                        type="text"
                        name="testName"
                        className={`form-control ${errors.testName ? "is-invalid" : ""}`}
                        value={form.testName}
                        onChange={handleChange}
                        placeholder="e.g. Smoke Test"
                      />
                      {errors.testName && (
                        <div className="invalid-feedback">{errors.testName}</div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Operator Name</label>
                      <input
                        type="text"
                        name="operatorName"
                        className={`form-control ${errors.operatorName ? "is-invalid" : ""}`}
                        value={form.operatorName}
                        onChange={handleChange}
                        placeholder="e.g. Rohan"
                      />
                      {errors.operatorName && (
                        <div className="invalid-feedback">{errors.operatorName}</div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Channel Number</label>
                      <input
                        type="number"
                        name="channelNumber"
                        className={`form-control ${errors.channelNumber ? "is-invalid" : ""}`}
                        value={form.channelNumber}
                        onChange={handleChange}
                        min="1"
                        placeholder="e.g. 1"
                      />
                      {errors.channelNumber && (
                        <div className="invalid-feedback">{errors.channelNumber}</div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Start Date & Time</label>
                      <input
                        type="datetime-local"
                        name="startDateTime"
                        className={`form-control ${errors.startDateTime ? "is-invalid" : ""}`}
                        value={form.startDateTime}
                        onChange={handleChange}
                      />
                      {errors.startDateTime && (
                        <div className="invalid-feedback">{errors.startDateTime}</div>
                      )}
                    </div>
                  </div>
                )}

                {/* ── Status & Remarks (both modes) ── */}
                <div className={`row g-3 ${!isEditMode ? "mt-1" : ""}`}>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Status</label>
                    <select
                      name="status"
                      className={`form-select ${errors.status ? "is-invalid" : ""}`}
                      value={form.status}
                      onChange={handleChange}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.status && (
                      <div className="invalid-feedback">{errors.status}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Remarks</label>
                    <input
                      type="text"
                      name="remarks"
                      className="form-control"
                      value={form.remarks}
                      onChange={handleChange}
                      placeholder="Optional remarks"
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-1"></span>
                      Saving…
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-lg me-1"></i>
                      {isEditMode ? "Update" : "Save"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
