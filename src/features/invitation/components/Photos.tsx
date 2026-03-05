'use client';
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

const initialPhotos = [
  { id: 1, src: "/goku.jpg", rotate: -5 },
  { id: 2, src: "/goku.jpg", rotate: 3 },
  { id: 3, src: "/goku.jpg", rotate: -2 },
  { id: 4, src: "/goku.jpg", rotate: 6 },
  { id: 5, src: "/goku.jpg", rotate: -4 },
  { id: 6, src: "/goku.jpg", rotate: 2 },
];

export const Photos = () => {
  const [cards, setCards] = useState(initialPhotos);
  const [isMounted, setIsMounted] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const opacity = useTransform(
    [x, y],
    ([latestX, latestY]: any) => {
      const distance = Math.sqrt(Math.pow(latestX, 2) + Math.pow(latestY, 2));
      return Math.max(1 - distance / 300, 0);
    }
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sendToBack = (id: number) => {
    setCards((prev) => {
      const cardToMove = prev.find((c) => c.id === id);
      const remainingCards = prev.filter((c) => c.id !== id);
      if (!cardToMove) return prev;
      return [cardToMove, ...remainingCards];
    });
    x.set(0);
    y.set(0);
  };

  if (!isMounted) return <div className="h-150" />;

  return (
    <section className="py-20 bg-[#FFFDF5] flex flex-col items-center justify-center overflow-hidden min-h-162.5">
      <div className="text-center mb-16 px-4" data-aos="fade-up">
        <h2 className="font-serif text-3xl text-amber-900 italic tracking-wide">
          Recuerdos de mi Infancia
        </h2>
        <p className="text-[10px] text-amber-800/40 uppercase tracking-[0.4em] mt-2 italic">
          — Desliza para explorar —
        </p>
      </div>

      <div className="relative w-75 h-100 md:w-95 md:h-120">
        <AnimatePresence mode="popLayout">
          {cards.map((photo, index) => {
            const isTop = index === cards.length - 1;
            const positionFromTop = cards.length - 1 - index;

            return (
              <motion.div
                key={photo.id}
                style={{
                  zIndex: index,
                  touchAction: 'none',
                  x: isTop ? x : 0,
                  y: isTop ? y : 0,
                  opacity: isTop ? opacity : 1,
                }}
                initial={{ scale: 0.9, opacity: 1, y: 0 }}
                animate={{
                  scale: 1 - positionFromTop * 0.04,
                  y: positionFromTop * -15,
                  rotate: isTop ? photo.rotate : 0,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 260, damping: 20 }
                }}
                drag={isTop}
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                onDragEnd={(_, info) => {
                  if (Math.abs(info.offset.x) > 100 || Math.abs(info.offset.y) > 100) {
                    sendToBack(photo.id);
                  }
                }}
                className="absolute inset-0 bg-white p-3 shadow-2xl border border-stone-100 rounded-sm cursor-grab active:cursor-grabbing"
              >
                <div className="relative w-full h-[88%] bg-stone-50 overflow-hidden pointer-events-none">
                  <Image
                    src={photo.src}
                    alt="Valeria"
                    fill
                    priority={isTop}
                    className="object-cover"
                  />
                  {positionFromTop > 0 && (
                    <div className="absolute inset-0 bg-amber-900/5 transition-opacity" />
                  )}
                </div>

                <div className="h-[12%] flex items-center justify-center pointer-events-none">
                  <p className="font-serif text-amber-900/40 text-[10px] uppercase tracking-widest">
                    Valeria Illary • 2026
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
};