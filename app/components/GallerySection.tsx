'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const photos = [
  { src: '/asset/foto1.jpeg', alt: 'Mahmudah & Zaky - Foto 1' },
  { src: '/asset/foto2.jpeg', alt: 'Mahmudah & Zaky - Foto 2' },
  { src: '/asset/foto3.jpeg', alt: 'Mahmudah & Zaky - Foto 3' },
  { src: '/asset/foto4.jpeg', alt: 'Mahmudah & Zaky - Foto 4' },
  { src: '/asset/foto5.jpeg', alt: 'Mahmudah & Zaky - Foto 5' },
  { src: '/asset/foto6.jpeg', alt: 'Mahmudah & Zaky - Foto 6' },
];

export default function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );
    const el = ref.current;
    if (el) {
      el.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
    }
    return () => observer.disconnect();
  }, []);

  // Close lightbox on Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setLightbox(false);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    }
    if (lightbox) {
      document.addEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => document.removeEventListener('keydown', onKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox, activeIndex]);

  function changePhoto(index: number) {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsTransitioning(false);
    }, 200);
  }

  function handlePrev() {
    changePhoto((activeIndex - 1 + photos.length) % photos.length);
  }

  function handleNext() {
    changePhoto((activeIndex + 1) % photos.length);
  }

  return (
    <section className="gallery-section" id="gallery" ref={ref} aria-label="Galeri Foto">
      <div className="section-header">
        <h2 className="section-script-title reveal">Our Moments</h2>
        <p className="section-subtitle reveal">Kenangan Terindah Kami</p>
        <div className="gold-divider reveal"><span>✦</span></div>
      </div>

      {/* Main slider */}
      <div className="gallery-main-slider reveal">
        <Image
          key={activeIndex}
          src={photos[activeIndex].src}
          alt={photos[activeIndex].alt}
          fill
          className="gallery-main-image"
          sizes="(max-width: 1024px) 100vw, 500px"
          style={{
            objectFit: 'cover',
            objectPosition: 'top',
            opacity: isTransitioning ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* Expand button */}
        <button
          className="gallery-expand-btn"
          onClick={() => setLightbox(true)}
          aria-label="Perbesar foto"
          id="gallery-expand-btn"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3H5a2 2 0 0 0-2 2v3" />
            <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
            <path d="M3 16v3a2 2 0 0 0 2 2h3" />
            <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
          </svg>
        </button>

        {/* Navigation */}
        <button
          className="gallery-nav-btn gallery-nav-btn--prev"
          onClick={handlePrev}
          aria-label="Foto sebelumnya"
          id="gallery-prev-btn"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          className="gallery-nav-btn gallery-nav-btn--next"
          onClick={handleNext}
          aria-label="Foto berikutnya"
          id="gallery-next-btn"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Thumbnails */}
      <div className="gallery-thumbnails reveal">
        {photos.map((photo, i) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            width={60}
            height={60}
            className={`gallery-thumb ${i === activeIndex ? 'active' : ''}`}
            style={{ objectFit: 'cover', objectPosition: 'top' }}
            onClick={() => changePhoto(i)}
            id={`gallery-thumb-${i}`}
          />
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightbox(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Foto diperbesar"
          id="lightbox-overlay"
        >
          <button
            className="lightbox-close"
            onClick={() => setLightbox(false)}
            aria-label="Tutup"
            id="lightbox-close-btn"
          >
            ✕
          </button>

          <Image
            src={photos[activeIndex].src}
            alt={photos[activeIndex].alt}
            width={800}
            height={1000}
            className="lightbox-image"
            style={{ objectFit: 'contain' }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
