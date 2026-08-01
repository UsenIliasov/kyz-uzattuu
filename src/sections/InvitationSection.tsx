import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface InvitationSectionProps {
  t: (ru: string, kg: string) => string;
}

export default function InvitationSection({ t }: InvitationSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const heading = headingRef.current;
    const body = bodyRef.current;
    if (!section || !frame || !heading || !body) return;

    // Frame draw animation - animate border opacity
    gsap.fromTo(
      frame,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Heading word reveal
    const words = heading.querySelectorAll('.inv-word');
    gsap.fromTo(
      words,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Body paragraphs fade in
    const paragraphs = body.querySelectorAll('.inv-para');
    gsap.fromTo(
      paragraphs,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: body,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  const splitWords = (text: string) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="inv-word inline-block mr-[0.3em]" style={{ opacity: 0 }}>
        {word}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 lg:py-36"
      style={{ background: '#F5F0E8' }}
    >
      {/* Paper texture */}
      <div className="absolute inset-0 paper-texture opacity-50" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8">
        {/* Decorative frame */}
        <div
          ref={frameRef}
          className="relative p-8 sm:p-12 lg:p-16"
          style={{
            border: '1px solid rgba(201, 169, 110, 0.4)',
            background: 'rgba(250, 248, 245, 0.6)',
            opacity: 0,
          }}
        >
          {/* Corner ornaments */}
          <CornerOrnament position="top-left" />
          <CornerOrnament position="top-right" />
          <CornerOrnament position="bottom-left" />
          <CornerOrnament position="bottom-right" />

          {/* Heading */}
          <h2
            ref={headingRef}
            className="font-display text-section text-center mb-8"
            style={{ color: '#2C2421', fontWeight: 400, lineHeight: 1.2 }}
          >
            {splitWords(t('Дорогие родные и друзья!', 'Урматтуу достор жана туугандар!'))}
          </h2>

          {/* Gold divider */}
          <div className="flex items-center justify-center mb-10">
            <div
              style={{
                width: '80px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
              }}
            />
          </div>

          {/* Body text */}
          <div ref={bodyRef} className="space-y-6">
            {/* Russian text */}
            <div className="inv-para" style={{ opacity: 0 }}>
              <p
                className="font-body text-center"
                style={{
                  color: '#2C2421',
                  fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}
              >
                {t(
                  'С огромной радостью приглашаем вас разделить с нами один из самых важных дней в нашей жизни — торжество Кыз Узатуу нашей дочери Алины.',
                  'Биздин жашообуздагы эң маанилүү күндөрдүн бири — Алинанын Кыз Узатуу тоюн биз менен бөлүшүүгө чын жүрөктөн чакырабыз.'
                )}
              </p>
            </div>

            <div className="inv-para" style={{ opacity: 0 }}>
              <p
                className="font-body text-center"
                style={{
                  color: '#2C2421',
                  fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}
              >
                {t(
                  'Пусть этот день наполнится любовью, смехом и теплом наших сердец. Ваше присутствие — самый драгоценный подарок для нас.',
                  'Бул күн сүйүү, күлкү жана жүрөгүбүздүн жылуулугу менен толсун. Сиздин катышуунуз — биз үчүн эң баалуу белек.'
                )}
              </p>
            </div>

            {/* Closing */}
            <div className="inv-para text-center pt-6" style={{ opacity: 0 }}>
              <p
                className="font-script"
                style={{
                  color: '#6B2737',
                  fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                }}
              >
                {t('Мурат и Эльвира', 'Мурат и Эльвира')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CornerOrnament({ position }: { position: string }) {
  const posClasses: Record<string, React.CSSProperties> = {
    'top-left': { top: -1, left: -1 },
    'top-right': { top: -1, right: -1, transform: 'scaleX(-1)' },
    'bottom-left': { bottom: -1, left: -1, transform: 'scaleY(-1)' },
    'bottom-right': { bottom: -1, right: -1, transform: 'scale(-1, -1)' },
  };

  return (
    <div
      className="absolute"
      style={{
        ...posClasses[position],
        width: '40px',
        height: '40px',
        opacity: 0.5,
      }}
    >
      <svg viewBox="0 0 40 40" fill="none">
        <path
          d="M0 0 L15 0 Q8 8 0 15 Z"
          fill="#C9A96E"
          opacity={0.3}
        />
        <path
          d="M2 2 L10 2 Q6 6 2 10 Z"
          fill="#C9A96E"
          opacity={0.5}
        />
      </svg>
    </div>
  );
}
