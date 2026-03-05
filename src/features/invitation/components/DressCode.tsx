'use client';
import Image from "next/image";
import { VALERIA_DATA } from "../../../data/content";
import RedeemOutlinedIcon from '@mui/icons-material/RedeemOutlined';
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

export const DressCode = () => {
  return (
    <section className="flex flex-col">
      
      <div className="py-24 bg-[#FFFDF5] text-center border-t border-amber-100 px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center" data-aos="fade-up">
          <h4 className="text-[12px] font-bold uppercase tracking-[0.6em] text-amber-900/50 mb-4">
            Código de Vestimenta
          </h4>
          <p className={`${playfair.className} text-4xl md:text-5xl text-amber-900 italic mb-10`}>
            {VALERIA_DATA.dressCode}
          </p>
          
          <div className="flex space-x-12">
            <div className="relative w-24 h-24 md:w-32 md:h-32 drop-shadow-md">
              <Image
                src="/terno.png"
                alt="Traje Varones"
                fill
                className="object-contain"
              />
            </div>
            <div className="relative w-24 h-24 md:w-32 md:h-32 drop-shadow-md">
              <Image
                src="/vestido.png"
                alt="Traje Mujeres"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative py-32 text-center px-6 overflow-hidden min-h-125 flex items-center justify-center">
        
        <Image
          src="/rega.jpg"
          alt="Fondo Regalo"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black/40 bg-linear-to-b from-black/60 via-black/20 to-black/60 z-0"></div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center" data-aos="fade-up">
          <h4 className="text-[13px] font-bold uppercase tracking-[0.6em] text-amber-200/90 mb-4 drop-shadow-lg">
            Sugerencia de Presente
          </h4>
          
          <p className={`${playfair.className} text-4xl md:text-6xl text-white italic mb-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]`}>
            {VALERIA_DATA.gift}
          </p>
          
          <div className="p-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-2xl transition-transform hover:scale-110">
            <RedeemOutlinedIcon sx={{ fontSize: 80, color: '#fef3c7' }} />
          </div>
        </div>
      </div>

    </section>
  );
};