import React from "react";

export default function CinematicBG() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,80,150,0.35),rgba(0,0,0,0.9))] animate-subtleGlow"></div>

      <div className="absolute w-[120vw] h-[120vw] top-[-10%] left-[-10%]
                      bg-[radial-gradient(circle,rgba(80,120,255,0.18),transparent_70%)]
                      blur-[160px] opacity-60 animate-nebulaMove"></div>

      <div className="absolute w-[140vw] h-[140vw] bottom-[-20%] right-[-20%]
                      bg-[radial-gradient(circle,rgba(130,70,255,0.15),transparent_75%)]
                      blur-[190px] opacity-50 animate-nebulaMoveReverse"></div>

      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-soft-light pointer-events-none"></div>
    </div>
  );
}
