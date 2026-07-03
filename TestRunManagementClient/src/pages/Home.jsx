import { useState } from "react";
import { useTestRuns } from "../context/TestRunContext";

import StatusFilter from "../components/StatusFilter";
import TestRunTable from "../components/TestRunTable";
import TestRunForm from "../components/TestRunForm";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import Pagination from "../components/Pagination";

export default function Home() {
  // ── Context ─────────────────────────────────────────
  const {
    testRuns,
    filtered,
    paginatedRuns,
    loading,
    error,
    statusFilter,
    setStatusFilter,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    pageSize,
    handlePageSizeChange,
    handleSave,
    handleDelete,
    clearError,
  } = useTestRuns();

  // ── Local UI state (modals) ─────────────────────────
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // ── Delete handler ──────────────────────────────────
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    await handleDelete(deleteTarget.testRunId);
    setDeleteTarget(null);
  };

  // ── Render ──────────────────────────────────────────
  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h2 className="mb-0 fw-bold">
            <i className="bi bi-speedometer2 me-2 text-primary"></i>
            Dashboard
          </h2>
          <small className="text-muted">
            {testRuns.length} total test run{testRuns.length !== 1 ? "s" : ""}
          </small>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => {
            setEditData(null);
            setShowForm(true);
          }}
        >
          <i className="bi bi-plus-lg me-1"></i>
          Add Test Run
        </button>
      </div>

      {/* Error alert */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={clearError}
            aria-label="Close"
          ></button>
        </div>
      )}

      {/* Toolbar: Search + Filter */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body py-3">
          <div className="row g-3 align-items-end">
            <div className="col-md-6">
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Test Name…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setSearchTerm("")}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                )}
              </div>
            </div>
            <div className="col-md-6 d-flex justify-content-md-end">
              <StatusFilter selected={statusFilter} onChange={setStatusFilter} />
            </div>
          </div>
        </div>
      </div>

      {/* Table / Loading / Empty */}
      <div className="card border-0 shadow-sm">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading…</span>
            </div>
            <p className="mt-3 text-muted">Loading test runs…</p>
          </div>
        ) : (
          <>
            <TestRunTable
              testRuns={paginatedRuns}
              startIndex={(currentPage - 1) * pageSize}
              onEdit={(tr) => {
                setEditData(tr);
                setShowForm(true);
              }}
              onDelete={(tr) => setDeleteTarget(tr)}
            />
            {filtered.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalItems={filtered.length}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                onPageSizeChange={handlePageSizeChange}
              />
            )}
          </>
        )}
      </div>

      {/* Add / Edit Modal */}
      <TestRunForm
        show={showForm}
        editData={editData}
        onClose={() => {
          setShowForm(false);
          setEditData(null);
        }}
        onSave={handleSave}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        show={!!deleteTarget}
        testRun={deleteTarget}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
