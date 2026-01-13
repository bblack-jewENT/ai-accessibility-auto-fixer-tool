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
    <div className="violation-list">
      <h2>Accessibility Violations</h2>
      <ul className="violation-list-ul">
        {violations.map((v) => (
          <li key={v.id} className="violation-list-item">
            <strong>Impact:</strong>{" "}
            <span className={`violation-impact violation-impact-${v.impact}`}>
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
                <li key={i} className="violation-node-item">
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
