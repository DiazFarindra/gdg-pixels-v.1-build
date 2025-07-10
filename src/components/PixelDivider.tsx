import React from 'react';

interface PixelDividerProps {
    align?: 'left' | 'center' | 'right';
    className?: string;
}

const PixelDivider: React.FC<PixelDividerProps> = ({ align = 'center', className }) => {
    const alignmentClass = {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
    }[align];

    return (
        <div className={`flex ${alignmentClass} ${className || ''}`}>
            <div className="flex space-x-1">
                <div className="w-2 h-2 bg-sekunder-green"></div>
                <div className="w-2 h-2 bg-sekunder-blue"></div>
                <div className="w-2 h-2 bg-sekunder-red"></div>
                <div className="w-2 h-2 bg-sekunder-yellow"></div>
            </div>
        </div>
    );
};

export default PixelDivider;
