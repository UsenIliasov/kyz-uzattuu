import { useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useLanguage } from './hooks/useLanguage';
import FloatingPetals from './components/FloatingPetals';
import CustomCursor from './components/CustomCursor';
import LanguageToggle from './components/LanguageToggle';
import MusicToggle from './components/MusicToggle';
import EnvelopeOverlay from './sections/EnvelopeOverlay';
import HeroSection from './sections/HeroSection';
import InvitationSection from './sections/InvitationSection';
import CountdownSection from './sections/CountdownSection';
import DetailsSection from './sections/DetailsSection';
import MapSection from './sections/MapSection';
import PhotoCollectionSection from './sections/PhotoCollectionSection';
import TimelineSection from './sections/TimelineSection';
import FooterSection from './sections/FooterSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const { language, toggleLanguage, t } = useLanguage();
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Stop scroll initially (envelope is showing)
    lenis.stop();

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as unknown as gsap.TickerCallback);
    };
  }, []);

  // Handle envelope open
  const handleEnvelopeOpen = useCallback(() => {
    setEnvelopeOpened(true);
    // Unlock scroll
    if (lenisRef.current) {
      lenisRef.current.start();
    }
    // Refresh ScrollTrigger after envelope dismissal
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  return (
    <div className="relative">
      {/* Envelope Overlay */}
      {!envelopeOpened && <EnvelopeOverlay onOpen={handleEnvelopeOpen} />}

      {/* Floating petals background */}
      {envelopeOpened && <FloatingPetals />}

      {/* Custom cursor */}
      {envelopeOpened && <CustomCursor />}

      {/* Language toggle */}
      {envelopeOpened && <LanguageToggle language={language} onToggle={toggleLanguage} />}

      {/* Music toggle */}
      {envelopeOpened && <MusicToggle />}

      {/* Main content */}
      <main className="relative" style={{ zIndex: 2 }}>
        <HeroSection t={t} />
        <InvitationSection t={t} />
        <CountdownSection t={t} />
        <DetailsSection t={t} />
        <MapSection t={t} />
        <PhotoCollectionSection t={t} />
        <TimelineSection t={t} />
        <FooterSection t={t} />
      </main>
    </div>
  );
}

export default App;
