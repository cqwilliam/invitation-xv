'use client';
import { useState, useRef, useEffect } from "react";
import { VALERIA_DATA } from "../../../data/content";
import { IconButton, Stack } from "@mui/material";
import {
    PlayArrowOutlined,
    PauseOutlined,
    SkipNextOutlined,
    SkipPreviousOutlined
} from "@mui/icons-material";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

const PLAYLIST = [
    { title: "Vals de las Flores", url: "/music/song1.mp3" },
    { title: "Perfect - Ed Sheeran", url: "/music/edshean.mp3" },
];

export const Music = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState("0:00");
    const [duration, setDuration] = useState("0:00");
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio(PLAYLIST[currentIndex].url);
        const audio = audioRef.current;

        const updateProgress = () => {
            const current = audio.currentTime;
            const total = audio.duration;
            if (total) {
                setProgress((current / total) * 100);
                setCurrentTime(formatTime(current));
                setDuration(formatTime(total));
            }
        };

        audio.addEventListener('timeupdate', updateProgress);
        audio.onended = () => handleNext();

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.pause();
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = PLAYLIST[currentIndex].url;
            if (isPlaying) audioRef.current.play().catch(() => setIsPlaying(false));
        }
    }, [currentIndex]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const togglePlay = () => {
        if (isPlaying) audioRef.current?.pause();
        else audioRef.current?.play().catch(console.error);
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => setCurrentIndex((prev) => (prev + 1) % PLAYLIST.length);
    const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);

    return (
        <section className="w-full flex flex-col">

            <div className="flex flex-col items-center py-24 px-8 bg-[#FAF7ED]">
                <div data-aos="fade-up" className="flex flex-col items-center w-full max-w-sm">

                    <Stack direction="row" spacing={3} alignItems="center" className="mb-8">
                        <IconButton onClick={handlePrev} className="text-amber-800/30">
                            <SkipPreviousOutlined sx={{ fontSize: 32 }} />
                        </IconButton>

                        <IconButton
                            onClick={togglePlay}
                            className="bg-white/40 text-amber-900 p-6 hover:bg-white/60 transition-all shadow-sm"
                        >
                            {isPlaying ?
                                <PauseOutlined sx={{ fontSize: 40 }} /> :
                                <PlayArrowOutlined sx={{ fontSize: 40 }} />
                            }
                        </IconButton>

                        <IconButton onClick={handleNext} className="text-amber-800/30">
                            <SkipNextOutlined sx={{ fontSize: 32 }} />
                        </IconButton>
                    </Stack>

                    <div className="w-full space-y-4 text-center">
                        <p className={`${playfair.className} text-xl text-amber-950/80 italic tracking-wide`}>
                            {PLAYLIST[currentIndex].title}
                        </p>

                        <div className="relative w-full h-px bg-amber-200/50 rounded-full">
                            <div
                                className="absolute top-0 left-0 h-full bg-amber-700/60 transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        <div className="flex justify-between text-[10px] uppercase tracking-[0.25em] text-amber-800/40 font-bold">
                            <span>{currentTime}</span>
                            <span>{duration}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#F5F0E1] py-28 px-8">
                <div data-aos="zoom-in" className="max-w-3xl mx-auto text-center">
                    <p className={`${playfair.className} text-stone-500 italic leading-relaxed text-2xl md:text-3xl lg:text-4xl`}>
                        "{VALERIA_DATA.intro}"
                    </p>
                </div>
            </div>

        </section>
    );
};