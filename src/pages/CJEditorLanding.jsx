import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Code, Zap, Cloud, Eye, Layers, ArrowRight, Terminal, Cpu, Sparkles } from "lucide-react";

const Button = ({ children, className = "", onClick, variant = "primary" }) => {
    const base =
        "px-6 py-3 rounded-xl text-lg font-medium transition-all duration-300 focus:outline-none flex items-center justify-center gap-2";
    const styles =
        variant === "primary"
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] text-white"
            : "bg-transparent border border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800/40 backdrop-blur-md";
    return (
        <button onClick={onClick} className={`${base} ${styles} ${className}`}>
            {children}
        </button>
    );
};

const features = [
    {
        icon: <Code className="w-7 h-7 text-blue-400" />,
        title: "Unified Code Environment",
        description: "Write HTML, CSS, and JavaScript together in one synchronized space.",
    },
    {
        icon: <Zap className="w-7 h-7 text-yellow-400" />,
        title: "Instant Preview Engine",
        description: "Get real-time feedback as you code — no reloads, no delays.",
    },
    {
        icon: <Cloud className="w-7 h-7 text-purple-400" />,
        title: "Cloud Sync & Share",
        description: "Save, fork, and share projects seamlessly across devices.",
    },
    {
        icon: <Layers className="w-7 h-7 text-green-400" />,
        title: "Multi-Tab Workspace",
        description: "Switch between files and manage code like a full IDE — but lighter.",
    },
    {
        icon: <Eye className="w-7 h-7 text-pink-400" />,
        title: "Live Collaboration (Beta)",
        description: "Invite others to join your workspace for real-time coding sessions.",
    },
    {
        icon: <Cpu className="w-7 h-7 text-cyan-400" />,
        title: "AI-Powered Insights (Beta)",
        description: "Understand your code better with smart suggestions & diagnostics.",
    },
];

const CJEditorLanding = () => {
    const canvasRef = useRef(null);

    // --- Cinematic Particle Background ---
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let particles = [];
        let frame;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = Array.from({ length: 80 }).map(() => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.8 + 1,
                dx: (Math.random() - 0.5) * 0.4,
                dy: (Math.random() - 0.5) * 0.4,
                color: `hsl(${Math.random() * 360}, 70%, 60%)`,
            }));
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
                p.x += p.dx;
                p.y += p.dy;
                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
            });
            frame = requestAnimationFrame(draw);
        };

        resize();
        draw();
        window.addEventListener("resize", resize);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <div className="relative min-h-screen bg-[#05060a] text-white overflow-x-hidden">
            {/* Animated Background */}
            <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(0,120,255,0.25),transparent_70%)] blur-3xl"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_70%,rgba(255,0,128,0.25),transparent_70%)] blur-3xl"></div>

            {/* Hero Section */}
            <section className="relative z-10 flex flex-col items-center justify-center h-[90vh] text-center px-6">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-6xl md:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                >
                    CJ Editor
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="max-w-2xl mt-6 text-lg text-gray-300"
                >
                    A cinematic online IDE by <span className="text-blue-400 font-semibold">Code Journey</span> —
                    built for creativity, collaboration, and the joy of building beautiful code.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-10 flex flex-col sm:flex-row gap-5"
                >
                    <Button onClick={() => (window.location.href = "/cjeditor")}>
                        <ArrowRight className="w-5 h-5" /> Launch CJ Editor
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() =>
                            document.getElementById("features").scrollIntoView({ behavior: "smooth" })
                        }
                    >
                        <Terminal className="w-5 h-5" /> Explore Features
                    </Button>
                </motion.div>
            </section>

            <section className="relative z-10 py-24 px-8 md:px-16 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold mb-6"
                >
                    The Vision Behind CJ Editor
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto text-gray-400 text-lg leading-relaxed"
                >
                    CJ Editor isn’t just another online editor — it’s an <b>experience</b>.
                    We designed it for the modern creator who values performance, minimalism, and flow.
                    Every animation, every color, and every line of code is here to inspire your journey.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-16 flex justify-center"
                >
                    <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-[1px] rounded-2xl backdrop-blur-lg">
                        <div className="bg-[#0a0b10]/80 rounded-2xl px-10 py-8 border border-gray-800 shadow-[0_0_40px_rgba(59,130,246,0.2)] max-w-3xl">
                            <p className="text-gray-300 text-lg leading-relaxed">
                                “CJ Editor is the bridge between imagination and creation —
                                where learning meets design, and code feels like art.”
                            </p>
                            <p className="text-gray-500 mt-3">— The Code Journey Team</p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section
                id="features"
                className="relative z-10 py-24 text-center bg-gradient-to-b from-transparent via-[#0a0b12]/30 to-transparent backdrop-blur-md"
            >


                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold mb-12"
                >
                    Powerful Features
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-[#1a1a24]/60 border border-gray-700 rounded-2xl p-8 text-left backdrop-blur-lg hover:scale-105 transition-all duration-300 hover:shadow-[0_0_40px_rgba(37,99,235,0.3)]"
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-400 text-sm">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* --- CTA Section --- */}
            <section className="relative z-10 py-24 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <Sparkles className="w-10 h-10 text-blue-400 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold mb-4">Start Your Journey Today</h2>
                    <p className="text-gray-400 mb-8">
                        Learn, build, and explore - with a editor that helps you convert imagination to reality.
                    </p>

                    {/* Centered button */}
                    <div className="flex justify-center">
                        <Button
                            onClick={() => (window.location.href = "")}
                            className="flex items-center gap-2 px-6 py-3 text-lg rounded-xl shadow-lg"
                        >
                            <ArrowRight className="w-5 h-5" /> Launch the Editor
                        </Button>
                    </div>
                </motion.div>
            </section>

        </div>
    );
};

export default CJEditorLanding;
