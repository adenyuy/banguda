'use client';

import Image from 'next/image';
import { useState } from 'react';

interface CoverProps {
  guestName: string;
  onOpen: () => void;
}

export default function Cover({ guestName, onOpen }: CoverProps) {
  const [isClosing, setIsClosing] = useState(false);

  function handleOpen() {
    setIsClosing(true);
    setTimeout(() => {
      onOpen();
    }, 900);
  }

  return (
    <div className={`cover-section ${isClosing ? 'closing' : ''}`}>
      {/* Background image */}
      <div className="cover-bg">
        <Image
          src="/asset/foto1.jpeg"
          alt="Mahmudah & Zaky"
          fill
          className="cover-bg-image"
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center top', opacity: 0.35 }}
        />
        <div className="cover-overlay" />
        <div className="cover-batik-overlay" />
      </div>

      {/* Corner decorations */}
      <div className="cover-decorations">
        <div className="cover-corner cover-corner--tl" />
        <div className="cover-corner cover-corner--tr" />
        <div className="cover-corner cover-corner--bl" />
        <div className="cover-corner cover-corner--br" />
      </div>

      {/* Main content */}
      <div className="cover-content">
        {/* Guest greeting */}
        {guestName && (
          <>
            <p className="cover-invited-label">Kepada Yth.</p>
            <p className="cover-guest-name">
              Bapak/Ibu/Saudara/i <strong>{guestName}</strong>
            </p>
          </>
        )}

        {/* Couple names */}
        <span className="cover-the-wedding">The Wedding Of</span>

        <div className="cover-couple-names">
          Mahmudah &amp; Zaky
        </div>

        <div className="cover-divider" />

        <p className="cover-date">Jumat, 04 April 2030</p>

        {/* Open button */}
        <button
          id="cover-open-btn"
          className="cover-open-btn"
          onClick={handleOpen}
          aria-label="Buka undangan pernikahan"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Buka Undangan
        </button>
      </div>
    </div>
  );
}
