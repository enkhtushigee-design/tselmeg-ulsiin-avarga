"use client";

import { motion } from "framer-motion";

function Sticker({ emoji, style }: { emoji: string; style: React.CSSProperties }) {
  return (
    <motion.div
      animate={{ rotate: [0, 5, -5, 3, 0], scale: [1, 1.08, 1] }}
      transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute",
        fontSize: 42,
        filter: "drop-shadow(0 4px 12px rgba(255,107,157,0.4))",
        userSelect: "none",
        ...style,
      }}
    >
      {emoji}
    </motion.div>
  );
}

const stickers = [
  { emoji: "🎀", style: { top: "8%", left: "5%" } },
  { emoji: "✨", style: { top: "15%", left: "18%" } },
  { emoji: "🌸", style: { top: "5%", left: "32%" } },
  { emoji: "💖", style: { top: "10%", right: "30%" } },
  { emoji: "✨", style: { top: "18%", right: "16%" } },
  { emoji: "🎀", style: { top: "8%", right: "4%" } },
  { emoji: "🌸", style: { bottom: "22%", left: "6%" } },
  { emoji: "💫", style: { bottom: "30%", left: "20%" } },
  { emoji: "🎂", style: { bottom: "18%", right: "8%" } },
  { emoji: "⭐", style: { bottom: "28%", right: "22%" } },
  { emoji: "🦋", style: { top: "42%", left: "3%" } },
  { emoji: "🌺", style: { top: "42%", right: "3%" } },
];

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center overflow-hidden">
      {/* Glowing background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400/10 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      {/* Floating stickers */}
      {stickers.map((s, i) => (
        <Sticker key={i} emoji={s.emoji} style={s.style} />
      ))}

      {/* Main title */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{ position: "relative", zIndex: 2 }}
      >
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(72px, 12vw, 130px)",
            fontWeight: 900,
            lineHeight: 1.05,
            marginBottom: 4,
            background: "linear-gradient(135deg, #ff6b9d, #ffd93d, #ff6b9d, #c77dff)",
            backgroundSize: "300% 300%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "gradientShift 4s ease infinite",
            filter: "drop-shadow(0 0 30px rgba(255,107,157,0.5))",
          }}
        >
          Happy
        </h1>
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(72px, 12vw, 130px)",
            fontWeight: 900,
            lineHeight: 1.05,
            background: "linear-gradient(135deg, #ffd93d, #ff6b9d, #c77dff)",
            backgroundSize: "300% 300%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "gradientShift 4s ease infinite reverse",
            filter: "drop-shadow(0 0 30px rgba(199,125,255,0.5))",
          }}
        >
          Birthday!
        </h1>
      </motion.div>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        style={{
          marginTop: 24,
          height: 1,
          width: 200,
          background: "linear-gradient(90deg, transparent, #ff6b9d, transparent)",
          position: "relative",
          zIndex: 2,
        }}
      />

      {/* Scroll down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: "Caveat, cursive",
            fontSize: 18,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: 1,
          }}
        >
          scroll down
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "rgba(255,255,255,0.5)", fontSize: 22 }}
        >
          ↓
        </motion.div>
      </motion.div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}
