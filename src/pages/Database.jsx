import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ColorBends from "../components/ColorBends";
import {
  Database,
  Grid2X2,
  Code,
  Eye,
  ArrowRight,
  BookOpen,
  Youtube,
  Layers,
  Settings,
  Fingerprint,
  Cpu,
  Lock,
  RefreshCw,
  ShieldCheck,
  X,
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
                className="bg-gray-900 p-6 sm:p-8 rounded-2xl max-w-lg w-[90%] sm:w-full mx-auto border border-white/10 shadow-xl text-left"
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

const DatabasePage = () => {
    const [activeTab, setActiveTab] = useState("code");
    const [example, setExample] = useState(0);
    const [modal, setModal] = useState(null);

    const dbExamples = [
        {
            title: "Create Database",
            code: `-- Create a new database
CREATE DATABASE company;`,
            preview: (
                <div className="text-green-400 font-mono">
                    → Database <b>company</b> created successfully.
                </div>
            ),
        },
        {
            title: "Create Table",
            code: `-- Create an employees table
CREATE TABLE employees (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  role VARCHAR(50),
  salary INT
);`,
            preview: (
                <div className="text-green-400 font-mono">
                    → Table <b>employees</b> created with columns id, name, role, salary.
                </div>
            ),
        },
        {
            title: "Insert Data",
            code: `-- Insert data into the table
INSERT INTO employees VALUES
(1, 'Alice', 'Developer', 70000),
(2, 'Bob', 'Designer', 65000);`,
            preview: (
                <div className="text-green-400 font-mono">
                    → 2 rows inserted into <b>employees</b>.
                </div>
            ),
        },
        {
            title: "Select Query",
            code: `-- Retrieve all employees
SELECT * FROM employees;`,
            preview: (
                <table className="text-green-400 font-mono border border-gray-500 mx-auto">
                    <thead>
                        <tr>
                            <th className="px-4 border border-gray-600">id</th>
                            <th className="px-4 border border-gray-600">name</th>
                            <th className="px-4 border border-gray-600">role</th>
                            <th className="px-4 border border-gray-600">salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-600 px-4">1</td>
                            <td className="border border-gray-600 px-4">Alice</td>
                            <td className="border border-gray-600 px-4">Developer</td>
                            <td className="border border-gray-600 px-4">70000</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 px-4">2</td>
                            <td className="border border-gray-600 px-4">Bob</td>
                            <td className="border border-gray-600 px-4">Designer</td>
                            <td className="border border-gray-600 px-4">65000</td>
                        </tr>
                    </tbody>
                </table>
            ),
        },
        {
            title: "Update & Delete",
            code: `-- Update a record
UPDATE employees SET salary = 75000 WHERE name = 'Alice';

-- Delete a record
DELETE FROM employees WHERE id = 2;`,
            preview: (
                <div className="text-green-400 font-mono">
                    → Updated salary for Alice. <br />→ Deleted record with id 2.
                </div>
            ),
        },
        {
            title: "NoSQL Example (MongoDB)",
            code: `// Insert and find in MongoDB
db.users.insertOne({ name: "Eve", age: 24 });
db.users.find({ name: "Eve" });`,
            preview: (
                <div className="text-green-400 font-mono">
                    → Inserted user: {"{name: 'Eve', age: 24}"} <br />→ Found 1 document.
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
                    frequency={1.5}
                    warpStrength={1.18}
                    mouseInfluence={0.2}
                    parallax={1}
                    noise={0.1}
                    transparent={false}
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Hero Section */}
            <Section className="text-center pt-32 pb-24">
                <a
                    href="https://www.w3schools.com/sql/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <motion.button className="inline-flex items-center justify-center rounded-full border border-green-300 bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 text-black cursor-pointer px-4 py-1.5 text-sm font-semibold shadow-lg hover:shadow-green-400/30 transition-all duration-300">
                        Databases (SQL & NoSQL)
                    </motion.button>
                </a>
                <motion.img
                    src="https://cdn-icons-png.flaticon.com/512/4248/4248443.png"
                    alt="Database Logo"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-28 h-28 mx-auto mt-8"
                />
                <motion.h1 className="text-5xl md:text-7xl font-extrabold mt-8 bg-gradient-to-r from-green-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                    Databases – The Heart of Every Application
                </motion.h1>
                <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
                    Databases store and organize the information that makes applications
                    come alive — from user accounts to analytics.
                </p>
            </Section>

            {/* What & Why */}
            <Section>
                <div className="grid md:grid-cols-2 gap-20 items-center">
                    <img
                        src="https://akshatmhjj.github.io/Code-Journey-V1/Images/Database1.avif"
                        alt="Database Illustration"
                        className="rounded-2xl shadow-2xl shadow-green-700/30"
                    />
                    <div>
                        <h2 className="text-3xl font-bold mb-4 text-white">
                            What is a Database and Why It Matters
                        </h2>
                        <p className="text-gray-400 mb-3">
                            A <span className="text-green-400">Database</span> is a structured
                            collection of data that can be easily accessed, managed, and
                            updated.
                        </p>
                        <p className="text-gray-400 mb-3">
                            Databases are the backbone of modern software — from websites and
                            apps to analytics and cloud platforms.
                        </p>
                        <p className="text-gray-400">
                            Whether you're using <span className="text-emerald-400">SQL</span>{" "}
                            for structured data or{" "}
                            <span className="text-teal-400">NoSQL</span> for flexible,
                            document-based storage — databases keep everything running.
                        </p>
                    </div>
                </div>
            </Section>

            {/* Core Concepts */}
            <Section>
                <h2 className="text-4xl font-bold text-center mb-16 text-white">
                    Core Database Concepts ⚙️
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Tables & Rows",
                            desc: "Databases store data in tables — think of them like Excel sheets, where each row is a record and each column is a property.",
                            icon: <Grid2X2 className="text-green-400" />,
                        },
                        {
                            title: "Primary & Foreign Keys",
                            desc: "A primary key gives each record a unique ID, while foreign keys connect one table’s data to another’s — building relationships.",
                            icon: <Fingerprint className="text-emerald-400" />,
                        },
                        {
                            title: "CRUD Operations",
                            desc: "These are the four main ways to manage data — Create new info, Read existing data, Update old info, and Delete what’s no longer needed.",
                            icon: <Settings className="text-teal-400" />,
                        },
                        {
                            title: "Joins",
                            desc: "A JOIN lets you combine data from multiple tables — for example, matching users with their orders.",
                            icon: <Settings className="text-blue-400" />,
                        },
                        {
                            title: "Indexes & Queries",
                            desc: "Indexes speed up searches in large databases. Queries are like questions you ask to find exactly what you need.",
                            icon: <Cpu className="text-yellow-400" />,
                        },
                        {
                            title: "NoSQL Databases",
                            desc: "Unlike SQL, NoSQL stores data as documents, key-value pairs, or graphs — flexible and great for large or unstructured data.",
                            icon: <Database className="text-purple-400" />,
                        },
                        {
                            title: "Normalization",
                            desc: "This is the process of organizing data to remove duplicates and make storage efficient — like cleaning up your shelves for easy access.",
                            icon: <Layers className="text-pink-400" />,
                        },
                        {
                            title: "Transactions",
                            desc: "A transaction is a group of actions that must all happen successfully — or none at all — keeping data accurate and safe.",
                            icon: <Lock className="text-indigo-400" />,
                        },
                        {
                            title: "Backup & Recovery",
                            desc: "Databases are regularly backed up so you can restore them if something goes wrong — like an undo button for your data.",
                            icon: <RefreshCw className="text-orange-400" />,
                        },
                        {
                            title: "ACID Properties",
                            desc: "These four rules — Atomicity, Consistency, Isolation, Durability — make sure every transaction is safe and reliable.",
                            icon: <ShieldCheck className="text-cyan-400" />,
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
                <h2 className="text-4xl font-bold mb-10 text-white">Sample Queries 💻</h2>

                <div className="flex justify-center mb-6 gap-3 flex-wrap">
                    {dbExamples.map((ex, idx) => (
                        <button
                            key={idx}
                            onClick={() => setExample(idx)}
                            className={`px-5 py-2 rounded-lg text-sm border transition-all ${example === idx
                                ? "bg-gradient-to-r from-green-300 to-emerald-300 text-black border-transparent"
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
                            ? "bg-gradient-to-r from-green-300 to-emerald-300 border-transparent text-black"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                            }`}
                    >
                        <Code className="inline w-4 h-4 mr-1" /> Code
                    </button>
                    <button
                        onClick={() => setActiveTab("preview")}
                        className={`px-6 py-2 rounded-lg border transition-all ${activeTab === "preview"
                            ? "bg-gradient-to-r from-green-300 to-emerald-300 border-transparent text-black"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                            }`}
                    >
                        <Eye className="inline w-4 h-4 mr-1" /> Output
                    </button>
                </div>

                <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-xl max-w-3xl mx-auto text-left min-h-[300px] transition-all">
                    {activeTab === "code" ? (
                        <pre className="text-green-400 font-mono text-sm md:text-base overflow-auto">
                            {dbExamples[example].code}
                        </pre>
                    ) : (
                        <div className="text-left space-y-4 text-gray-200">
                            {dbExamples[example].preview}
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
                                Database Playlists
                            </h3>
                        </div>
                        <p className="text-gray-400 mb-3">
                            Learn SQL, MongoDB, and database design through hands-on tutorials.
                        </p>
                        <button
                            onClick={() => setModal("playlist")}
                            className="text-green-400 flex items-center gap-2 hover:text-green-300"
                        >
                            Open Playlists <ArrowRight size={16} />
                        </button>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        className="bg-white/5 p-6 rounded-2xl border border-white/10 text-left"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <BookOpen className="text-yellow-400" size={26} />
                            <h3 className="text-2xl font-semibold text-white">
                                Practice & Docs
                            </h3>
                        </div>
                        <p className="text-gray-400 mb-3">
                            Practice SQL problems and explore documentation for both SQL &
                            NoSQL databases.
                        </p>
                        <button
                            onClick={() => setModal("resources")}
                            className="text-yellow-400 flex items-center gap-2 hover:text-yellow-300"
                        >
                            Open Resources <ArrowRight size={16} />
                        </button>
                    </motion.div>
                </div>
            </Section>

            {/* Modals */}
            {modal === "playlist" && (
                <Modal title="Database YouTube Playlists" onClose={() => setModal(null)}>
                    <ul className="space-y-3 text-gray-300">
                        <li>
                            <a
                                href="https://www.youtube.com/watch?v=HXV3zeQKqGY"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-400 hover:text-green-300 underline"
                            >
                                SQL Full Course (freeCodeCamp)
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.youtube.com/watch?v=pWbMrx5rVBE"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-400 hover:text-green-300 underline"
                            >
                                MongoDB Tutorial (Programming with Mosh)
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.youtube.com/watch?v=9Pzj7Aj25lw"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-400 hover:text-green-300 underline"
                            >
                                SQL Basics (Kudvenkat)
                            </a>
                        </li>
                    </ul>
                </Modal>
            )}

            {modal === "resources" && (
                <Modal title="Database Resources" onClose={() => setModal(null)}>
                    <ul className="space-y-3 text-gray-300">
                        <li>
                            <a
                                href="https://www.w3schools.com/sql/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-yellow-400 hover:text-yellow-300 underline"
                            >
                                W3Schools SQL Practice
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.mongodb.com/docs/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-yellow-400 hover:text-yellow-300 underline"
                            >
                                MongoDB Documentation
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://leetcode.com/problemset/database/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-yellow-400 hover:text-yellow-300 underline"
                            >
                                LeetCode Database Problems
                            </a>
                        </li>
                    </ul>
                </Modal>
            )}

        </div>
    );

};
export default DatabasePage;
