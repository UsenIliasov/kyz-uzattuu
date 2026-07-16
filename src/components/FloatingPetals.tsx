import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  swayOffset: number;
  rotation: number;
  rotationSpeed: number;
}

export default function FloatingPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const petalCount = isMobile ? 15 : 30;

    const colors = ['#E8D5D0', '#A8B5A0', '#C4B5D4', '#C9A96E'];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createPetal(): Petal {
      return {
        x: Math.random() * (canvas?.width || window.innerWidth),
        y: -20 - Math.random() * 100,
        size: 6 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.3 + Math.random() * 0.5,
        swayOffset: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
      };
    }

    function init() {
      petalsRef.current = [];
      for (let i = 0; i < petalCount; i++) {
        const petal = createPetal();
        petal.y = Math.random() * (canvas?.height || window.innerHeight);
        petalsRef.current.push(petal);
      }
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const petal of petalsRef.current) {
        petal.y += petal.speed;
        petal.x += Math.sin(petal.y * 0.01 + petal.swayOffset) * 0.5;
        petal.rotation += petal.rotationSpeed;

        ctx.save();
        ctx.translate(petal.x, petal.y);
        ctx.rotate(petal.rotation);
        ctx.fillStyle = petal.color;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.ellipse(0, 0, petal.size, petal.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (petal.y > (canvas?.height || window.innerHeight) + 20) {
          petal.y = -20;
          petal.x = Math.random() * (canvas?.width || window.innerWidth);
        }
      }

      animRef.current = requestAnimationFrame(animate);
    }

    resize();
    init();
    animate();

    window.addEventListener('resize', () => {
      resize();
    });

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1, opacity: 0.12 }}
    />
  );
}
