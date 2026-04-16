"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

type TabIconMotionProps = {
  icon: ReactNode;
  active: boolean;
  immersive?: boolean;
};

export default function TabIconMotion({ icon, active, immersive = false }: TabIconMotionProps) {
  return (
    <motion.span
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      animate={{
        scale: active ? 1.08 : 1,
        y: active ? -1 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 24,
        mass: 0.7,
      }}
    >
      <AnimatePresence mode="popLayout">
        {active ? (
          <motion.span
            key="active-indicator"
            initial={{ opacity: 0, scale: 0.6, y: 4 }}
            animate={{ opacity: immersive ? 0.28 : 0.18, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 5 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: "0.44rem",
              height: "0.44rem",
              borderRadius: "19.98rem",
              background: "currentColor",
              pointerEvents: "none",
              filter: "blur(0.008rem)",
            }}
          />
        ) : null}
      </AnimatePresence>

      <motion.span
        animate={{
          rotate: active ? [0, -6, 4, 0] : [0, 2, -2, 0],
          scale: active ? [1, 1.08, 1.02, 1] : 1,
        }}
        transition={{
          duration: active ? 0.32 : 0.24,
          ease: "easeOut",
        }}
        style={{ position: "relative", zIndex: 1, display: "inline-flex" }}
      >
        {icon}
      </motion.span>
    </motion.span>
  );
}
