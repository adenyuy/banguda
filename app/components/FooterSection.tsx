'use client';

import { useEffect, useRef } from 'react';

export default function FooterSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
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
    <footer className="footer-section" ref={ref} id="footer" aria-label="Footer">
      <div className="gold-divider reveal" style={{ maxWidth: '160px', margin: '0 auto 2rem' }}>
        <span>✦</span>
      </div>

      <p className="footer-closing-text reveal">Kami Yang Berbahagia</p>

      <h2 className="footer-couple-names reveal">Mahmudah &amp; Zaky</h2>

      <div className="footer-divider reveal" />

      <p className="footer-thank-you reveal">
        Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
        berkenan hadir untuk memberikan doa restu kepada kami. Terima kasih atas segala
        doa dan ucapan yang telah diberikan.
      </p>

      <div className="gold-divider reveal" style={{ maxWidth: '160px', margin: '0 auto 2rem' }}>
        <span>✦</span>
      </div>

      <p className="footer-hashtag" aria-label="Wedding hashtag">
        #MudahBersamaZaky
      </p>

      <p className="footer-branding reveal">
        Made with ❤️ for Mahmudah &amp; Zaky • 04 April 2030
      </p>
    </footer>
  );
}
