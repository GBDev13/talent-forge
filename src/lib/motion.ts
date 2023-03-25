import { MotionProps } from "framer-motion";

export const fadeUp: MotionProps = {
  initial: {
    y: 20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: 20,
    opacity: 0,
  },
  transition: {
    duration: 0.8,
  }
}

export const fadeRight: MotionProps = {
  initial: {
    x: -20,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: -20,
    opacity: 0,
  },
  transition: {
    duration: 0.8,
  }
}