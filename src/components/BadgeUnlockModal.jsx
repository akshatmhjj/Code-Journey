import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useBadges } from "../context/BadgeContext";
import confetti from "canvas-confetti";

export default function BadgeUnlockModal() {
    const { modalState, closeModal, goToHall } = useBadges();

    useEffect(() => {
        if (modalState.show) {
            confetti({
                particleCount: 80,
                spread: 60,
                origin: { y: 0.6 },
                ticks: 250,
            });
        }
    }, [modalState.show]);



    if (!modalState.show || modalState.badges.length === 0) return null;

    const badge = modalState.badges[0]; // show first unlocked badge

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
        >
            <div
                className="bg-white dark:bg-gray-900 w-[90%] max-w-md rounded-2xl shadow-xl p-6 text-center animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Badge Icon */}
                <div className="text-6xl mb-3 drop-shadow-sm">🏅</div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                    Badge Unlocked!
                </h2>

                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                    You just unlocked the{" "}
                    <span className="font-semibold text-purple-600 dark:text-purple-300">
                        {badge.name}
                    </span>{" "}
                    badge 🎉
                </p>

                {/* Buttons */}
                <div className="flex items-center justify-center gap-3 mt-6">
                    <button
                        onClick={goToHall}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-xl transition"
                    >
                        View Badges Hall
                    </button>

                    <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-xl transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
