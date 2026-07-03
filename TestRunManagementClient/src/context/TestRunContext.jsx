import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import {
  getAllTestRuns,
  getTestRunById,
  createTestRun,
  updateTestRun,
  deleteTestRun,
} from "../services/testRunApi";

// ── Context ──────────────────────────────────────────
const TestRunContext = createContext(null);

// ── Custom hook ──────────────────────────────────────
export function useTestRuns() {
  const ctx = useContext(TestRunContext);
  if (!ctx) {
    throw new Error("useTestRuns must be used within a TestRunProvider");
  }
  return ctx;
}

// ── Provider ─────────────────────────────────────────
export function TestRunProvider({ children }) {
  // ── Core data state ──────────────────────────────
  const [testRuns, setTestRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Filter / Search ──────────────────────────────
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // ── Pagination ───────────────────────────────────
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // ── Fetch all ────────────────────────────────────
  const fetchTestRuns = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getAllTestRuns();
      setTestRuns(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load test runs.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestRuns();
  }, [fetchTestRuns]);

  // ── Fetch single by ID ──────────────────────────
  const fetchTestRunById = useCallback(async (id) => {
    const { data } = await getTestRunById(id);
    return data;
  }, []);

  // ── Filtered + Searched + Sorted list ───────────
  const filtered = useMemo(() => {
    let list = [...testRuns];

    if (statusFilter !== "All") {
      list = list.filter((t) => t.status === statusFilter);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter((t) => t.testName.toLowerCase().includes(q));
    }

    list.sort(
      (a, b) => new Date(b.startDateTime) - new Date(a.startDateTime)
    );

    return list;
  }, [testRuns, statusFilter, searchTerm]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, searchTerm]);

  // ── Paginated slice ─────────────────────────────
  const paginatedRuns = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  const handlePageSizeChange = useCallback((newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  }, []);

  // ── CRUD operations ─────────────────────────────
  const handleSave = useCallback(
    async (payload, isEdit) => {
      setError(null);
      try {
        if (isEdit) {
          await updateTestRun(payload.testRunId, payload);
        } else {
          await createTestRun(payload);
        }
        await fetchTestRuns();
      } catch (err) {
        setError(err.response?.data?.message || "Failed to save test run.");
        throw err; // propagate so the form knows
      }
    },
    [fetchTestRuns]
  );

  const handleDelete = useCallback(
    async (testRunId) => {
      setError(null);
      try {
        await deleteTestRun(testRunId);
        await fetchTestRuns();
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete test run.");
      }
    },
    [fetchTestRuns]
  );

  const clearError = useCallback(() => setError(null), []);

  // ── Context value ───────────────────────────────
  const value = useMemo(
    () => ({
      // Data
      testRuns,
      filtered,
      paginatedRuns,
      loading,
      error,

      // Filter / Search
      statusFilter,
      setStatusFilter,
      searchTerm,
      setSearchTerm,

      // Pagination
      currentPage,
      setCurrentPage,
      pageSize,
      handlePageSizeChange,

      // CRUD
      fetchTestRuns,
      fetchTestRunById,
      handleSave,
      handleDelete,
      clearError,
    }),
    [
      testRuns,
      filtered,
      paginatedRuns,
      loading,
      error,
      statusFilter,
      searchTerm,
      currentPage,
      pageSize,
      fetchTestRuns,
      fetchTestRunById,
      handleSave,
      handleDelete,
      handlePageSizeChange,
      clearError,
    ]
  );

  return (
    <TestRunContext.Provider value={value}>
      {children}
    </TestRunContext.Provider>
  );
}
