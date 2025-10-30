import React from "react";
import { motion } from "framer-motion";
import { Globe, Palette, Code, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ColorBends from "../components/ColorBends";

const stacks = [
    {
        title: "HTML — The Structure",
        desc: `HTML (HyperText Markup Language) forms the very backbone of every web page. 
    It defines the structure and meaning of your content — organizing text, images, links, and sections into a logical hierarchy. 
    Think of it as the blueprint that everything else builds upon.`,
        icon: <Globe className="w-14 h-14 text-orange-400" />,
        link: "/html",
        gradient: "from-orange-400/30 via-amber-400/20 to-yellow-400/10",
    },
    {
        title: "CSS — The Design",
        desc: `CSS (Cascading Style Sheets) gives style and life to the web. 
    It defines colors, layouts, spacing, animations, and transitions — making your pages beautiful, responsive, and modern. 
    Every polished UI you see online owes its beauty to CSS.`,
        icon: <Palette className="w-14 h-14 text-blue-400" />,
        link: "/css",
        gradient: "from-blue-500/30 via-cyan-500/20 to-sky-400/10",
    },
    {
        title: "JavaScript — The Logic",
        desc: `JavaScript is the brain of web applications. 
    It adds interactivity, logic, and dynamic updates — turning static pages into interactive experiences. 
    From animations to APIs, JS is what makes the web *alive.*`,
        icon: <Code className="w-14 h-14 text-yellow-400" />,
        link: "/javascript",
        gradient: "from-yellow-400/30 via-amber-400/20 to-orange-400/10",
    },
    {
        title: "Database — The Memory",
        desc: `Databases store, manage, and deliver data for applications. 
    Whether it’s user information, content, or analytics — the database ensures your app remembers and responds intelligently. 
    It’s the beating heart of full-stack systems.`,
        icon: <Database className="w-14 h-14 text-green-400" />,
        link: "/database",
        gradient: "from-emerald-500/30 via-green-500/20 to-teal-400/10",
    },
];

const TechStack = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen w-full text-gray-100 overflow-x-hidden">
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
            <section className="relative text-center px-6 py-24 lg:py-40 max-w-5xl mx-auto mt-10">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent"
                >
                    What is the Tech Stack ..?
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto"
                >
                    Every modern web project runs on a collection of technologies called a
                    <span className="text-cyan-400 font-semibold"> Tech Stack</span>. It’s the
                    foundation that decides how your project is structured, how it looks,
                    how it behaves, and how it communicates with users and databases.
                    <br />
                    <br />
                    From designing intuitive frontends to building powerful backends,
                    understanding your tech stack helps you make smarter, scalable, and
                    efficient applications.
                </motion.p>
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mb-16"></div>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-10 px-8 max-w-7xl mx-auto pb-32">
                {stacks.map((stack, index) => (
                    <motion.div
                        key={stack.title}
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.7 }}
                        viewport={{ once: true }}
                        className={`relative rounded-3xl p-10 backdrop-blur-xl border border-white/10 shadow-2xl 
              bg-gradient-to-br ${stack.gradient} hover:shadow-cyan-500/20 hover:border-cyan-400/30 transition-all duration-300`}
                    >
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-white/5 to-transparent opacity-20"></div>

                        <div className="relative flex flex-col gap-5">
                            <div className="flex items-center justify-center mb-3">
                                {stack.icon}
                            </div>
                            <h2 className="text-2xl font-bold text-center">{stack.title}</h2>
                            <p className="text-gray-300 text-sm text-center leading-relaxed whitespace-pre-line">
                                {stack.desc}
                            </p>
                            <button
                                onClick={() => navigate(stack.link)}
                                className="mt-6 mx-auto bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-medium py-2 px-5 rounded-xl transition-colors"
                            >
                                Dive Deeper →
                            </button>
                        </div>
                    </motion.div>
                ))}
            </section>

            <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-[120px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-blue-700/20 blur-[160px] -z-10 animate-pulse"></div>
            <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-indigo-600/20 blur-[120px] -z-10"></div>
        </div>
    );
};

export default TechStack;
