import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    function onMouseMove(e: MouseEvent) {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    }

    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        isHoveringRef.current = true;
      }
    }

    function onMouseOut(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        isHoveringRef.current = false;
      }
    }

    function animate() {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.15;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.15;

      if (cursor) {
        const size = isHoveringRef.current ? 40 : 8;
        const opacity = isHoveringRef.current ? 0.15 : 0.6;
        cursor.style.transform = `translate(${posRef.current.x - size / 2}px, ${posRef.current.y - size / 2}px)`;
        cursor.style.width = `${size}px`;
        cursor.style.height = `${size}px`;
        cursor.style.opacity = String(opacity);
        cursor.style.borderColor = isHoveringRef.current ? '#6B2737' : '#C9A96E';
        cursor.style.backgroundColor = isHoveringRef.current ? 'rgba(250, 248, 245, 0.1)' : '#C9A96E';
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none rounded-full hidden md:block"
      style={{
        zIndex: 9999,
        width: 8,
        height: 8,
        backgroundColor: '#C9A96E',
        border: '1px solid #C9A96E',
        transition: 'width 0.3s ease, height 0.3s ease, opacity 0.3s ease, border-color 0.3s ease, background-color 0.3s ease',
        mixBlendMode: 'difference',
      }}
    />
  );
}
