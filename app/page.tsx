'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

import Cover from './components/Cover';
import QuoteSection from './components/QuoteSection';
import CoupleSection from './components/CoupleSection';
import SaveTheDateSection from './components/SaveTheDateSection';
import GallerySection from './components/GallerySection';
import WishesSection from './components/WishesSection';
import FooterSection from './components/FooterSection';
import AudioPlayer from './components/AudioPlayer';

// Inner component that reads searchParams
function WeddingApp() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get('to') ?? '';

  const [isOpen, setIsOpen] = useState(false);
  const [audioAutoPlay, setAudioAutoPlay] = useState(false);

  function handleOpen() {
    setIsOpen(true);
    setAudioAutoPlay(true);
  }

  return (
    <div className="page-wrapper">
      {/* Cover overlay — hidden after open */}
      {!isOpen && (
        <Cover guestName={guestName} onOpen={handleOpen} />
      )}

      {/* Main invitation content */}
      {isOpen && (
        <div className="invitation-layout">
          {/* LEFT: sticky panel (desktop only) */}
          <aside className="invitation-left-panel" aria-hidden="true">
            <div className="left-panel-bg">
              <Image
                src="/asset/foto1.jpeg"
                alt=""
                fill
                className="left-panel-bg-image"
                priority
                sizes="420px"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
              <div className="left-panel-overlay" />
            </div>

            {/* Corner decorations */}
            <div className="left-panel-corner left-panel-corner--tl" />
            <div className="left-panel-corner left-panel-corner--tr" />
            <div className="left-panel-corner left-panel-corner--bl" />
            <div className="left-panel-corner left-panel-corner--br" />

            <div className="left-panel-content">
              <span className="left-panel-the-wedding">The Wedding Of</span>
              <div className="left-panel-divider" />
              <h1 className="left-panel-names">
                Mahmudah<br />&amp; Zaky
              </h1>
              <p className="left-panel-date">Jumat, 04 April 2030</p>
            </div>
          </aside>

          {/* RIGHT: scrollable content */}
          <main className="invitation-right-panel" id="main-content">
            <QuoteSection />
            <CoupleSection />
            <SaveTheDateSection />
            <GallerySection />
            <WishesSection />
            <FooterSection />
          </main>
        </div>
      )}

      {/* Floating audio player — always visible after open */}
      {isOpen && <AudioPlayer autoPlay={audioAutoPlay} />}
    </div>
  );
}

// Wrap in Suspense because useSearchParams needs it in Next.js
export default function Home() {
  return (
    <Suspense fallback={
      <div style={{
        position: 'fixed',
        inset: 0,
        background: '#5c3d20',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#c9a96e',
        fontFamily: 'Georgia, serif',
        fontSize: '1.5rem',
      }}>
        Memuat undangan...
      </div>
    }>
      <WeddingApp />
    </Suspense>
  );
}
