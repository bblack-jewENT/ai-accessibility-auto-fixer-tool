import React, { useState } from "react";

interface InputFormProps {
  onScan: (type: "url" | "code", value: string) => void;
  loading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onScan, loading }) => {
  const [mode, setMode] = useState<"url" | "code">("url");
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onScan(mode, value.trim());
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 32, marginBottom: 32 }}>
      <div style={{ marginBottom: 16 }}>
        <label>
          <input
            type="radio"
            name="mode"
            value="url"
            checked={mode === "url"}
            onChange={() => setMode("url")}
            style={{ marginRight: 8 }}
          />
          Scan URL
        </label>
        <label style={{ marginLeft: 24 }}>
          <input
            type="radio"
            name="mode"
            value="code"
            checked={mode === "code"}
            onChange={() => setMode("code")}
            style={{ marginRight: 8 }}
          />
          Paste Code
        </label>
      </div>
      {mode === "url" ? (
        <input
          type="text"
          placeholder="Enter public website URL (https://...)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ width: "100%", padding: 8, fontSize: 16 }}
          required
        />
      ) : (
        <textarea
          placeholder="Paste your HTML/CSS/JS code here"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ width: "100%", minHeight: 120, padding: 8, fontSize: 16 }}
          required
        />
      )}
      <button
        type="submit"
        disabled={loading}
        style={{ marginTop: 16, padding: "8px 24px", fontSize: 16 }}
      >
        {loading ? "Scanning..." : "Scan & Fix"}
      </button>
    </form>
  );
};

export default InputForm;
