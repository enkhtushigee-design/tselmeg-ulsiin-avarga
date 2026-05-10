"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";

const rotations = ["-6deg", "4deg", "-3deg", "7deg", "-5deg", "3deg", "-7deg", "5deg", "-4deg", "6deg"];

interface StickerItem {
  id: number;
  src: string;
  rotate: string;
}

export default function StickerGallery() {
  const [stickers, setStickers] = useState<StickerItem[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addImages = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((file, idx) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        setStickers((prev) => [
          ...prev,
          {
            id: Date.now() + idx,
            src,
            rotate: rotations[(prev.length + idx) % rotations.length],
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <section className="py-20 px-4 relative">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(36px, 6vw, 60px)",
            fontWeight: 700,
            color: "white",
            marginBottom: 8,
          }}
        >
          ✨ Memories ✨
        </h2>
        <p style={{ fontFamily: "Caveat, cursive", color: "rgba(255,182,193,0.6)", fontSize: 20 }}>
          таны хамт өнгөрүүлсэн гоё мөчүүд
        </p>
      </motion.div>

      {/* Upload zone */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{ maxWidth: 480, margin: "0 auto 56px" }}
      >
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); addImages(e.dataTransfer.files); }}
          style={{
            cursor: "pointer",
            borderRadius: 24,
            border: `2px dashed ${dragOver ? "#ff6b9d" : "rgba(255,107,157,0.35)"}`,
            background: dragOver ? "rgba(255,107,157,0.08)" : "rgba(255,255,255,0.03)",
            padding: "40px 20px",
            textAlign: "center",
            transition: "all 0.3s",
          }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{ fontSize: 48, marginBottom: 12 }}
          >
            📸
          </motion.div>
          <p style={{ fontFamily: "Caveat, cursive", fontSize: 22, color: "rgba(255,200,220,0.9)", marginBottom: 4 }}>
            Зургаа энд хий эсвэл дар
          </p>
          <p style={{ fontSize: 13, color: "rgba(255,107,157,0.4)" }}>
            PNG · JPG · WEBP — олон зураг нэг дор
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={(e) => addImages(e.target.files)}
        />
      </motion.div>

      {/* Sticker grid */}
      {stickers.length > 0 && (
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "center", alignItems: "flex-end" }}>
          {stickers.map((sticker, i) => (
            <motion.div
              key={sticker.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1, rotate: sticker.rotate }}
              whileHover={{
                scale: 1.2,
                rotate: "0deg",
                zIndex: 20,
                transition: { type: "spring", stiffness: 280 },
              }}
              transition={{ type: "spring", duration: 0.5, delay: i * 0.06 }}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              style={{
                position: "relative",
                cursor: "pointer",
                filter: hovered === i
                  ? "drop-shadow(0 0 20px rgba(255,107,157,0.9)) drop-shadow(0 4px 12px rgba(0,0,0,0.5))"
                  : "drop-shadow(0 4px 16px rgba(0,0,0,0.6)) drop-shadow(0 0 8px rgba(255,107,157,0.2))",
              }}
            >
              <img
                src={sticker.src}
                alt={`sticker ${i}`}
                style={{ width: 160, height: 160, objectFit: "contain", display: "block" }}
              />
              {hovered === i && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{ position: "absolute", top: -10, right: -10, fontSize: 22, pointerEvents: "none" }}
                >
                  ✨
                </motion.div>
              )}
            </motion.div>
          ))}

          {/* Add more */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => inputRef.current?.click()}
            style={{
              width: 160, height: 160, cursor: "pointer",
              borderRadius: 24, border: "2px dashed rgba(255,107,157,0.3)",
              background: "rgba(255,107,157,0.04)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 8,
            }}
          >
            <span style={{ fontSize: 32 }}>➕</span>
            <span style={{ fontFamily: "Caveat, cursive", color: "rgba(255,182,193,0.5)", fontSize: 16 }}>нэмэх</span>
          </motion.div>
        </div>
      )}

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ marginTop: 80, display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}
      >
        <div style={{ height: 1, width: 200, background: "linear-gradient(90deg, transparent, rgba(255,107,157,0.4))" }} />
        <span style={{ fontSize: 24, opacity: 0.6 }}>🎀</span>
        <div style={{ height: 1, width: 200, background: "linear-gradient(90deg, rgba(255,107,157,0.4), transparent)" }} />
      </motion.div>
    </section>
  );
}
