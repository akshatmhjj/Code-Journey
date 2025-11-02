import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ColorBends from "../components/ColorBends";
import {
    ArrowRight,
    Code,
    Eye,
    Paintbrush,
    Layers,
    Sparkles,
    Youtube,
    X,
    Palette,
    Box,
    LayoutGrid,
    Smartphone,
    Type,
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

const CSS = () => {
    const [activeTab, setActiveTab] = useState("code");
    const [example, setExample] = useState(0);
    const [modal, setModal] = useState(null);

    const codeExamples = [
        {
            title: "Basic Styling",
            code: `h1 {
  color: #00bcd4;
  text-align: center;
}

p {
  font-size: 18px;
  color: #eee;
}`,
            preview: (
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-cyan-400">
                        Hello CSS World!
                    </h1>
                    <p className="text-gray-300 mt-2">
                        This is a styled paragraph using CSS properties.
                    </p>
                </div>
            ),
        },
        {
            title: "Box Model",
            code: `.box {
  background: #1e293b;
  padding: 20px;
  margin: 20px;
  border: 3px solid #3b82f6;
  border-radius: 8px;
}`,
            preview: (
                <div className="bg-slate-800 p-5 m-5 border-4 border-blue-500 rounded-lg text-center text-gray-300">
                    This box uses the CSS Box Model.
                </div>
            ),
        },
        {
            title: "Flexbox Layout",
            code: `.container {
  display: flex;
  justify-content: space-around;
}

.item {
  background: #3b82f6;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
}`,
            preview: (
                <div className="flex justify-around gap-3">
                    <div className="bg-blue-500 px-4 py-2 rounded">1</div>
                    <div className="bg-blue-500 px-4 py-2 rounded">2</div>
                    <div className="bg-blue-500 px-4 py-2 rounded">3</div>
                </div>
            ),
        },
        {
            title: "Hover Animation",
            code: `.btn {
  background: linear-gradient(90deg, #00bcd4, #3b82f6);
  padding: 10px 20px;
  color: white;
  border-radius: 6px;
  transition: transform 0.3s;
}

.btn:hover {
  transform: scale(1.1);
}`,
            preview: (
                <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2 rounded-lg text-white hover:scale-110 transition-transform">
                    Hover Me
                </button>
            ),
        },
        {
            title: "Responsive Design",
            code: `@media (max-width: 600px) {
  body {
    background-color: #111;
  }
}`,
            preview: (
                <div className="text-gray-400">
                    Resize your window to see responsive effects in action.
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


            <Section className="text-center pt-32 pb-24">
                <a
                    href="https://developer.mozilla.org/en-US/docs/Web/CSS"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <motion.button
                        className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-gradient-to-r from-cyan-200 via-blue-200 to-indigo-200 text-black cursor-pointer px-4 py-1.5 text-sm font-semibold shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 mb-7"
                    >
                        CSS V3
                    </motion.button>
                </a>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-center"
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg"
                        alt="CSS Logo"
                        className="w-32 h-32"
                    />
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-7xl font-extrabold mt-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent"
                >
                    CSS – Styling the Web As You Think
                </motion.h1>
                <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
                    Cascading Style Sheets (CSS) give life to HTML, defining layout,
                    color, animation, and design across the web.
                </p>
            </Section>


            <Section>
                <div className="grid md:grid-cols-2 gap-20 items-center">
                    <img
                        src="https://akshatmhjj.github.io/Code-Journey-V1/Images/CSS1.jpg"
                        alt="CSS Illustration"
                        className="rounded-2xl shadow-2xl shadow-blue-800/30"
                    />
                    <div>
                        <h2 className="text-3xl font-bold mb-4 text-white">
                            Why CSS is the Heart of Design
                        </h2>
                        <p className="text-gray-400 mb-3">
                            CSS defines the visual presentation of a webpage — from colors and
                            fonts to layouts and animations. It separates structure from style,
                            keeping code clean and maintainable.
                        </p>
                        <p className="text-gray-400 mb-3">
                            With modern tools like <span className="text-cyan-400">Flexbox</span> and{" "}
                            <span className="text-blue-400">Grid</span>, CSS enables fully
                            responsive layouts across devices.
                        </p>
                        <p className="text-gray-400 mb-3">
                            CSS frameworks like <span className="text-indigo-400">Tailwind</span> and{" "}
                            <span className="text-cyan-400">Bootstrap</span> make rapid styling easier.
                        </p>
                        <p className="text-gray-400">
                            In essence, CSS is what transforms plain HTML into beautiful,
                            interactive web experiences.
                        </p>
                    </div>
                </div>
            </Section>

            <Section>
                <h2 className="text-4xl font-bold text-center mb-16 text-white">
                    Deep Dive into CSS 🎨
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Selectors & Properties",
                            desc: (
                                <ul className="list-disc pl-5 space-y-1 text-gray-400">
                                    <li>Use selectors like <code>element</code>, <code>.class</code>, and <code>#id</code> to target specific elements.</li>
                                    <li>Apply styles with properties such as <code>color</code>, <code>font-size</code>, and <code>background</code>.</li>
                                    <li>Combine selectors (like <code>div p</code> or <code>ul li</code>) for precise control over styling.</li>
                                    <li>Leverage pseudo-classes like <code>:hover</code> or <code>:focus</code> for interactive designs.</li>
                                </ul>
                            ),
                            icon: <Paintbrush className="text-cyan-400" />,
                        },
                        {
                            title: "Box Model",
                            desc: (
                                <ul className="list-disc pl-5 space-y-1 text-gray-400">
                                    <li>Every element is a box consisting of <strong>content, padding, border,</strong> and <strong>margin</strong>.</li>
                                    <li><code>padding</code> adds space inside the box, while <code>margin</code> adds space outside.</li>
                                    <li><code>border</code> defines the outline of the element and can be styled (solid, dotted, etc.).</li>
                                    <li>Use <code>box-sizing: border-box;</code> to make width calculations more intuitive.</li>
                                </ul>
                            ),
                            icon: <Box className="text-blue-400" />,
                        },
                        {
                            title: "Flexbox & Grid",
                            desc: (
                                <ul className="list-disc pl-5 space-y-1 text-gray-400">
                                    <li><strong>Flexbox</strong> is best for aligning and distributing elements in one dimension (row or column).</li>
                                    <li><strong>CSS Grid</strong> offers powerful two-dimensional layouts for complex designs.</li>
                                    <li>Use properties like <code>justify-content</code>, <code>align-items</code>, and <code>gap</code> for alignment and spacing.</li>
                                    <li>Combine both for maximum layout flexibility and responsiveness.</li>
                                </ul>
                            ),
                            icon: <LayoutGrid className="text-indigo-400" />,
                        },
                        {
                            title: "Animations & Transitions",
                            desc: (
                                <ul className="list-disc pl-5 space-y-1 text-gray-400">
                                    <li>Use <code>transition</code> for smooth changes between states (e.g., hover effects).</li>
                                    <li>Create animations with <code>@keyframes</code> and apply them using <code>animation-name</code> and <code>animation-duration</code>.</li>
                                    <li>Control timing and easing with <code>transition-timing-function</code> or <code>animation-timing-function</code>.</li>
                                    <li>Combine animations with transforms for engaging motion effects.</li>
                                </ul>
                            ),
                            icon: <Sparkles className="text-teal-400" />,
                        },
                        {
                            title: "Typography & Colors",
                            desc: (
                                <ul className="list-disc pl-5 space-y-1 text-gray-400">
                                    <li>Define readable and aesthetic text using <code>font-family</code>, <code>font-size</code>, and <code>line-height</code>.</li>
                                    <li>Use <code>font-weight</code> and <code>text-transform</code> for emphasis and hierarchy.</li>
                                    <li>Set color palettes using <code>color</code> (text) and <code>background-color</code> (backgrounds).</li>
                                    <li>Follow accessibility standards (contrast ratios) for better visibility.</li>
                                </ul>
                            ),
                            icon: <Type className="text-purple-400" />,
                        },
                        {
                            title: "Responsive Design",
                            desc: (
                                <ul className="list-disc pl-5 space-y-1 text-gray-400">
                                    <li>Use <code>@media</code> queries to adjust layouts for different screen sizes.</li>
                                    <li>Design with mobile-first principles: start small, then scale up.</li>
                                    <li>Use flexible units like <code>%</code>, <code>vh</code>, <code>vw</code>, and <code>rem</code> for scalability.</li>
                                    <li>Combine CSS Grid, Flexbox, and fluid typography for truly adaptive designs.</li>
                                </ul>
                            ),
                            icon: <Smartphone className="text-cyan-300" />,
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

            <Section className="text-center">
                <h2 className="text-4xl font-bold mb-10 text-white">CSS in Action 💻</h2>

                <div className="flex justify-center mb-6 gap-3 flex-wrap">
                    {codeExamples.map((ex, idx) => (
                        <button
                            key={idx}
                            onClick={() => setExample(idx)}
                            className={`px-5 py-2 rounded-lg text-sm border transition-all ${example === idx
                                ? "bg-gradient-to-r from-cyan-300 to-blue-300 text-black border-transparent"
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
                            ? "bg-gradient-to-r from-cyan-300 to-blue-300 border-transparent text-black"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                            }`}
                    >
                        <Code className="inline w-4 h-4 mr-1" /> Code
                    </button>
                    <button
                        onClick={() => setActiveTab("preview")}
                        className={`px-6 py-2 rounded-lg border transition-all ${activeTab === "preview"
                            ? "bg-gradient-to-r from-cyan-300 to-blue-300 border-transparent text-black"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                            }`}
                    >
                        <Eye className="inline w-4 h-4 mr-1" /> Preview
                    </button>
                </div>

                <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-xl max-w-3xl mx-auto text-left min-h-[300px] transition-all">
                    {activeTab === "code" ? (
                        <pre className="text-blue-300 font-mono text-sm md:text-base overflow-auto">
                            {codeExamples[example].code}
                        </pre>
                    ) : (
                        <div className="text-left space-y-4 text-gray-200">
                            {codeExamples[example].preview}
                        </div>
                    )}
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
                            <h3 className="text-2xl font-semibold text-white">
                                YouTube Playlist
                            </h3>
                        </div>
                        <p className="text-gray-400 mb-3">
                            Learn CSS step-by-step with visual tutorials and projects.
                        </p>
                        <button
                            onClick={() => setModal("playlist")}
                            className="text-blue-400 flex items-center gap-2 hover:text-blue-300"
                        >
                            Open Playlist <ArrowRight size={16} />
                        </button>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        className="bg-white/5 p-6 rounded-2xl border border-white/10 text-left"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <Palette className="text-cyan-400" size={26} />
                            <h3 className="text-2xl font-semibold text-white">
                                CSS Exercises
                            </h3>
                        </div>
                        <p className="text-gray-400 mb-3">
                            Practice and reinforce CSS skills with hands-on challenges.
                        </p>
                        <button
                            onClick={() => setModal("worksheets")}
                            className="text-cyan-400 flex items-center gap-2 hover:text-cyan-300"
                        >
                            Open Exercises <ArrowRight size={16} />
                        </button>
                    </motion.div>
                </div>
            </Section>

            {modal === "playlist" && (
                <Modal title="CSS YouTube Playlists" onClose={() => setModal(null)}>
                    <ul className="space-y-3 text-gray-300">
                        <li>
                            <a
                                href="https://www.youtube.com/watch?v=1Rs2ND1ryYc"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 underline"
                            >
                                CSS Full Course (FreeCodeCamp)
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.youtube.com/watch?v=OXGznpKZ_sA"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 underline"
                            >
                                CSS Crash Course (Traversy Media)
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.youtube.com/playlist?list=PL0b6OzIxLPbzf12lu5etX_vjN-eUxgxnr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 underline"
                            >
                                CSS Playlist (CodeWithHarry)
                            </a>
                        </li>
                    </ul>
                </Modal>
            )}

            {modal === "worksheets" && (
                <Modal title="CSS Practice Resources" onClose={() => setModal(null)}>
                    <ul className="space-y-3 text-gray-300">
                        <li>
                            <a
                                href="https://www.w3schools.com/css/css_exercises.asp"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyan-400 hover:text-cyan-300 underline"
                            >
                                W3Schools CSS Exercises
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://cssbattle.dev/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyan-400 hover:text-cyan-300 underline"
                            >
                                CSS Battle Challenges
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://developer.mozilla.org/en-US/docs/Learn/CSS"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyan-400 hover:text-cyan-300 underline"
                            >
                                MDN CSS Tutorials
                            </a>
                        </li>
                    </ul>
                </Modal>
            )}
        </div>
    );
};

export default CSS;
