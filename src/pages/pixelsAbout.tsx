import React from 'react';
import PixelBox from '../components/PixelBox';
import PixelDivider from '../components/PixelDivider';

const PixelsAbout: React.FC = () => {
    return (
        <div>
            {/* Main About Section */}
            <section id="about" className="py-8 md:py-16 lg:py-24 relative overflow-hidden">
                {/* Background Animation Stars sudah ada dari useStarAnimation */}
                
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                        {/* Left Content */}
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h2 className="font-hero text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-800 leading-tight">
                                    Apa itu 
                                    <span className="block font-display text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-sekunder-blue mt-2">
                                        PIXELS Challenge?
                                    </span>
                                </h2>
                                <PixelDivider align="left" className="mt-6" />
                            </div>

                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p className="text-sm font-mono sm:text-base md:text-lg">
                                    <strong className="text-gray-800">PIXELS Challenge</strong> adalah lomba Desain Produk berbasis studi kasus yang mendorong peserta untuk menggabungkan konsep desain UI/UX dan Produk dengan Tujuan Pembangunan Berkelanjutan (SDGs).
                                </p>
                                
                                <p className="font-mono text-xs sm:text-sm md:text-base">
                                    Kompetisi ini berfokus pada pengembangan solusi inovatif yang dapat diimplementasikan, dengan penekanan pada visual kreatif, kerja sama tim, pemecahan masalah, dan inovasi bisnis, serta <strong className="text-sekunder-blue">wajib memanfaatkan potensi kecerdasan buatan (AI)</strong>.
                                </p>
                            </div>

                            {/* 8-bit Style Features */}
                            <div className="grid grid-cols-2 gap-4 mt-6 md:mt-8">
                                <PixelBox color="green">
                                    <div className="font-display text-xs md:text-sm text-gray-800">
                                        UI/UX Design
                                    </div>
                                </PixelBox>
                                <PixelBox color="blue">
                                    <div className="font-display text-xs md:text-sm text-gray-800">
                                        AI Integration
                                    </div>
                                </PixelBox>
                                <PixelBox color="red">
                                    <div className="font-display text-xs md:text-sm text-gray-800">
                                        Product or Business
                                    </div>
                                </PixelBox>
                                <PixelBox color="yellow">
                                    <div className="font-display text-xs md:text-sm text-gray-800">
                                        Social Impact
                                    </div>
                                </PixelBox>
                            </div>
                        </div>

                        {/* Right Content - 8-bit Illustration */}
                        <div className="relative mt-8 lg:mt-0">
                            {/* Main Pixel Art Container */}
                            <PixelBox color="gray" className="p-3 sm:p-4 md:p-6 lg:p-8">
                                {/* Pixel Art Design & Innovation Illustration */}
                                <div className="space-y-3 sm:space-y-4 md:space-y-6 text-center">
                                    {/* Monitor/Screen */}
                                    <div className="bg-gray-800 border-2 md:border-4 border-gray-600 p-2 sm:p-3 md:p-4 lg:p-6 mx-auto max-w-xs">
                                        <div className="bg-sekunder-blue h-8 sm:h-10 md:h-12 lg:h-16 xl:h-20 border-2 border-gray-600 flex items-center justify-center">
                                            <div className="font-display text-white text-xs md:text-sm">
                                                DESIGN
                                            </div>
                                        </div>
                                        <div className="bg-gray-700 h-1 sm:h-2 md:h-4 mt-1 sm:mt-2 border-2 border-gray-600"></div>
                                    </div>

                                    {/* Connecting Elements */}
                                    <div className="flex justify-center space-x-2 md:space-x-4">
                                        <div className="w-3 sm:w-4 md:w-6 h-3 sm:h-4 md:h-6 bg-sekunder-green border-2 border-gray-800"></div>
                                        <div className="w-3 sm:w-4 md:w-6 h-3 sm:h-4 md:h-6 bg-sekunder-red border-2 border-gray-800"></div>
                                        <div className="w-3 sm:w-4 md:w-6 h-3 sm:h-4 md:h-6 bg-sekunder-yellow border-2 border-gray-800"></div>
                                    </div>

                                    {/* Innovation Symbol */}
                                    <PixelBox color="green" className="p-2 sm:p-3 md:p-4 mx-auto max-w-xs">
                                        <div className="font-display text-gray-800 text-xs md:text-sm text-center">
                                            Innovation
                                        </div>
                                        <div className="mt-1 sm:mt-2 flex justify-center space-x-1 md:space-x-2">
                                            <div className="w-2 sm:w-3 md:w-4 h-2 sm:h-3 md:h-4 bg-sekunder-blue"></div>
                                            <div className="w-2 sm:w-3 md:w-4 h-2 sm:h-3 md:h-4 bg-sekunder-red"></div>
                                            <div className="w-2 sm:w-3 md:w-4 h-2 sm:h-3 md:h-4 bg-sekunder-green"></div>
                                        </div>
                                    </PixelBox>
                                </div>
                            </PixelBox>

                            {/* Floating 8-bit Elements */}
                            <div className="absolute -top-2 md:-top-4 -right-2 md:-right-4 w-4 sm:w-6 md:w-8 h-4 sm:h-6 md:h-8 bg-sekunder-blue border-2 border-gray-800 animate-bounce"></div>
                            <div className="absolute -bottom-2 md:-bottom-4 -left-2 md:-left-4 w-3 sm:w-4 md:w-6 h-3 sm:h-4 md:h-6 bg-sekunder-green border-2 border-gray-800 animate-pulse"></div>
                            <div className="absolute top-1/2 -left-2 sm:-left-3 md:-left-6 w-2 sm:w-3 md:w-4 h-2 sm:h-3 md:h-4 bg-sekunder-red border-2 border-gray-800"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Themes Section */}
            <section className="py-8 sm:py-12 md:py-16 mt-8 sm:mt-12 md:mt-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-6 sm:mb-8 md:mb-12">
                        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl inline-block relative px-4 py-2">
                        <span className="relative z-10 text-gray-800">PILIH TANTANGANMU!</span>
                        <span className="absolute inset-0 bg-sekunder-green opacity-20 transform"></span>
                    </h2>
                                            <p className="font-mono text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                            Pilih salah satu dari tiga kategori topik berikut dan rancang solusi digital yang berdampak.
                    </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Sustainable Theme */}
                        <PixelBox color="white" className="text-center hover:bg-primer-green transition-colors duration-300">
                            <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 bg-primer-green border-2 md:border-4 border-gray-800 mb-3 sm:mb-4 md:mb-5 mx-auto">
                                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">🌍</span>
                            </div>
                            <h4 className="font-display text-xs sm:text-sm md:text-lg lg:text-xl font-bold mb-2 md:mb-3 text-gray-800">
                                Sustainable
                            </h4>
                            <p className="font-mono text-gray-600 text-xs md:text-sm lg:text-base leading-relaxed">
                                Solusi isu lingkungan, konsumsi dan produksi yang bertanggung jawab (SDG 12).
                            </p>
                        </PixelBox>

                        {/* Tourism Theme */}
                        <PixelBox color="white" className="text-center hover:bg-primer-blue transition-colors duration-300">
                            <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 bg-primer-blue border-2 md:border-4 border-gray-800 mb-3 sm:mb-4 md:mb-5 mx-auto">
                                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">✈️</span>
                            </div>
                            <h4 className="font-display text-xs sm:text-sm md:text-lg lg:text-xl font-bold mb-2 md:mb-3 text-gray-800">
                                Tourism
                            </h4>
                            <p className="font-mono text-gray-600 text-xs md:text-sm lg:text-base leading-relaxed">
                                Solusi memajukan sektor pariwisata untuk pertumbuhan ekonomi yang layak (SDG 8).
                            </p>
                        </PixelBox>

                        {/* HealthCare Theme */}
                        <PixelBox color="white" className="text-center hover:bg-primer-red transition-colors duration-300 sm:col-span-2 lg:col-span-1 sm:mx-auto lg:mx-0 sm:max-w-sm lg:max-w-none">
                            <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 bg-primer-red border-2 md:border-4 border-gray-800 mb-3 sm:mb-4 md:mb-5 mx-auto">
                                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">⚕️</span>
                            </div>
                            <h4 className="font-display text-xs sm:text-sm md:text-lg lg:text-xl font-bold mb-2 md:mb-3 text-gray-800">
                                HealthCare
                            </h4>
                            <p className="font-mono text-gray-600 text-xs md:text-sm lg:text-base leading-relaxed">
                                Solusi meningkatkan aksesibilitas dan kualitas layanan kesehatan (SDG 3).
                            </p>
                        </PixelBox>
                    </div>

                    {/* AI Integration Note */}
                    <div className="text-center mt-6 sm:mt-8 md:mt-10">
                        <PixelBox color="yellow" className="inline-block p-2 sm:p-3 md:p-4 transform -rotate-1">
                            <p className="font-display text-xs md:text-sm text-gray-800 font-bold">
                                ⚠️ Catatan: Semua solusi wajib mengintegrasikan inovasi berbasis AI.
                            </p>
                        </PixelBox>
                    </div>

                    {/* Final Call to Action */}
                    <div className="text-center mt-6 sm:mt-8 md:mt-12">
                        <a 
                            href="#countdown" 
                            className="btn-secondary-standard"
                        >
                            Daftar Sekarang
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PixelsAbout;
