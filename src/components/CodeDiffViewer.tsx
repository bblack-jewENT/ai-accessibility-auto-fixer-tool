import React from "react";
import MonacoDiffEditor from "@monaco-editor/react";
import "./CodeDiffViewer.css";

interface CodeDiffViewerProps {
  original: string;
  fixed: string;
}

const CodeDiffViewer: React.FC<CodeDiffViewerProps> = ({ original, fixed }) => {
  return (
    <div className="code-diff-viewer">
      <h3>Code Diff (Original vs Fixed)</h3>
      <div className="code-diff-editor">
        <MonacoDiffEditor
          height="400px"
          language="html"
          original={original}
          modified={fixed}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
          }}
        />
      </div>
      <div className="code-diff-actions">
        <button
          onClick={() => {
            navigator.clipboard.writeText(fixed);
          }}
          className="code-diff-copy-btn"
        >
          Copy Fixed Code
        </button>
        <a
          href={`data:text/html;charset=utf-8,${encodeURIComponent(fixed)}`}
          download="fixed.html"
          className="code-diff-download-link"
        >
          Download Fixed HTML
        </a>
      </div>
    </div>
  );
};

export default CodeDiffViewer;
