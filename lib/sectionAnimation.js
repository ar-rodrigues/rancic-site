/** Shared easing and duration for section entrance/exit animations */
export const SMOOTH_EASE = [0.22, 0.61, 0.36, 1];
export const DESCENT_DURATION = 1.6;
export const DESCENT_OFFSET_Y = 220;

/** Framer Motion variants: hidden (above viewport), visible, leave (exit upward). */
export const sectionEntranceVariants = {
  hidden: { opacity: 0, y: -DESCENT_OFFSET_Y },
  visible: { opacity: 1, y: 0 },
  leave: { opacity: 0, y: -DESCENT_OFFSET_Y },
};
