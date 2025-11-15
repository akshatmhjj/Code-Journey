import React from "react";
import LightRays from "../components/LightRays";
import { motion } from "framer-motion";
import ShinyText from '../components/Shinytext'


export default function Terms() {
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

                <div className="mb-20 text-center">
                    <ShinyText
                        text="Terms & Conditions"
                        disabled={false}
                        speed={4}
                        className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 via-cyan-200 to-cyan-400 bg-clip-text text-transparent"
                    />

                    <p className="text-gray-400 text-lg max-w-md mx-auto">
                        Please review these terms carefully before using Code Journey.
                        Effective Date: <span className="text-cyan-300">October 8, 2025</span>
                    </p>
                    <div className="mt-6 h-1 w-32 bg-gradient-to-r from-purple-700 via-blue-600 to-cyan-400 mx-auto rounded-full" />
                </div>

                <div className="text-gray-300 space-y-16 leading-relaxed text-[17px]">
                    <section>
                        <h2 className="text-3xl font-semibold mb-6 text-gray-300/60">
                        Introduction
                        </h2>
                        <p>
                            Welcome to <strong>Code Journey</strong> - a guided learning platform
                            designed to simplify your web development journey. These Terms
                            govern your use of our website, resources, and all services provided.
                            By using Code Journey, you agree to be bound by these Terms. If you
                            do not agree, please discontinue using the platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold mb-6 text-gray-300/60">
                        Eligibility
                        </h2>
                        <p>
                            You must be at least <strong>13 years of age</strong> to access our
                            resources. If you are under 18, ensure parental or guardian consent
                            before registration. By using Code Journey, you confirm that the
                            information you provide is accurate and complete.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold mb-6 text-gray-300/60">
                        User Accounts
                        </h2>
                        <p>
                            Creating an account allows access to personalized features, saved
                            progress, and dashboards. You are responsible for maintaining
                            confidentiality of your credentials and for all actions under your
                            account. We reserve the right to suspend or terminate accounts that
                            violate our policies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold mb-6 text-gray-300/60">
                        Acceptable Use
                        </h2>
                        <p>
                            You agree not to misuse our platform. This includes (but is not limited to):
                        </p>
                        <ul className="list-disc list-inside text-gray-400 mt-3">
                            <li>Attempting to hack, modify, or disrupt Code Journey’s functionality</li>
                            <li>Distributing harmful, illegal, or misleading content</li>
                            <li>Using automation or scraping tools without authorization</li>
                            <li>Misrepresenting Code Journey or impersonating others</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold mb-6 text-gray-300/60">
                        Intellectual Property
                        </h2>
                        <p>
                            All roadmaps, visuals, UI components, and content available on Code
                            Journey are protected under intellectual property laws. You may use
                            these materials for personal learning, but duplication, modification,
                            or redistribution without written consent is prohibited.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold mb-6 text-gray-300/60">
                        Content Accuracy
                        </h2>
                        <p>
                            While we strive to provide the most accurate, updated, and reliable
                            information, Code Journey does not guarantee the completeness or
                            accuracy of all materials. Use of third-party resources is at your
                            discretion and risk.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold mb-6 text-gray-300/60">
                        Limitation of Liability
                        </h2>
                        <p>
                            Code Journey and its team shall not be liable for any direct,
                            indirect, incidental, or consequential damages resulting from your
                            use of or inability to use our services, even if advised of such
                            possibilities.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold mb-6 text-gray-300/60">
                        Termination of Access
                        </h2>
                        <p>
                            We may suspend or terminate your access at any time without notice
                            if you engage in conduct deemed harmful to Code Journey or its
                            community. You may discontinue use anytime by deleting your account
                            or ceasing access to our site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold mb-6 text-gray-300/60">
                        Future Updates
                        </h2>
                        <p>
                            We may revise these Terms from time to time to reflect new features,
                            feedback, or legal requirements. Updates will be posted on this
                            page, and continued use after changes implies your acceptance.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold mb-6 text-gray-300/60">
                            Contact Us
                        </h2>
                        <p>
                            For inquiries, clarifications, or feedback regarding these Terms,
                            please contact our support team at{" "}
                            <span className="text-cyan-400">work.codejourney@gmail.com</span>.
                        </p>
                    </section>
                </div>
                <div className="pt-8 mt-10 border-t border-white/10 text-xs text-gray-500"></div>

                <footer>
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
