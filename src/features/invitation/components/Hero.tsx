"use client"; 

import { useEffect } from "react";
import Image from "next/image";
import { Alex_Brush, Playfair_Display } from "next/font/google";
import { VALERIA_DATA } from "../../../data/content";

import AOS from "aos";
import "aos/dist/aos.css";

const alexBrush = Alex_Brush({ weight: "400", subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });

export const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200, 
      once: true,     
    });
  }, []);

  return (
    <section className="relative h-screen w-full flex flex-col overflow-hidden bg-stone-950">
      <div className="absolute inset-0 z-0" data-aos="fade-in">
        <Image
          src="/fondo.jpg"
          alt="Quinceañera"
          fill
          priority
          className="object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/90" />
      </div>

      <div className="relative z-10 flex flex-col h-full w-full p-6">
        <div
          data-aos="fade-down"
          data-aos-delay="300" 
          className="w-full flex justify-center pt-20 md:pt-28"
        >
          <div className="max-w-[80%]">
            <h1 className={`${alexBrush.className} text-5xl md:text-8xl text-amber-100 text-center leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]`}>
              Mis XV Años
            </h1>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="600"
          className="mt-auto w-full flex flex-col items-center pb-12"
        >
          <h2 className={`${playfair.className} text-2xl md:text-5xl tracking-[0.3em] text-white uppercase text-center drop-shadow-lg`}>
            {VALERIA_DATA.name}
          </h2>

          <div className="mt-6 w-px h-14 bg-linear-to-b from-amber-200/50 to-transparent" />
        </div>
      </div>

      <div 
        data-aos="zoom-in" 
        data-aos-duration="2000"
        className="absolute inset-4 border border-white/5 pointer-events-none z-20" 
      />
    </section>
  );
};