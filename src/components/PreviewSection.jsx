import React from "react";

export default function PreviewSection({ iframeRef }) {
  return (
    <aside className="space-y-3">
      <div className="bg-[#041827] p-3 rounded-2xl border border-[#0f2736] h-[420px] flex flex-col">
        <div className="text-sm font-medium mb-2">Preview</div>
        <iframe
          title="preview"
          ref={iframeRef}
          sandbox="allow-scripts"
          className="flex-1 bg-[#0b1220] rounded-md border border-[#0b1b24]"
        />
      </div>

      <div className="bg-[#041827] p-3 rounded-2xl border border-[#0f2736] text-sm">
        <div className="font-medium mb-2">Enhancements</div>
        <ul className="text-xs text-[#9bb0bc] space-y-1">
          <li>• Tabbed editing for HTML / CSS / JS with Monaco syntax.</li>
          <li>• Sandbox preview + console output capture.</li>
          <li>• Save to server with localStorage fallback.</li>
          <li>• Keyboard shortcuts and download HTML.</li>
          <li>• Future ready: extensible language runners.</li>
        </ul>
      </div>
    </aside>
  );
}
