import React, { useState } from "react";
import "./InputForm.css";

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
    <form onSubmit={handleSubmit} className="input-form">
      <div className="input-form-modes">
        <label>
          <input
            type="radio"
            name="mode"
            value="url"
            checked={mode === "url"}
            onChange={() => setMode("url")}
            className="input-form-radio"
          />
          Scan URL
        </label>
        <label className="input-form-radio-label">
          <input
            type="radio"
            name="mode"
            value="code"
            checked={mode === "code"}
            onChange={() => setMode("code")}
            className="input-form-radio"
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
          className="input-form-url"
          required
        />
      ) : (
        <textarea
          placeholder="Paste your HTML/CSS/JS code here"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="input-form-textarea"
          required
        />
      )}
      <button type="submit" disabled={loading} className="input-form-btn">
        {loading ? "Scanning..." : "Scan & Fix"}
      </button>
    </form>
  );
};

export default InputForm;
