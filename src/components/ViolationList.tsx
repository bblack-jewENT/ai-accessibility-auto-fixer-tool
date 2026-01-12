import React from "react";

export interface Violation {
  id: string;
  impact: string;
  description: string;
  help: string;
  nodes: Array<{
    html: string;
    target: string[];
    failureSummary?: string;
  }>;
}

interface ViolationListProps {
  violations: Violation[];
}

const ViolationList: React.FC<ViolationListProps> = ({ violations }) => {
  if (!violations.length) return null;
  return (
    <div style={{ marginTop: 32 }}>
      <h2>Accessibility Violations</h2>
      <ul style={{ paddingLeft: 0, listStyle: "none" }}>
        {violations.map((v) => (
          <li
            key={v.id}
            style={{
              marginBottom: 24,
              border: "1px solid #eee",
              borderRadius: 6,
              padding: 16,
            }}
          >
            <strong>Impact:</strong>{" "}
            <span
              style={{
                color:
                  v.impact === "critical"
                    ? "red"
                    : v.impact === "serious"
                    ? "orange"
                    : "#555",
              }}
            >
              {v.impact}
            </span>
            <br />
            <strong>Description:</strong> {v.description}
            <br />
            <strong>Help:</strong> {v.help}
            <br />
            <strong>Affected Elements:</strong>
            <ul style={{ marginTop: 4 }}>
              {v.nodes.map((n, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: "monospace",
                    fontSize: 13,
                    marginBottom: 2,
                  }}
                >
                  {n.target.join(", ")}
                  <br />
                  {n.failureSummary && (
                    <span style={{ color: "#888" }}>{n.failureSummary}</span>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViolationList;
