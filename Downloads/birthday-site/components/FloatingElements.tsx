"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const FLOATERS = ["✨", "🌸", "⭐", "💫", "🦋", "🌺", "💖", "🎀", "🌙", "🍓"];

export default function FloatingElements() {
  const elements = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: FLOATERS[i % FLOATERS.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 16 + Math.random() * 24,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 4,
    })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((el) => (
        <motion.span
          key={el.id}
          className="absolute select-none"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            fontSize: `${el.size}px`,
            opacity: 0.15,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 8, 0],
            opacity: [0.1, 0.25, 0.1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "easeInOut",
          }}
        >
          {el.emoji}
        </motion.span>
      ))}
    </div>
  );
}
