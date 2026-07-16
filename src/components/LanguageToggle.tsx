import { type Language } from '../hooks/useLanguage';

interface LanguageToggleProps {
  language: Language;
  onToggle: () => void;
}

export default function LanguageToggle({ language, onToggle }: LanguageToggleProps) {
  return (
    <div
      className="fixed top-6 right-6 z-50 flex gap-1 p-1 rounded-sm"
      style={{
        background: 'rgba(250, 248, 245, 0.9)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(201, 169, 110, 0.4)',
      }}
    >
      <button
        onClick={onToggle}
        className={`px-3 py-1.5 text-caption transition-all duration-300 cursor-pointer ${
          language === 'ru'
            ? 'bg-gold text-pearl'
            : 'text-charcoal hover:text-gold'
        }`}
        style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}
      >
        RU
      </button>
      <button
        onClick={onToggle}
        className={`px-3 py-1.5 text-caption transition-all duration-300 cursor-pointer ${
          language === 'kg'
            ? 'bg-gold text-pearl'
            : 'text-charcoal hover:text-gold'
        }`}
        style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}
      >
        KG
      </button>
    </div>
  );
}
