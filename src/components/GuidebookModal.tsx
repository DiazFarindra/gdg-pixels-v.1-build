import React from 'react';
import { PixelBox } from '.';

interface GuidebookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GuidebookModal: React.FC<GuidebookModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-2 md:p-4 modal-backdrop bg-black/20">
      <div className="relative w-full max-w-6xl h-full max-h-[98vh] md:max-h-[95vh] animate-in fade-in zoom-in duration-300">
        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-3 md:mb-4">
          <PixelBox color="blue" className="text-[10px] text-[#1e1e1e] sm:text-xs md:text-sm flex-shrink-0">
            📖 Guidebook PIXELS Challenge 2.0
          </PixelBox>
          
          {/* Close Button */}
          <PixelBox 
            color="red" 
            className="text-[#1e1e1e] cursor-pointer hover:scale-105 transition-transform duration-200 text-[10px] sm:text-xs md:text-sm flex-shrink-0"
            onClick={onClose}
          >
            ✕ TUTUP
          </PixelBox>
        </div>
        
        {/* Modal Content */}
        <div className="relative h-[calc(100%-3rem)] sm:h-[calc(100%-4rem)]">
          <PixelBox color="white" className="h-full p-0 overflow-hidden">
            <div className="relative w-full h-full">
              <iframe
                src="https://drive.google.com/file/d/1Cnuv4EQNQidLd1cJXTgj_tDNe3nVslNt/preview"
                width="100%"
                height="100%"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Guidebook PIXELS Challenge 2.0"
                className="w-full h-full"
                style={{ border: 'none', minHeight: '500px' }}
                loading="lazy"
                allow="autoplay"
              >
                <div className="flex items-center justify-center h-full p-4">
                  <PixelBox color="yellow" className="text-[10px] sm:text-xs md:text-sm">
                    ⏳ Loading Guidebook...
                  </PixelBox>
                </div>
              </iframe>
              
              {/* Loading overlay */}
              <div className="absolute inset-0 bg-white flex items-center justify-center pointer-events-none opacity-0 transition-opacity duration-500" id="guidebook-loading-overlay">
                <PixelBox color="blue" className="text-[10px] sm:text-xs md:text-sm">
                  🚀 Memuat Guidebook...
                </PixelBox>
              </div>
            </div>
          </PixelBox>
        </div>
        
      </div>
      
      {/* Background Click to Close */}
      <div 
        className="absolute inset-0 -z-10" 
        onClick={onClose}
        aria-label="Close modal"
      />
    </div>
  );
};

export default GuidebookModal;