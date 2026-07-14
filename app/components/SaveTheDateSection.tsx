'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const WEDDING_DATE = new Date('2030-04-04T09:00:00');

function getTimeLeft(): TimeLeft {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export default function SaveTheDateSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());
  const ref = useRef<HTMLDivElement>(null);

  const tick = useCallback(() => {
    setTimeLeft(getTimeLeft());
  }, []);

  useEffect(() => {
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [tick]);

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

  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Mahmudah+%26+Zaky&dates=20300404T020000Z/20300404T070000Z&details=Akad+%26+Resepsi+Pernikahan+Mahmudah+Alif+Fatonah+%26+Zaky+Wildan+Mukhollad&location=Depok%2C+Jawa+Barat`;

  const mapsUrl = `https://maps.google.com/?q=Depok,+Jawa+Barat`;

  return (
    <section className="save-date-section" id="save-the-date" ref={ref} aria-label="Save The Date">
      {/* Hero with countdown */}
      <div className="save-date-hero">
        <Image
          src="/asset/foto4.jpeg"
          alt="Mahmudah & Zaky"
          fill
          className="save-date-hero-image"
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
        <div className="save-date-hero-overlay" />

        <div className="save-date-hero-content">
          <h2 className="save-date-title">Save The Date</h2>

          <div className="countdown-wrapper" id="countdown-timer">
            <div className="countdown-box">
              <span className="countdown-number">{pad(timeLeft.days)}</span>
              <span className="countdown-label">Hari</span>
            </div>
            <div className="countdown-box">
              <span className="countdown-number">{pad(timeLeft.hours)}</span>
              <span className="countdown-label">Jam</span>
            </div>
            <div className="countdown-box">
              <span className="countdown-number">{pad(timeLeft.minutes)}</span>
              <span className="countdown-label">Menit</span>
            </div>
            <div className="countdown-box">
              <span className="countdown-number">{pad(timeLeft.seconds)}</span>
              <span className="countdown-label">Detik</span>
            </div>
          </div>

          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="save-date-cal-btn"
            id="save-calendar-btn"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Simpan Tanggal
          </a>
        </div>
      </div>

      {/* Event cards */}
      <div className="event-cards-wrapper">
        {/* Akad Nikah */}
        <div className="event-card reveal" id="akad-card">
          <div className="event-card-arch">
            <p className="event-type">Akad Nikah</p>
            <p className="event-name">AKAD NIKAH</p>
            <p className="event-day-script">Jumat</p>
            <p className="event-date-number">04</p>
            <p className="event-month-year">April 2030</p>
            <div className="event-time">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              09.00 – 11.00 WIB
            </div>
          </div>
          <div className="event-card-footer">
            <p className="event-location-label">Lokasi Acara</p>
            <p className="event-location-name">Kediaman Mempelai Wanita</p>
            <p className="event-location-address">Depok, Jawa Barat</p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="event-map-btn"
              id="akad-map-btn"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Lihat di Maps
            </a>
          </div>
        </div>

        {/* Resepsi */}
        <div className="event-card reveal" id="resepsi-card">
          <div className="event-card-arch">
            <p className="event-type">Resepsi Pernikahan</p>
            <p className="event-name">RESEPSI</p>
            <p className="event-day-script">Jumat</p>
            <p className="event-date-number">04</p>
            <p className="event-month-year">April 2030</p>
            <div className="event-time">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              11.00 – 15.00 WIB
            </div>
          </div>
          <div className="event-card-footer">
            <p className="event-location-label">Lokasi Acara</p>
            <p className="event-location-name">Gedung / Kediaman</p>
            <p className="event-location-address">Depok, Jawa Barat</p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="event-map-btn"
              id="resepsi-map-btn"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Lihat di Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
