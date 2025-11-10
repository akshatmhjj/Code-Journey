import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Code2, Cpu, Layers, Zap, Globe2, Terminal, Sparkles, ArrowRight } from "lucide-react";

// --- Reusable Button Component ---
const Button = ({ children, variant = "primary", onClick }) => {
  const base =
    "px-6 py-3 rounded-xl text-lg font-medium transition-all duration-300 focus:outline-none flex items-center justify-center gap-2";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]"
      : "bg-transparent border border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800/40 backdrop-blur-md";
  return (
    <button onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
};

// --- Features ---
const features = [
  {
    icon: <Code2 className="w-7 h-7 text-blue-400" />,
    title: "Smart Web Dev Assistant",
    desc: "Ask about React, Node, APIs, debugging, and deployment — get contextual, insightful responses that teach the why, not just the how.",
  },
  {
    icon: <Cpu className="w-7 h-7 text-cyan-400" />,
    title: "GPT-5 Core Intelligence",
    desc: "Built on advanced reasoning and contextual awareness, designed specifically for developers and real-world problem solving.",
  },
  {
    icon: <Layers className="w-7 h-7 text-purple-400" />,
    title: "Covers the Full Stack",
    desc: "From frontend to backend, from React to MongoDB — master every layer of modern web development.",
  },
  {
    icon: <Globe2 className="w-7 h-7 text-green-400" />,
    title: "Real-Time Guidance",
    desc: "Debug, refactor, and learn in real time with conversational explanations and adaptive insights.",
  },
  {
    icon: <Zap className="w-7 h-7 text-yellow-400" />,
    title: "Lightning-Fast Streaming",
    desc: "Experience instant response streaming that keeps up with your thoughts — no waiting, no lag.",
  },
  {
    icon: <Terminal className="w-7 h-7 text-pink-400" />,
    title: "Developer-Focused Experience",
    desc: "Clean Markdown rendering, syntax highlighting, and distraction-free learning built just for you.",
  },
];

const CJAILanding = () => {
  const canvasRef = useRef(null);

  // --- Animated Background (Cinematic Particles) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let frame;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: 70 }).map(() => ({
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
      {/* Background Layers */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,120,255,0.25),transparent_70%)] blur-3xl"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,0,128,0.25),transparent_70%)] blur-3xl"></div>

      {/* --- Hero Section --- */}
      <section className="relative z-10 flex flex-col items-center justify-center h-[90vh] text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
        >
          Code Journey AI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="max-w-2xl mt-6 text-lg text-gray-300"
        >
          Your AI mentor for web development — learn, debug, and create with deep clarity, powered by next-gen reasoning.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-5"
        >
          <Button onClick={() => (window.location.href = "")}>
            <ArrowRight className="w-5 h-5" /> Start Chatting
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              document.getElementById("features").scrollIntoView({ behavior: "smooth" })
            }
          >
            <Sparkles className="w-5 h-5" /> Explore Features
          </Button>
        </motion.div>
      </section>

      {/* --- Vision / About Section --- */}
      <section className="relative z-10 py-24 px-8 md:px-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-6"
        >
          The Vision Behind <span className="text-blue-400">Code Journey AI</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-gray-400 text-lg leading-relaxed"
        >
          Code Journey AI isn’t just another chatbot — it’s a personal dev companion.
          It helps you think like a developer, solve complex problems, and master the web ecosystem,
          all through elegant, meaningful conversations.
        </motion.p>
      </section>

      {/* --- Features Section --- */}
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
          Why Developers Love It
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-8">
          {features.map((f, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#1a1a24]/60 border border-gray-700 rounded-2xl p-8 text-left backdrop-blur-lg hover:scale-105 transition-all duration-300 hover:shadow-[0_0_40px_rgba(37,99,235,0.3)]"
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
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
            Learn, build, and explore - with a mentor that understands code like you do.
          </p>

          <div className="flex justify-center">
            <Button
              onClick={() => (window.location.href = "")}
              className="flex items-center gap-2 px-6 py-3 text-lg rounded-xl shadow-lg"
            >
              <ArrowRight className="w-5 h-5" /> Launch the Assistant
            </Button>
          </div>
        </motion.div>
      </section>


    </div>
  );
};

export default CJAILanding;
