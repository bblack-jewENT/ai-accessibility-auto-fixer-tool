import React, { useState } from "react";
import InputForm from "./components/InputForm";
import ViolationList, { Violation } from "./components/ViolationList";
import CodeDiffViewer from "./components/CodeDiffViewer";

export interface FixResult {
  explanation: string;
  fixedHtml: string;
  changes: Array<{
    selector: string;
    issue: string;
    fix: string;
  }>;
}

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [violations, setViolations] = useState<Violation[]>([]);
  const [fixResult, setFixResult] = useState<FixResult | null>(null);
  const [originalHtml, setOriginalHtml] = useState<string>("");

  const handleScan = async (type: "url" | "code", value: string) => {
    setLoading(true);
    setError(null);
    setViolations([]);
    setFixResult(null);
    setOriginalHtml("");
    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, value }),
      });
      if (!res.ok) throw new Error("Scan failed");
      const data = await res.json();
      setViolations(data.violations || []);
      setFixResult(data.fixes || null);
      setOriginalHtml(data.originalHtml || "");
    } catch (e: any) {
      setError(e.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1>AI Accessibility Auto-Fixer Tool</h1>
      <p>
        Scan a public website or paste your code to find and fix accessibility
        issues (WCAG 2.2 A/AA).
      </p>
      <InputForm onScan={handleScan} loading={loading} />
      {error && <div style={{ color: "red", marginTop: 16 }}>{error}</div>}
      {violations.length > 0 && <ViolationList violations={violations} />}
      {fixResult && (
        <div style={{ marginTop: 32 }}>
          <h2>AI Fix Suggestions</h2>
          <p>{fixResult.explanation}</p>
          <CodeDiffViewer original={originalHtml} fixed={fixResult.fixedHtml} />
        </div>
      )}
    </div>
  );
};

export default App;
