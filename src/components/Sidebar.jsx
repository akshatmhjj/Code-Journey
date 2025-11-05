import React from "react";

export default function Sidebar({
  files,
  fileName,
  setFileName,
  saveFile,
  deleteFile,
  downloadCurrent,
  runCode,
  loadFile,
  isSaving,
  autoSave,
  setAutoSave,
  defaultName,
}) {
  return (
    <aside className="bg-[#061827] p-4 rounded-2xl border border-[#0f2736] shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Files</h3>
        <button
          title="Run (Ctrl/Cmd + Enter)"
          onClick={runCode}
          className="px-3 py-1 rounded-md bg-[#0b3b57] text-sm hover:opacity-95"
        >
          Run
        </button>
      </div>

      <div className="space-y-2 max-h-[52vh] overflow-auto mb-4">
        {files.length === 0 && (
          <div className="text-sm text-[#98a7b6]">
            No files yet — start coding or save current.
          </div>
        )}
        {files.map((f) => (
          <div
            key={f.name + f.updatedAt}
            className="flex items-center justify-between gap-2"
          >
            <button
              onClick={() => loadFile(f)}
              className="text-left truncate w-full p-2 rounded-md hover:bg-[#072934]"
            >
              <div className="text-sm font-medium">{f.name}</div>
              <div className="text-xs text-[#8b9aa6]">
                {new Date(f.updatedAt).toLocaleString()}
              </div>
            </button>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setFileName(f.name);
                  loadFile(f);
                }}
                className="p-2 rounded hover:bg-[#072934]"
                title="Open"
              >
                Open
              </button>
              <button
                onClick={() => deleteFile(f.name)}
                className="p-2 rounded hover:bg-[#2b1a1a] text-red-400"
                title="Delete"
              >
                Del
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <input
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder={defaultName()}
          className="w-full bg-[#052933] border border-[#0f2736] px-3 py-2 rounded-md text-sm"
        />
        <div className="flex gap-2">
          <button
            onClick={saveFile}
            disabled={isSaving}
            className="flex-1 px-3 py-2 rounded-md bg-[#0b5b79]"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={downloadCurrent}
            className="px-3 py-2 rounded-md bg-[#0b3b57]"
          >
            Download
          </button>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={autoSave}
            onChange={(e) => setAutoSave(e.target.checked)}
          />{" "}
          Auto-save
        </label>
        <div className="text-xs text-[#8b9aa6]">
          Shortcuts: <strong>Ctrl/Cmd+S</strong> save,{" "}
          <strong>Ctrl/Cmd+Enter</strong> run
        </div>
      </div>
    </aside>
  );
}
