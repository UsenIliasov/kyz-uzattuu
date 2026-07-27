import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TimelineSectionProps {
  t: (ru: string, kg: string) => string;
}

interface TimelineEvent {
  time: string;
  ru: string;
  kg: string;
}

export default function TimelineSection({ t }: TimelineSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const events: TimelineEvent[] = [
    { time: '16:00', ru: 'Сбор гостей', kg: 'Коноктордун чогулушу' },
    { time: '17:00', ru: 'Торжественная часть', kg: 'Салтанаттуу бөлүк' },
    { time: '17:30', ru: 'Ужин', kg: 'Тамактануу' },
    { time: '20:00', ru: 'Танцы и веселье', kg: 'Бий жана көңүл ачуу' },
    { time: '22:00', ru: 'Завершение вечера', kg: 'Кечени жыйынтыктоо' },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const timeline = timelineRef.current;
    const line = lineRef.current;
    if (!section || !heading || !timeline || !line) return;

    // Heading
    const words = heading.querySelectorAll('.tl-word');
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

    // Timeline line draws
    gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timeline,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: true,
        },
      }
    );

    // Timeline items
    const items = timeline.querySelectorAll('.tl-item');
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          x: i % 2 === 0 ? -30 : 30,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, []);

  const splitWords = (text: string) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="tl-word inline-block mr-[0.3em]" style={{ opacity: 0 }}>
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

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-display text-section text-center mb-16 sm:mb-20"
          style={{ color: '#2C2421', fontWeight: 400 }}
        >
          {splitWords(t('Программа вечера', 'Кеченин программасы'))}
        </h2>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5"
            style={{
              background: '#C9A96E',
              transformOrigin: 'top center',
              transform: 'translateX(-50%) scaleY(0)',
            }}
          />

          {/* Timeline items */}
          <div className="space-y-10 sm:space-y-14">
            {events.map((event, index) => (
              <div
                key={index}
                className={`tl-item relative flex items-center gap-6 sm:gap-0 ${
                  index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
                style={{ opacity: 0 }}
              >
                {/* Content */}
                <div
                  className={`flex-1 pl-8 sm:px-12 text-left ${
                    index % 2 === 0 ? 'sm:text-right' : 'sm:text-left'
                  }`}
                >
                  <p
                    className="font-body"
                    style={{
                      fontSize: 'clamp(1.5rem, 3vw, 1rem)',
                      fontWeight: 300,
                      color: '#6B2737',
                      lineHeight: 2,
                    }}
                  >
                    {event.time}
                  </p>
                  <p
                    className="font-body mt-1"
                    style={{
                      color: '#2C2421',
                      fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
                      fontWeight: 300,
                      lineHeight: 1.5,
                    }}
                  >
                    {t(event.ru, event.kg)}
                  </p>
                </div>

                {/* Center dot */}
                <div
                  className="absolute left-4 sm:left-1/2 w-2.5 h-2.5 rounded-full -translate-x-1/2"
                  style={{
                    background: '#FAF8F5',
                    border: '2px solid #C9A96E',
                    zIndex: 2,
                  }}
                />

                {/* Horizontal connector line (desktop only) */}
                <div
                  className="hidden sm:block absolute left-1/2 w-10 h-px"
                  style={{
                    background: '#C9A96E',
                    transform: index % 2 === 0 ? 'translateX(0)' : 'translateX(-100%)',
                  }}
                />

                {/* Spacer for opposite side */}
                <div className="hidden sm:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
