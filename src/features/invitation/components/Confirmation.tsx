'use client';
import { useState } from 'react';
import Image from "next/image";
import { Playfair_Display, Great_Vibes } from "next/font/google";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';

const mainFont = Playfair_Display({ subsets: ["latin"] });
const scriptFont = Great_Vibes({ weight: "400", subsets: ["latin"] });

export const Confirmation = () => {
  const [loading, setLoading] = useState(false);
  const TELEFONO = "51953005851";

  const onSubmit = () => {
    setLoading(true);
    const mensaje = `¡Hola! Confirmo mi asistencia para los XV de Valeria Illary.`;
    const whatsappUrl = `https://wa.me/${TELEFONO}?text=${encodeURIComponent(mensaje)}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setLoading(false);
    }, 500);
  };

  return (
    <section className="py-24 px-6 bg-[#FAF7ED] text-center overflow-hidden">
      <div className="max-w-3xl mx-auto flex flex-col items-center">

        <h2 className={`${scriptFont.className} text-6xl md:text-7xl text-amber-950 mb-8`}>
          Asistencia
        </h2>

        <div className="relative flex items-center justify-center w-full max-w-lg mb-12">
          <div className="flex-1 h-px bg-linear-to-r from-transparent via-amber-200 to-amber-300"></div>
          <div className="mx-6 relative">
            <Image
              src="/tiaras.png"
              alt="Ornamento"
              width={40}
              height={40}
              className="relative z-10 object-contain opacity-80"
            />
          </div>
          <div className="flex-1 h-px bg-linear-to-l from-transparent via-amber-200 to-amber-300"></div>
        </div>

        <div className="max-w-2xl space-y-8 mb-16 px-4">
          <p className={`${mainFont.className} text-amber-900 font-bold text-xs uppercase tracking-[0.4em]`}>
            Espero puedas acompañarme en esta noche mágica
          </p>
          <p className="text-stone-500 text-[13px] md:text-sm italic leading-loose font-light max-w-lg mx-auto">
            Sin ti el momento no sería igual. Agradeceremos tu confirmación, pero también entendemos si por alguna razón no puedes asistir; te pedimos por favor que nos lo hagas saber.
          </p>
        </div>

        <div className="relative group">
          <button
            onClick={onSubmit}
            disabled={loading}
            className="flex items-center gap-3 px-10 py-4 border-b border-amber-800 text-amber-950 transition-all duration-500 hover:bg-amber-100/50 group"
          >
            <EmailOutlinedIcon sx={{ fontSize: 20, color: '#451a03' }} />
            <span className="font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs">
              {loading ? 'Cargando...' : 'Confirmar Asistencia'}
            </span>
          </button>

          <div className="absolute -bottom-10 -right-10 text-amber-800/30 -rotate-12 animate-float pointer-events-none">
            <PanToolAltIcon sx={{ fontSize: 32 }} />
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-12deg); }
          50% { transform: translateY(-8px) rotate(-12deg); }
        }
        .animate-float {
          animation: float 3s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};