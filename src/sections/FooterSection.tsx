import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FooterSectionProps {
  t: (ru: string, kg: string) => string;
}

export default function FooterSection({ t }: FooterSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const items = content.querySelectorAll('.ft-item');
    gsap.fromTo(
      items,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="relative w-full py-16 sm:py-20 lg:py-24"
      style={{ background: '#2C2421' }}
    >
      {/* Subtle ornamental pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 C35 15, 45 20, 30 30 C15 20, 25 15, 30 5Z' fill='none' stroke='%23C9A96E' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      <div
        ref={contentRef}
        className="relative z-10 max-w-2xl mx-auto px-6 sm:px-8 text-center"
      > 
      <p
          className="ft-item font-display italic mb-8"
          style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
            color: '#F5F0E8',
            opacity: 0,
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          {t('Той ээлери:',
'Организаторы праздника')}
        </p>
         {/* Names */}
        <p
          className="ft-item font-script mb-2"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: '#C9A96E',
            opacity: 0,
          }}
        >
          Мурат & Эльвира
        </p>

        {/* Date */}
        <p
          className="ft-item font-body text-caption mb-8"
          style={{
            color: '#F5F0E8',
            opacity: 0,
            fontSize: '0.8rem',
            letterSpacing: '0.15em',
          }}
        >
          28.08.2026
        </p>

        {/* Gold divider */}
        <div className="ft-item flex items-center justify-center mb-8" style={{ opacity: 0 }}>
          <div
            style={{
              width: '120px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
            }}
          />
        </div>

        {/* Quote */}
        <p
          className="ft-item font-display italic mb-8"
          style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
            color: '#F5F0E8',
            opacity: 0,
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          {t(
            'Любовь — это не то, что ты ищешь. Любовь — это то, что ищет тебя.',
            'Сүйүү — сен издеген нерсе эмес. Сүйүү — сени издеген нерсе.'
          )}
        </p>

        {/* Bottom text */}
        <p
          className="ft-item font-body text-caption flex items-center justify-center gap-1"
          style={{
            color: '#C9A96E',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            opacity: 0,
          }}
        >
          {t('С любовью', 'Сүйүү менен')}
          <Heart className="w-3 h-3 inline fill-gold text-gold" />
        </p>
      </div>
    </footer>
  );
}
