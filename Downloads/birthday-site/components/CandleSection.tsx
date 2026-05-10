"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
  candleBlown: boolean;
  onBlow: () => void;
}

// Flame component reused on both shaped candles
function Flame({ blown, delay = 0 }: { blown: boolean; delay?: number }) {
  return (
    <AnimatePresence>
      {!blown && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.1 }}
          transition={{ duration: 0.3 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          {/* Glow */}
          <div style={{
            position: "absolute",
            width: 50, height: 50,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,190,0,0.45) 0%, transparent 70%)",
            top: -10, left: "50%", transform: "translateX(-50%)",
          }} />
          {/* Outer flame */}
          <motion.div
            animate={{
              scaleX: [1, 0.7, 1.2, 0.8, 1],
              scaleY: [1, 1.25, 0.88, 1.18, 1],
              rotate: [-6, 6, -4, 7, -6],
            }}
            transition={{ duration: 0.5, repeat: Infinity, delay }}
            style={{
              width: 22, height: 38,
              background: "linear-gradient(to top, #ff4400, #ffaa00, #ffee88)",
              borderRadius: "50% 50% 30% 30% / 60% 60% 40% 40%",
              filter: "blur(1px)",
              boxShadow: "0 0 14px 5px rgba(255,160,0,0.75)",
              transformOrigin: "bottom center",
              position: "relative",
            }}
          />
          {/* Blue core */}
          <motion.div
            animate={{ scaleY: [1, 1.35, 0.85, 1.2, 1] }}
            transition={{ duration: 0.4, repeat: Infinity, delay }}
            style={{
              position: "absolute",
              bottom: 0, left: "50%",
              transform: "translateX(-50%)",
              width: 9, height: 18,
              background: "linear-gradient(to top, #88ccff, #fff)",
              borderRadius: "50% 50% 30% 30% / 60% 60% 40% 40%",
              transformOrigin: "bottom center",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Smoke after blow
function Smoke() {
  return (
    <div style={{ position: "relative", height: 40, width: 30 }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ y: 0, opacity: 0.8, x: 0, scale: 0.4 }}
          animate={{ y: -36, opacity: 0, x: (i - 1) * 10, scale: 1.4 }}
          transition={{ duration: 1.8, delay: i * 0.22, repeat: 3 }}
          style={{
            position: "absolute", bottom: 0, left: "50%", marginLeft: -5,
            width: 10, height: 10, borderRadius: "50%",
            background: "rgba(180,180,200,0.5)", filter: "blur(2px)",
          }}
        />
      ))}
    </div>
  );
}

// "1" shaped candle using SVG clip path
function CandleOne({ blown }: { blown: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
      {/* Flame on top */}
      <div style={{ position: "relative", marginBottom: 4, width: 30, display: "flex", justifyContent: "center" }}>
        {blown ? <Smoke /> : <Flame blown={blown} delay={0} />}
      </div>
      {/* Wick */}
      <div style={{ width: 3, height: 10, background: "#333", borderRadius: 2, zIndex: 2, marginBottom: -2 }} />
      {/* "1" shaped body */}
      <svg width="80" height="160" viewBox="0 0 80 160" style={{ filter: "drop-shadow(0 6px 18px rgba(255,107,157,0.5))" }}>
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffc8e8" />
            <stop offset="40%" stopColor="#ff6bab" />
            <stop offset="100%" stopColor="#e85d9a" />
          </linearGradient>
          {/* Polka dot pattern */}
          <pattern id="dots1" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="2.5" fill="rgba(255,255,255,0.35)" />
          </pattern>
        </defs>
        {/* "1" shape: vertical bar with serif top-left diagonal */}
        <path
          d="M 25 20 L 25 140 Q 25 155 40 155 Q 55 155 55 140 L 55 20 Q 55 10 40 8 Q 30 6 25 20 Z"
          fill="url(#grad1)"
          stroke="#c0396e"
          strokeWidth="3"
        />
        {/* Dots overlay */}
        <path
          d="M 25 20 L 25 140 Q 25 155 40 155 Q 55 155 55 140 L 55 20 Q 55 10 40 8 Q 30 6 25 20 Z"
          fill="url(#dots1)"
        />
        {/* Shine */}
        <path
          d="M 30 25 L 30 130 Q 30 138 36 140 L 36 22 Q 34 16 30 25 Z"
          fill="rgba(255,255,255,0.2)"
        />
        {/* Base plate */}
        <ellipse cx="40" cy="155" rx="22" ry="6" fill="#c0396e" opacity="0.6" />
        {/* Metal holder */}
        <rect x="28" y="150" width="24" height="10" rx="4" fill="url(#grad1)" stroke="#c0396e" strokeWidth="2" />
      </svg>
    </div>
  );
}

// "7" shaped candle
function CandleSeven({ blown }: { blown: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
      {/* Flame on top — positioned over the top-right of the 7 */}
      <div style={{ position: "relative", marginBottom: 4, width: 30, display: "flex", justifyContent: "center", alignSelf: "flex-end", marginRight: 14 }}>
        {blown ? <Smoke /> : <Flame blown={blown} delay={0.15} />}
      </div>
      {/* Wick */}
      <div style={{ width: 3, height: 10, background: "#333", borderRadius: 2, zIndex: 2, marginBottom: -2, alignSelf: "flex-end", marginRight: 26 }} />
      {/* "7" shaped body */}
      <svg width="110" height="160" viewBox="0 0 110 160" style={{ filter: "drop-shadow(0 6px 18px rgba(199,125,255,0.5))" }}>
        <defs>
          <linearGradient id="grad7" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0b8ff" />
            <stop offset="40%" stopColor="#c77dff" />
            <stop offset="100%" stopColor="#9b5de5" />
          </linearGradient>
          <pattern id="dots7" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="2.5" fill="rgba(255,255,255,0.35)" />
          </pattern>
        </defs>
        {/* "7" shape:
            Top horizontal bar + diagonal stem going bottom-left */}
        <path
          d="
            M 8 8
            Q 8 8 8 18
            L 8 38
            Q 8 50 20 50
            L 60 50
            L 38 140
            Q 35 152 48 155
            Q 60 158 64 146
            L 92 42
            Q 96 30 96 20
            L 96 8
            Q 96 0 88 0
            L 16 0
            Q 8 0 8 8
            Z
          "
          fill="url(#grad7)"
          stroke="#7b2fd4"
          strokeWidth="3"
        />
        {/* Dots */}
        <path
          d="
            M 8 8 Q 8 8 8 18 L 8 38 Q 8 50 20 50 L 60 50 L 38 140 Q 35 152 48 155 Q 60 158 64 146 L 92 42 Q 96 30 96 20 L 96 8 Q 96 0 88 0 L 16 0 Q 8 0 8 8 Z
          "
          fill="url(#dots7)"
        />
        {/* Shine on top bar */}
        <path
          d="M 14 6 L 14 32 Q 14 42 22 44 L 26 44 Q 18 40 18 32 L 18 6 Z"
          fill="rgba(255,255,255,0.2)"
        />
        {/* Base plate under stem */}
        <ellipse cx="51" cy="155" rx="20" ry="6" fill="#7b2fd4" opacity="0.5" />
        <rect x="34" y="150" width="32" height="10" rx="4" fill="url(#grad7)" stroke="#7b2fd4" strokeWidth="2" />
      </svg>
    </div>
  );
}

// Cake without candles on top (candles rendered separately above)
function Cake({ blown }: { blown: boolean }) {
  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>

      {/* The two shaped candles */}
      <div style={{ display: "flex", gap: 24, alignItems: "flex-end", marginBottom: -8, zIndex: 3, position: "relative" }}>
        <CandleOne blown={blown} />
        <CandleSeven blown={blown} />
      </div>

      {/* TOP TIER */}
      <div style={{ width: 280, position: "relative", zIndex: 2 }}>
        <div style={{
          height: 24, margin: "0 14px",
          background: "linear-gradient(180deg, #fff8fb, #ffe0ee)",
          borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
        }} />
        <div style={{ position: "relative", height: 0, margin: "0 14px" }}>
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} style={{
              position: "absolute", top: -1, left: i * 14,
              width: 13, height: 8 + (i % 3) * 5,
              background: "#fff5f9", borderRadius: "0 0 8px 8px",
            }} />
          ))}
        </div>
        <div style={{
          height: 90, margin: "0 14px",
          background: "linear-gradient(180deg, #ffb3d1, #ff6bab)",
          position: "relative", overflow: "hidden",
        }}>
          {["🌸", "🌸", "🌸"].map((f, i) => (
            <motion.span key={i}
              style={{ position: "absolute", fontSize: 22, top: "28%", left: `${14 + i * 34}%` }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            >{f}</motion.span>
          ))}
          {[0, 1, 2].map((i) => (
            <div key={i} style={{
              position: "absolute", inset: 0, width: 28,
              left: `${12 + i * 36}%`,
              background: "rgba(255,255,255,0.09)",
              transform: "skewX(-15deg)",
            }} />
          ))}
        </div>
      </div>

      {/* BOTTOM TIER */}
      <div style={{ width: 380, position: "relative", zIndex: 1, marginTop: -2 }}>
        <div style={{
          height: 22, margin: "0 8px",
          background: "linear-gradient(180deg, #fff, #f0e0ff)",
          borderRadius: "50% 50% 0 0 / 80% 80% 0 0",
        }} />
        <div style={{ position: "relative", height: 0, margin: "0 8px" }}>
          {Array.from({ length: 22 }).map((_, i) => (
            <div key={i} style={{
              position: "absolute", top: -1, left: i * 16,
              width: 14, height: 7 + (i % 4) * 4,
              background: "#f5eeff", borderRadius: "0 0 8px 8px",
            }} />
          ))}
        </div>
        <div style={{
          height: 120, margin: "0 8px",
          background: "linear-gradient(180deg, #c77dff, #9b5de5)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{
              fontFamily: "Georgia, serif", fontSize: 80, fontWeight: 900,
              color: "rgba(255,255,255,0.08)", userSelect: "none",
            }}>17</span>
          </div>
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div key={i} style={{
              position: "absolute", top: "18%", left: `${8 + i * 12}%`,
              width: 9, height: 9, borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
            }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.22 }}
            />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{
              position: "absolute", inset: 0, width: 32,
              left: `${8 + i * 26}%`,
              background: "rgba(255,255,255,0.06)",
              transform: "skewX(-15deg)",
            }} />
          ))}
        </div>
        <div style={{
          height: 14, margin: "0 -4px",
          background: "linear-gradient(180deg, #f8f4e8, #d4b896)",
          borderRadius: "0 0 10px 10px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
        }} />
      </div>

      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 25%, rgba(255,107,157,0.15) 0%, transparent 65%)",
      }} />
    </div>
  );
}

function BlowStickerEmoji() {
  return (
    <motion.div
      initial={{ x: -280, opacity: 0, scale: 0.4, rotate: -20 }}
      animate={{ x: 0, opacity: 1, scale: 1, rotate: -8 }}
      transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.1 }}
      style={{ position: "absolute", left: -170, bottom: 80, zIndex: 20 }}
    >
      <div style={{
        position: "relative",
        filter: "drop-shadow(0 8px 24px rgba(255,107,157,0.6))",
      }}>
        <div style={{
          width: 110, height: 110, borderRadius: "50%",
          background: "linear-gradient(135deg, #ff6b9d, #c77dff)",
          padding: 3,
          boxShadow: "0 0 0 2px rgba(255,255,255,0.25), 0 8px 28px rgba(199,125,255,0.5)",
        }}>
          <div style={{
            width: "100%", height: "100%", borderRadius: "50%",
            background: "#180f2e",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden", position: "relative",
          }}>
            <img src="/blow.png" alt="blow" style={{ width: 90, height: 90, objectFit: "cover", borderRadius: "50%" }} />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div key={i}
                initial={{ x: 0, opacity: 0, scaleX: 0 }}
                animate={{ x: [0, 70 + i * 15], opacity: [0, 0.9, 0], scaleX: [0.2, 1] }}
                transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.1, ease: "easeOut" }}
                style={{
                  position: "absolute", left: "52%", top: `${34 + i * 6}%`,
                  height: i % 2 === 0 ? 3 : 2, width: 16 + i * 5,
                  background: "rgba(255,255,255,0.75)", borderRadius: 2,
                  transformOrigin: "left center",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CandleSection({ candleBlown, onBlow }: Props) {
  return (
    <section style={{ paddingTop: 80, paddingBottom: 80, paddingLeft: 16, paddingRight: 16, position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ textAlign: "center", marginBottom: 60 }}
      >
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 700, color: "white" }}>
          🎂 Make a Wish 🎂
        </h2>
      </motion.div>

      <div style={{ position: "relative", display: "inline-flex", justifyContent: "center" }}>
        <AnimatePresence>
          {candleBlown && <BlowStickerEmoji />}
        </AnimatePresence>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
        >
          <Cake blown={candleBlown} />
        </motion.div>
      </div>

      <div style={{ marginTop: 56 }}>
        <AnimatePresence mode="wait">
          {!candleBlown ? (
            <motion.button
              key="blow-btn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={onBlow}
              style={{
                padding: "18px 52px", borderRadius: 999, border: "none",
                background: "linear-gradient(135deg, #ff6b9d, #c77dff)",
                color: "white", fontFamily: "Caveat, cursive",
                fontSize: 26, fontWeight: 700, cursor: "pointer",
                boxShadow: "0 10px 40px rgba(255,107,157,0.5)",
                animation: "pulseGlow 2s ease-in-out infinite",
              }}
            >
              💨 Blow the Candle! 🕯️
            </motion.button>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring" }}
              style={{ textAlign: "center" }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ fontSize: 80 }}
              >
                🎉
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 10px 40px rgba(255,107,157,0.5); }
          50% { box-shadow: 0 10px 50px rgba(255,107,157,0.8), 0 0 0 12px rgba(255,107,157,0); }
        }
      `}</style>
    </section>
  );
}
