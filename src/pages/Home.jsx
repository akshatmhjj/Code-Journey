import React from "react";
import DarkVeil from "../components/DarkVeil";
import ShinyText from "../components/Shinytext";
import { motion } from "framer-motion";
import { Rocket, Compass, Brain, Sparkles } from "lucide-react";
// import CinematicBG from "../components/CinematicBG";

const Home = () => {
    return (
        <div className="relative w-full min-h-screen bg-black m-0 p-0 overflow-hidden">

            <div className="relative w-full h-screen m-0 p-0 overflow-hidden">
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <DarkVeil />
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
                    <ShinyText
                        text="Begin Your Adventure in Web Development Today"
                        disabled={false}
                        speed={3}
                        className="text-4xl sm:text-5xl sm:text-7xl font-semibold text-white mb-10 max-w-3xl mx-auto"
                    />

                    <p className="text-md sm:text-xl text-indigo-300 mb-10 max-w-2xl">
                        Code Journey helps beginners learn fast, build instantly, and understand
                        deeply, without getting lost in endless theory.
                    </p>

                    <div className="flex items-center justify-center gap-x-6">
                        <a
                            href="#First-Section"
                            className="rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-all duration-200 ease-in-out"
                        >
                            DIVE IN...!!
                        </a>
                    </div>
                </div>
            </div>

            <div className="relative w-full z-0">
                

                <div className="relative z-10">

                    <section id="First-Section" className="w-full py-24 px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-4xl mx-auto text-center p-10 
               backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl
               shadow-[0_0_40px_rgba(80,110,255,0.15)]"
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                                Your First Step Into a <span className="text-blue-400">Tech Career</span>
                            </h2>

                            <p className="text-indigo-200 text-md sm:text-lg leading-relaxed max-w-3xl mx-auto">
                                Every successful developer begins the same way - confused, curious, and unsure where to start.
                                Code Journey simplifies the first steps by making learning fun, friendly, and crystal clear.
                                No stress. No overload. Just smooth, confident progress.
                                <br /><br />
                                Think of CJ as your <span className="text-blue-300 font-semibold">“Beginner Booster Pack”</span>.
                                We prepare you for all the deep-learning platforms you’ll explore later.
                            </p>
                        </motion.div>
                    </section>


                    <section className="w-full py-24 px-6">
                        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                            {[
                                {
                                    title: "Learn Without Confusion",
                                    text: "We remove the noise and teach only what truly matters first.",
                                    icon: Rocket,
                                    color: "from-blue-500/40 to-blue-600/20"
                                },
                                {
                                    title: "Fun & Simple Theory",
                                    text: "Real-life analogies + clean explanations = you'll actually enjoy learning.",
                                    icon: Sparkles,
                                    color: "from-purple-500/40 to-purple-600/20"
                                },
                                {
                                    title: "Career-Focused Learning",
                                    text: "We tell you what the industry actually expects from beginners.",
                                    icon: Brain,
                                    color: "from-teal-400/40 to-teal-600/20"
                                },
                                {
                                    title: "Confidence From Day One",
                                    text: "Small wins early on make you fearless when building real projects.",
                                    icon: Compass,
                                    color: "from-pink-500/40 to-pink-600/20"
                                },
                            ].map((card, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15 }}
                                    className={`
                                rounded-2xl p-7 border border-white/10 backdrop-blur-xl 
                                bg-gradient-to-br ${card.color}
                                shadow-[0_0_25px_rgba(0,0,0,0.3)]
                                hover:shadow-[0_0_35px_rgba(120,130,255,0.45)]
                                hover:scale-[1.04] transition-all ease-out
                                `
                                    }
                                >
                                    <card.icon className="text-white w-10 h-10 mb-4 opacity-90" />
                                    <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
                                    <p className="text-indigo-200">{card.text}</p>
                                </motion.div>
                            ))}

                        </div>
                    </section>


                    <section className="w-full py-24 px-6">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
                                What Your <span className="text-blue-400">CJ Journey</span> Looks Like
                            </h2>

                            <div className="space-y-14">
                                {[
                                    {
                                        title: "1. Get Comfortable With Coding",
                                        text: "We teach everything like a friendly guide, not a textbook.",
                                    },
                                    {
                                        title: "2. Build Small Fun Projects",
                                        text: "Instant output = instant motivation. You see progress fast.",
                                    },
                                    {
                                        title: "3. Learn What Actually Matters",
                                        text: "We highlight what the tech industry values - and what you can skip for now.",
                                    },
                                    {
                                        title: "4. Become Ready For Advanced Learning",
                                        text: "With strong fundamentals, you can learn ANY framework easily.",
                                    },
                                ].map((step, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="border-l-4 border-blue-500/70 pl-6"
                                    >
                                        <h3 className="text-xl sm:text-2xl font-semibold text-white">{step.title}</h3>
                                        <p className="text-md sm:text-lg text-indigo-300 mt-2">{step.text}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>


                    <section className="w-full py-28 px-6 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                            Ready To Start Your Journey?
                        </h2>

                        <p className="text-md   ` sm:text-lg text-indigo-300 max-w-xl mx-auto mb-10">
                            Your future in tech begins with one click.
                            No pressure. No confusion.
                            Just a clear, beginner-friendly starting point.
                        </p>

                        <a
                            href="#"
                            className="px-6 py-3 rounded-xl bg-blue-800 hover:bg-blue-700 text-lg 
                            shadow-[0_0_25px_rgba(80,110,255,0.6)] text-white font-semibold
                            transition-all animate-pulse duration-600 ease-in-out"
                        >
                            Start Learning
                        </a>
                    </section>

                </div>
            </div>


        </div>
    );
};

export default Home;
