"use client";

import { motion } from "framer-motion";

export const VisionStyleCard = ({
  title,
  title2,
  description,
  src,
  index = 0,
}: {
  title: string;
  title2: string;
  description: string;
  src: string;
  index?: number;
}) => {
  const hoverBg = "hover:bg-neutral-900";
  const hoverText = "group-hover:text-accent";
  const mutedText = "text-muted-foreground";
  const descHoverText = "group-hover:text-foreground";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.15 }}
      className={`group relative flex h-[400px] flex-col justify-between overflow-hidden p-6 transition-colors duration-1000 ${hoverBg} md:h-80 md:p-9`}
    >
      <h2 className="text-3xl font-clash-display font-medium leading-tight z-10">
        <span
          className={`transition-colors duration-500 ${mutedText} ${hoverText}`}
        >
          {title}
        </span>
        {title2}
      </h2>
      <div
        className={`font-satoshi flex items-center gap-1.5 transition-colors duration-500 z-10 ${mutedText} ${descHoverText}`}
      >
        {description}
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 top-0 opacity-0 blur-sm grayscale transition-all group-hover:opacity-10 group-active:scale-105 group-active:opacity-30 group-active:blur-0 group-active:grayscale-0 z-0"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Corners />
    </motion.div>
  );
};

const Corners = () => {
  const cornerColor = "bg-accent";

  return (
    <>
      <span
        className={`absolute left-px top-px z-10 h-3 w-px origin-top scale-0 ${cornerColor} transition-all duration-500 group-hover:scale-100`}
      />
      <span
        className={`absolute left-px top-px z-10 h-px w-3 origin-left scale-0 ${cornerColor} transition-all duration-500 group-hover:scale-100`}
      />
      <span
        className={`absolute bottom-px right-px z-10 h-3 w-px origin-bottom scale-0 ${cornerColor} transition-all duration-500 group-hover:scale-100`}
      />
      <span
        className={`absolute bottom-px right-px z-10 h-px w-3 origin-right scale-0 ${cornerColor} transition-all duration-500 group-hover:scale-100`}
      />
      <span
        className={`absolute bottom-px left-px z-10 h-3 w-px origin-bottom scale-0 ${cornerColor} transition-all duration-500 group-hover:scale-100`}
      />
      <span
        className={`absolute bottom-px left-px z-10 h-px w-3 origin-left scale-0 ${cornerColor} transition-all duration-500 group-hover:scale-100`}
      />
      <span
        className={`absolute right-px top-px z-10 h-3 w-px origin-top scale-0 ${cornerColor} transition-all duration-500 group-hover:scale-100`}
      />
      <span
        className={`absolute right-px top-px z-10 h-px w-3 origin-right scale-0 ${cornerColor} transition-all duration-500 group-hover:scale-100`}
      />
    </>
  );
};
