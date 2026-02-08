"use client";

import { motion } from "framer-motion";

/**
 * Wraps content and reveals it with a fade + slide-up animation when the section scrolls into view.
 * Content stays hidden until the viewport threshold is met, then animates in once.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to reveal on scroll
 * @param {string} [props.className] - Optional class name for the wrapper
 * @param {React.CSSProperties} [props.style] - Optional inline styles for the wrapper
 * @returns {JSX.Element}
 * @example
 * <ScrollReveal><About /></ScrollReveal>
 */
export default function ScrollReveal({ children, className, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
