"use client";

import { motion } from "motion/react";

type TabLabelMotionProps = {
  text: string;
  active: boolean;
  immersive?: boolean;
};

export default function TabLabelMotion({ text, active, immersive = false }: TabLabelMotionProps) {
  return (
    <motion.span
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 1.1,
      }}
      animate={{
        y: active ? -1 : 0,
        scale: active ? 1.03 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 28,
        mass: 0.7,
      }}
    >
      <motion.span
        style={{ position: "relative", zIndex: 1, display: "inline-flex" }}
        animate={{
          opacity: active ? 1 : immersive ? 0.86 : 0.72,
          letterSpacing: active ? "0.01em" : "0em",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        {text}
      </motion.span>
    </motion.span>
  );
}
