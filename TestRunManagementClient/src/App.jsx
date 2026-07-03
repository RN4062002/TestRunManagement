import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { TestRunProvider } from "./context/TestRunContext";

// ── Lazy-loaded pages ────────────────────────────────
const Home = lazy(() => import("./pages/Home"));
const Details = lazy(() => import("./pages/Details"));

function PageSpinner() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading page…</span>
        </div>
        <p className="mt-3 text-muted">Loading page…</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <TestRunProvider>
        <div className="d-flex flex-column min-vh-100 bg-light">
          <Navbar />
          <main className="flex-grow-1">
            <Suspense fallback={<PageSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/details/:id" element={<Details />} />
              </Routes>
            </Suspense>
          </main>
          <footer className="py-3 bg-dark text-center text-secondary small">
            © {new Date().getFullYear()} Test Run Manager &mdash; Built with React &amp; Bootstrap
          </footer>
        </div>
      </TestRunProvider>
    </BrowserRouter>
  );
}
