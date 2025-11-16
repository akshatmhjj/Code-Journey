import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { Trash2 } from "lucide-react";
import { getUserFiles, saveFile as saveFileAPI, deleteFile as deleteFileAPI } from "../lib/api";
import { useAlert } from "../context/AlertContext";
import { useBadges } from "../context/BadgeContext";

const DEFAULT_HTML = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Preview</title>
  </head>
  <body>
    <h1>Hello, Code Journey 🚀</h1>
    <button id="btn">Click Me</button>
  </body>
</html>`;

const DEFAULT_CSS = `body {
  font-family: Inter, system-ui, -apple-system, "Segoe UI";
  background: #0b1220;
  color: #e6eef8;
  padding: 40px;
  text-align: center;
}
button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: #7dd3fc;
  color: #0b1220;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}
button:hover {
  background: #38bdf8;
}`;

const DEFAULT_JS = `console.log("Hello from JavaScript 🧠");
console.warn("This is a warning message");
console.error("This is an error example");

// Add button interactivity
const btn = document.getElementById("btn");
btn?.addEventListener("click", () => {
  console.log("Button clicked!");
  alert("JS is running fine ✨");
});`;

export default function CodeEditorPage() {
    const { triggerBadge } = useBadges();
    const hasTyped = useRef(false);

    const [activeTab, setActiveTab] = useState("html");
    const [html, setHtml] = useState(DEFAULT_HTML);
    const [css, setCss] = useState(DEFAULT_CSS);
    const [js, setJs] = useState(DEFAULT_JS);
    const [fileName, setFileName] = useState("");
    const [files, setFiles] = useState([]);
    const [consoleLogs, setConsoleLogs] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [autoSave, setAutoSave] = useState(false);
    const [theme, setTheme] = useState("vs-dark");
    const iframeRef = useRef(null);
    const { showAlert } = useAlert();


    // --------------------------
    // Console listener
    useEffect(() => {
        const listener = (event) => {
            if (event.data?.source === "cj-iframe-console") {
                setConsoleLogs((logs) => [...logs, event.data.payload]);
            }
        };
        window.addEventListener("message", listener);
        return () => window.removeEventListener("message", listener);
    }, []);

    // --------------------------
    // Build full HTML with inline console forwarder
    const buildHtmlForPreview = (h, c, j) => {
        const consoleShim = `
<script>
(() => {
  const methods = ["log","warn","error","info"];
  methods.forEach(type=>{
    const orig = console[type];
    console[type] = (...args)=>{
      window.parent.postMessage({source:"cj-iframe-console",payload:{type,args}}, "*");
      orig.apply(console,args);
    };
  });
})();
</script>`;

        return `
<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<style>${c}</style>
</head>
<body>
${h}
${consoleShim}
<script>
try {
${j}
} catch(e){ console.error(e); }
</script>
</body>
</html>`;
    };

    const runCode = () => {
        triggerBadge("preview_launched");

        const output = buildHtmlForPreview(html, css, js);
        setConsoleLogs([]);
        if (iframeRef.current) {
            iframeRef.current.srcdoc = output;
        }
    };

    const defaultName = () => {
        const nums = files
            .map((f) => parseInt(f.name?.split(" ")[1], 10))
            .filter((n) => !isNaN(n));
        const next = nums.length ? Math.max(...nums) + 1 : 1;
        return `Code ${String(next).padStart(2, "0")}`;
    };

    // --------------------------
    // ✅ Save File (backend)
    const handleSaveFile = async () => {
        setIsSaving(true);
        const nameToSave = fileName.trim() || defaultName();
        const payload = { name: nameToSave, html, css, js };

        try {
            // ✅ call backend
            const res = await saveFileAPI(payload);
            const savedFile = res.file || payload;

            const updatedFiles = [savedFile, ...files.filter((f) => f.name !== nameToSave)];
            setFiles(updatedFiles);
            setFileName(savedFile.name);
            triggerBadge("file_saved");

            showAlert("✅ File saved successfully!", "success");
        } catch (err) {
            console.error("Save failed:", err);

            if (err.response?.status === 401) {
                showAlert("🔒 Please log in to save your files.", "warning");
            } else {
                showAlert("❌ Failed to save file. Please try again.", "error");
            }
        } finally {
            setIsSaving(false);
        }
    };


    // --------------------------
    // ✅ Load File from list
    const loadFile = (file) => {
        setHtml(file.html);
        setCss(file.css);
        setJs(file.js);
        setFileName(file.name);
        runCode();
    };

    // --------------------------
    // ✅ Delete File (backend)
    const handleDeleteFile = async (name) => {
        try {
            await deleteFileAPI(name); // ✅ correct backend call
            setFiles(files.filter((f) => f.name !== name));
            showAlert(`🗑️ "${name}" deleted successfully!`, "success");
        } catch (err) {
            console.error("Delete failed:", err);

            if (err.response?.status === 401) {
                showAlert("🔒 Please log in to delete files.", "warning");
            } else if (err.response?.status === 404) {
                showAlert("⚠️ File not found or already deleted.", "warning");
            } else {
                showAlert("❌ Failed to delete file. Try again.", "error");
            }
        }
    };


    // --------------------------
    // ✅ Fetch Files (backend)
    const fetchFiles = async () => {
        try {
            const data = await getUserFiles();
            setFiles(data || []);
        } catch (err) {
            if (err.response?.status === 401) {
                window.location.href = "/login";
            } else {
                console.error("Error fetching files:", err);
            }
        }
    };

    // --------------------------
    useEffect(() => {
        fetchFiles();
    }, []);

    // --------------------------
    const downloadCurrent = () => {
        const blob = new Blob([buildHtmlForPreview(html, css, js)], { type: "text/html" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = (fileName || defaultName()) + ".html";
        a.click();
        URL.revokeObjectURL(a.href);
    };

    // --------------------------
    return (
        <div className="min-h-screen bg-[#071226] text-[#e6eef8] p-4 lg:p-8">
            <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 pt-24 md:mt-20">
                {/* Sidebar */}
                <aside className="bg-[#061827] p-4 rounded-2xl border border-[#0f2736] shadow-md">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Files</h3>
                        <button
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
                            <div key={f.name} className="flex items-center justify-between gap-2 group">
                                <button
                                    onClick={() => loadFile(f)}
                                    className="text-left truncate w-full p-2 rounded-md hover:bg-[#072934]"
                                >
                                    <div className="text-sm font-medium">{f.name}</div>
                                    <div className="text-xs text-[#8b9aa6]">
                                        {f.updatedAt
                                            ? new Date(f.updatedAt).toLocaleString(undefined, {
                                                dateStyle: "medium",
                                                timeStyle: "short",
                                            })
                                            : "No timestamp"}
                                    </div>

                                </button>

                                <button
                                    onClick={() => handleDeleteFile(f.name)}
                                    className="p-2 rounded bg-[#2b1a1a] text-red-400 hover:bg-red-500 hover:text-white transition"
                                    title="Delete file"
                                >
                                    <Trash2 size={16} strokeWidth={1.75} />
                                </button>

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
                                onClick={handleSaveFile}
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
                        {/* <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={autoSave}
                                onChange={(e) => setAutoSave(e.target.checked)}
                            />{" "}
                            Auto-save
                        </label> */}
                    </div>
                </aside>

                {/* Main */}
                <main className="space-y-4">
                    <header className="flex items-center justify-between flex-wrap gap-3">
                        <div className="flex items-center gap-3">
                            <div className="bg-[#062532] px-3 py-2 rounded-lg text-sm font-medium">
                                CJ Editor
                            </div>
                            <div className="flex items-center gap-1 bg-[#031821] p-1 rounded-md">
                                {["html", "css", "js"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-3 py-1 rounded ${activeTab === tab ? "bg-[#0b3b57]" : ""}`}
                                    >
                                        {tab.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* <select
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                                className="bg-[#052933] px-2 py-1 rounded"
                            >
                                <option value="vs-dark">Dark</option>
                                <option value="light">Light</option>
                            </select> */}
                            <button
                                onClick={runCode}
                                className="px-3 py-2 rounded-md bg-[#0b3b57]"
                            >
                                Run
                            </button>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-4">
                        <section className="bg-[#041827] rounded-2xl p-2 border border-[#0f2736] relative">
                            <div className="h-[440px] rounded overflow-hidden">
                                <Editor
                                    height="100%"
                                    theme={theme}
                                    language={activeTab === "html" ? "html" : activeTab === "css" ? "css" : "javascript"}
                                    value={activeTab === "html" ? html : activeTab === "css" ? css : js}
                                    onChange={(val) => {
                                        if (!hasTyped.current && val?.trim().length > 0) {
                                            hasTyped.current = true;
                                            triggerBadge("code_typed");
                                        }

                                        if (activeTab === "html") setHtml(val || "");
                                        if (activeTab === "css") setCss(val || "");
                                        if (activeTab === "js") setJs(val || "");
                                    }}

                                    options={{
                                        fontSize: 13,
                                        minimap: { enabled: false },
                                        automaticLayout: true,
                                        wordWrap: "on",
                                    }}
                                />
                            </div>

                            {/* Console */}
                            <div className="mt-3 bg-[#02161f] p-3 rounded text-xs max-h-[150px] overflow-auto border border-[#08303f]">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-xs text-[#89a6b6]">Console</div>
                                    <div className="text-xs text-[#89a6b6]">{consoleLogs.length} messages</div>
                                </div>
                                <div className="space-y-1">
                                    {consoleLogs.length === 0 && (
                                        <div className="text-[#6f8a9b]">No console output yet</div>
                                    )}
                                    {consoleLogs.map((log, i) => (
                                        <div key={i} className="break-words">
                                            <span
                                                className={`${log.type === "error"
                                                    ? "text-red-400"
                                                    : log.type === "warn"
                                                        ? "text-yellow-400"
                                                        : "text-green-400"
                                                    }`}
                                            >
                                                {log.type}:
                                            </span>{" "}
                                            {log.args.join(" ")}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Preview */}
                        <aside className="space-y-3">
                            <div className="bg-[#041827] p-3 rounded-2xl border border-[#0f2736] h-[450px] flex flex-col">
                                <div className="text-sm font-medium mb-2">Preview</div>
                                <iframe
                                    ref={iframeRef}
                                    sandbox="allow-scripts allow-same-origin"
                                    className="flex-1 bg-[#0b1220] rounded-md border border-[#0b1b24]"
                                />
                            </div>
                        </aside>
                    </div>
                </main>
            </div>
        </div>
    );
}
