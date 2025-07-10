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

    const getTime = (totalSeconds: number): { hours: number; minutes: number; seconds: number } => {
        const hours: number = Math.floor(totalSeconds / 3600);
        const minutes: number = Math.floor((totalSeconds % 3600) / 60);
        const seconds: number = totalSeconds % 60;

        return {
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    };

    return (
        <div className='mt-4 md:mt-14 font-hero flex items-center justify-center gap-4'>
            <Counter
                value={getTime(timeRemaining).hours}
                places={[100, 10, 1]}
                fontSize={80}
                padding={5}
                gap={10}
                textColor="black"
                fontWeight={900}
            />
            :
            <Counter
                value={getTime(timeRemaining).minutes}
                places={[10, 1]}
                fontSize={80}
                padding={5}
                gap={10}
                textColor="black"
                fontWeight={900}
            />
            :
            <Counter
                value={getTime(timeRemaining).seconds}
                places={[10, 1]}
                fontSize={80}
                padding={5}
                gap={10}
                textColor="black"
                fontWeight={900}
            />
        </div>
    );
};

export default Countdown;
