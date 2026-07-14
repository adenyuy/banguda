'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function CoupleSection() {
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
      { threshold: 0.15 }
    );
    const el = ref.current;
    if (el) {
      el.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section className="couple-section" ref={ref} id="couple" aria-label="Kedua Mempelai">
      <div className="section-header">
        <div className="gold-divider reveal"><span>✦</span></div>
        <h2 className="couple-section-header reveal">Kedua Mempelai</h2>
        <div className="gold-divider reveal"><span>✦</span></div>
      </div>

      <div className="couple-cards-wrapper">
        {/* BRIDE */}
        <div className="couple-card reveal">
          <div className="couple-photo-frame">
            <div className="couple-photo-ring" aria-hidden="true" />
            <Image
              src="/asset/foto2.jpeg"
              alt="Mahmudah Alif Fatonah"
              width={160}
              height={160}
              className="couple-photo"
              style={{ objectFit: 'cover', objectPosition: 'top center' }}
            />
          </div>

          <div className="couple-name-script">Mahmudah</div>
          <div className="couple-name-full">Mahmudah Alif Fatonah</div>
          <p className="couple-parents">
            Putri dari<br />
            Bapak &amp; Ibu (Orang Tua Mempelai Wanita)
          </p>
        </div>

        {/* SEPARATOR */}
        <div className="couple-separator reveal">
          <span>&amp;</span>
        </div>

        {/* GROOM */}
        <div className="couple-card reveal">
          <div className="couple-photo-frame">
            <div className="couple-photo-ring" aria-hidden="true" />
            <Image
              src="/asset/foto3.jpeg"
              alt="Zaky Wildan Mukhollad"
              width={160}
              height={160}
              className="couple-photo"
              style={{ objectFit: 'cover', objectPosition: 'top center' }}
            />
          </div>

          <div className="couple-name-script">Zaky</div>
          <div className="couple-name-full">Zaky Wildan Mukhollad</div>
          <p className="couple-parents">
            Putra dari<br />
            Bapak &amp; Ibu (Orang Tua Mempelai Pria)
          </p>
        </div>
      </div>
    </section>
  );
}
