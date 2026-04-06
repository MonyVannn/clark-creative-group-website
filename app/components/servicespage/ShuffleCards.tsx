import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import SpaceSketchModel from "../ui/CoreOverview/SpaceSketchModel";
import StorySketchModel from "../ui/CoreOverview/StorySketchModel";
import SystemSketchModel from "../ui/CoreOverview/SystemSketchModel";

type ListOrderItem = "front" | "middle" | "back";

interface ShuffleCardsProps {
  onActiveCardChange?: (index: number) => void;
}

const ShuffleCards = ({ onActiveCardChange }: ShuffleCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasEnteredView = useInView(containerRef, { once: true, amount: 0.35 });

  const [order, setOrder] = useState<ListOrderItem[]>([
    "front",
    "middle",
    "back",
  ]);

  useEffect(() => {
    if (onActiveCardChange) {
      const activeIndex = order.indexOf("front");
      onActiveCardChange(activeIndex);
    }
  }, [order, onActiveCardChange]);

  const handleShuffle = (direction: "left" | "right") => {
    const orderCopy = [...order];
    if (direction === "left") {
      orderCopy.push(orderCopy.shift() as ListOrderItem);
    } else {
      orderCopy.unshift(orderCopy.pop() as ListOrderItem);
    }
    setOrder(orderCopy);
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center w-full min-h-[560px] text-slate-50 gap-6"
    >
      <div className="relative h-[450px] w-[350px]">
        <Card
          Icon={SpaceSketchModel}
          title="Space"
          description="Your environment shapes everything."
          handleShuffle={handleShuffle}
          position={order[0]}
          revealLayout={hasEnteredView}
        />
        <Card
          Icon={StorySketchModel}
          title="Story"
          description="The story you tell about your business is the business."
          handleShuffle={handleShuffle}
          position={order[1]}
          revealLayout={hasEnteredView}
        />
        <Card
          Icon={SystemSketchModel}
          title="System"
          description="Business systems multiply your best work."
          handleShuffle={handleShuffle}
          position={order[2]}
          revealLayout={hasEnteredView}
        />
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => handleShuffle("right")}
          aria-label="Previous card"
          className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-full border border-[#f2f2f2]/50 text-slate-100 transition-colors hover:bg-[#f2f2f2]/10"
        >
          <FiArrowLeft className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => handleShuffle("left")}
          aria-label="Next card"
          className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-full border border-[#f2f2f2]/50 text-slate-100 transition-colors hover:bg-[#f2f2f2]/10"
        >
          <FiArrowRight className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </div>
  );
};

interface CardProps {
  handleShuffle: (direction: "left" | "right") => void;
  title: string;
  description: string;
  position: ListOrderItem;
  Icon: React.ElementType;
  revealLayout: boolean;
}

const Card = ({
  handleShuffle,
  title,
  description,
  position,
  Icon,
  revealLayout,
}: CardProps) => {
  const mousePosRef = useRef(0);

  const onDragStart = (e: MouseEvent) => {
    mousePosRef.current = e.clientX;
  };

  const onDragEnd = (e: MouseEvent) => {
    const diff = mousePosRef.current - e.clientX;

    if (diff > 150) {
      handleShuffle("left");
    } else if (diff < -150) {
      handleShuffle("right");
    }

    mousePosRef.current = 0;
  };

  const onCardClick = () => {
    if (position === "middle") {
      handleShuffle("right");
    } else if (position === "back") {
      handleShuffle("left");
    }
  };

  const x =
    position === "front" ? "0%" : position === "middle" ? "-55%" : "55%";
  const rotateZ =
    position === "front" ? "0deg" : position === "middle" ? "-10deg" : "10deg";
  const zIndex = position === "front" ? "2" : position === "middle" ? "1" : "0";

  const draggable = position === "front";

  return (
    <motion.div
      style={{
        zIndex,
        transformOrigin: "center center",
      }}
      initial={{ x: "0%", rotate: "0deg" }}
      animate={
        revealLayout ? { rotate: rotateZ, x } : { x: "0%", rotate: "0deg" }
      }
      drag
      dragElastic={0.35}
      dragListener={draggable}
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onCardClick}
      transition={{
        duration: 0.35,
      }}
      className={`absolute inset-0 m-auto flex flex-col h-[450px] w-[350px] select-none items-center justify-center space-y-6 border-2 border-[#f2f2f2] bg-[#040b22]/70 p-6 shadow-xl backdrop-blur-md ${
        draggable ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
      }`}
    >
      <div className="h-56 w-56 pointer-events-none mb-2">
        <Icon className="w-full h-full" />
      </div>
      <h3 className="text-center text-3xl font-semibold text-slate-100 font-clash-display">
        {title}
      </h3>
      <p className="text-center text-base text-slate-400 font-satoshi leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default ShuffleCards;
