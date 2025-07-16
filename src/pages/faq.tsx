import React, { useState } from 'react';
import { PixelBox, PixelDivider } from '../components';

// Type definitions for FAQ items
interface FaqItem {
    question: string;
    answer: string;
}

// Enhanced FAQ Item Component with smoother animations
const FaqItem = ({ question, answer }: FaqItem) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    
    // Handle toggle with animation timing
    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };
    
    return (
        <div className="mb-6 animate-fadeIn">
            <PixelBox 
                color={isOpen ? "yellow" : "white"}
                className={`overflow-hidden ${isHovered && !isOpen ? 'transform scale-[1.02] shadow-lg' : ''} 
                transition-all duration-500 ease-out`}
            >
                <button 
                    className="w-full text-left p-5 flex justify-between items-center focus:outline-none group"
                    onClick={toggleAccordion}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    aria-expanded={isOpen}
                >
                    <span className={`font-display ${isOpen ? 'text-gray-900' : 'text-gray-800'} text-base md:text-lg
                        ${isHovered ? 'transform translate-x-1' : ''} transition-all duration-300`}>
                        {question}
                    </span>
                    
                    {/* Enhanced 8-bit style arrow with animation */}
                    <div 
                        className={`relative transition-all duration-500 ease-bounce transform
                        ${isOpen ? 'rotate-180 scale-110' : 'scale-100'}`}
                        style={{ imageRendering: 'pixelated' }}
                    >
                        <div className="w-6 h-6 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* Pixel arrow with multi-color effect on hover */}
                                <div className={`w-3 h-3 transform rotate-45 translate-y-[-2px] 
                                    ${isOpen ? 'bg-sekunder-yellow' : isHovered ? 'bg-sekunder-blue' : 'bg-gray-500'} 
                                    transition-colors duration-300`}>
                                </div>
                            </div>
                        </div>
                    </div>
                </button>
                
                {/* Enhanced Answer Content with staggered animation */}
                <div 
                    className="overflow-hidden transition-all duration-500 ease-custom"
                    style={{ 
                        maxHeight: isOpen ? '500px' : '0',
                        opacity: isOpen ? 1 : 0,
                    }}
                >
                    <div className={`p-4 sm:p-5 pt-2 text-gray-600 font-mono text-xs sm:text-sm md:text-base
                        ${isOpen ? 'animate-contentFadeIn' : ''}`}>
                        {answer}
                    </div>
                </div>
            </PixelBox>
        </div>
    );
};

// Main FAQ Component with enhanced animations
const FAQ: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    
    // Use effect for section entrance animation
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300);
        
        return () => clearTimeout(timer);
    }, []);
    
    // FAQ data
    const faqData: FaqItem[] = [
        {
            question: "Siapa saja yang boleh mendaftar?",
            answer: "Pelajar aktif tingkat SMA/SMK sederajat dan Mahasiswa aktif (S1/Diploma) dari seluruh Perguruan Tinggi (PTN/PTS) di Indonesia."
        },
        {
            question: "Apakah kompetisi ini berbayar?",
            answer: "GRATIS untuk tim yang seluruh anggotanya merupakan mahasiswa STT Terpadu Nurul Fikri. Untuk tim lainnya, dikenakan biaya pendaftaran: Gelombang 1 (1-10 Juli 2025): Rp30.000,- dan Gelombang 2 (11-20 Juli 2025): Rp60.000,-."
        },
        {
            question: "Apakah saya harus sudah punya tim saat mendaftar?",
            answer: "Ya, pendaftaran dilakukan per tim (2-4 orang). Pendaftaran diwakilkan oleh ketua tim."
        },
        {
            question: "Bagaimana jika ada anggota tim yang bukan member GDGoC NF?",
            answer: "Anggota tersebut bisa mendaftar sebagai member terlebih dahulu melalui link yang tersedia di bagian persyaratan."
        }
    ];

    return (
        <section id="faq" className="py-8 sm:py-16 md:py-24 relative">
            {/* Animation keyframes */}
            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    
                    @keyframes contentFadeIn {
                        0% { opacity: 0; transform: translateY(10px); }
                        100% { opacity: 1; transform: translateY(0); }
                    }
                    
                    @keyframes pixelPulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.2); }
                        100% { transform: scale(1); }
                    }
                    
                    .animate-fadeIn {
                        animation: fadeIn 0.6s ease-out forwards;
                    }
                    
                    .animate-contentFadeIn {
                        animation: contentFadeIn 0.4s ease-out 0.1s forwards;
                    }
                    
                    .ease-bounce {
                        transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    }
                    
                    .ease-custom {
                        transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
                    }
                `}
            </style>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-3xl">
                {/* Section Title with pixel animations */}
                <div 
                    className="text-center mb-12 transition-all duration-700"
                    style={{ 
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(-20px)'
                    }}
                >
                    <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl inline-block relative px-4 py-2">
                        <span className="relative z-10 text-gray-800">FREQUENTLY ASKED QUESTIONS</span>
                        <span className="absolute inset-0 bg-sekunder-blue opacity-20 transform"></span>
                    </h2>
                    <PixelDivider align="center" className="mt-4 mx-auto" />
                </div>
                
                {/* FAQ Items with staggered animations */}
                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <div 
                            key={index} 
                            style={{ 
                                opacity: 0,
                                animation: isVisible ? 'fadeIn 0.5s ease-out forwards' : 'none',
                                animationDelay: `${0.3 + (index * 0.1)}s`
                            }}
                        >
                            <FaqItem 
                                question={item.question} 
                                answer={item.answer} 
                            />
                        </div>
                    ))}
                </div>
                
                {/* WhatsApp CTA Button */}
                <div 
                    className="flex justify-center mt-10 mb-8 transition-all duration-700"
                    style={{ 
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                        transitionDelay: '0.5s'
                    }}
                >
                    <a 
                        href="https://wa.me/+6283199419988" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-3d bg-green-600 inline-flex items-center gap-3 px-5 py-3 relative overflow-hidden"
                        style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "10px" }}
                    >
                        {/* WhatsApp Icon (8-bit styled) */}
                        <div className="w-5 h-5 flex items-center justify-center bg-white p-1" style={{ imageRendering: 'pixelated' }}>
                            <div className="w-full h-full bg-green-600 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                                    <path fill="white" d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                                </svg>
                            </div>
                        </div>
                        <span className="text-white">Ada Pertanyaan? Tanya Admin</span>
                    </a>
                </div>
                
                {/* Interactive Pixel Art Decorations */}
                <div 
                    className="flex justify-center mt-6 transition-all duration-700"
                    style={{ 
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                        transitionDelay: '0.6s'
                    }}
                >
                    <div className="flex space-x-3">
                        <div className="w-3 h-3 bg-sekunder-blue hover:animate-[pixelPulse_0.6s_ease-in-out_infinite] cursor-pointer"></div>
                        <div className="w-3 h-3 bg-sekunder-green hover:animate-[pixelPulse_0.6s_ease-in-out_infinite] cursor-pointer"></div>
                        <div className="w-3 h-3 bg-sekunder-yellow hover:animate-[pixelPulse_0.6s_ease-in-out_infinite] cursor-pointer"></div>
                        <div className="w-3 h-3 bg-sekunder-green hover:animate-[pixelPulse_0.6s_ease-in-out_infinite] cursor-pointer"></div>
                        <div className="w-3 h-3 bg-sekunder-blue hover:animate-[pixelPulse_0.6s_ease-in-out_infinite] cursor-pointer"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
