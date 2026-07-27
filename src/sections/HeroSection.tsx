import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  t: (ru: string, kg: string) => string;
}

export default function HeroSection({ t }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const image = videoContainerRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    if (!section || !text || !image || !scrollIndicator) return;

    // Image zoom animation
    gsap.fromTo(
      image,
      { scale: 1.08 },
      { scale: 1, duration: 3, ease: 'power2.out' }
    );

    // Text reveal animation - split by characters
    const chars = text.querySelectorAll('.hero-char');
    gsap.fromTo(
      chars,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.03,
        ease: 'power3.out',
        delay: 0.5,
      }
    );

    // Scroll indicator bounce
    gsap.to(scrollIndicator, {
      y: 8,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Fade out on scroll
    gsap.to(text, {
      opacity: 0,
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '50% top',
        scrub: true,
      },
    });
  }, []);

  // Helper to split text into character spans
  const splitChars = (text: string, className: string = '') => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className={`hero-char inline-block ${className}`}
        style={{ opacity: 0 }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background video */}
      <div
  ref={videoContainerRef}
  className="absolute inset-0 overflow-hidden"
  style={{
    transform: 'scale(1.08)',
  }}
>
  {/* <video
    ref={imageRef}
    className="absolute inset-0 w-full h-full object-cover"
    autoPlay
    muted
    loop
    playsInline
    poster="/images/hero-couple.jpg"
  >
    <source 
      src="/videos/proposal-video.mp4" 
      type="video/mp4" 
    />
  </video> */}
  <img
        ref={imageRef}
        src="/images/hero-couple.jpg"
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover"
      />
</div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(245,240,232,0.1) 0%, rgba(245,240,232,0.4) 50%, rgba(245,240,232,0.95) 85%, #F5F0E8 100%)',
        }}
      />

      {/* Content */}
      <div
        ref={textRef}
        className="relative z-10 text-center px-4 sm:px-6"
        style={{ marginTop: '-5vh' }}
      >
        {/* Subtitle */}
        <p
          className="font-body text-caption mb-4"
          style={{
            color: '#C9A96E',
            letterSpacing: '0.25em',
            fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)',
          }}
        >
          {splitChars(t('Приглашение на торжество', 'Тойго чакыруу'))}
        </p>

        {/* Main title */}
        <h1
          className="font-display text-hero"
          style={{
            color: '#2C2421',
            fontWeight: 300,
            lineHeight: 0.95,
            marginBottom: '0.25rem',
          }}
        >
          {splitChars(t('Кыз Узатуу', 'Кыз Узатуу'))}
        </h1>

        {/* Bride name */}
        <p
          className="font-display"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            color: '#6B2737',
            transform: 'rotate(0deg)',
            marginTop: '-0.5rem',
            marginBottom: '0.5rem',
          }}
        >
          {splitChars('Алины')}
        </p>

        {/* Gold divider */}
        <div className="flex items-center justify-center gap-3 my-6">
          <div
            style={{
              width: '60px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #C9A96E)',
            }}
          />
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            style={{ opacity: 0.6 }}
          >
            <path
              d="M10 2 C12 6, 16 8, 10 10 C4 8, 8 6, 10 2Z"
              fill="#C9A96E"
            />
            <path
              d="M10 18 C8 14, 4 12, 10 10 C16 12, 12 14, 10 18Z"
              fill="#C9A96E"
            />
          </svg>
          <div
            style={{
              width: '60px',
              height: '1px',
              background: 'linear-gradient(90deg, #C9A96E, transparent)',
            }}
          />
        </div>

        {/* Date */}
        <p
          className="font-body text-subtitle mb-2"
          style={{
            color: '#2C2421',
            fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
            letterSpacing: '0.2em',
          }}
        >
          {splitChars(t('28 Августа 2026', '2026-жылдын 28 - августу'))}
        </p>

        {/* Location */}
        <p
          className="font-body"
          style={{
            color: '#2C2421',
            fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
            opacity: 0.8,
            letterSpacing: '0.05em',
          }}
        >
          {splitChars(t('Ресторан Jannat, Бишкек', 'Ресторан Jannat, Бишкек'))}
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
      >
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, #C9A96E, transparent)',
          }}
        />
        <div
          className="rounded-full"
          style={{
            width: '6px',
            height: '6px',
            background: '#C9A96E',
          }}
        />
        <ChevronDown className="w-4 h-4 text-gold opacity-60" />
      </div>
    </section>
  );
}
