import React from "react";
import LightRays from "../components/LightRays";
import { motion } from "framer-motion";
import ShinyText from '../components/Shinytext';

export default function Licensing() {
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
                        text="Licensing"
                        speed={4}
                        className="text-5xl sm:text-7xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text"
                    />
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        This page explains the licensing terms under which you can use the content, roadmaps, and other resources provided by Code Journey.
                    </p>
                    <div className="mt-6 h-1 w-32 bg-gradient-to-r from-purple-700 via-blue-600 to-cyan-400 mx-auto rounded-full" />
                </div>

                <div className="space-y-12 text-gray-300 text-[17px] leading-relaxed">

                    <section>
                        <h2 className="text-3xl font-semibold mb-6 text-gray-300/60">License Grant</h2>
                        <p>
                            Code Journey grants you a limited, non-exclusive, non-transferable license to access and use the resources, roadmaps, and learning materials provided on the platform for personal and educational purposes only. This license does not allow commercial redistribution or resale of any content.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold mb-6 text-gray-300/60">Restrictions</h2>
                        <p>
                            You may not modify, copy, distribute, or publicly display any content from Code Journey without explicit written permission. The license is intended solely for personal learning and project development; commercial use or redistribution requires prior consent from the Code Journey team.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold mb-6 text-gray-300/60">Ownership</h2>
                        <p>
                            All roadmaps, images, UI components, and educational materials remain the intellectual property of Code Journey. Granting you a license does not transfer ownership of any materials; it simply allows access for your learning purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold mb-6 text-gray-300/60">Third-Party Content</h2>
                        <p>
                            Some content on Code Journey may be sourced from third parties. Use of such content is subject to the licensing terms of the original providers. Code Journey is not responsible for third-party license compliance.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold mb-6 text-gray-300/60">Termination of License</h2>
                        <p>
                            Code Journey reserves the right to revoke your license if these terms are violated. Upon termination, you must cease all use of licensed materials and delete any copies obtained.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold mb-6 text-gray-300/60">Updates to Licensing</h2>
                        <p>
                            The licensing terms may be updated periodically. Continued use of Code Journey after any updates constitutes acceptance of the revised license. We recommend reviewing this page regularly to stay informed.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold mb-6 text-gray-300/60">Contact</h2>
                        <p>
                            For any questions or clarification regarding licensing, please contact our team at <span className="text-cyan-400">support@codejourney.com</span>. We are happy to provide guidance and assistance regarding proper use of our materials.
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
