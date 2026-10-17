"use client";

import { Card } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const STATS = [
  {
    icon: "gravity-ui:briefcase",
    value: "50K",
    label: "Active Jobs",
  },
  {
    icon: "gravity-ui:chart-column",
    value: "12K",
    label: "Companies",
  },
  {
    icon: "gravity-ui:magnifier",
    value: "2M",
    label: "Job Seekers",
  },
  {
    icon: "gravity-ui:star",
    value: "97%",
    label: "Satisfaction Rate",
  },
];

const words = [
  "Find your next opportunity.",
  "Connect with great companies.",
  "Build your career with confidence.",
  "Discover jobs that fit you.",
];

export default function GlobalReachSection() {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);

  const currentWord = words[wordIndex];

  useEffect(() => {
    if (text.length < currentWord.length) {
      const timer = setTimeout(() => {
        setText(currentWord.slice(0, text.length + 1));
      }, 80);

      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setText("");
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 1800);

    return () => clearTimeout(timer);
  }, [text, currentWord]);

  return (
    <section className="relative w-full overflow-hidden bg-[#010103] pt-24">
      {/* Ambient blue-purple glow */}
      <div
        className="absolute inset-x-0 top-0 h-[560px] w-full sm:h-[620px]"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 20%, #7972f4 0%, #4a42c9 18%, #1f1c57 40%, transparent 70%)",
        }}
      />

      {/* Background globe */}
      <div className="absolute inset-x-0 top-0 h-[560px] w-full bg-[url('/images/globe.png')] bg-cover bg-top opacity-90 sm:h-[620px]" />

      {/* Fade */}
      <div className="absolute inset-x-0 top-0 h-[560px] w-full bg-gradient-to-b from-transparent via-transparent to-[#010103] sm:h-[620px]" />

      {/* Headline */}
      <div className="relative mx-auto max-w-4xl px-4 pt-40 text-center sm:px-6">
        <p className="text-2xl font-medium leading-snug text-[#cdcce2] sm:text-3xl">
          Assisting over{" "}
          <span className="font-semibold text-white">
            15,000 job seekers
          </span>{" "}
          find their dream positions.
        </p>

        {/* Typewriter */}
        <div className="mt-8 flex min-h-[48px] items-center justify-center text-xl font-semibold text-[#F5A623] sm:text-3xl">
          <span className="inline-flex items-center">
            <span>
              {text.split("").map((char, index) => (
                <motion.span
                  key={`${wordIndex}-${index}`}
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.25,
                    ease: "easeOut",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>

            {/* Cursor */}
            <motion.span
              className="ml-1 inline-block h-7 w-[2px] bg-[#F5A623] sm:h-9"
              animate={{
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 pb-16 pt-16 sm:px-6 lg:grid-cols-4 lg:gap-5">
        {STATS.map((stat) => (
          <Card
            key={stat.label}
            className="rounded-2xl border border-[#1f1e26] bg-gradient-to-b from-[#010102] to-[#1a1a1a]"
          >
            <Card.Content className="flex flex-col gap-8 p-6">
              <Icon
                icon={stat.icon}
                className="h-5 w-5 text-white"
              />

              <div>
                <p className="text-3xl font-semibold text-white sm:text-4xl">
                  {stat.value}
                </p>

                <p className="mt-1 text-sm text-white/70">
                  {stat.label}
                </p>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>
    </section>
  );
}