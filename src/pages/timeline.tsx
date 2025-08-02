import React, { useState, useEffect } from 'react';
import PixelBox from '../components/PixelBox';
import PixelDivider from '../components/PixelDivider';

// Add custom animations
const styles = `
  @keyframes timelineGrow {
    0% { 
      transform: scaleY(0);
      transform-origin: top;
    }
    100% { 
      transform: scaleY(1);
      transform-origin: top;
    }
  }
  
  @keyframes fillRight {
    0% { 
      width: 0%;
    }
    100% { 
      width: 100%;
    }
  }
  
  @keyframes pixelGlow {
    0%, 100% { 
      opacity: 0.3;
      transform: scale(1);
    }
    50% { 
      opacity: 0.6;
      transform: scale(1.1);
    }
  }
`;

interface TimelineItem {
    date: string;
    event: string;
    description: string;
    color: 'green' | 'blue' | 'red' | 'yellow';
    isCompleted?: boolean;
}

const Timeline: React.FC = () => {
    const [visibleItems, setVisibleItems] = useState<number[]>([]);
    const [timelineHeight, setTimelineHeight] = useState<string>('432px');
    
    // Function to parse date ranges and determine if event is completed
    const isEventCompleted = (dateString: string): boolean => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
        
        // Handle date ranges like "12 - 30 Juni 2025" or single dates like "02 Agustus 2025"
        const dateRegex = /(\d{1,2})\s*(?:-\s*(\d{1,2}))?\s+(\w+)\s+(\d{4})/;
        const match = dateString.match(dateRegex);
        
        if (!match) return false;
        
        const [, startDay, endDay, monthName, year] = match;
        
        // Indonesian month mapping
        const monthMap: { [key: string]: number } = {
            'januari': 0, 'februari': 1, 'maret': 2, 'april': 3, 'mei': 4, 'juni': 5,
            'juli': 6, 'agustus': 7, 'september': 8, 'oktober': 9, 'november': 10, 'desember': 11
        };
        
        const month = monthMap[monthName.toLowerCase()];
        if (month === undefined) return false;
        
        // For date ranges, use the end date; for single dates, use the start date
        const targetDay = endDay ? parseInt(endDay) : parseInt(startDay);
        const eventDate = new Date(parseInt(year), month, targetDay);
        
        // Event is completed if the end date has passed
        return today > eventDate;
    };
    
    // Function to check if event is currently active (happening now)
    const isEventActive = (dateString: string): boolean => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const dateRegex = /(\d{1,2})\s*(?:-\s*(\d{1,2}))?\s+(\w+)\s+(\d{4})/;
        const match = dateString.match(dateRegex);
        
        if (!match) return false;
        
        const [, startDay, endDay, monthName, year] = match;
        
        const monthMap: { [key: string]: number } = {
            'januari': 0, 'februari': 1, 'maret': 2, 'april': 3, 'mei': 4, 'juni': 5,
            'juli': 6, 'agustus': 7, 'september': 8, 'oktober': 9, 'november': 10, 'desember': 11
        };
        
        const month = monthMap[monthName.toLowerCase()];
        if (month === undefined) return false;
        
        const startDate = new Date(parseInt(year), month, parseInt(startDay));
        const endDate = endDay 
            ? new Date(parseInt(year), month, parseInt(endDay))
            : new Date(parseInt(year), month, parseInt(startDay));
        
        // Event is active if today is within the date range
        return today >= startDate && today <= endDate;
    };

    // Function to check if event is extended
    const isEventExtended = (eventName: string): boolean => {
        return eventName === "Pendaftaran";
    };
    
    // Calculate precise timeline height to reach the LAST node accurately
    const calculateTimelineHeight = () => {
        // First try to get actual DOM measurements for precision
        const timelineContainer = document.querySelector('.timeline-container');
        if (timelineContainer) {
            const items = timelineContainer.querySelectorAll('.timeline-item');
            if (items.length > 0) {
                const lastItem = items[items.length - 1] as HTMLElement;
                const firstItem = items[0] as HTMLElement;
                
                if (lastItem && firstItem) {
                    // Get the position of the last item's node (top-6 offset + node center)
                    const lastItemRect = lastItem.getBoundingClientRect();
                    const firstItemRect = firstItem.getBoundingClientRect();
                    const containerRect = timelineContainer.getBoundingClientRect();
                    
                    // Calculate relative distance from first to last item
                    const relativeDistance = lastItemRect.top - firstItemRect.top;
                    
                    // Add the node offset (24px for left-6) + node center (12px for w-6/2)
                    const nodeOffset = 12; // This matches the top: '36px' in the timeline line
                    
                    const calculatedHeight = relativeDistance + nodeOffset;
                    console.log(`DOM-based calculation: ${calculatedHeight}px (Distance: ${relativeDistance}px + Node offset: ${nodeOffset}px)`);
                    return `${calculatedHeight}px`;
                }
            }
        }
        
        // Fallback calculation with more accurate spacing
        const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
        const itemCount = timelineData.length; // 10 items
        const lastItemIndex = itemCount - 1; // 9 for 10 items
        
        // More accurate spacing based on actual CSS classes and content
        let itemSpacing;
        if (windowWidth >= 1024) {
            // Desktop: space-y-12 (48px) + estimated card height variation
            itemSpacing = 48 + 170; // 48px gap + ~170px average card height
        } else if (windowWidth >= 768) {
            // Tablet: space-y-12 (48px) + smaller card height
            itemSpacing = 48 + 150; // 48px gap + ~150px average card height
        } else {
            // Mobile: space-y-8 (32px) + compact card height
            itemSpacing = 32 + 130; // 32px gap + ~130px average card height
        }
        
        // Calculate to reach the exact position of the last node
        const calculatedHeight = lastItemIndex * itemSpacing;
        
        console.log(`Fallback calculation: ${calculatedHeight}px (Items: ${itemCount}, Spacing: ${itemSpacing}px, Window: ${windowWidth}px)`);
        return `${calculatedHeight}px`;
    };

    // Update timeline height on mount and resize
    const updateTimelineHeight = () => {
        const newHeight = calculateTimelineHeight();
        setTimelineHeight(newHeight);
        
        // Debug output to console
        if (typeof window !== 'undefined') {
            const itemCount = timelineData.length;
            const today = new Date().toLocaleDateString('id-ID');
            const completedCount = timelineData.filter(item => item.isCompleted).length;
            const activeCount = timelineData.filter(item => isEventActive(item.date)).length;
            
            console.log(`Timeline height updated: ${newHeight} (Window: ${window.innerWidth}px, Items: ${itemCount}, Target: LAST node)`);
            console.log(`Date status - Today: ${today}, Completed: ${completedCount}, Active: ${activeCount}`);
        }
    };

    const timelineData: TimelineItem[] = [
        {
            date: "16 Juli - 9 Agustus 2025",
            event: "Pendaftaran",
            description: "Buka pendaftaran untuk semua calon peserta.",
            color: 'blue',
            isCompleted: isEventCompleted("16 Juli - 9 Agustus 2025")
        },
        {
            date: "02 Agustus 2025",
            event: "Technical Meeting",
            description: "Penjelasan teknis, aturan, dan kriteria penilaian.",
            color: 'red',
            isCompleted: isEventCompleted("02 Agustus 2025")
        },
        {
            date: "03 Agustus 2025",
            event: "Mentorship 1",
            description: "Explore & Win: Ideation + Winning Mindset.",
            color: 'yellow',
            isCompleted: isEventCompleted("03 Agustus 2025")
        },
        {
            date: "10 Agustus 2025",
            event: "Mentorship 2",
            description: "Sustainable Product Thinking & Deep Research.",
            color: 'green',
            isCompleted: isEventCompleted("10 Agustus 2025")
        },
        {
            date: "16 Agustus 2025",
            event: "Mentorship 3",
            description: "Design Sprint: UI/UX Hands-on Workshop.",
            color: 'blue',
            isCompleted: isEventCompleted("16 Agustus 2025")
        },
        {
            date: "24 Agustus 2025",
            event: "Mentorship 4",
            description: "Present & Persuade: Pitching for Impact.",
            color: 'red',
            isCompleted: isEventCompleted("24 Agustus 2025")
        },
        {
            date: "31 Agustus 2025",
            event: "Batas Akhir Pengumpulan Karya",
            description: "Hari terakhir pengumpulan hasil karya.",
            color: 'yellow',
            isCompleted: isEventCompleted("31 Agustus 2025")
        },
        {
            date: "01 - 14 September 2025",
            event: "Penilaian Karya",
            description: "Dewan juri profesional akan menilai semua karya.",
            color: 'green',
            isCompleted: isEventCompleted("01 - 14 September 2025")
        },
        {
            date: "15 September 2025",
            event: "Pengumuman Top 5 Finalis",
            description: "Pengumuman lima tim terbaik yang melaju ke babak final.",
            color: 'blue',
            isCompleted: isEventCompleted("15 September 2025")
        },
        {
            date: "27 September 2025",
            event: "Acara Puncak & Awarding",
            description: "Presentasi final dan malam penghargaan.",
            color: 'red',
            isCompleted: isEventCompleted("27 September 2025")
        }
    ];

    useEffect(() => {
        // Multiple calculation attempts for better accuracy
        const calculateWithDelay = (delay: number) => {
            setTimeout(() => {
                updateTimelineHeight();
            }, delay);
        };
        
        // Initial calculations with increasing delays
        calculateWithDelay(100);  // Quick initial calculation
        calculateWithDelay(300);  // After animations start
        calculateWithDelay(800);  // After most animations complete
        calculateWithDelay(1500); // Final accurate calculation
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.getAttribute('data-index') || '0');
                        setVisibleItems(prev => [...prev, index]);
                        
                        // Recalculate height when items become visible (for better accuracy)
                        if (index === timelineData.length - 1) {
                            // When last item is visible, do a final height calculation
                            setTimeout(() => updateTimelineHeight(), 200);
                        }
                    }
                });
            },
            { threshold: 0.3 }
        );

        const timelineElements = document.querySelectorAll('.timeline-item');
        timelineElements.forEach((el) => observer.observe(el));

        // Handle window resize for responsive timeline height
        const handleResize = () => {
            // Multiple calculations after resize for accuracy
            setTimeout(() => updateTimelineHeight(), 100);
            setTimeout(() => updateTimelineHeight(), 300);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <style>{styles}</style>
            <section id="timeline" className="py-8 sm:py-16 md:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                {/* Clean Header */}
                <div className="text-center mb-16">
                        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl inline-block relative px-4 py-2">
                        <span className="relative z-10 text-gray-800">Timeline Acara</span>
                        <span className="absolute inset-0 bg-sekunder-red opacity-20 transform"></span>
                    </h2>
                    <p className="font-mono text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                        Ikuti setiap tahapan acara PIXELS Challenge 2025
                    </p>
                    <PixelDivider align="center" className="mt-6" />
                </div>

                {/* Compact Timeline with Clear Guide */}
                <div className="relative max-w-3xl mx-auto timeline-container">
                    {/* Main Timeline Guide Line - Dynamic responsive positioning */}
                    <div className="absolute left-4 sm:left-9 w-1 bg-gray-800 z-0" 
                         style={{ 
                             top: '36px', // Start from center of first node
                             height: timelineHeight,
                             animationName: 'timelineGrow',
                             animationDuration: '2s',
                             animationTimingFunction: 'ease-out',
                             animationFillMode: 'forwards',
                             animationDelay: '0.5s'
                         }}></div>
                    
                    <div className="space-y-8 md:space-y-12">
                        {timelineData.map((item, index) => (
                            <div 
                                key={index}
                                data-index={index}
                                className={`timeline-item relative transition-all duration-700 ${
                                    visibleItems.includes(index) 
                                        ? 'opacity-100 translate-x-0' 
                                        : 'opacity-0 translate-x-4'
                                }`}
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                {/* Timeline Node - Enhanced with Hover Animation */}
                                <div className="absolute left-6 top-6 z-10 group cursor-pointer">
                                    <div className={`w-6 h-6 border-2 border-gray-800 relative transition-all duration-300 group-hover:scale-110 ${
                                        item.isCompleted 
                                            ? 'bg-sekunder-green' 
                                            : isEventExtended(item.event)
                                                ? 'bg-sekunder-red'
                                                : isEventActive(item.date)
                                                    ? 'bg-sekunder-yellow'
                                                    : 'bg-white'
                                    }`}>
                                        {/* 8-bit corners with hover animation */}
                                        <div className="absolute -top-1 -left-1 w-2 h-2 bg-gray-800 transition-all duration-300 group-hover:w-3 group-hover:h-3"></div>
                                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-gray-800 transition-all duration-300 group-hover:w-3 group-hover:h-3"></div>
                                        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gray-800 transition-all duration-300 group-hover:w-3 group-hover:h-3"></div>
                                        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-gray-800 transition-all duration-300 group-hover:w-3 group-hover:h-3"></div>
                                        
                                        {/* Status indicator with animation */}
                                        {item.isCompleted && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-2 h-2 bg-gray-800 animate-bounce" style={{ animationDelay: `${index * 300}ms` }}></div>
                                            </div>
                                        )}
                                        
                                        {/* Current event pulse - Enhanced */}
                                        {!item.isCompleted && isEventExtended(item.event) && (
                                            <>
                                                <div className="absolute -inset-1 bg-sekunder-red animate-ping opacity-50"></div>
                                                <div className="absolute -inset-2 bg-sekunder-red animate-pulse opacity-30"></div>
                                            </>
                                        )}
                                        {!item.isCompleted && !isEventExtended(item.event) && isEventActive(item.date) && (
                                            <>
                                                <div className="absolute -inset-1 bg-sekunder-yellow animate-ping opacity-50"></div>
                                                <div className="absolute -inset-2 bg-sekunder-yellow animate-pulse opacity-30"></div>
                                            </>
                                        )}
                                        
                                        {/* Pixelated glow effect for active items */}
                                        {visibleItems.includes(index) && (
                                            <div className="absolute -inset-0.5 opacity-20 animate-pulse"
                                                 style={{
                                                     backgroundColor: item.color === 'green' ? '#34A853' :
                                                                     item.color === 'blue' ? '#4285F4' :
                                                                     item.color === 'red' ? '#EA4335' : '#F9AB00',
                                                     animationDelay: `${index * 500}ms`
                                                 }}></div>
                                        )}
                                    </div>
                                </div>

                                {/* Content Card - Refactored with PixelBox */}
                                <div className="ml-20 relative group">
                                    <PixelBox color="white" className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                        {/* Color accent with solid color animation */}
                                        <div 
                                            className="h-1 transition-all duration-500 group-hover:h-2" 
                                            style={{ 
                                                backgroundColor: item.color === 'green' ? '#34A853' :
                                                               item.color === 'blue' ? '#4285F4' :
                                                               item.color === 'red' ? '#EA4335' :
                                                               '#F9AB00',
                                                width: visibleItems.includes(index) ? '100%' : '0%',
                                                animationName: visibleItems.includes(index) ? 'fillRight' : 'none',
                                                animationDuration: visibleItems.includes(index) ? '1s' : '0s',
                                                animationTimingFunction: 'ease-out',
                                                animationFillMode: 'forwards',
                                                animationDelay: `${index * 300 + 500}ms`
                                            }}
                                        ></div>
                                        
                                        <div className="p-1 mt-4">
                                            {/* Date & Status Row */}
                                            <div className={`flex items-center  justify-between mb-4 gap-2 transition-all duration-500 ${
                                                visibleItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                                            }`} style={{ animationDelay: `${index * 200 + 300}ms` }}>
                                                <PixelBox color="gray" className="px-3 py-1 group/date bg-gray-700 hover:bg-gray-500 transition-colors duration-200">
                                                    <span className="font-display text-xs text-white hover:text-white">
                                                        {item.date}
                                                    </span>
                                                </PixelBox>
                                                
                                                <PixelBox 
                                                    color={item.isCompleted ? 'green' : isEventExtended(item.event) ? 'red' : isEventActive(item.date) ? 'yellow' : 'gray'}
                                                    className={`px-2 py-1 text-xs font-display transition-all duration-300 hover:scale-105 ${isEventActive(item.date) ? 'animate-pulse' : ''}`}
                                                >
                                                    <span className="text-gray-800">
                                                        {item.isCompleted ? 'DONE' : 
                                                         isEventExtended(item.event) ? 'EXTENDED' : 
                                                         isEventActive(item.date) ? 'ACTIVE' : 'SOON'}
                                                    </span>
                                                </PixelBox>
                                            </div>

                                            {/* Event Title */}
                                            <h3 className={`font-display text-sm sm:text-base md:text-lg text-gray-800 mb-3 leading-relaxed transition-all duration-700 ${
                                                visibleItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                                            }`} style={{ animationDelay: `${index * 200 + 500}ms` }}>
                                                {item.event}
                                            </h3>

                                            {/* Description */}
                                            <p className={`font-mono text-xs sm:text-sm text-gray-600 leading-relaxed transition-all duration-900 ${
                                                visibleItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                                            }`} style={{ animationDelay: `${index * 200 + 700}ms` }}>
                                                {item.description}
                                            </p>
                                            
                                            {/* Floating pixel decorations */}
                                            {visibleItems.includes(index) && (
                                                <>
                                                    <div className={`absolute top-2 right-2 w-1 h-1 animate-bounce opacity-60`}
                                                         style={{ 
                                                             backgroundColor: item.color === 'green' ? '#34A853' :
                                                                             item.color === 'blue' ? '#4285F4' :
                                                                             item.color === 'red' ? '#EA4335' : '#F9AB00',
                                                             animationDelay: `${index * 300 + 1000}ms`
                                                         }}></div>
                                                    <div className={`absolute bottom-2 left-2 w-1 h-1 animate-pulse opacity-40`}
                                                         style={{ 
                                                             backgroundColor: item.color === 'green' ? '#34A853' :
                                                                             item.color === 'blue' ? '#4285F4' :
                                                                             item.color === 'red' ? '#EA4335' : '#F9AB00',
                                                             animationDelay: `${index * 300 + 1500}ms`
                                                         }}></div>
                                                </>
                                            )}
                                        </div>
                                    </PixelBox>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Clean Footer */}
                <div className="text-center mt-16">
                    <PixelBox color="white" className="inline-flex items-center space-x-4 px-6 py-3">
                        <div className="w-2 h-2 bg-sekunder-blue animate-pulse"></div>
                        <p className="font-display text-xs text-gray-800">
                            Jadwal dapat berubah sewaktu-waktu.
                        </p>
                        <div className="w-2 h-2 bg-sekunder-red animate-pulse" style={{animationDelay: '300ms'}}></div>
                    </PixelBox>
                </div>
                </div>
            </section>
        </>
    );
};

export default Timeline;
