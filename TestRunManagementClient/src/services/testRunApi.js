import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://localhost:5192/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Test Run endpoints ──────────────────────────────────────

export const getAllTestRuns = () => api.get("/TestRuns");

export const getTestRunById = (id) => api.get(`/TestRuns/${id}`);

export const createTestRun = (data) => api.post("/TestRuns", data);

export const updateTestRun = (id, data) => api.put(`/TestRuns/${id}`, data);

export const deleteTestRun = (id) => api.delete(`/TestRuns/${id}`);

export default api;
