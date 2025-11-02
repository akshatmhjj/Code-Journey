import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ColorBends from "../components/ColorBends";
import {
    ArrowRight,
    Code,
    Eye,
    Globe,
    Cpu,
    Database,
    Braces,
    BookOpen,
    Youtube,
    X,
    Terminal,
    Zap,
    Layers,
    FileCode,
    Settings,
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

const JavaScript = () => {
    const [activeTab, setActiveTab] = useState("code");
    const [example, setExample] = useState(0);
    const [modal, setModal] = useState(null);

    const codeExamples = [
        // 🌱 Basic Beginner Example
        {
            title: "Hello World (Basics)",
            code: `// The simplest JS code
console.log("Hello, JavaScript!");`,
            preview: (
                <div className="text-green-400 font-mono">
                    → Hello, JavaScript!
                </div>
            ),
        },

        // 🧩 Variables & Data Types
        {
            title: "Variables & Data Types",
            code: `let name = "Alex";
const age = 25;
var isDeveloper = true;
let skills = ["HTML", "CSS", "JS"];
let profile = { user: name, level: "Beginner" };

console.log(\`Name: \${name}, Age: \${age}\`);
console.log("Skills:", skills);
console.log("Profile:", profile);`,
            preview: (
                <div className="font-mono text-green-400">
                    → Name: Alex, Age: 25
                    <br />→ Skills: HTML,CSS,JS
                    <br />→ Profile: {"{user: 'Alex', level: 'Beginner'}"}
                </div>
            ),
        },

        // ⚙️ Functions
        {
            title: "Functions",
            code: `function greet(user) {
  return "Welcome, " + user + "!";
}

const greetArrow = (user) => \`Hi, \${user}! 👋\`;

console.log(greet("Coder"));
console.log(greetArrow("Developer"));`,
            preview: (
                <div className="font-mono text-green-400">
                    → Welcome, Coder!
                    <br />→ Hi, Developer! 👋
                </div>
            ),
        },

        // 🌍 DOM Manipulation (Frontend)
        {
            title: "DOM Manipulation (Frontend)",
            code: `// HTML: <button id="btn">Click Me</button>
// JS:
const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  btn.textContent = "Clicked ✅";
});`,
            preview: (
                <div className="flex flex-col items-center gap-2">
                    <button
                        id="btn"
                        onClick={(e) => (e.target.textContent = "Clicked ✅")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                    >
                        Click Me
                    </button>
                </div>
            ),
        },

        // 🎮 Events & Interactivity
        {
            title: "Events & Interactivity",
            code: `// HTML: <input id="name" placeholder="Enter name">
// JS:
const input = document.getElementById("name");
input.addEventListener("input", (e) => {
  console.log("User typing:", e.target.value);
});`,
            preview: (
                <div className="flex flex-col items-center gap-2 font-mono text-green-400">
                    <input
                        id="name"
                        placeholder="Enter name"
                        className="px-3 py-2 border border-gray-500 rounded-md text-black"
                        onInput={(e) =>
                        (document.getElementById("output").textContent =
                            `Typing: ${e.target.value}`)
                        }
                    />
                    <div id="output" className="text-green-400">
                        Typing:
                    </div>
                </div>
            ),
        },

        // ⚡ Async Programming
        {
            title: "Async Programming (Promises & Fetch)",
            code: `async function fetchUser() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const user = await response.json();
  console.log("Fetched User:", user.name);
}

fetchUser();`,
            preview: (
                <div className="font-mono text-green-400">
                    → Fetched User: Leanne Graham
                </div>
            ),
        },

        // 🧱 Objects & Classes
        {
            title: "Objects & Classes",
            code: `class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
  greet() {
    return \`Hi, I'm \${this.name} and I'm a \${this.role}.\`;
  }
}

const dev = new User("Sam", "Frontend Developer");
console.log(dev.greet());`,
            preview: (
                <div className="font-mono text-green-400">
                    → Hi, I'm Sam and I'm a Frontend Developer.
                </div>
            ),
        },

        // 📦 Modules & Imports
        {
            title: "Modules & Imports (ES6)",
            code: `// file: math.js
export const add = (a, b) => a + b;

// file: app.js
import { add } from "./math.js";
console.log(add(5, 7)); // 12`,
            preview: (
                <div className="font-mono text-green-400">→ 12</div>
            ),
        },

        // 🖥️ Backend with Node.js
        {
            title: "Backend with Node.js",
            code: `// A simple Express server
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Node.js Backend 🚀");
});

app.listen(3000, () => console.log("Server running on port 3000"));`,
            preview: (
                <div className="font-mono text-green-400">
                    → Server running on port 3000
                    <br />→ Hello from Node.js Backend 🚀
                </div>
            ),
        },

        // 🔗 APIs & JSON
        {
            title: "APIs & JSON",
            code: `const user = {
  name: "Alex",
  age: 25,
};

const jsonString = JSON.stringify(user);
console.log("JSON String:", jsonString);

const parsed = JSON.parse(jsonString);
console.log("Parsed Object:", parsed);`,
            preview: (
                <div className="font-mono text-green-400">
                    → JSON String: {"{name:'Alex', age:25}"}
                    <br />→ Parsed Object: {"{name:'Alex', age:25}"}
                </div>
            ),
        },
    ];



    return (
        <div className="relative w-full text-gray-100 overflow-x-hidden overflow-y-auto min-h-screen">
            <div className="fixed inset-0 -z-10">
                <ColorBends
                    colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
                    rotation={30}
                    speed={0.3}
                    scale={1.2}
                    frequency={1.4}
                    warpStrength={1.2}
                    mouseInfluence={0.2}
                    parallax={0.6}
                    noise={0.08}
                    transparent={false}
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>


            {/* Hero Section */}
            <Section className="text-center pt-32 pb-24">
                <a
                    href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <motion.button
                        className="inline-flex items-center justify-center rounded-full border border-yellow-200 bg-gradient-to-r from-yellow-200 via-orange-200 to-amber-200 text-black cursor-pointer px-4 py-1.5 text-sm font-semibold shadow-lg hover:shadow-yellow-500/30 transition-all duration-300"
                    >
                        JavaScript ES6+
                    </motion.button>
                </a>

                <motion.img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
                    alt="JS Logo"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-28 h-28 mx-auto mt-8"
                />

                <motion.h1
                    className="text-5xl md:text-7xl font-extrabold mt-8 bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-500 bg-clip-text text-transparent"
                >
                    JavaScript – The Language of the Web
                </motion.h1>
                <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
                    JavaScript brings interactivity and logic to the web. It powers everything
                    from simple buttons to full-fledged applications like YouTube and Gmail.
                </p>
            </Section>

            {/* What & Why */}
            <Section>
                <div className="grid md:grid-cols-2 gap-20 items-center">
                    <img
                        src="https://akshatmhjj.github.io/Code-Journey-V1/Images/JS1.jpeg"
                        alt="JavaScript Illustration"
                        className="rounded-2xl shadow-2xl shadow-yellow-700/30"
                    />
                    <div>
                        <h2 className="text-3xl font-bold mb-4 text-white">
                            What is JavaScript and Why It Matters
                        </h2>
                        <p className="text-gray-400 mb-3">
                            JavaScript is a <span className="text-yellow-400">programming language</span> that allows you to create dynamic,
                            interactive experiences in the browser. It’s one of the core web technologies
                            alongside HTML and CSS.
                        </p>
                        <p className="text-gray-400 mb-3">
                            It runs on the <span className="text-yellow-400">frontend</span> (in browsers) and the <span className="text-yellow-400">backend</span> (using Node.js),
                            making it one of the most versatile languages in the world.
                        </p>
                        <p className="text-gray-400 mb-3">
                            Whether you're building animations, handling APIs, or managing databases,
                            JavaScript connects everything together.
                        </p>
                        <p className="text-gray-400">
                            Today, JS powers frameworks like <span className="text-orange-400">React</span>, <span className="text-orange-400">Next.js</span>, and <span className="text-orange-400">Express</span>, driving
                            the modern internet’s user experience.
                        </p>
                    </div>
                </div>
            </Section>

            {/* Deep Dive */}
            <Section>
                <h2 className="text-4xl font-bold text-center mb-16 text-white">
                    Core Concepts of JavaScript ⚙️
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Variables & Data Types",
                            desc: "Store and manage data using let, const, or var. JS supports strings, numbers, booleans, arrays, and objects.",
                            icon: <Braces className="text-yellow-400" />,
                        },
                        {
                            title: "Functions",
                            desc: "Functions let you reuse code. You can write regular, arrow, or async functions to perform tasks.",
                            icon: <Code className="text-orange-400" />,
                        },
                        {
                            title: "DOM Manipulation",
                            desc: "Access and modify webpage elements using document.querySelector(), event listeners, and dynamic rendering.",
                            icon: <Globe className="text-green-400" />,
                        },
                        {
                            title: "Events & Interactivity",
                            desc: "Handle user actions like clicks or inputs to create interactive experiences.",
                            icon: <Zap className="text-pink-400" />,
                        },
                        {
                            title: "Async Programming",
                            desc: "Use Promises, async/await, and fetch() for API calls and handling asynchronous operations.",
                            icon: <Cpu className="text-blue-400" />,
                        },
                        {
                            title: "Objects & Classes",
                            desc: "Everything in JS is an object. Use classes to organize data and create reusable blueprints.",
                            icon: <Layers className="text-purple-400" />,
                        },
                        {
                            title: "Modules & Imports",
                            desc: "Organize code across files using import/export statements for better scalability.",
                            icon: <FileCode className="text-teal-400" />,
                        },
                        {
                            title: "Backend with Node.js",
                            desc: "Use JavaScript outside browsers to create servers, APIs, and database connections.",
                            icon: <Database className="text-emerald-400" />,
                        },
                        {
                            title: "APIs & JSON",
                            desc: "Communicate with external data sources or backend servers using APIs that exchange JSON data.",
                            icon: <Settings className="text-cyan-400" />,
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl backdrop-blur-xl"
                        >
                            <div className="mb-3">{item.icon}</div>
                            <h3 className="text-xl font-semibold text-white mb-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-400">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* Examples */}
            <Section className="text-center">
                <h2 className="text-4xl font-bold mb-10 text-white">
                    Sample Codes 💻
                </h2>

                <div className="flex justify-center mb-6 gap-3 flex-wrap">
                    {codeExamples.map((ex, idx) => (
                        <button
                            key={idx}
                            onClick={() => setExample(idx)}
                            className={`px-5 py-2 rounded-lg text-sm border transition-all ${example === idx
                                ? "bg-gradient-to-r from-yellow-300 to-orange-300 text-black border-transparent"
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
                            ? "bg-gradient-to-r from-yellow-300 to-orange-300 border-transparent text-black"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                            }`}
                    >
                        <Code className="inline w-4 h-4 mr-1" /> Code
                    </button>
                    <button
                        onClick={() => setActiveTab("preview")}
                        className={`px-6 py-2 rounded-lg border transition-all ${activeTab === "preview"
                            ? "bg-gradient-to-r from-yellow-300 to-orange-300 border-transparent text-black"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                            }`}
                    >
                        <Eye className="inline w-4 h-4 mr-1" /> Output
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

            {/* Resources */}
            <Section className="text-center">
                <h2 className="text-4xl font-bold mb-16 text-white">
                    Resources & Practice Material 📚
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        className="bg-white/5 p-6 rounded-2xl border border-white/10 text-left"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <Youtube className="text-red-500" size={26} />
                            <h3 className="text-2xl font-semibold text-white">
                                YouTube Playlists
                            </h3>
                        </div>
                        <p className="text-gray-400 mb-3">
                            Learn JavaScript step by step with visual tutorials and projects.
                        </p>
                        <button
                            onClick={() => setModal("playlist")}
                            className="text-yellow-400 flex items-center gap-2 hover:text-yellow-300"
                        >
                            Open Playlists <ArrowRight size={16} />
                        </button>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        className="bg-white/5 p-6 rounded-2xl border border-white/10 text-left"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <BookOpen className="text-green-400" size={26} />
                            <h3 className="text-2xl font-semibold text-white">
                                JS Exercises
                            </h3>
                        </div>
                        <p className="text-gray-400 mb-3">
                            Practice your JavaScript concepts with hands-on coding problems.
                        </p>
                        <button
                            onClick={() => setModal("worksheets")}
                            className="text-green-400 flex items-center gap-2 hover:text-green-300"
                        >
                            Open Exercises <ArrowRight size={16} />
                        </button>
                    </motion.div>
                </div>
            </Section>

            {/* Modals */}
            {modal === "playlist" && (
                <Modal title="JavaScript YouTube Playlists" onClose={() => setModal(null)}>
                    <ul className="space-y-3 text-gray-300">
                        <li>
                            <a
                                href="https://www.youtube.com/watch?v=W6NZfCO5SIk"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-yellow-400 hover:text-yellow-300 underline"
                            >
                                JS Crash Course (Mosh Hamedani)
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.youtube.com/watch?v=PkZNo7MFNFg"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-yellow-400 hover:text-yellow-300 underline"
                            >
                                JS Full Course (freeCodeCamp)
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.youtube.com/playlist?list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-yellow-400 hover:text-yellow-300 underline"
                            >
                                Complete JS Playlist (CodeWithHarry)
                            </a>
                        </li>
                    </ul>
                </Modal>
            )}

            {modal === "worksheets" && (
                <Modal title="JavaScript Exercises" onClose={() => setModal(null)}>
                    <ul className="space-y-3 text-gray-300">
                        <li>
                            <a
                                href="https://www.w3schools.com/js/js_exercises.asp"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-400 hover:text-green-300 underline"
                            >
                                W3Schools JS Exercises
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://javascript.info/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-400 hover:text-green-300 underline"
                            >
                                JavaScript.info Tutorials
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://exercism.org/tracks/javascript"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-400 hover:text-green-300 underline"
                            >
                                Exercism JavaScript Track
                            </a>
                        </li>
                    </ul>
                </Modal>
            )}
        </div>
    );
};

export default JavaScript;
