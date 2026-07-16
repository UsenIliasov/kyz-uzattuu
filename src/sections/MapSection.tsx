import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface MapSectionProps {
  t: (ru: string, kg: string) => string;
}

export default function MapSection({ t }: MapSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const button = buttonRef.current;
    const heading = headingRef.current;
    if (!section || !card || !button || !heading) return;

    // Heading
    const words = heading.querySelectorAll('.map-word');
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

    // Card fade in
    gsap.fromTo(
      card,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Button slide up
    gsap.fromTo(
      button,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: button,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  const splitWords = (text: string) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="map-word inline-block mr-[0.3em]" style={{ opacity: 0 }}>
        {word}
      </span>
    ));
  };

  // Direct Google Maps search link for the hotel
  const directionsUrl =
    'https://www.google.com/maps/search/?api=1&query=Jannat+Regency+Hotel%2C+21+2+Aaly+Tokombaev+St%2C+Bishkek+720060';

  // OpenStreetMap iframe as a reliable fallback
  const osmEmbedUrl =
    'https://www.openstreetmap.org/export/embed.html?bbox=74.57%2C42.86%2C74.63%2C42.89&layer=mapnik&marker=42.875%2C74.60';

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 lg:py-36"
      style={{ background: '#EDE6D6' }}
    >
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-display text-section text-center mb-10 sm:mb-14"
          style={{ color: '#2C2421', fontWeight: 400 }}
        >
          {splitWords(t('Как добраться', 'Кантип жетүү'))}
        </h2>

        {/* Map + Address Card */}
        <div
          ref={cardRef}
          className="relative w-full overflow-hidden"
          style={{
            border: '1px solid rgba(201, 169, 110, 0.4)',
            opacity: 0,
          }}
        >
          {/* Address info bar */}
          <div
            className="flex items-center gap-3 px-6 py-4"
            style={{
              background: '#FAF8F5',
              borderBottom: '1px solid rgba(201, 169, 110, 0.3)',
            }}
          >
            <MapPin className="w-5 h-5 flex-shrink-0" style={{ color: '#C9A96E' }} />
            <div>
              <p className="font-body font-medium" style={{ color: '#2C2421', fontSize: '0.95rem' }}>
                Jannat Regency Hotel
              </p>
              <p className="font-body" style={{ color: '#2C2421', fontSize: '0.85rem', opacity: 0.7 }}>
                21, 2 Aaly Tokombaev St, Bishkek 720060
              </p>
            </div>
          </div>

          {/* Map iframe */}
          <div style={{ height: 'clamp(300px, 45vw, 420px)' }}>
            <iframe
              src={osmEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.2) sepia(0.08)' }}
              loading="lazy"
              title={t('Карта ресторана Жаннат', 'Жаннат ресторанын картасы')}
            />
          </div>
        </div>

        {/* Directions button */}
        <div className="flex justify-center mt-8">
          <a
            ref={buttonRef}
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body cursor-pointer inline-block transition-all duration-300 hover:scale-105"
            style={{
              padding: '0.875rem 2.5rem',
              background: '#2C2421',
              color: '#F5F0E8',
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              opacity: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#6B2737';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#2C2421';
            }}
          >
            {t('Построить маршрут', 'Маршрут түзүү')}
          </a>
        </div>
      </div>
    </section>
  );
}
