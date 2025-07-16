import React from 'react';

interface PixelBoxProps {
    children: React.ReactNode;
    color?: 'green' | 'blue' | 'red' | 'yellow' | 'white' | 'gray';
    className?: string;
    onClick?: () => void;
}

const PixelBox: React.FC<PixelBoxProps> = ({ children, color, className, onClick }) => {
    const colorClass = color ? `pixel-box-${color}` : 'pixel-box-white';

    return (
        <div className={`pixel-box ${colorClass} ${className || ''}`} onClick={onClick}>
            <div className="corner top-left"></div>
            <div className="corner top-right"></div>
            <div className="corner bottom-left"></div>
            <div className="corner bottom-right"></div>
            {children}
        </div>
    );
};

export default PixelBox;
