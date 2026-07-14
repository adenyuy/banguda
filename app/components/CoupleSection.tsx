'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';

const HEARTS = ['💕', '❤️', '💖', '💗', '💓', '✨', '🌸', '💐'];

function FloatingHeart({ emoji, style }: { emoji: string; style: React.CSSProperties }) {
  return (
    <span className="floating-heart" style={style} aria-hidden="true">
      {emoji}
    </span>
  );
}

function Sparkles({ active }: { active: boolean }) {
  return (
    <div className={`sparkle-burst ${active ? 'sparkle-active' : ''}`} aria-hidden="true">
      {[...Array(8)].map((_, i) => (
        <span key={i} className="sparkle-dot" style={{ '--i': i } as React.CSSProperties} />
      ))}
    </div>
  );
}

export default function CoupleSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<'bride' | 'groom' | null>(null);
  const [heartsVisible, setHeartsVisible] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; emoji: string; x: number; delay: number }[]>([]);
  const [copied, setCopied] = useState(false);
  const nextId = useRef(0);

  const handleCopyHashtag = useCallback(() => {
    navigator.clipboard.writeText('#MahmudahKanBersamaZaky').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  // Intersection observer for reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('couple-section')) {
              setTimeout(() => setHeartsVisible(true), 600);
            }
          }
        });
      },
      { threshold: 0.15 }
    );
    const el = ref.current;
    if (el) {
      observer.observe(el);
      el.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
    }
    return () => observer.disconnect();
  }, []);

  // Spawn floating hearts periodically
  useEffect(() => {
    if (!heartsVisible) return;
    const interval = setInterval(() => {
      const id = nextId.current++;
      const emoji = HEARTS[Math.floor(Math.random() * HEARTS.length)];
      const x = Math.random() * 90 + 5; // 5% – 95%
      const delay = Math.random() * 0.3;
      setFloatingHearts((prev) => [...prev.slice(-12), { id, emoji, x, delay }]);
    }, 700);
    return () => clearInterval(interval);
  }, [heartsVisible]);

  return (
    <section className="couple-section reveal" ref={ref} id="couple" aria-label="Kedua Mempelai">
      {/* Floating hearts container */}
      <div className="hearts-container" aria-hidden="true">
        {floatingHearts.map((h) => (
          <FloatingHeart
            key={h.id}
            emoji={h.emoji}
            style={{
              left: `${h.x}%`,
              animationDelay: `${h.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="section-header">
        <div className="gold-divider reveal"><span>✦</span></div>
        <h2 className="couple-section-header reveal">Kedua Mempelai</h2>
        <div className="gold-divider reveal"><span>✦</span></div>
      </div>

      <div className="couple-cards-wrapper">
        {/* BRIDE */}
        <div
          className="couple-card reveal couple-card--bride"
          onMouseEnter={() => setHoveredCard('bride')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className={`couple-photo-frame ${hoveredCard === 'bride' ? 'frame-jiggle' : ''}`}>
            <div className="couple-photo-ring" aria-hidden="true" />
            <div className="couple-photo-ring couple-photo-ring--2" aria-hidden="true" />
            {/* Crown emoji */}
            <span className="photo-crown" aria-label="mahkota">👸</span>
            <Image
              src="/asset/foto5.jpeg"
              alt="Mahmudah Alif Fatonah"
              width={160}
              height={160}
              className="couple-photo"
              style={{ objectFit: 'cover', objectPosition: 'top center' }}
            />
            <Sparkles active={hoveredCard === 'bride'} />
          </div>

          <div className="couple-name-script couple-name-bounce">Mahmudah</div>
          <div className="couple-name-full">Mahmudah Alif Fatonah</div>
          <div className="couple-emoji-row" aria-hidden="true">🌸 👰 🌸</div>
          <p className="couple-parents">
            Putri dari<br />
            Bapak &amp; Ibu (Orang Tua Mempelai Wanita)
          </p>
        </div>

        {/* SEPARATOR */}
        <div className="couple-separator reveal couple-separator--animated">
          <span className="separator-ampersand">&amp;</span>
          <div className="separator-hearts" aria-hidden="true">
            <span>💕</span>
            <span>💒</span>
            <span>💕</span>
          </div>
        </div>

        {/* GROOM */}
        <div
          className="couple-card reveal couple-card--groom"
          onMouseEnter={() => setHoveredCard('groom')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className={`couple-photo-frame ${hoveredCard === 'groom' ? 'frame-jiggle' : ''}`}>
            <div className="couple-photo-ring" aria-hidden="true" />
            <div className="couple-photo-ring couple-photo-ring--2" aria-hidden="true" />
            {/* Hat emoji */}
            <span className="photo-crown" aria-label="topi">🤵</span>
            <Image
              src="/asset/foto6.jpeg"
              alt="Zaky Wildan Mukhollad"
              width={160}
              height={160}
              className="couple-photo"
              style={{ objectFit: 'cover', objectPosition: 'top center' }}
            />
            <Sparkles active={hoveredCard === 'groom'} />
          </div>

          <div className="couple-name-script couple-name-bounce">Zaky</div>
          <div className="couple-name-full">Zaky Wildan Mukhollad</div>
          <div className="couple-emoji-row" aria-hidden="true">🤵 💍 🤵</div>
          <p className="couple-parents">
            Putra dari<br />
            Bapak &amp; Ibu (Orang Tua Mempelai Pria)
          </p>
        </div>
      </div>

      {/* Bottom tagline */}
      <div className="couple-tagline reveal" aria-hidden="true">
        <span>💍</span> Dipersatukan dalam Cinta &amp; Doa <span>💍</span>
      </div>

      {/* Wedding Hashtag */}
      <div className="wedding-hashtag-wrapper reveal">
        <p className="hashtag-label">Abadikan momen bahagia kami dengan</p>
        <button
          id="copy-hashtag-btn"
          className={`wedding-hashtag ${copied ? 'hashtag-copied' : ''}`}
          onClick={handleCopyHashtag}
          aria-label="Salin hashtag pernikahan"
          title="Klik untuk menyalin"
        >
          <span className="hashtag-text">#MahmudahKanBersamaZaky</span>
          <span className="hashtag-copy-icon" aria-hidden="true">
            {copied ? '✅' : '📋'}
          </span>
        </button>
        <p className="hashtag-hint">{copied ? 'Tersalin! ✨' : 'Klik untuk menyalin'}</p>
      </div>
    </section>
  );
}
