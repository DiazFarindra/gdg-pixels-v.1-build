import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

// ============================
// TYPES & INTERFACES
// ============================
interface MascotFlash {
    x: number;
    y: number;
    maxLife: number;
    life: number;
    poseNumber: number;
    size: number;
    pixelElements: HTMLDivElement[];
    mascotElement: HTMLImageElement | null;
    pixelContainer: HTMLDivElement;
    shouldRemove: boolean;
    update(): void;
    show(): void;
    hide(): void;
    remove(): void;
}

// ============================
// CONSTANTS
// ============================
const ANIMATION_CONFIG = {
    GRID_SPACING: 120, // Larger spacing for mascots
    BASE_INTERVAL: 5000, // Longer interval between appearances
    MAX_LIFE: 500, // Longer life for mascots to be visible
    MIN_SIZE: 180, // Minimum mascot size
    MAX_SIZE: 280, // Maximum mascot size
    NUM_POSES: 4, // Number of available poses
    GRID_SIZE: 10, // Grid size for pixelation (similar to PixelTransition)
    ANIMATION_DURATION: 0.3, // Duration of the animation in seconds
    COLORS: ['#f4f4f4', '#f3f4f6'] // White color for pixel animation
} as const;

// ============================
// MASCOT FLASH CLASS
// ============================
class MascotFlashImpl implements MascotFlash {
    x: number;
    y: number;
    maxLife: number;
    life: number;
    poseNumber: number;
    size: number;
    pixelElements: HTMLDivElement[] = [];
    mascotElement: HTMLImageElement | null = null;
    pixelContainer: HTMLDivElement;
    delayedCall: gsap.core.Tween | null = null;
    isVisible: boolean = false;
    isLoaded: boolean = false;
    shouldRemove: boolean = false;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.maxLife = ANIMATION_CONFIG.MAX_LIFE;
        this.life = this.maxLife;
        this.poseNumber = Math.floor(Math.random() * ANIMATION_CONFIG.NUM_POSES) + 1; // 1 to 4
        this.size = Math.floor(Math.random() * (ANIMATION_CONFIG.MAX_SIZE - ANIMATION_CONFIG.MIN_SIZE)) + ANIMATION_CONFIG.MIN_SIZE;
        
        // Create container for pixels
        this.pixelContainer = document.createElement('div');
        this.pixelContainer.style.position = 'absolute';
        this.pixelContainer.style.left = `${x}px`;
        this.pixelContainer.style.top = `${y}px`;
        this.pixelContainer.style.width = `${this.size}px`;
        this.pixelContainer.style.height = `${this.size}px`;
        this.pixelContainer.style.pointerEvents = 'none';
        
        // Create pixel grid
        this.createPixelGrid();
        
        // Load mascot image
        this.loadMascot();
    }

    loadMascot(): void {
        const img = new Image();
        img.src = `/mascot/pose-${this.poseNumber}.png`;
        img.style.position = 'absolute';
        img.style.left = '0';
        img.style.top = '0';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        img.style.display = 'none';
        img.style.pointerEvents = 'none';
        
        img.onload = () => {
            this.isLoaded = true;
            this.pixelContainer.appendChild(img);
            this.mascotElement = img;
            
            // Show the mascot with animation once loaded
            this.show();
        };
    }

    createPixelGrid(): void {
        const gridSize = ANIMATION_CONFIG.GRID_SIZE;
        
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const pixel = document.createElement('div');
                pixel.style.position = 'absolute';
                pixel.style.display = 'none';
                
                // Use Google colors randomly
                const colorIndex = Math.floor(Math.random() * ANIMATION_CONFIG.COLORS.length);
                pixel.style.backgroundColor = ANIMATION_CONFIG.COLORS[colorIndex];
                
                const size = 100 / gridSize;
                pixel.style.width = `${size}%`;
                pixel.style.height = `${size}%`;
                pixel.style.left = `${col * size}%`;
                pixel.style.top = `${row * size}%`;
                
                this.pixelElements.push(pixel);
                this.pixelContainer.appendChild(pixel);
            }
        }
    }
    
    show(): void {
        if (!this.isLoaded || this.isVisible) return;
        
        this.isVisible = true;
        this.animatePixels(true);
    }
    
    hide(): void {
        if (!this.isLoaded || !this.isVisible) return;
        
        this.isVisible = false;
        this.animatePixels(false);
    }
    
    animatePixels(show: boolean): void {
        // Kill any ongoing animations
        gsap.killTweensOf(this.pixelElements);
        if (this.delayedCall) {
            this.delayedCall.kill();
            this.delayedCall = null;
        }
        
        // Reset pixels
        gsap.set(this.pixelElements, { display: 'none' });
        
        // Calculate timing
        const totalPixels = this.pixelElements.length;
        const staggerDuration = ANIMATION_CONFIG.ANIMATION_DURATION / totalPixels;
        
        // Show pixels with staggered animation
        gsap.to(this.pixelElements, {
            display: 'block',
            duration: 0,
            stagger: {
                each: staggerDuration,
                from: 'random',
            },
        });
        
        // After pixels animation, show/hide the mascot
        if (this.mascotElement) {
            this.delayedCall = gsap.delayedCall(ANIMATION_CONFIG.ANIMATION_DURATION, () => {
                if (this.mascotElement) {
                    this.mascotElement.style.display = show ? 'block' : 'none';
                }
            });
        }
        
        // Hide pixels after delay
        gsap.to(this.pixelElements, {
            display: 'none',
            duration: 0,
            delay: ANIMATION_CONFIG.ANIMATION_DURATION,
            stagger: {
                each: staggerDuration,
                from: 'random',
            },
        });
    }

    update(): void {
        this.life--;
        
        // Hide mascot when reaching 1/4 of life remaining
        if (this.life === Math.floor(this.maxLife / 4) && this.isVisible) {
            this.hide();
        }
        
        // Flag for removal when life is depleted
        if (this.life <= 0) {
            this.shouldRemove = true;
        }
    }
    
    remove(): void {
        // Clean up GSAP animations
        gsap.killTweensOf(this.pixelElements);
        if (this.delayedCall) {
            this.delayedCall.kill();
            this.delayedCall = null;
        }
        
        // Remove container from DOM if it's attached to something
        if (this.pixelContainer.parentNode) {
            this.pixelContainer.parentNode.removeChild(this.pixelContainer);
        }
    }
}

// ============================
// UTILITY FUNCTIONS
// ============================
const getRandomMascotPosition = (canvasWidth: number, canvasHeight: number) => {
    const margin = 150; // Keep mascots away from edges (increased for larger mascots)
    return {
        x: Math.floor(Math.random() * (canvasWidth - margin * 2)) + margin,
        y: Math.floor(Math.random() * (canvasHeight - margin * 2)) + margin,
    };
};

// ============================
// CUSTOM HOOK
// ============================
export const useMascotAnimation = (containerRef: React.RefObject<HTMLDivElement | null>) => {
    const mascotsRef = useRef<MascotFlash[]>([]);
    const nextMascotTimeRef = useRef<number>(0);
    const animationIdRef = useRef<number | null>(null);
    const containerElementRef = useRef<HTMLDivElement | null>(null);

    const createMascot = useCallback((x: number, y: number) => {
        const mascot = new MascotFlashImpl(x, y);
        
        // Add mascot container to the DOM
        if (containerElementRef.current) {
            containerElementRef.current.appendChild(mascot.pixelContainer);
            mascotsRef.current.push(mascot);
        }
    }, []);

    const updateMascots = useCallback(() => {
        const mascots = mascotsRef.current;
        
        // Update all mascots and remove those that are flagged
        for (let i = mascots.length - 1; i >= 0; i--) {
            const mascot = mascots[i];
            mascot.update();
            
            if (mascot.shouldRemove) {
                mascot.remove();
                mascots.splice(i, 1);
            }
        }
    }, []);

    const handleNewMascot = useCallback((currentTime: number) => {
        if (currentTime > nextMascotTimeRef.current && containerElementRef.current) {
            // Use document dimensions for absolute positioning
            const containerWidth = document.documentElement.scrollWidth;
            const containerHeight = document.documentElement.scrollHeight;
            const { x, y } = getRandomMascotPosition(containerWidth, containerHeight);
            
            createMascot(x, y);

            // Set next mascot time with random variation
            const randomVariation = Math.random() * 5000; // 0 to 5 seconds
            nextMascotTimeRef.current = currentTime + ANIMATION_CONFIG.BASE_INTERVAL + randomVariation;
        }
    }, [createMascot]);

    const animate = useCallback((currentTime: number) => {
        handleNewMascot(currentTime);
        updateMascots();
        
        // Continue animation loop
        animationIdRef.current = requestAnimationFrame(animate);
    }, [handleNewMascot, updateMascots]);

    useEffect(() => {
        // Store reference to container element
        containerElementRef.current = containerRef.current;
        
        if (!containerElementRef.current) return;
        
        // Make sure the container has position relative or absolute for proper positioning
        const currentPosition = getComputedStyle(containerElementRef.current).position;
        if (currentPosition === 'static') {
            containerElementRef.current.style.position = 'relative';
        }
        
        // Start animation loop
        animationIdRef.current = requestAnimationFrame(animate);
        
        // Cleanup function
        return () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
            
            // Remove all mascots
            mascotsRef.current.forEach(mascot => mascot.remove());
            mascotsRef.current = [];
        };
    }, [animate]);

    return { mascots: mascotsRef.current };
};
