import { useEffect, useRef, useCallback } from 'react';

// ============================
// TYPES & INTERFACES
// ============================
interface ColorPalette {
    light: string;
    dark: string;
}

interface Flash {
    x: number;
    y: number;
    maxLife: number;
    life: number;
    palette: ColorPalette;
    update(): void;
    draw(ctx: CanvasRenderingContext2D): void;
}

// ============================
// CONSTANTS
// ============================
const ANIMATION_CONFIG = {
    GRID_SPACING: 40,
    BASE_INTERVAL: 2000,
    PIXEL_SIZE: 3,
    MAX_LIFE: 90,
    SPARKLE_THRESHOLD: 0.8,
} as const;

const COLOR_PALETTES: ColorPalette[] = [
    { light: '#bff6be', dark: '#34a853' }, // Google Green
    { light: '#bbdbf7', dark: '#4285f4' }, // Google Blue
    { light: '#f7d7d7', dark: '#ea4335' }, // Google Red
    { light: '#fee49a', dark: '#f9ab00' }, // Google Yellow
] as const;

// Star pattern map (0 = empty, 1 = dark color, 2 = light color)
const STAR_PATTERN = [
    [0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 2, 1, 1, 0, 0],
    [0, 1, 1, 2, 2, 2, 1, 1, 0],
    [1, 1, 2, 2, 2, 2, 2, 1, 1],
    [0, 1, 1, 2, 2, 2, 1, 1, 0],
    [0, 0, 1, 1, 2, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0],
] as const;

// ============================
// FLASH CLASS
// ============================
class FlashImpl implements Flash {
    x: number;
    y: number;
    maxLife: number;
    life: number;
    palette: ColorPalette;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.maxLife = ANIMATION_CONFIG.MAX_LIFE;
        this.life = this.maxLife;
        this.palette = COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)];
    }

    update(): void {
        this.life--;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const progress = this.calculateProgress();
        const centerX = Math.floor(this.x);
        const centerY = Math.floor(this.y);
        
        this.drawStar(ctx, centerX, centerY, progress);
        this.drawSparkles(ctx, centerX, centerY, progress);
    }

    private calculateProgress(): number {
        const halfLife = this.maxLife / 2;
        return (halfLife - Math.abs(this.life - halfLife)) / halfLife;
    }

    private drawStar(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, progress: number): void {
        const mapSize = STAR_PATTERN.length;
        const mapCenter = Math.floor(mapSize / 2);

        for (let row = 0; row < mapSize; row++) {
            for (let col = 0; col < mapSize; col++) {
                const colorCode = STAR_PATTERN[row][col];
                
                if (colorCode > 0) {
                    const distance = Math.max(Math.abs(row - mapCenter), Math.abs(col - mapCenter));
                    const maxDistToDraw = progress * (mapCenter + 1);

                    if (distance < maxDistToDraw) {
                        ctx.fillStyle = colorCode === 1 ? this.palette.dark : this.palette.light;
                        
                        const x = centerX + (col - mapCenter) * ANIMATION_CONFIG.PIXEL_SIZE;
                        const y = centerY + (row - mapCenter) * ANIMATION_CONFIG.PIXEL_SIZE;
                        
                        ctx.fillRect(x, y, ANIMATION_CONFIG.PIXEL_SIZE, ANIMATION_CONFIG.PIXEL_SIZE);
                    }
                }
            }
        }
    }

    private drawSparkles(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, progress: number): void {
        if (progress > ANIMATION_CONFIG.SPARKLE_THRESHOLD) {
            ctx.fillStyle = this.palette.dark;
            
            const mapCenter = Math.floor(STAR_PATTERN.length / 2);
            const sparkleOffset = (mapCenter + 4) * ANIMATION_CONFIG.PIXEL_SIZE;
            
            // Top-right sparkle
            ctx.fillRect(
                centerX + sparkleOffset,
                centerY - sparkleOffset,
                ANIMATION_CONFIG.PIXEL_SIZE,
                ANIMATION_CONFIG.PIXEL_SIZE
            );
            
            // Bottom-left sparkle
            ctx.fillRect(
                centerX - sparkleOffset,
                centerY + sparkleOffset,
                ANIMATION_CONFIG.PIXEL_SIZE,
                ANIMATION_CONFIG.PIXEL_SIZE
            );
        }
    }
}

// ============================
// UTILITY FUNCTIONS
// ============================
const getRandomFlashPosition = (canvasWidth: number, canvasHeight: number) => {
    const randomGridX = Math.floor(Math.random() * (canvasWidth / ANIMATION_CONFIG.GRID_SPACING));
    const randomGridY = Math.floor(Math.random() * (canvasHeight / ANIMATION_CONFIG.GRID_SPACING));
    
    return {
        x: randomGridX * ANIMATION_CONFIG.GRID_SPACING,
        y: randomGridY * ANIMATION_CONFIG.GRID_SPACING,
    };
};

// ============================
// CUSTOM HOOK
// ============================
export const useStarAnimation = (canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
    const flashesRef = useRef<Flash[]>([]);
    const nextFlashTimeRef = useRef<number>(0);
    const animationIdRef = useRef<number | null>(null);

    const createFlash = useCallback((x: number, y: number) => {
        flashesRef.current.push(new FlashImpl(x, y));
    }, []);

    const updateFlashes = useCallback((ctx: CanvasRenderingContext2D) => {
        for (let i = flashesRef.current.length - 1; i >= 0; i--) {
            const flash = flashesRef.current[i];
            flash.update();
            flash.draw(ctx);

            if (flash.life <= 0) {
                flashesRef.current.splice(i, 1);
            }
        }
    }, []);

    const handleNewFlash = useCallback((currentTime: number, canvas: HTMLCanvasElement) => {
        if (currentTime > nextFlashTimeRef.current) {
            const { x, y } = getRandomFlashPosition(canvas.width, canvas.height);
            createFlash(x, y);

            // Set next flash time with random variation
            const randomVariation = Math.random() * 3000 - 1500; // -1.5s to +1.5s
            nextFlashTimeRef.current = currentTime + ANIMATION_CONFIG.BASE_INTERVAL + randomVariation;
        }
    }, [createFlash]);

    const animate = useCallback((currentTime: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Handle new flash creation
        handleNewFlash(currentTime, canvas);

        // Update and draw existing flashes
        updateFlashes(ctx);

        // Continue animation loop
        animationIdRef.current = requestAnimationFrame(animate);
    }, [handleNewFlash, updateFlashes]);

    const setupCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Disable image smoothing for crisp pixel art
        ctx.imageSmoothingEnabled = false;
        
        // Set canvas size to full viewport
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }, []);

    useEffect(() => {
        setupCanvas();

        const handleResize = () => {
            setupCanvas();
        };

        // Add event listeners
        window.addEventListener('resize', handleResize);
        animationIdRef.current = requestAnimationFrame(animate);

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
        };
    }, [animate, setupCanvas]);

    return { setupCanvas };
};
