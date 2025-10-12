import React from "react";
import LightRays from "../components/LightRays";
import { motion } from "framer-motion";
import ShinyText from '../components/Shinytext';

export default function PrivacyPolicy() {
    return (
        <div className="relative min-h-screen bg-black text-white overflow-hidden">


            <div className="fixed inset-0 z-0">
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#6a6e6eff"
                    raysSpeed={1.3}
                    lightSpread={0.9}
                    rayLength={1.4}
                    followMouse={true}
                    mouseInfluence={0.02}
                    noiseAmount={0.09}
                    distortion={0.06}
                />
            </div>

            <main className="relative z-10 max-w-5xl mx-auto px-6 py-24 mt-20">

                <div className="text-center mb-16">
                    <ShinyText
                        text="Privacy Policy"
                        speed={4}
                        className="text-5xl sm:text-7xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text"
                    />
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        This Privacy Policy describes how <strong>Code Journey</strong> collects, uses, and protects your personal information when you use our platform.
                    </p>
                    <div className="mt-6 h-1 w-32 bg-gradient-to-r from-purple-700 via-blue-600 to-cyan-400 mx-auto rounded-full" />
                </div>

                <div className="space-y-12 text-gray-300 text-[17px] leading-relaxed">

                    <section>
                        <h2 className="text-3xl font-semibold mb-6 text-gray-300/60">Information We Collect</h2>
                        <p>
                            When you sign up and use Code Journey, we may collect certain personal information such as your name, email, and learning progress. This helps us provide a personalized experience, track your progress, and offer relevant recommendations.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold mb-6 text-gray-300/60">How We Use Your Information</h2>
                        <p>
                            The data we collect is used to improve your experience on our platform. We may use it to personalize your learning journey, provide updates, and improve features. Your information is never sold to third parties.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold mb-6 text-gray-300/60">Cookies and Analytics</h2>
                        <p>
                            We use cookies and analytics tools to understand how users interact with Code Journey. This allows us to enhance performance and deliver better learning experiences. You can manage cookies via your browser settings.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold mb-6 text-gray-300/60">Data Security</h2>
                        <p>
                            We implement robust security measures to protect your information from unauthorized access or misuse. While we strive to protect your data, no system is completely secure, so please use your credentials responsibly.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold mb-6 text-gray-300/60">Your Rights</h2>
                        <p>
                            You have the right to access, modify, or delete your personal information. To exercise these rights, contact our support team at <span className="text-cyan-400">work.codejourney@gmail.com</span>, and we will assist you promptly.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold mb-6 text-gray-300/60">Changes to Privacy Policy</h2>
                        <p>
                            Code Journey may update this Privacy Policy from time to time to reflect new features, legal requirements, or improvements to our services. Any changes will be posted on this page, and continued use of the platform indicates acceptance of the updated policy.
                        </p>
                    </section>

                </div>

                <footer className="relative z-20 mt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="text-center py-6 text-gray-400 mt-6"
                    >
                        © 2025 Code Journey. All rights reserved.
                    </motion.div>
                </footer>

            </main>
        </div>
    );
}
