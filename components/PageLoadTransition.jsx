"use client";

import { useState, useEffect } from "react";

const SPIN_DURATION_MS = 500;

/**
 * Full-page spinning overlay for 0.5s on load, then reveals children.
 * Gives the site a moment to load before the main content and Hero transition.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content to show after spin
 * @returns {JSX.Element}
 * @example
 * <PageLoadTransition>{children}</PageLoadTransition>
 */
export default function PageLoadTransition({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), SPIN_DURATION_MS);
    return () => clearTimeout(t);
  }, []);

  if (!ready) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--project-bg)",
        }}
      >
        <div className="page-load-spinner" />
      </div>
    );
  }

  return <>{children}</>;
}
