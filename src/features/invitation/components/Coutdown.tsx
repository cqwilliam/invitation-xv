'use client';
import Image from "next/image";
import { useCountdown } from "../hooks/useCountdown";
import { VALERIA_DATA } from "../../../data/content";
import { Playfair_Display, Montserrat } from "next/font/google";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const playfair = Playfair_Display({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "600"] });

export const Countdown = () => {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(VALERIA_DATA.event.fullDateISO);

  const daysOfWeek = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const eventDay = 21;

  if (isExpired) {
    return (
      <section className="py-20 text-center bg-[#FAF7ED]">
        <p className={`${playfair.className} text-3xl text-amber-900 animate-pulse`}>
          ¡Hoy es el gran día de Valeria!
        </p>
      </section>
    );
  }

  const timeBlocks = [
    { label: 'Días', value: days },
    { label: 'Horas', value: hours },
    { label: 'Minutos', value: minutes },
    { label: 'Segundos', value: seconds },
  ];

  return (
    <section className="w-full flex flex-col overflow-hidden">

      <div className="bg-[#FAF7ED] py-16 flex flex-col items-center">
        <div className="flex flex-col items-center" data-aos="fade-up">
          <h4 className={`${playfair.className} text-3xl text-amber-900 uppercase tracking-[0.3em] mb-12`}>
            Marzo
          </h4>

          <div className="grid grid-cols-7 gap-3 md:gap-5 text-center items-center">
            {daysOfWeek.map((d, i) => (
              <span key={`dayname-${i}`} className="text-[11px] font-bold text-amber-900/60">
                {d}
              </span>
            ))}

            {daysInMonth.map(day => (
              <div key={`daynum-${day}`} className="relative w-10 h-10 flex items-center justify-center">
                {day === eventDay ? (
                  <div className="relative flex items-center justify-center">
                    <div className="absolute -top-6 z-20 w-12 h-12 flex justify-center">
                      <Image
                        src="/tiaras.png"
                        alt="Tiara"
                        width={48}
                        height={48}
                        className="object-contain drop-shadow-sm"
                      />
                    </div>
                    <div className="w-9 h-9 rounded-full absolute bg-amber-900 shadow-md" />
                    <span className="font-bold text-white z-10 relative text-base">
                      {day}
                    </span>
                  </div>
                ) : (
                  <span className="text-amber-900/40 font-medium text-sm">
                    {day}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-amber-900 py-20 flex justify-center w-full">
        <div className="flex items-center justify-center gap-1 md:gap-4" data-aos="zoom-in">
          {timeBlocks.map((block, index) => (
            <div key={block.label} className="flex items-center">

              <div className="flex flex-col items-center min-w-17.5 md:min-w-30">
                <span className={`${playfair.className} text-5xl md:text-8xl text-amber-50 font-extralight tracking-tighter`}>
                  {String(block.value).padStart(2, '0')}
                </span>
                <span className={`${montserrat.className} mt-4 text-[9px] md:text-[11px] uppercase tracking-[0.4em] text-amber-200/40 font-semibold`}>
                  {block.label}
                </span>
              </div>

              {index !== timeBlocks.length - 1 && (
                <div className="flex flex-col gap-2 mx-1 md:mx-4 opacity-30 pt-2 md:pt-4">
                  <FiberManualRecordIcon sx={{ fontSize: { xs: 6, md: 10 } }} className="text-amber-200" />
                  <FiberManualRecordIcon sx={{ fontSize: { xs: 6, md: 10 } }} className="text-amber-200" />
                  <div className="h-6" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};