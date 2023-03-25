import clsx from "clsx";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type AnimatedTextProps = {
  text: string;
  className?: string;
  type: keyof JSX.IntrinsicElements;
}

type ComponentProps = {
  containerTag: keyof JSX.IntrinsicElements;
  className?: string;
  children: ReactNode
}

export const Tag = ({ containerTag: CustomTag, className, children }: ComponentProps) => {
  return <CustomTag className={className}>{children}</CustomTag>;
}

export const AnimatedText = ({ text, className, type }: AnimatedTextProps) => {
  const item = {
    hidden: {
      y: "200%",
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.45 }
    },
    visible: {
      y: 0,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.35 }
    }
  };

  const splitWords = text.split(" ");

  const words: string[][] = [];

  for (const [, item] of Array.from(splitWords.entries())) {
    words.push(item.split(""));
  }

  words.map((word) => {
    return word.push("\u00A0");
  });

  return (
    <Tag containerTag="h1" className={clsx(className)}>
      {words.map((word, index) => {
        return (
          <span className="word-wrapper whitespace-nowrap" key={index}>
            {words[index].flat().map((element, index) => {
              return (
                <span
                  style={{
                    overflow: "hidden",
                    display: "inline-block"
                  }}
                  key={index}
                >
                  <motion.span
                    style={{ display: "inline-block" }}
                    variants={item}
                  >
                    {element}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}