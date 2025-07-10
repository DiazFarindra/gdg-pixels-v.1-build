import React, { useRef, useEffect, useState } from 'react';
import PixelBox from '../components/PixelBox';
import PixelDivider from '../components/PixelDivider';
import { useInView } from 'react-intersection-observer';

// Animation component for sections with 8-bit style entry animation
const PixelatedEntry = ({ 
    children, 
    direction = 'left', 
    delay = 0 
}: { 
    children: React.ReactNode, 
    direction?: 'left' | 'right', 
    delay?: number 
}) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const alignClass = direction === 'left' ? 'items-start text-left' : 'items-end text-right';
    const animationClass = direction === 'left' ? 'translate-x-[-20px]' : 'translate-x-[20px]';

    return (
        <div 
            ref={ref}
            className={`flex flex-col ${alignClass} relative`}
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : animationClass,
                transition: `all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s`,
                imageRendering: 'pixelated'
            }}
        >
            {children}
        </div>
    );
};

// Animated pixel item for list elements with hover effects
const PixelatedItem = ({ 
    children, 
    iconContent, 
    delay = 0,
    type = 'check'
}: { 
    children: React.ReactNode, 
    iconContent: React.ReactNode,
    delay?: number,
    type?: 'check' | 'number'
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const iconColorClass = type === 'check' ? 'text-sekunder-green' : 'text-sekunder-blue';

    return (
        <li 
            className="flex items-start gap-4 transition-all duration-300 ease-in-out"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                transition: `all 0.3s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s`,
                marginLeft: isHovered ? '4px' : '0',
            }}
        >
            <div 
                className={`${iconColorClass} font-bold mt-1 text-xl flex items-center justify-center`}
                style={{
                    boxShadow: isHovered ? '0 0 0 2px currentColor' : 'none',
                    transition: 'all 0.3s ease',
                    width: type === 'check' ? '24px' : '28px',
                    height: type === 'check' ? '24px' : '28px',
                    imageRendering: 'pixelated'
                }}
            >
                {iconContent}
            </div>
            <span>{children}</span>
        </li>
    );
};

// Main component 
const RegistrationInfo: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    
    // Section reference for component structure only

    return (
        <section 
            id="register" 
            ref={sectionRef}
            className="py-16 md:py-24 relative"
        >
            
            {/* No floating animation styles */}
            
            <div className="container mx-auto px-6 lg:px-8 relative z-10">
                {/* Section Title with 8-bit styling */}
                <div className="text-center mb-12">
                    <h1 className="font-display text-2xl md:text-3xl lg:text-4xl inline-block relative px-4 py-2">
                        <span className="relative z-10 text-gray-800">PERSYARATAN & CARA DAFTAR</span>
                        <span className="absolute inset-0 bg-sekunder-yellow opacity-20 transform -skew-x-3"></span>
                    </h1>
                    <PixelDivider align="center" className="mt-4 mx-auto" />
                </div>
                
                <div className="grid lg:grid-cols-2 gap-12 relative">
                    {/* Left side animation */}
                    <PixelatedEntry direction="left" delay={0.2}>
                        <h2 className="font-display text-xl md:text-2xl text-gray-800 mb-4">
                            Persyaratan
                        </h2>
                        <PixelDivider align="left" className="mb-8" />
                        <PixelBox 
                            color="white" 
                            className="p-6 transform hover:scale-[1.01] transition-transform duration-500"
                        >
                            <ul className="space-y-5 text-gray-600 font-mono text-sm md:text-base">
                                <PixelatedItem iconContent="✓" delay={0.3}>
                                    <strong className="text-gray-800">Peserta:</strong> Pelajar aktif tingkat SMA/SMK sederajat serta Mahasiswa aktif (S1/Diploma) dari seluruh Indonesia.
                                </PixelatedItem>
                                
                                <PixelatedItem iconContent="✓" delay={0.4}>
                                    <strong className="text-gray-800">Tim:</strong> Terdiri dari 2-4 orang. Minimal 2 anggota per tim wajib terdaftar sebagai member GDGoC NF. <em className="text-xs">(Belum jadi member? <a href="https://gdg.community.dev/gdg-on-campus-sekolah-tinggi-teknologi-terpadu-nurul-fikri-jakarta-indonesia/" target="_blank" className="text-sekunder-blue hover:underline">Daftar di sini</a>)</em>.
                                </PixelatedItem>
                                
                                <PixelatedItem iconContent="✓" delay={0.5}>
                                    <strong className="text-gray-800">Orisinalitas:</strong> Karya yang diajukan harus orisinal dan belum pernah diikutsertakan dalam kompetisi lain.
                                </PixelatedItem>
                                
                                <PixelatedItem iconContent="✓" delay={0.6}>
                                    <strong className="text-gray-800">Komitmen:</strong> Wajib mengikuti seluruh rangkaian acara dan aturan yang berlaku.
                                </PixelatedItem>
                            </ul>
                        </PixelBox>
                    </PixelatedEntry>

                    {/* Right side animation */}
                    <PixelatedEntry direction="right" delay={0.3}>
                        <h2 className="font-display text-xl md:text-2xl text-gray-800 mb-4">
                            Cara Mendaftar
                        </h2>
                        <PixelDivider align="right" className="mb-8" />
                        <PixelBox 
                            color="white" 
                            className="p-6 transform hover:scale-[1.01] transition-transform duration-500"
                        >
                            <ol className="space-y-6 text-gray-600 font-mono text-sm md:text-base">
                                <PixelatedItem iconContent="1" delay={0.4} type="number">
                                    Kunjungi link pendaftaran: <a href="https://s.id/PIXELS-Regist" target="_blank" className="font-semibold text-sekunder-blue hover:underline">s.id/PIXELS-Regist</a>
                                </PixelatedItem>
                                
                                <PixelatedItem iconContent="2" delay={0.5} type="number">
                                    Klik <strong className="text-gray-800">"Get Ticket"</strong> dan isi Google Form dengan data tim yang lengkap.
                                </PixelatedItem>
                                
                                <PixelatedItem iconContent="3" delay={0.6} type="number">
                                    Setelah selesai, <strong className="text-gray-800">wajib bergabung ke Grup Whatsapp</strong> untuk mendapatkan semua informasi terbaru.
                                </PixelatedItem>
                            </ol>
                        </PixelBox>
                    </PixelatedEntry>

                    {/* Connecting pixel line for visual symmetry */}
                    <div className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 hidden lg:block">
                        <div className="h-40 w-2 bg-gray-200 mx-auto"></div>
                        <div className="h-4 w-4 bg-sekunder-green mx-auto mt-2"></div>
                        <div className="h-4 w-4 bg-sekunder-blue mx-auto mt-2"></div>
                    </div>
                </div>
                
                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <a 
                        href="https://s.id/PIXELS-Regist" 
                        target="_blank"
                        className="btn-primary-standard inline-block relative overflow-hidden group"
                    >
                        <span className="relative z-10">Daftar Sekarang!</span>
                        <span className="absolute inset-0 bg-sekunder-blue opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default RegistrationInfo;
