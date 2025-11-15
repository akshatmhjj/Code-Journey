import React from "react";
import TypeText from "../components/Blurtext";
import Aurora from "../components/Aurora";
import {
  Target,
  Lightbulb,
  Zap,
  Award,
  Users,
  Globe,
  Code2,
  GraduationCap,
  Rocket,
} from "lucide-react";

const handleAnimationComplete = () => {
  console.log("Hero animation completed!");
};

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Clear Direction",
      description: "We map every learner's path step-by-step - no confusion, only progress.",
    },
    {
      icon: Lightbulb,
      title: "Creative Learning",
      description: "We believe in making learning interactive, inspiring, and fun.",
    },
    {
      icon: Zap,
      title: "Empowerment",
      description: "Turning curiosity into confidence through hands-on projects.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Our goal: help you master development the right way - not the fast way.",
    },
  ];

  const impactStats = [
    { icon: Users, label: "Active Learners", value: "12K+" },
    { icon: Code2, label: "Lessons Completed", value: "45K+" },
    { icon: GraduationCap, label: "Developers Trained", value: "3.2K+" },
    { icon: Globe, label: "Countries Reached", value: "37+" },
  ];

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <Aurora
          colorStops={["#7CFF67", "#B19EEF", "#5227FF"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      <div className="relative w-full min-h-screen flex flex-col items-center p-6 gap-32 py-24">

        <section className="relative text-center max-w-5xl z-10 mt-32 mb-28">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(82,39,255,0.3)] mb-12">
            <TypeText
              text={[
                "Our Story. Your Journey.",
                "From Zero to Developer Hero.",
                "Code. Create. Conquer.",
                "Learn Today, Lead Tomorrow.",
              ]}
              typingSpeed={65}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />
          </h1>

          <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light tracking-wide">
            Code Journey was born from a simple idea - learning to code should be{" "}
            <span className="text-purple-300 font-semibold">
              clear, structured, and human.
            </span>{" "}
            We're here to guide every learner from their first HTML tag to their first tech job,
            with clarity and confidence.
          </p>

          <div className="mt-12 flex justify-center">
            <Rocket className="w-14 h-14 text-purple-500 animate-pulse drop-shadow-lg" />
          </div>
        </section>


        <section className="relative z-10 grid md:grid-cols-2 gap-10 max-w-6xl">
          <div className="group bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 hover:border-purple-400/50 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(82,39,255,0.25)] transition-all duration-500">
            <div className="flex items-center gap-4 mb-6">
              <Target className="w-10 h-10 text-purple-300" />
              <h2 className="text-3xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-lg text-white/85 leading-relaxed font-light">
              To simplify web development education for everyone. We combine structure,
              mentorship, and hands-on learning so that beginners grow into confident,
              job-ready developers.
            </p>
          </div>

          <div className="group bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 hover:border-purple-400/50 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(82,39,255,0.25)] transition-all duration-500">
            <div className="flex items-center gap-4 mb-6">
              <Lightbulb className="w-10 h-10 text-purple-300" />
              <h2 className="text-3xl font-bold text-white">Our Vision</h2>
            </div>
            <p className="text-lg text-white/85 leading-relaxed font-light">
              To be the global launchpad for self-taught developers - empowering learners
              to build careers, products, and futures through accessible, high-quality tech education.
            </p>
          </div>
        </section>

        <section className="relative z-10 w-full max-w-7xl mb-20">
          <h2 className="text-5xl font-bold text-white text-center mb-16 bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-purple-400/50 hover:scale-105 hover:shadow-[0_0_40px_rgba(82,39,255,0.25)] transition-all duration-500 text-center"
                >
                  <div className="inline-flex p-5 bg-white/10 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-200">
                    {value.title}
                  </h3>
                  <p className="text-white/85 text-sm leading-relaxed font-light">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
