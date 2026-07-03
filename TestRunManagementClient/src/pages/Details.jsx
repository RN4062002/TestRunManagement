import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTestRuns } from "../context/TestRunContext";
import TestRunDetails from "../components/TestRunDetails";

export default function Details() {
  const { id } = useParams();
  const { fetchTestRunById } = useTestRuns();

  const [testRun, setTestRun] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTestRunById(id);
        setTestRun(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load test run details.");
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [id, fetchTestRunById]);

  return (
    <div className="container py-4" style={{ maxWidth: "720px" }}>
      {/* Back button */}
      <Link to="/" className="btn btn-outline-secondary btn-sm mb-4">
        <i className="bi bi-arrow-left me-1"></i>
        Back to Dashboard
      </Link>

      {/* Error */}
      {error && (
        <div className="alert alert-danger">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading…</span>
          </div>
          <p className="mt-3 text-muted">Loading details…</p>
        </div>
      )}

      {/* Details card */}
      {!loading && !error && <TestRunDetails testRun={testRun} />}
    </div>
  );
}
