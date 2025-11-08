import React from "react";
import { motion } from "framer-motion";
import { Code2, Cpu, Layers, Zap, Globe2, Terminal, Sparkles } from "lucide-react";

const features = [
  {
    icon: <Code2 className="w-6 h-6 text-blue-400" />,
    title: "Smart Web Dev Assistant",
    desc: "Ask about React, Node, APIs, deployment, or frameworks — get sharp, focused answers that teach you the why, not just the how.",
  },
  {
    icon: <Cpu className="w-6 h-6 text-blue-400" />,
    title: "Powered by GPT-5 Core",
    desc: "Built on advanced reasoning models designed specifically for code, logic, and web architecture insights.",
  },
  {
    icon: <Layers className="w-6 h-6 text-blue-400" />,
    title: "Covers the Full Stack",
    desc: "Frontend, backend, databases, performance, CI/CD, and even deployment best practices — all in one chat.",
  },
  {
    icon: <Globe2 className="w-6 h-6 text-blue-400" />,
    title: "Real-Time Guidance",
    desc: "Get immediate debugging help or code reviews. Every response feels like pair programming with a mentor.",
  },
  {
    icon: <Zap className="w-6 h-6 text-blue-400" />,
    title: "Lightning Fast",
    desc: "Optimized streaming responses ensure a smooth, instant, and engaging chat experience.",
  },
  {
    icon: <Terminal className="w-6 h-6 text-blue-400" />,
    title: "Built for Developers",
    desc: "Beautiful Markdown rendering, syntax highlighting, and minimal distractions — everything you need for clean learning.",
  },
];

const CJAILanding = () => {
  return (
    <div className="min-h-screen bg-[#05080f] text-gray-100 flex flex-col">
      {/* --- Hero Section --- */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-32 md:py-44">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-blue-700/5 to-transparent blur-3xl"
        ></motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold text-white tracking-tight relative z-10"
        >
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Code Journey AI
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-2xl text-gray-400 mt-6 text-lg md:text-xl leading-relaxed"
        >
          Your personal AI mentor for everything web development — guiding you
          through code, concepts, and creation with style and clarity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-10 flex gap-4"
        >
          <a
            href="/chat"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transition"
          >
            Start Chatting
          </a>
          <a
            href="#features"
            className="px-6 py-3 border border-white/20 text-gray-300 rounded-xl hover:bg-white/10 transition"
          >
            Learn More
          </a>
        </motion.div>
      </section>

      {/* --- Features Section --- */}
      <section id="features" className="relative py-24 md:py-32 bg-[#080c14] px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Why <span className="text-blue-400">Developers</span> Love It
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-gradient-to-b from-[#0f1420] to-[#0a0d14] rounded-2xl border border-blue-500/10 hover:border-blue-500/30 transition group"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-100 group-hover:text-blue-400 transition">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- About Section --- */}
      <section className="relative py-24 md:py-32 px-6 bg-[#05080f] border-t border-white/10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            The Future of Web Development Learning
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed"
          >
            Code Journey AI isn’t just a chatbot — it’s your personalized
            companion that evolves with your learning. Whether you’re debugging
            a tricky API call, structuring a React app, or scaling your Node
            server, it helps you understand, not just memorize.
          </motion.p>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-20 bg-gradient-to-r from-blue-800/20 to-purple-800/20 backdrop-blur-xl border-t border-white/10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <Sparkles className="w-10 h-10 text-blue-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4 text-white">
            Start Your Code Journey Today
          </h2>
          <p className="text-gray-400 mb-8">
            Learn, build, and explore the world of web development — guided by
            an AI that actually understands how developers think.
          </p>
          <a
            href="/chat"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold shadow-lg hover:opacity-90 transition"
          >
            Launch the Assistant
          </a>
        </motion.div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-8 border-t border-white/10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Code Journey AI — Crafted for Developers.
      </footer>
    </div>
  );
};

export default CJAILanding;
