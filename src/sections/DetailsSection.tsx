import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, MapPin, Sparkles, Car } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface DetailsSectionProps {
  t: (ru: string, kg: string) => string;
}

export default function DetailsSection({ t }: DetailsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;
    if (!section || !heading || !leftCol || !rightCol) return;

    // Heading
    const words = heading.querySelectorAll('.det-word');
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

    // Left column cards
    const leftCards = leftCol.querySelectorAll('.detail-card');
    gsap.fromTo(
      leftCards,
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: leftCol,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Right column cards
    const rightCards = rightCol.querySelectorAll('.detail-card');
    gsap.fromTo(
      rightCards,
      { x: 30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rightCol,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Icons pulse
    const icons = section.querySelectorAll('.detail-icon');
    icons.forEach((icon) => {
      gsap.fromTo(
        icon,
        { scale: 0.8 },
        {
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: icon,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, []);

  const splitWords = (text: string) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="det-word inline-block mr-[0.3em]" style={{ opacity: 0 }}>
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

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-display text-section text-center mb-12 sm:mb-16"
          style={{ color: '#2C2421', fontWeight: 400 }}
        >
          {splitWords(t('Детали торжества', 'Тойдун деталдары'))}
        </h2>

        {/* Two column layout */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Left column */}
          <div ref={leftColRef} className="space-y-6">
            {/* Date & Time */}
            <div
              className="detail-card glass-card p-6 sm:p-8"
              style={{ opacity: 0 }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="detail-icon flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(201, 169, 110, 0.15)' }}
                >
                  <Clock className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-body text-caption mb-2" style={{ color: '#C9A96E', fontSize: '0.7rem' }}>
                    {t('Дата и время', 'Күн жана убакыт')}
                  </p>
                  <p className="font-body font-medium" style={{ color: '#2C2421', fontSize: '1.1rem' }}>
                    {t('28 Августа 2026', '2026-жылдын 28-августу')}
                  </p>
                  <p className="font-body" style={{ color: '#2C2421', fontSize: '1rem', opacity: 0.8 }}>
                    18:00
                  </p>
                </div>
              </div>
            </div>

            {/* Venue */}
            <div
              className="detail-card glass-card p-6 sm:p-8"
              style={{ opacity: 0 }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="detail-icon flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(201, 169, 110, 0.15)' }}
                >
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-body text-caption mb-2" style={{ color: '#C9A96E', fontSize: '0.7rem' }}>
                    {t('Место', 'Жай')}
                  </p>
                  <p className="font-body font-medium" style={{ color: '#2C2421', fontSize: '1.1rem' }}>
                    {t('Ресторан Жаннат', 'Ресторан Жаннат')}
                  </p>
                  <p className="font-body" style={{ color: '#2C2421', fontSize: '1rem', opacity: 0.8 }}>
                    {t('Бишкек, Кыргызстан', 'Бишкек, Кыргызстан')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div ref={rightColRef} className="space-y-6">
            {/* Dress Code */}
            <div
              className="detail-card glass-card p-6 sm:p-8"
              style={{ opacity: 0 }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="detail-icon flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(201, 169, 110, 0.15)' }}
                >
                  <Sparkles className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-body text-caption mb-2" style={{ color: '#C9A96E', fontSize: '0.7rem' }}>
                    {t('Дресс-код', 'Дресс-код')}
                  </p>
                  <p className="font-body font-medium" style={{ color: '#2C2421', fontSize: '1.1rem' }}>
                    {t('Элегантный наряд', 'Элеганттык кийим')}
                  </p>
                  <p className="font-body mt-1" style={{ color: '#2C2421', fontSize: '0.9rem', opacity: 0.7, lineHeight: 1.6 }}>
                    {t(
                      'Рекомендуемые цвета: пастельные тона, золотой, бордовый',
                      'Сунушталган түстөр: пастелдик тондор, алтын, кызгылт кызыл'
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Parking */}
            <div
              className="detail-card glass-card p-6 sm:p-8"
              style={{ opacity: 0 }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="detail-icon flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(201, 169, 110, 0.15)' }}
                >
                  <Car className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-body text-caption mb-2" style={{ color: '#C9A96E', fontSize: '0.7rem' }}>
                    {t('Парковка', 'Унаа токтотуу')}
                  </p>
                  <p className="font-body font-medium" style={{ color: '#2C2421', fontSize: '1.1rem' }}>
                    {t('Бесплатная парковка', 'Акысыз унаа токтотуу')}
                  </p>
                  <p className="font-body mt-1" style={{ color: '#2C2421', fontSize: '0.9rem', opacity: 0.7 }}>
                    {t(
                      'Бесплатная парковка у ресторана для всех гостей',
                      'Бардык коноктор үчүн ресторандын жанында акысыз унаа токтотуу'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
