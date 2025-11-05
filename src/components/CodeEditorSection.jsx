import React from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditorSection({
  activeTab,
  html,
  css,
  js,
  setHtml,
  setCss,
  setJs,
  theme,
  consoleLogs,
}) {
  return (
    <section className="bg-[#041827] rounded-2xl p-2 border border-[#0f2736] relative">
      <div className="h-[420px] rounded overflow-hidden">
        <Editor
          height="100%"
          theme={theme}
          language={
            activeTab === "html"
              ? "html"
              : activeTab === "css"
              ? "css"
              : "javascript"
          }
          value={activeTab === "html" ? html : activeTab === "css" ? css : js}
          onChange={(val) => {
            if (activeTab === "html") setHtml(val || "");
            if (activeTab === "css") setCss(val || "");
            if (activeTab === "js") setJs(val || "");
          }}
          options={{
            fontSize: 13,
            minimap: { enabled: false },
            automaticLayout: true,
            wordWrap: "on",
            tabSize: 2,
            insertSpaces: true,
            lineNumbers: "on",
          }}
        />
      </div>

      {/* Console */}
      <div className="mt-3 bg-[#02161f] p-3 rounded text-xs max-h-[140px] overflow-auto border border-[#08303f]">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs text-[#89a6b6]">Console</div>
          <div className="text-xs text-[#89a6b6]">{consoleLogs.length} messages</div>
        </div>
        <div className="space-y-1">
          {consoleLogs.length === 0 && (
            <div className="text-[#6f8a9b]">No console output</div>
          )}
          {consoleLogs.map((c, i) => (
            <div key={i} className="text-[13px] break-words">
              <span
                className={`${
                  c.type === "error"
                    ? "text-red-400"
                    : c.type === "warn"
                    ? "text-yellow-400"
                    : "text-green-400"
                }`}
              >
                {c.type}
              </span>
              : {c.args.join(" ")}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
