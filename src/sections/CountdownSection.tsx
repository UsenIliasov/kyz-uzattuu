import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CountdownSectionProps {
  t: (ru: string, kg: string) => string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownSection({ t }: CountdownSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const boxesRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const targetDate = new Date('2026-08-28T18:00:00+06:00');

  const calculateTimeLeft = useCallback(() => {
    const now = new Date().getTime();
    const target = targetDate.getTime();
    const diff = target - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }, []);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    intervalRef.current = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [calculateTimeLeft]);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const boxes = boxesRef.current;
    if (!section || !heading || !boxes) return;

    // Heading animation
    const words = heading.querySelectorAll('.cd-word');
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
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Boxes stagger in
    const boxItems = boxes.querySelectorAll('.cd-box');
    gsap.fromTo(
      boxItems,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: boxes,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  const splitWords = (text: string) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="cd-word inline-block mr-[0.3em]" style={{ opacity: 0 }}>
        {word}
      </span>
    ));
  };

  const labels = [
    { key: 'days', ru: 'Дни', kg: 'Күн' },
    { key: 'hours', ru: 'Часы', kg: 'Саат' },
    { key: 'minutes', ru: 'Минуты', kg: 'Мүнөт' },
    { key: 'seconds', ru: 'Секунды', kg: 'Секунда' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 lg:py-36 overflow-hidden"
      style={{ background: '#EDE6D6' }}
    >
      {/* Corner ornaments */}
      <div className="absolute top-8 left-8 opacity-20">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <circle cx="5" cy="5" r="3" fill="#C9A96E" />
          <circle cx="20" cy="8" r="2" fill="#C9A96E" />
          <circle cx="8" cy="20" r="2" fill="#C9A96E" />
          <path d="M5 5 Q30 0, 55 5" stroke="#C9A96E" strokeWidth="0.5" fill="none" />
          <path d="M5 5 Q0 30, 5 55" stroke="#C9A96E" strokeWidth="0.5" fill="none" />
        </svg>
      </div>
      <div className="absolute top-8 right-8 opacity-20" style={{ transform: 'scaleX(-1)' }}>
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <circle cx="5" cy="5" r="3" fill="#C9A96E" />
          <circle cx="20" cy="8" r="2" fill="#C9A96E" />
          <circle cx="8" cy="20" r="2" fill="#C9A96E" />
          <path d="M5 5 Q30 0, 55 5" stroke="#C9A96E" strokeWidth="0.5" fill="none" />
          <path d="M5 5 Q0 30, 5 55" stroke="#C9A96E" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-display text-section text-center mb-12 sm:mb-16"
          style={{ color: '#2C2421', fontWeight: 400 }}
        >
          {splitWords(t('До торжества', 'Тойго чейин'))}
        </h2>

        {/* Countdown boxes */}
        <div
          ref={boxesRef}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
        >
          {labels.map(({ key, ru, kg }) => (
            <div
              key={key}
              className="cd-box flex flex-col items-center justify-center p-6 sm:p-8"
              style={{
                background: '#FAF8F5',
                border: '1px solid rgba(201, 169, 110, 0.4)',
                opacity: 0,
              }}
            >
              <span
                className="font-display"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                  fontWeight: 300,
                  color: '#6B2737',
                  lineHeight: 1,
                }}
              >
                {String(timeLeft[key as keyof TimeLeft]).padStart(2, '0')}
              </span>
              <span
                className="font-body text-caption mt-2"
                style={{
                  color: '#2C2421',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                }}
              >
                {t(ru, kg)}
              </span>
            </div>
          ))}
        </div>

        {/* Target date */}
        <p
          className="font-body text-center mt-10"
          style={{
            color: '#2C2421',
            fontSize: '0.9rem',
            opacity: 0.6,
            letterSpacing: '0.05em',
          }}
        >
          {t('28 Августа 2026', '2026-жылдын 28-августу')} &middot; 18:00
        </p>
      </div>
    </section>
  );
}
