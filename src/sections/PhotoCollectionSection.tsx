import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PhotoCollectionSectionProps {
  t: (ru: string, kg: string) => string;
}

export default function PhotoCollectionSection({ t }: PhotoCollectionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const content = contentRef.current;
    if (!section || !heading || !content) return;

    // Heading
    const words = heading.querySelectorAll('.ph-word');
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

    // QR code scale in with rotation
    const qrCode = content.querySelector('.qr-code-container');
    if (qrCode) {
      gsap.fromTo(
        qrCode,
        { scale: 0.8, rotation: -5, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: content,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Button fade in
    const button = content.querySelector('.ph-button');
    if (button) {
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
            trigger: content,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Subtext fade in
    const subtext = content.querySelector('.ph-subtext');
    if (subtext) {
      gsap.fromTo(
        subtext,
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  const splitWords = (text: string) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="ph-word inline-block mr-[0.3em]" style={{ opacity: 0 }}>
        {word}
      </span>
    ));
  };

  const chiventUrl = 'https://chivent.com/e/UMEkFJXbuxbhMlnk';

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 lg:py-36"
      style={{ background: '#F5F0E8' }}
    >
      {/* Paper texture */}
      <div className="absolute inset-0 paper-texture opacity-50" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-display text-section text-center mb-4"
          style={{ color: '#2C2421', fontWeight: 400 }}
        >
          {splitWords(t('Фото и видео гостей', 'Коноктордун сүрөттөрү жана видеолору'))}
        </h2>

        <div ref={contentRef} className="text-center">
          {/* Subtext */}
          <p
            className="ph-subtext font-body mb-10"
            style={{
              color: '#2C2421',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
              opacity: 0,
              lineHeight: 1.7,
            }}
          >
            {t(
              'Делитесь моментами с нами',
              'Биз менен күндөрдү бөлүшүңүз'
            )}
          </p>

          {/* Glass card container */}
          <div
            className="glass-card p-8 sm:p-12 inline-block"
            style={{
              maxWidth: '420px',
              width: '100%',
            }}
          >
            {/* Camera icon */}
            <div
              className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ background: 'rgba(201, 169, 110, 0.15)' }}
            >
              <Camera className="w-7 h-7 text-gold" />
            </div>

            {/* QR Code */}
            <div
              className="qr-code-container mx-auto mb-6"
              style={{
                width: 'clamp(180px, 40vw, 250px)',
                height: 'clamp(180px, 40vw, 250px)',
                opacity: 0,
              }}
            >
              <img
                src="/images/qr-code.png"
                alt="QR Code"
                className="w-full h-full object-contain"
                style={{
                  border: '2px solid rgba(201, 169, 110, 0.4)',
                  padding: '8px',
                  background: '#FAF8F5',
                }}
              />
            </div>

            {/* QR caption */}
            <p
              className="font-body mb-8"
              style={{
                color: '#2C2421',
                fontSize: '0.85rem',
                opacity: 0.7,
                lineHeight: 1.6,
              }}
            >
              {t(
                'Отсканируйте QR-код, чтобы загрузить свои фотографии и посмотреть снимки других гостей.',
                'Өз сүрөттөрүңүздү жүктөө жана башка коноктордун сүрөттөрүн көрүү үчүн QR-кодду сканерлеңиз.'
              )}
            </p>

            {/* CTA Button */}
            <a
              href={chiventUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ph-button font-body inline-block cursor-pointer transition-all duration-300"
              style={{
                padding: '1rem 2.5rem',
                background: '#6B2737',
                color: '#F5F0E8',
                fontSize: '0.8rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(107, 39, 55, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {t('Открыть фотоальбом', 'Фотоальбомду ачуу')}
            </a>

            {/* Secondary link */}
            <p className="mt-4">
              <a
                href={chiventUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body transition-colors duration-300"
                style={{
                  color: '#C9A96E',
                  fontSize: '0.8rem',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#6B2737';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#C9A96E';
                }}
              >
                {t('Или перейдите по ссылке', 'Же шилтеме боюнча өтүңүз')}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
