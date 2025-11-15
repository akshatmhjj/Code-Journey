import React from "react";
import LightRays from "../components/LightRays";
import {
    Code,
    Layers,
    Rocket,
    Settings,
    Laptop,
    Users,
} from "lucide-react";
import RotatingText from "../components/RotatingText";

const faqs = [
    {
        question: "Is Code Journey free to use?",
        answer:
            "Yes! You can explore all our developer roadmaps, company insights, and project ideas completely free of cost. Premium plans with advanced personalization are coming soon.",
        icon: Rocket,
    },
    {
        question: "Can I switch between different tech stacks?",
        answer:
            "Absolutely. You can switch between web, mobile, or backend development tracks anytime. Your progress will be saved automatically.",
        icon: Layers,
    },
    {
        question: "Do I need coding experience to start?",
        answer:
            "Not at all. Code Journey is designed for absolute beginners. Start from HTML, CSS, and JavaScript, and gradually level up to full-stack development.",
        icon: Code,
    },
    {
        question: "How are company insights updated?",
        answer:
            "We continuously update our data from public resources and tech communities to ensure our insights about hiring trends and skills remain current.",
        icon: Settings,
    },
    {
        question: "Can I access Code Journey on mobile?",
        answer:
            "Yes! The platform is fully responsive and optimized for mobile browsers so you can learn anywhere, anytime.",
        icon: Laptop,
    },
    {
        question: "How can I connect with other learners?",
        answer:
            "We’re building a community space where you can connect with other developers, share progress, and collaborate on projects.",
        icon: Users,
    },
];

function FAQ() {
    return (
        <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
            <div className="fixed inset-0 z-0">
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#6a6e6eff"
                    raysSpeed={1.5}
                    lightSpread={0.9}
                    rayLength={1.5}
                    followMouse={true}
                    mouseInfluence={0.02}
                    noiseAmount={0.1}
                    distortion={0.05}
                    className="custom-rays"
                />
            </div>

            <section className="relative z-10 py-20 mt-20">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 flex flex-wrap justify-center items-center gap-2">
                        <span>Frequently Asked</span>
                        <RotatingText
                            texts={['Doubts', 'Questions', 'Queries']}
                            mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                            staggerFrom="last"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-120%" }}
                            staggerDuration={0.025}
                            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                            transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            rotationInterval={2000}
                        />
                    </h2>

                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Everything you need to know about Code Journey - your personal
                        guide to becoming a web developer.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
                        {faqs.map((item) => (
                            <div
                                key={item.question}
                                className="bg-transparent/20 backdrop-blur-md border border-white/10 rounded-xl p-6 flex flex-col items-center text-center hover:bg-gray-900/80 transition-all duration-300"
                            >
                                <div className="p-3 bg-gray-800 rounded-full mb-4">
                                    <item.icon className="w-6 h-6 text-[#00BFFF]" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    {item.question}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {item.answer}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 backdrop-blur-lg rounded-xl py-6 px-4 flex flex-col items-center">
                        <h4 className="text-2xl font-semibold mb-2">
                            Still have questions?
                        </h4>
                        <p className="text-gray-400 mb-2">
                            Can't find the answer you're looking for? Reach out to us - we'll
                            be happy to help!
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default FAQ;
