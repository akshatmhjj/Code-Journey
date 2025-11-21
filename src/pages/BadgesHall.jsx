import React from "react";
import { useBadges } from "../context/BadgeContext";
import ShinyText from "../components/Shinytext";
import ColorBends from "../components/ColorBends";

export default function BadgesHall() {
  const { badgeMeta, unlockedBadges } = useBadges();

  if (!badgeMeta) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-300">
        Loading badges...
      </div>
    );
  }

  const unlockedMap = new Map(
    unlockedBadges.map((b) => [b.badgeId, b])
  );

  return (
    <div className="relative min-h-screen pt-36 pb-20 px-5 md:px-14 overflow-hidden">

      <div className="fixed inset-0 -z-10">
        <ColorBends
          colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
          rotation={30}
          speed={0.3}
          scale={1.2}
          frequency={1.5}
          warpStrength={1.18}
          mouseInfluence={0.2}
          parallax={1}
          noise={0.1}
          transparent={false}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>


      {/* Page Title */}
      <div className="flex justify-center w-full">
        <ShinyText
          text="🎖 Hall of Badges"
          disabled={false}
          speed={3}
          className="text-4xl md:text-5xl font-extrabold text-center mb-14 text-white drop-shadow-2xl"
        />
      </div>


      {/* Sections */}
      <div className="max-w-6xl mx-auto space-y-24">
        {badgeMeta.categories.map((cat, sectionIndex) => (
          <section key={cat.id}>

            {/* Section Header */}
            <div className="mb-12 relative">
              <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg tracking-wide">
                {cat.name}
              </h2>

              {/* Decorative Accent */}
              <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full mt-3"></div>

              {/* Section Divider Transition */}
              {sectionIndex !== 0 && (
                <div className="absolute -top-10 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              )}
            </div>

            {/* Badge Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
              {cat.badges.map((badgeId) => {
                const meta = badgeMeta.badges[badgeId];
                const unlocked = unlockedMap.get(badgeId);

                return (
                  <div
                    key={badgeId}
                    className={`
                      group rounded-2xl p-7 transition-all duration-300
                      backdrop-blur-xl bg-white/10 border 
                      ${unlocked
                        ? "border-purple-300 hover:border-purple-400 shadow-purple-500/30"
                        : "border-white/10 grayscale hover:grayscale-0"
                      }
                      hover:-translate-y-1 hover:shadow-2xl
                      shadow-lg
                    `}
                  >
                    {/* Badge Icon */}
                    <div className="text-center text-5xl mb-4">
                      {unlocked ? "🏅" : "🔒"}
                    </div>

                    {/* Name */}
                    <h3 className="text-center text-lg font-semibold text-white drop-shadow-sm">
                      {meta.name}
                    </h3>

                    {/* Description */}
                    <p className="text-center text-sm text-gray-300 mt-2">
                      {meta.description}
                    </p>

                    {/* Unlocked Date */}
                    {unlocked && (
                      <p className="text-center text-xs text-green-300 mt-4">
                        Unlocked on{" "}
                        {new Date(unlocked.unlockedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
