'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function QuoteSection() {
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

  return (
    <section className="quote-section" ref={ref} aria-label="Kutipan Al-Quran">
      <div className="quote-ornament">&ldquo;</div>

      <div className="reveal">
        <div className="quote-monogram">
          M
          <span className="monogram-amp">&amp;</span>
          Z
        </div>
      </div>

      <div className="reveal">
        <Image
          src="/asset/foto1.jpeg"
          alt="Mahmudah & Zaky"
          width={140}
          height={140}
          className="quote-circle-image"
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>

      <div className="gold-divider reveal">
        <span>✦</span>
      </div>

      <p className="quote-text reveal">
        &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
        pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan
        merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih
        dan sayang.&rdquo;
      </p>

      <p className="quote-source reveal">Q.S Ar-Rum : 21</p>
    </section>
  );
}
