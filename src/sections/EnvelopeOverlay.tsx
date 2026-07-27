import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

interface EnvelopeOverlayProps {
  onOpen: () => void;
}

export default function EnvelopeOverlay({ onOpen }: EnvelopeOverlayProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const sealPiecesRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const topTextRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);
  const flowersRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'idle' | 'opening' | 'revealed'>('idle');
  const animatingRef = useRef(false);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Top text fades in
    tl.fromTo(topTextRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    // Envelope scales in
    tl.fromTo(envelopeRef.current,
      { scale: 0.85, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.6'
    );

    // Flowers fade in
    tl.fromTo(flowersRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    );

    // Bottom text fades in
    tl.fromTo(bottomTextRef.current,
      { opacity: 0, y: 10 },
      { opacity: 0.6, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    );

    // Seal pulse
    gsap.to(sealRef.current, {
      scale: 1.04,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1.5,
    });

    return () => {
      tl.kill();
      gsap.killTweensOf(sealRef.current);
    };
  }, []);

  const openEnvelope = useCallback(() => {
    if (animatingRef.current || phase !== 'idle') return;
    animatingRef.current = true;
    setPhase('opening');

    gsap.killTweensOf(sealRef.current);

    const tl = gsap.timeline();

    // Hide top/bottom text
    tl.to(topTextRef.current, { opacity: 0, y: -30, duration: 0.4, ease: 'power2.in' }, 0);
    tl.to(bottomTextRef.current, { opacity: 0, y: 20, duration: 0.3, ease: 'power2.in' }, 0);
    tl.to(flowersRef.current, { opacity: 0, scale: 0.8, duration: 0.5, ease: 'power2.in' }, 0);

    // Seal breaks
    tl.to(sealRef.current, { scale: 0, opacity: 0, duration: 0.25, ease: 'back.in(2)' }, 0.15);

    // Seal pieces scatter
    const pieces = sealPiecesRef.current?.querySelectorAll('.seal-piece');
    if (pieces) {
      pieces.forEach((piece, i) => {
        const angle = (i / pieces.length) * Math.PI * 2;
        const dist = 30 + Math.random() * 40;
        tl.to(piece, {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist + 30,
          rotation: (Math.random() - 0.5) * 360,
          opacity: 0,
          scale: 0.15,
          duration: 0.5,
          ease: 'power2.out',
        }, 0.15);
      });
    }

    // Flap opens
    tl.to(flapRef.current, {
      rotationX: -180,
      duration: 0.7,
      ease: 'power3.inOut',
    }, 0.25);

    // Card rises and centers
    tl.fromTo(cardRef.current,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' },
      0.7
    );

    // Envelope fades to background
    tl.to(envelopeRef.current, {
      opacity: 0.06,
      scale: 0.75,
      duration: 0.8,
      ease: 'power2.out',
    }, 0.9);

    // Card content reveals
    const cardTexts = cardRef.current?.querySelectorAll('.card-reveal');
    if (cardTexts) {
      tl.fromTo(cardTexts,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out' },
        1.2
      );
    }

    tl.call(() => {
      setPhase('revealed');
      animatingRef.current = false;
    }, [], 2.2);
  }, [phase]);

  const dismissEnvelope = useCallback(() => {
    const tl = gsap.timeline();

    tl.to(cardRef.current, {
      y: -120,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
    });

    tl.to(sceneRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
      onComplete: () => {
        if (sceneRef.current) sceneRef.current.style.display = 'none';
        onOpen();
      },
    }, 0.2);
  }, [onOpen]);

  return (
    <div
      ref={sceneRef}
      className="fixed inset-0"
      style={{ zIndex: 1000, background: '#E0D5C5', overflow: 'hidden' }}
    >
      {/* Linen texture background */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Crosshatch linen pattern */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            `repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(139,119,95,0.3) 3px, rgba(139,119,95,0.3) 4px),` +
            `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(139,119,95,0.3) 3px, rgba(139,119,95,0.3) 4px)`,
        }}
      />

      {/* Soft vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(107,39,55,0.07) 100%)' }}
      />

      {/* === FULL PAGE CLICK (idle: open, revealed: dismiss) === */}
      <button
        className="fixed inset-0 w-full h-full"
        onClick={phase === 'idle' ? openEnvelope : dismissEnvelope}
        style={{
          zIndex: 5,
          background: 'transparent',
          border: 'none',
          cursor: phase === 'idle' ? 'pointer' : 'default',
        }}
        aria-label={phase === 'idle' ? 'Открыть приглашение' : 'Перейти к сайту'}
      />

      {/* === TOP TEXT === */}
      <div
        ref={topTextRef}
        className="absolute flex flex-col items-center pointer-events-none"
        style={{
          top: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 6,
          opacity: 0,
        }}
      >
        <p className="font-body uppercase text-center" style={{
          color: '#6B2737',
          fontSize: '0.65rem',
          letterSpacing: '0.3em',
          marginBottom: '0.75rem',
        }}>
          Приглашение на торжество
        </p>
        <h1 className="font-display text-center" style={{
          fontSize: 'clamp(2rem, 6vw, 3.5rem)',
          color: '#2C2421',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}>
          Кыз Узатуу <span style={{ color: '#6B2737' }}>Алины</span>
        </h1>
      </div>

      {/* === CENTER CONTENT: Flowers + Envelope === */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
        }}
      >
        {/* Left flowers */}
        <div ref={flowersRef} className="absolute pointer-events-none" style={{
          right: '60%',
          top: '-30%',
          width: 'min(200px, 35vw)',
          height: 'auto',
          opacity: 0,
          zIndex: 15,
        }}>
          <img
            src="/images/flowers-left.png"
            alt=""
            className="w-full h-auto"
            style={{ filter: 'drop-shadow(2px 4px 8px rgba(0,0,0,0.1))' }}
          />
        </div>

        {/* Right flowers */}
        <div className="absolute pointer-events-none" style={{
          left: '60%',
          top: '-30%',
          width: 'min(200px, 35vw)',
          height: 'auto',
          opacity: 0,
          zIndex: 15,
        }}>
          <img
            src="/images/flowers-right.png"
            alt=""
            className="w-full h-auto"
            style={{ filter: 'drop-shadow(-2px 4px 8px rgba(0,0,0,0.1))' }}
          />
        </div>

        {/* === ENVELOPE === */}
        <div
          ref={envelopeRef}
          className="relative cursor-pointer"
          onClick={phase === 'idle' ? openEnvelope : undefined}
          style={{
            width: 'min(340px, 72vw)',
            height: '220px',
            opacity: 0,
            transformStyle: 'preserve-3d',
            zIndex: 10,
          }}
        >
          {/* Envelope body with diamond quilted pattern */}
          <div className="absolute inset-0" style={{
            background: '#D4C4A8',
            zIndex: 1,
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.06), 0 6px 24px rgba(44,36,33,0.12)',
          }}>
            {/* Diamond quilted pattern */}
            <div className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  `repeating-linear-gradient(45deg, transparent, transparent 14px, rgba(201,169,110,0.4) 14px, rgba(201,169,110,0.4) 15px),` +
                  `repeating-linear-gradient(-45deg, transparent, transparent 14px, rgba(201,169,110,0.4) 14px, rgba(201,169,110,0.4) 15px)`,
              }}
            />
            {/* Subtle shine */}
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(0,0,0,0.03) 100%)' }}
            />
          </div>

          {/* Diagonal crease lines */}
          <div className="absolute" style={{
            top: 0, left: 0, right: 0, bottom: 0, zIndex: 2, pointerEvents: 'none',
          }}>
            {/* Bottom-left to center crease */}
            <div className="absolute" style={{
              bottom: 0, left: 0, width: '71%', height: '1px',
              background: 'linear-gradient(90deg, rgba(0,0,0,0.06), transparent)',
              transform: 'rotate(32deg)', transformOrigin: 'bottom left',
            }} />
            {/* Bottom-right to center crease */}
            <div className="absolute" style={{
              bottom: 0, right: 0, width: '71%', height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.06))',
              transform: 'rotate(-32deg)', transformOrigin: 'bottom right',
            }} />
          </div>

          {/* Front pocket */}
          <div className="absolute" style={{
            bottom: 0, left: 0, right: 0, height: '50%',
            background: '#C8B898', zIndex: 3,
            clipPath: 'polygon(0 28%, 50% 0, 100% 28%, 100% 100%, 0 100%)',
            boxShadow: '0 -2px 10px rgba(44,36,33,0.04)',
          }}>
            <div className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  `repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(201,169,110,0.3) 12px, rgba(201,169,110,0.3) 13px),` +
                  `repeating-linear-gradient(-45deg, transparent, transparent 12px, rgba(201,169,110,0.3) 12px, rgba(201,169,110,0.3) 13px)`,
              }}
            />
          </div>

          {/* Left side flap */}
          <div className="absolute" style={{
            top: 0, left: 0, width: '51%', height: '72%',
            background: '#CCBC9E', zIndex: 3,
            clipPath: 'polygon(0 0, 100% 30%, 100% 100%, 0 100%)',
          }} />

          {/* Right side flap */}
          <div className="absolute" style={{
            top: 0, right: 0, width: '51%', height: '72%',
            background: '#CAB894', zIndex: 3,
            clipPath: 'polygon(0 30%, 100% 0, 100% 100%, 0 100%)',
          }} />

          {/* Top flap */}
          <div
            ref={flapRef}
            className="absolute"
            style={{
              top: 0, left: 0, right: 0, height: '48%',
              background: '#C4B290', zIndex: 5,
              transformOrigin: 'top center',
              backfaceVisibility: 'hidden',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              boxShadow: '0 3px 12px rgba(44,36,33,0.08)',
            }}
          >
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.02) 100%)' }}
            />
            {/* Quilted pattern on flap */}
            <div className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  `repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(201,169,110,0.3) 12px, rgba(201,169,110,0.3) 13px),` +
                  `repeating-linear-gradient(-45deg, transparent, transparent 12px, rgba(201,169,110,0.3) 12px, rgba(201,169,110,0.3) 13px)`,
              }}
            />
          </div>

          {/* Wax seal */}
          <div
            ref={sealRef}
            className="absolute flex items-center justify-center"
            style={{
              top: '36%', left: '50%', marginLeft: '-26px', marginTop: '-26px',
              width: '52px', height: '52px', zIndex: 6,
            }}
          >
            <div className="absolute inset-0 rounded-full" style={{
              background: 'radial-gradient(circle at 35% 35%, #E8DDD0, #C9A96E)',
              boxShadow: '0 3px 10px rgba(44,36,33,0.2), 0 1px 3px rgba(0,0,0,0.1), inset 0 -2px 4px rgba(0,0,0,0.1), inset 0 1px 3px rgba(255,255,255,0.3)',
            }} />
            <div className="absolute rounded-full" style={{
              width: '40px', height: '40px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              border: '1.5px solid rgba(107,39,55,0.15)',
            }} />
            <span className="font-display relative" style={{
              color: '#6B2737', fontSize: '1.5rem', textShadow: '0 1px 2px rgba(255,255,255,0.3)', lineHeight: 1,
            }}>А</span>
          </div>

          {/* Seal break pieces */}
          <div ref={sealPiecesRef} className="absolute pointer-events-none" style={{
            top: '36%', left: '50%', marginLeft: '-26px', marginTop: '-26px', width: '52px', height: '52px', zIndex: 6,
          }}>
            {[...Array(8)].map((_, i) => (
              <div key={i} className="seal-piece absolute" style={{
                width: i % 2 === 0 ? '7px' : '5px', height: i % 2 === 0 ? '7px' : '5px',
                background: i % 2 === 0 ? '#C9A96E' : '#6B2737',
                top: '50%', left: '50%', marginTop: i % 2 === 0 ? '-3.5px' : '-2.5px', marginLeft: i % 2 === 0 ? '-3.5px' : '-2.5px',
                borderRadius: '50%', opacity: 0, boxShadow: '0 1px 3px rgba(107,39,55,0.2)',
              }} />
            ))}
          </div>

          {/* Drop shadow */}
          <div className="absolute" style={{
            bottom: '-14px', left: '8%', right: '8%', height: '18px',
            background: 'radial-gradient(ellipse at center, rgba(44,36,33,0.1) 0%, transparent 70%)',
            zIndex: 0, borderRadius: '50%',
          }} />
        </div>
      </div>

      {/* === BOTTOM TEXT === */}
      <div
        ref={bottomTextRef}
        className="absolute font-body uppercase pointer-events-none text-center"
        style={{
          bottom: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '0.65rem',
          color: '#6B2737',
          letterSpacing: '0.3em',
          opacity: 0,
          zIndex: 6,
          whiteSpace: 'nowrap',
        }}
      >
        Нажмите, чтобы открыть
      </div>

      {/* === INVITATION CARD (centered, revealed after open) === */}
      <div
        ref={cardRef}
        className="absolute flex flex-col items-center justify-center"
        style={{
          width: 'min(calc(100vw - 48px), 500px)',
          height: 'min(calc(100vh - 140px), 660px)',
          background: '#FAF8F5',
          border: '2px solid rgba(201, 169, 110, 0.35)',
          zIndex: 50,
          padding: '2.5rem',
          top: '50%',
          left: '50%',
          marginTop: '0px',
          marginLeft: '0px',
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          boxShadow: '0 12px 60px rgba(44,36,33,0.12), 0 4px 16px rgba(44,36,33,0.06)',
          pointerEvents: 'none',
        }}
      >
        {/* Inner border */}
        <div className="absolute inset-[12px] pointer-events-none"
          style={{ border: '1px solid rgba(201, 169, 110, 0.2)' }}
        />

        {/* Corner ornaments */}
        <CornerOrnament pos="tl" />
        <CornerOrnament pos="tr" />
        <CornerOrnament pos="bl" />
        <CornerOrnament pos="br" />

        {/* Top ornament */}
        <div className="card-reveal flex items-center justify-center mb-8" style={{ opacity: 0 }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 2 C17 10, 24 12, 14 14 C4 12, 11 10, 14 2Z" fill="#C9A96E" opacity={0.3} />
            <path d="M14 26 C11 18, 4 16, 14 14 C24 16, 17 18, 14 26Z" fill="#C9A96E" opacity={0.3} />
          </svg>
        </div>

        <p className="card-reveal font-body uppercase" style={{
          color: '#C9A96E', fontSize: '0.62rem', letterSpacing: '0.4em', marginBottom: '1.5rem', opacity: 0,
        }}>
          Приглашение
        </p>

        <h2 className="card-reveal font-display text-center" style={{
          fontSize: 'clamp(1.8rem, 5.5vw, 2.8rem)', fontWeight: 300, color: '#2C2421', lineHeight: 1.05, opacity: 0,
        }}>
          Кыз Узатуу
        </h2>

        <p className="card-reveal font-display text-center" style={{
          fontSize: 'clamp(2.8rem, 8vw, 4rem)', color: '#6B2737', marginTop: '-0.3rem',
          transform: 'rotate(0deg)', lineHeight: 1, opacity: 0,
        }}>
          Алины
        </p>

        {/* Divider */}
        <div className="card-reveal flex items-center gap-3 my-5" style={{ opacity: 0 }}>
          <div style={{ width: '55px', height: '1px', background: 'linear-gradient(90deg, transparent, #C9A96E)' }} />
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="2" fill="#C9A96E" opacity={0.45} />
            <path d="M7 1.5 L7 4.5 M7 9.5 L7 12.5 M1.5 7 L4.5 7 M9.5 7 L12.5 7" stroke="#C9A96E" strokeWidth="0.5" opacity={0.3} />
          </svg>
          <div style={{ width: '55px', height: '1px', background: 'linear-gradient(90deg, #C9A96E, transparent)' }} />
        </div>

        <p className="card-reveal font-body uppercase text-center" style={{
          color: '#2C2421', fontSize: 'clamp(0.75rem, 2vw, 0.9rem)', letterSpacing: '0.2em', marginBottom: '0.6rem', opacity: 0,
        }}>
          28 Августа 2026
        </p>

        <p className="card-reveal font-body text-center" style={{
          color: '#2C2421', fontSize: 'clamp(0.75rem, 2vw, 0.85rem)', letterSpacing: '0.05em', opacity: 0,
        }}>
          Ресторан Jannat, Бишкек
        </p>

        {/* Bottom ornament */}
        <div className="card-reveal absolute bottom-8 left-1/2 -translate-x-1/2" style={{ opacity: 0 }}>
          <svg width="44" height="12" viewBox="0 0 44 12" fill="none">
            <path d="M22 2 Q27 6, 33 6 Q27 6, 22 10 Q17 6, 11 6 Q17 6, 22 2Z" fill="#C9A96E" opacity={0.2} />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(16px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}

function CornerOrnament({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const styles: Record<string, React.CSSProperties> = {
    tl: { top: '10px', left: '10px' },
    tr: { top: '10px', right: '10px', transform: 'scaleX(-1)' },
    bl: { bottom: '10px', left: '10px', transform: 'scaleY(-1)' },
    br: { bottom: '10px', right: '10px', transform: 'scale(-1, -1)' },
  };

  return (
    <div className="absolute pointer-events-none" style={{ ...styles[pos], width: '32px', height: '32px', opacity: 0.3 }}>
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M2 2 L14 2 Q6 6, 2 14 Z" fill="#C9A96E" opacity={0.5} />
        <path d="M5 5 L10 5 Q8 8, 5 10 Z" fill="#C9A96E" opacity={0.7} />
      </svg>
    </div>
  );
}
