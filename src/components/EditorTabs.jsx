import React from "react";

export default function EditorTabs({ activeTab, setActiveTab, theme, setTheme, runCode }) {
  return (
    <header className="flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="bg-[#062532] px-3 py-2 rounded-lg text-sm font-medium">Editor</div>
        <div className="flex items-center gap-1 bg-[#031821] p-1 rounded-md">
          {["html", "css", "js"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded ${
                activeTab === tab ? "bg-[#0b3b57]" : ""
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 mt-2 sm:mt-0">
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="bg-[#052933] px-2 py-1 rounded"
        >
          <option value="vs-dark">Dark (Monaco)</option>
          <option value="light">Light (Monaco)</option>
        </select>
        <button
          onClick={runCode}
          className="px-3 py-2 rounded-md bg-[#0b3b57] hover:bg-[#0c4968]"
        >
          Run
        </button>
      </div>
    </header>
  );
}
