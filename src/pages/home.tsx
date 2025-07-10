import React, { useRef } from 'react';
import Arrow from '../three/arrow';
import { PixelTransition, ScrambledText } from '../animations';
import Countdown from './countdown';
import PixelsAbout from './pixelsAbout';
import Timeline from './timeline';
import RegistrationInfo from './registrationInfo';
import FAQ from './faq';
import { useStarAnimation, useMascotAnimation } from '../animations/hooks';

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
    const mascotContainerRef = useRef<HTMLDivElement>(null);
    useStarAnimation(canvasRef);
    useMascotAnimation(mascotContainerRef);

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
                MASCOT ANIMATION CONTAINER
                ============================ */}
            <div 
                ref={mascotContainerRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 2,
                    overflow: 'hidden'
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
                        Selamat datang di
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
                                    src="/pixels-challenge-logo.png" 
                                    alt="pixels challenge" 
                                    loading="lazy" 
                                />
                            </div>
                        }
                        secondContent={
                            <div className="h-full" />
                        }
                    />
                    
                    <div className="mt-6 md:mt-20 flex flex-row text-xs md:flex-row md:text-s items-center gap-4 md:gap-20">
                        <a 
                            href="#countdown" 
                            className="btn-primary-standard text-md"
                        >
                            Daftar Sekarang!
                        </a>
                        <a 
                            href="#_" 
                            onClick={() => alert('handbook will available soon')} 
                            className="btn-secondary-standard btn-sm"
                        >
                            Guidebook
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

            {/* Pixels About Section */}
            <div style={{ position: 'relative', zIndex: 10 }}>
                <PixelsAbout />
            </div>

            {/* Timeline Section */}
            <div style={{ position: 'relative', zIndex: 10 }}>
                <Timeline />
            </div>

            {/* ============================
                REGISTRATION INFO SECTION
                ============================ */}
            <RegistrationInfo />

            {/* ============================
                FAQ SECTION
                ============================ */}
            <FAQ />

            {/* Footer Section */}
            <div 
                className="mt-0 grid-background mx-auto w-full bg-[#1e1e1e] rounded-t-xl px-0 md:px-6 pb-12 pt-20" 
                style={{ position: 'relative', zIndex: 10 }}
            >
                {/* Pixels Title with Animation - Side by side with logo */}
                <div className="container mx-auto px-4 md:px-6 mb-8">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
                        {/* Scrambled Text */}
                        <div className="text-center md:text-left">
                            <ScrambledText
                                className="text-[clamp(16px,3.5vw,32px)] font-mono font-extrabold text-white"
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
                                Perfection!
                            </ScrambledText>
                        </div>

                        {/* GDG Logo with Pixel Transition */}
                        <div className="flex items-center w-[380px] md:w-[600px] h-[90px]">
                            <PixelTransition
                                className="w-full h-full overflow-hidden bg-transparent"
                                gridSize={8}
                                pixelColor="#1e1e1e"
                                animationStepDuration={0.3}
                                firstContent={
                                    <div className="grid place-items-center w-full h-full p-2">
                                        <img 
                                            src="/gdg-logo-white.png" 
                                            alt="GDG On Campus STT Terpadu Nurul Fikri Logo" 
                                            className="h-16 md:h-20"
                                        />
                                    </div>
                                }
                                secondContent={
                                    <div className="h-full" />
                                }
                            />
                        </div>
                        
                    </div>
                </div>
                
                {/* Footer Content */}
                <div className="container mx-auto px-6 text-center pt-6 pb-6">
                    {/* Pixel divider */}
                    <div className="flex justify-center gap-3 mb-10">
                        <div className="w-12 h-2 bg-sekunder-blue"></div>
                        <div className="w-12 h-2 bg-sekunder-green"></div>
                        <div className="w-12 h-2 bg-sekunder-yellow"></div>
                        <div className="w-12 h-2 bg-sekunder-red"></div>
                    </div>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Diselenggarakan oleh Google Developer Group on Campus (GDGoC) STT Terpadu Nurul Fikri.</p>
                    
                    <div className="mb-10 mt-14">
                        <p className="text-white font-bold mb-5 font-mono text-lg">
                            <span className="inline-block w-3 h-3 bg-sekunder-yellow mr-2"></span>
                            Hubungi Kami
                            <span className="inline-block w-3 h-3 bg-sekunder-yellow ml-2"></span>
                        </p>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-10">
                            <div className="bg-[#272727] px-4 py-3 rounded border-2 border-sekunder-green">
                                <p className="text-gray-300 font-mono">
                                    <span className="inline-block w-2 h-2 bg-sekunder-green mr-2"></span>
                                    Amanda Fiqih Hauli
                                </p>
                                <p className="text-gray-400 font-mono pl-4">0877-1275-4959</p>
                            </div>
                            <div className="bg-[#272727] px-4 py-3 rounded border-2 border-sekunder-blue">
                                <p className="text-gray-300 font-mono">
                                    <span className="inline-block w-2 h-2 bg-sekunder-blue mr-2"></span>
                                    Alif Surya Pratama
                                </p>
                                <p className="text-gray-400 font-mono pl-4">0812-8277-6949</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-center items-center my-8 gap-3">
                        <div className="w-3 h-3 bg-sekunder-blue"></div>
                        <div className="w-3 h-3 bg-sekunder-green"></div>
                        <div className="w-3 h-3 bg-sekunder-yellow"></div>
                        <div className="w-3 h-3 bg-sekunder-red"></div>
                        <div className="w-3 h-3 bg-sekunder-blue"></div>
                    </div>
                    
                    <div className="mt-8 bg-[#232323] inline-block px-6 py-3 rounded border-t-2 border-r-2 border-sekunder-blue">
                        <p className="text-sm text-gray-400 font-mono">&copy; 2025 PIXELS Challenge. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
