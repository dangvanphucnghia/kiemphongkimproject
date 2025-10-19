// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";

// ---- ErrorBoundary (khai báo đầy đủ ở đây) ----
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("UI crash:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6">
          <h2 className="text-xl font-bold text-red-600">Render lỗi</h2>
          <pre className="mt-3 p-3 bg-gray-100 rounded">
            {String(this.state.error)}
          </pre>
          <p className="text-sm text-gray-600 mt-2">
            Mở DevTools → Console để xem stacktrace (file/dòng lỗi).
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
// -----------------------------------------------

export default function App() {
  return (
    <ErrorBoundary>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={<div className="p-6">Dashboard placeholder</div>}
          />
        </Routes>
      </Layout>
    </ErrorBoundary>
  );
}
