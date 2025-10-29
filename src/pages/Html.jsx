import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    Code,
    Eye,
    Globe,
    BookOpen,
    FileText,
    Youtube,
    X,
    Table,
    ImageIcon,
    Type,
    Link,
    FormInput,
} from "lucide-react";

const Section = ({ children, className }) => (
    <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className={`max-w-6xl mx-auto px-6 py-20 ${className}`}
    >
        {children}
    </motion.section>
);

const Modal = ({ title, onClose, children }) => (
    <AnimatePresence>
        <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-gray-900 p-8 rounded-2xl max-w-lg w-full border border-white/10 shadow-xl text-left"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-semibold text-white">{title}</h3>
                    <button onClick={onClose}>
                        <X className="text-gray-400 hover:text-white" />
                    </button>
                </div>
                {children}
            </motion.div>
        </motion.div>
    </AnimatePresence>
);

const HTML = () => {
    const [activeTab, setActiveTab] = useState("code");
    const [example, setExample] = useState(0);
    const [modal, setModal] = useState(null);

    const codeExamples = [
        {
            title: "Basic Structure",
            code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My First Page</title>
  </head>
  <body>
    <h1>Welcome to HTML5</h1>
    <p>This is your first web page structure!</p>
  </body>
</html>`,
            preview: (
                <div>
                    <h1 className="text-3xl font-bold text-orange-400">
                        Welcome to HTML5
                    </h1>
                    <p>This is your first web page structure!</p>
                </div>
            ),
        },
        {
            title: "Lists & Links",
            code: `<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>
<a href="#">Learn More</a>`,
            preview: (
                <div>
                    <ul className="list-disc list-inside space-y-1">
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>JavaScript</li>
                    </ul>
                    <a href="#" className="text-pink-400 underline mt-2 block">
                        Learn More
                    </a>
                </div>
            ),
        },
        {
            title: "Images",
            code: `<h2>HTML5 Logo</h2>
<img src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" width="100" />`,
            preview: (
                <div>
                    <h2 className="text-2xl font-semibold text-orange-400">HTML5 Logo</h2>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg"
                        alt="HTML Logo"
                        className="w-20 h-20 mt-2"
                    />
                </div>
            ),
        },
        {
            title: "Tables",
            code: `<table border="1">
  <tr><th>Name</th><th>Age</th></tr>
  <tr><td>Alice</td><td>22</td></tr>
  <tr><td>Bob</td><td>25</td></tr>
</table>`,
            preview: (
                <table className="border-collapse border border-gray-500">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-3 py-1">Name</th>
                            <th className="border border-gray-600 px-3 py-1">Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-600 px-3 py-1">Alice</td>
                            <td className="border border-gray-600 px-3 py-1">22</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 px-3 py-1">Bob</td>
                            <td className="border border-gray-600 px-3 py-1">25</td>
                        </tr>
                    </tbody>
                </table>
            ),
        },
        {
            title: "Forms",
            code: `<form>
  <label>Name:</label><input type="text" />
  <button type="submit">Submit</button>
</form>`,
            preview: (
                <form className="space-y-2">
                    <label className="block text-sm">Name:</label>
                    <input
                        type="text"
                        className="bg-gray-800 border border-gray-700 px-2 py-1 rounded text-gray-200 w-full"
                    />
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-orange-600 to-pink-600 px-3 py-1 rounded text-white"
                    >
                        Submit
                    </button>
                </form>
            ),
        },

    ];

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100 overflow-x-hidden relative">

            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,0,120,0.2),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(80,0,255,0.2),transparent_40%)]"></div>


            <Section className="text-center pt-32 pb-24">
                <a
                    href="https://developer.mozilla.org/en-US/docs/Web/HTML"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <motion.button
                        className="inline-flex items-center justify-center rounded-full border border-orange-200 bg-gradient-to-r from-orange-200 via-pink-200 to-red-200 text-black cursor-pointer px-4 py-1.5 text-sm font-semibold shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
                    >
                        HTML V5
                    </motion.button>
                </a>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-center"
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg"
                        alt="HTML Logo"
                        className="w-32 h-32"
                    />
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-7xl font-extrabold mt-8 bg-gradient-to-r from-orange-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
                >
                    HTML – The Language of the Web
                </motion.h1>
                <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
                    HyperText Markup Language (HTML) is the foundation of web content.
                    Every webpage you see is built upon its structure.
                </p>
            </Section>


            <Section>
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <img
                        src="https://cdn.dribbble.com/users/1187278/screenshots/15836114/media/e13daed5a0d2c2d9f8373ecb8d52ee7a.png?resize=1600x1200&vertical=center"
                        alt="HTML Illustration"
                        className="rounded-2xl shadow-2xl shadow-orange-800/30"
                    />
                    <div>
                        <h2 className="text-3xl font-bold mb-4 text-white">
                            What is HTML and Why It Matters
                        </h2>
                        <p className="text-gray-400 mb-3">
                            HTML (HyperText Markup Language) forms the structure of every
                            website. It allows developers to create and organize content using
                            predefined elements like headings, paragraphs, images, and links.
                        </p>
                        <p className="text-gray-400 mb-3">
                            The modern version, <span className="text-orange-400">HTML5</span>,
                            introduced semantic elements that improve accessibility and SEO —
                            making your webpages meaningful to browsers and users alike.
                        </p>
                        <p className="text-gray-400 mb-3">
                            HTML is the backbone of all web frameworks like React, Angular, and
                            Next.js. Even modern web apps depend on clean, semantic HTML
                            structure for rendering, SEO optimization, and accessibility.
                        </p>
                        <p className="text-gray-400">
                            In essence, HTML is the digital skeleton of the internet, and
                            learning it is the first step toward becoming a web developer.
                        </p>
                    </div>
                </div>
            </Section>


            <Section className="text-center">
                <h2 className="text-4xl font-bold mb-10 text-white">Sample Codes 💻</h2>

                <div className="flex justify-center mb-6 gap-3 flex-wrap">
                    {codeExamples.map((ex, idx) => (
                        <button
                            key={idx}
                            onClick={() => setExample(idx)}
                            className={`px-5 py-2 rounded-lg text-sm border transition-all ${example === idx
                                ? "bg-gradient-to-r from-orange-600 to-pink-600 text-white border-transparent"
                                : "bg-white/5 border-white/10 hover:bg-white/10"
                                }`}
                        >
                            {ex.title}
                        </button>
                    ))}
                </div>

                <div className="flex justify-center mb-6 gap-4">
                    <button
                        onClick={() => setActiveTab("code")}
                        className={`px-6 py-2 rounded-lg border transition-all ${activeTab === "code"
                            ? "bg-gradient-to-r from-orange-600 to-pink-600 border-transparent"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                            }`}
                    >
                        <Code className="inline w-4 h-4 mr-1" /> Code
                    </button>
                    <button
                        onClick={() => setActiveTab("preview")}
                        className={`px-6 py-2 rounded-lg border transition-all ${activeTab === "preview"
                            ? "bg-gradient-to-r from-orange-600 to-pink-600 border-transparent"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                            }`}
                    >
                        <Eye className="inline w-4 h-4 mr-1" /> Preview
                    </button>
                </div>

                <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-xl max-w-3xl mx-auto text-left min-h-[300px] transition-all">
                    {activeTab === "code" ? (
                        <pre className="text-green-400 font-mono text-sm md:text-base overflow-auto">
                            {codeExamples[example].code}
                        </pre>
                    ) : (
                        <div className="text-left space-y-4 text-gray-200">
                            {codeExamples[example].preview}
                        </div>
                    )}
                </div>
            </Section>


            <Section>
                <h2 className="text-4xl font-bold text-center mb-16 text-white">
                    Deep Dive into HTML 🔍
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { title: "Headings & Text", desc: "HTML offers <h1> to <h6> for headings and <p> for paragraphs to structure readable content.", icon: <Type className="text-orange-400" /> },
                        { title: "Links & Images", desc: "Use <a> to link pages and <img> to embed images from URLs or your local files.", icon: <Link className="text-pink-400" /> },
                        { title: "Lists & Tables", desc: "<ul>, <ol>, and <table> organize data into readable formats.", icon: <Table className="text-blue-400" /> },
                        { title: "Forms & Inputs", desc: "Collect data using <form>, <input>, <select>, and <textarea> elements.", icon: <FormInput className="text-green-400" /> },
                        { title: "Semantic Elements", desc: "<header>, <footer>, and <article> give meaning to your layout, improving SEO.", icon: <Globe className="text-purple-400" /> },
                        { title: "Media & Graphics", desc: "Add multimedia easily using <audio>, <video>, and <canvas>.", icon: <ImageIcon className="text-yellow-400" /> },
                        { title: "Metadata & SEO", desc: "<meta> tags define keywords, descriptions, and responsive settings to help search engines understand your page.", icon: <BookOpen className="text-cyan-400" /> },
                        { title: "Document Structure", desc: "The <!DOCTYPE html> declaration and <html>, <head>, and <body> tags form the skeleton of every HTML document.", icon: <FileText className="text-red-400" /> },
                        { title: "Accessibility", desc: "Use alt attributes and semantic tags to make content accessible for screen readers and assistive tech.", icon: <Eye className="text-teal-400" /> },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl backdrop-blur-xl"
                        >
                            <div className="mb-3">{item.icon}</div>
                            <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                            <p className="text-gray-400">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </Section>


            <Section className="text-center">
                <h2 className="text-4xl font-bold mb-16 text-white">
                    Resources & Learning Material 📚
                </h2>
                <div className="grid md:grid-cols-2 gap-8">

                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        className="bg-white/5 p-6 rounded-2xl border border-white/10 text-left"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <Youtube className="text-red-500" size={26} />
                            <h3 className="text-2xl font-semibold text-white">YouTube Playlist</h3>
                        </div>
                        <p className="text-gray-400 mb-3">
                            Watch step-by-step tutorials and learn HTML with real projects.
                        </p>
                        <button
                            onClick={() => setModal("playlist")}
                            className="text-red-400 flex items-center gap-2 hover:text-red-300"
                        >
                            Open Playlist <ArrowRight size={16} />
                        </button>
                    </motion.div>


                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        className="bg-white/5 p-6 rounded-2xl border border-white/10 text-left"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <FileText className="text-yellow-400" size={26} />
                            <h3 className="text-2xl font-semibold text-white">HTML Worksheets</h3>
                        </div>
                        <p className="text-gray-400 mb-3">
                            Practice your HTML skills with interactive exercises and coding challenges.
                        </p>
                        <button
                            onClick={() => setModal("worksheets")}
                            className="text-yellow-400 flex items-center gap-2 hover:text-yellow-300"
                        >
                            Open Worksheets <ArrowRight size={16} />
                        </button>
                    </motion.div>
                </div>
            </Section>


            {modal === "playlist" && (
                <Modal title="YouTube Playlists" onClose={() => setModal(null)}>
                    <ul className="space-y-3 text-gray-300">
                        <li>
                            <a
                                href="https://www.youtube.com/playlist?list=PLu71SKxNbfoDBNF5s-WH6aLbthSEIMhMI"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-red-400 hover:text-red-300 underline"
                            >
                                Full HTML Tutorial Playlist (CodeWithHarry)
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.youtube.com/watch?v=BsDoLVMnmZs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-red-400 hover:text-red-300 underline"
                            >
                                HTML Crash Course (Traversy Media)
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.youtube.com/watch?v=kUMe1FH4CHE"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-red-400 hover:text-red-300 underline"
                            >
                                HTML Full Course (FreeCodeCamp)
                            </a>
                        </li>
                    </ul>
                </Modal>
            )}

            {modal === "worksheets" && (
                <Modal title="HTML Worksheets" onClose={() => setModal(null)}>
                    <ul className="space-y-3 text-gray-300">
                        <li>
                            <a
                                href="https://www.w3schools.com/html/html_exercises.asp"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-yellow-400 hover:text-yellow-300 underline"
                            >
                                W3Schools HTML Exercises
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.codechef.com/practice/html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-yellow-400 hover:text-yellow-300 underline"
                            >
                                CodeChef HTML Practice Problems
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Test_your_skills:_Advanced_HTML_text"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-yellow-400 hover:text-yellow-300 underline"
                            >
                                MDN HTML Skill Tests
                            </a>
                        </li>
                    </ul>
                </Modal>
            )}

        </div>
    );
};

export default HTML;
