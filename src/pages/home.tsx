import React, { useRef } from 'react';
import Arrow from '../three/arrow';
import PixelTransition from '../blocks/Animations/PixelTransition/PixelTransition';
import Countdown from './countdown';
import ScrambledText from '../blocks/TextAnimations/ScrambledText/ScrambledText';
import { useStarAnimation } from '../hooks/useStarAnimation';

// ============================
// UTILITY FUNCTIONS
// ============================
const getTotalSecondsToDate = (targetDate: Date): number => {
    const now = new Date();
    const diffInMs = targetDate.getTime() - now.getTime();
    return Math.max(0, Math.floor(diffInMs / 1000));
};

// ============================
// MAIN COMPONENT
// ============================
export default function Home() {
    // ============================
    // REFS & HOOKS
    // ============================
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useStarAnimation(canvasRef);

    // ============================
    // RENDER
    // ============================

    return (
        <>
            {/* ============================
                BACKGROUND ANIMATION CANVAS
                ============================ */}
            <canvas 
                ref={canvasRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                    zIndex: 1,
                }}
                aria-hidden="true"
            />
            
            {/* ============================
                MAIN CONTENT
                ============================ */}
            <div className="" style={{ position: 'relative', zIndex: 10 }}>
                {/* Navigation */}
                <nav className="flex items-center justify-center pb-5 pt-4">
                    <div className="w-16 h-full">
                        <img 
                            src="/gdg.png" 
                            alt="GDG (Google Developer Group) logo" 
                            loading="lazy" 
                        />
                    </div>
                </nav>
            </div>

            {/* Hero Section */}
            <div className="mt-6 md:mt-16 mx-auto w-full md:w-3/4" style={{ position: 'relative', zIndex: 10 }}>
                <div className="px-16 flex flex-col items-center">
                    <span className="font-subhero text-sm sm:text-2xl md:mb-6 font-bold text-slate-500">
                        welcome to
                    </span>
                    
                    <PixelTransition
                        className="w-full h-fit overflow-hidden bg-transparent"
                        gridSize={10}
                        pixelColor="#fff"
                        animationStepDuration={0.3}
                        firstContent={
                            <div className="grid place-items-center w-full h-full">
                                <img 
                                    className="w-full h-auto" 
                                    src="/pixels.png" 
                                    alt="pixels challenge" 
                                    loading="lazy" 
                                />
                            </div>
                        }
                        secondContent={
                            <div className="h-full" />
                        }
                    />
                    
                    <div className="mt-6 md:mt-20 flex flex-col md:flex-row items-center gap-12 md:gap-20">
                        <a 
                            href="#countdown" 
                            className="btn-3d bg-primer-green rounded-none font-display text-xs px-2 py-3 md:w-none md:text-lg md:px-5 md:py-4"
                        >
                            get started
                        </a>
                        <a 
                            href="#_" 
                            onClick={() => alert('handbook will available soon')} 
                            className="font-display text-xs md:text-lg hover:underline"
                        >
                            get handbook
                        </a>
                    </div>
                </div>
            </div>

            {/* Countdown Section */}
            <div 
                id="countdown" 
                className="mt-28 md:mt-48 mx-auto px-12 md:px-36" 
                style={{ position: 'relative', zIndex: 10 }}
            >
                <PixelTransition
                    className="w-full h-full md:h-[35rem] overflow-hidden rounded-xl bg-transparent"
                    gridSize={10}
                    pixelColor="#fff"
                    animationStepDuration={0.3}
                    firstContent={
                        <div className="grid place-items-center w-full h-full">
                            <div>
                                <p className="font-hero text-center text-base md:text-4xl font-bold">
                                    <b className="text-sekunder-green">c</b>o
                                    <b className="text-sekunder-blue">m</b>m
                                    <b className="text-sekunder-red">i</b>ng{' '}
                                    <b className="text-sekunder-yellow">s</b>o
                                    <b className="text-sekunder-red">o</b>n
                                    <b className="text-sekunder-blue">!</b>
                                </p>
                                <Countdown 
                                    initialSeconds={getTotalSecondsToDate(new Date('2025-07-12T19:00:00'))} 
                                />
                            </div>
                        </div>
                    }
                    secondContent={
                        <div className="h-full col-span-2 bg-sekunder-blue rounded-r">
                            <Arrow />
                        </div>
                    }
                />
            </div>

            {/* Pixels Perfection Section */}
            <div 
                className="mt-24 md:mt-56 grid-background mx-auto w-full bg-[#1e1e1e] rounded-t-xl px-0 md:px-6 pb-4 pt-20" 
                style={{ position: 'relative', zIndex: 10 }}
            >
                <ScrambledText
                    className="m-[7vw] max-w-[880px] text-[clamp(14px,4vw,32px)] font-mono font-extrabold text-white"
                    radius={50}
                    duration={1.2}
                    speed={0.5}
                    scrambleChars={'.:'}
                >
                    Meet The{' '}
                    <b className="text-sekunder-blue">P</b>
                    <b className="text-sekunder-red">I</b>
                    <b className="text-sekunder-yellow">X</b>
                    <b className="text-sekunder-blue">E</b>
                    <b className="text-sekunder-green">L</b>
                    <b className="text-sekunder-red">S</b>{' '}
                    Perfection
                </ScrambledText>
            </div>
        </>
    );
}
