import { useState, useEffect } from 'react';
import { Counter } from '../components';

const Countdown = ({ initialSeconds = 60 }) => {
    const [timeRemaining, setTimeRemaining] = useState(initialSeconds);

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimeRemaining((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(timerInterval);
                    console.log('Countdown complete!');
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timerInterval);
    }, []);

    const getTime = (totalSeconds: number): { days: number; hours: number; minutes: number; seconds: number } => {
        const days: number = Math.floor(totalSeconds / 86400);
        const hours: number = Math.floor((totalSeconds % 86400) / 3600);
        const minutes: number = Math.floor((totalSeconds % 3600) / 60);
        const seconds: number = totalSeconds % 60;

        return {
            days,
            hours,
            minutes,
            seconds,
        };
    };

    return (
        <div className='mt-4 md:mt-14 font-hero w-full max-w-full px-2 sm:px-4'>
            {/* Mobile Layout */}
             <div className='block sm:hidden'>
                 <div className='flex items-center justify-center gap-2 max-w-xs mx-auto'>
                     {/* Days */}
                     <div className='flex flex-col items-center'>
                         <Counter
                              value={getTime(timeRemaining).days}
                              places={[100, 10, 1]}
                              fontSize={24}
                              padding={2}
                              gap={2}
                              textColor="black"
                              fontWeight={900}
                          />
                         <span className='text-xs font-bold text-black mt-1'>Hari</span>
                     </div>
                     
                     <span className='text-lg font-bold text-black'>:</span>
                     
                     {/* Hours */}
                     <div className='flex flex-col items-center'>
                         <Counter
                              value={getTime(timeRemaining).hours}
                              places={[10, 1]}
                              fontSize={24}
                              padding={2}
                              gap={2}
                              textColor="black"
                              fontWeight={900}
                          />
                         <span className='text-xs font-bold text-black mt-1'>Jam</span>
                     </div>
                     
                     <span className='text-lg font-bold text-black'>:</span>
                     
                     {/* Minutes */}
                     <div className='flex flex-col items-center'>
                         <Counter
                              value={getTime(timeRemaining).minutes}
                              places={[10, 1]}
                              fontSize={24}
                              padding={2}
                              gap={2}
                              textColor="black"
                              fontWeight={900}
                          />
                         <span className='text-xs font-bold text-black mt-1'>Menit</span>
                     </div>
                     
                     <span className='text-lg font-bold text-black'>:</span>
                     
                     {/* Seconds */}
                     <div className='flex flex-col items-center'>
                         <Counter
                              value={getTime(timeRemaining).seconds}
                              places={[10, 1]}
                              fontSize={24}
                              padding={2}
                              gap={2}
                              textColor="black"
                              fontWeight={900}
                          />
                         <span className='text-xs font-bold text-black mt-1'>Detik</span>
                     </div>
                 </div>
             </div>
             
             {/* Desktop Layout */}
             <div className='hidden sm:flex items-center justify-center gap-6 max-w-4xl mx-auto'>
                 {/* Days */}
                 <div className='flex flex-col items-center'>
                     <Counter
                          value={getTime(timeRemaining).days}
                          places={[100, 10, 1]}
                          fontSize={60}
                          padding={3}
                          gap={6}
                          textColor="black"
                          fontWeight={900}
                      />
                     <span className='text-sm md:text-base font-bold text-black mt-2'>Hari</span>
                 </div>
                 
                 <span className='text-4xl md:text-6xl font-bold text-black'>:</span>
                 
                 {/* Hours */}
                 <div className='flex flex-col items-center'>
                     <Counter
                          value={getTime(timeRemaining).hours}
                          places={[10, 1]}
                          fontSize={60}
                          padding={3}
                          gap={6}
                          textColor="black"
                          fontWeight={900}
                      />
                     <span className='text-sm md:text-base font-bold text-black mt-2'>Jam</span>
                 </div>
                 
                 <span className='text-4xl md:text-6xl font-bold text-black'>:</span>
                 
                 {/* Minutes */}
                 <div className='flex flex-col items-center'>
                     <Counter
                          value={getTime(timeRemaining).minutes}
                          places={[10, 1]}
                          fontSize={60}
                          padding={3}
                          gap={6}
                          textColor="black"
                          fontWeight={900}
                      />
                     <span className='text-sm md:text-base font-bold text-black mt-2'>Menit</span>
                 </div>
                 
                 <span className='text-4xl md:text-6xl font-bold text-black'>:</span>
                 
                 {/* Seconds */}
                 <div className='flex flex-col items-center'>
                     <Counter
                          value={getTime(timeRemaining).seconds}
                          places={[10, 1]}
                          fontSize={60}
                          padding={3}
                          gap={6}
                          textColor="black"
                          fontWeight={900}
                      />
                     <span className='text-sm md:text-base font-bold text-black mt-2'>Detik</span>
                 </div>
             </div>
        </div>
    );
};

export default Countdown;
