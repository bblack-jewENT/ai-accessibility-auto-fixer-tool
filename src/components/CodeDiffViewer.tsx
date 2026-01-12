import React from "react";
import MonacoDiffEditor from "@monaco-editor/react";

interface CodeDiffViewerProps {
  original: string;
  fixed: string;
}

const CodeDiffViewer: React.FC<CodeDiffViewerProps> = ({ original, fixed }) => {
  return (
    <div style={{ marginTop: 24 }}>
      <h3>Code Diff (Original vs Fixed)</h3>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 6,
          overflow: "hidden",
        }}
      >
        <MonacoDiffEditor
          height="400px"
          language="html"
          original={original}
          modified={fixed}
          options={{
            readOnly: true,
            renderSideBySide: true,
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
          }}
        />
      </div>
      <div style={{ marginTop: 12 }}>
        <button
          onClick={() => {
            navigator.clipboard.writeText(fixed);
          }}
          style={{ marginRight: 16, padding: "6px 18px", fontSize: 15 }}
        >
          Copy Fixed Code
        </button>
        <a
          href={`data:text/html;charset=utf-8,${encodeURIComponent(fixed)}`}
          download="fixed.html"
          style={{
            padding: "6px 18px",
            fontSize: 15,
            textDecoration: "none",
            border: "1px solid #aaa",
            borderRadius: 4,
          }}
        >
          Download Fixed HTML
        </a>
      </div>
    </div>
  );
};

export default CodeDiffViewer;
