'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface Wish {
  id: string;
  name: string;
  message: string;
  attendance: 'hadir' | 'tidak';
  timestamp: number;
}

const DEFAULT_WISHES: Wish[] = [
  {
    id: 'default-1',
    name: 'Bunda Aisyah',
    message: 'Alhamdulillah, selamat Mahmudah & mas Zaky ❤️ Semoga menjadi keluarga yang sakinah, mawaddah & warrahmah.. Aamiin....',
    attendance: 'hadir',
    timestamp: Date.now() - 3600000,
  },
  {
    id: 'default-2',
    name: 'Dewiii',
    message: 'Lancar sampai hari H, so happy for you Mahmudah dan pasangan 💕',
    attendance: 'hadir',
    timestamp: Date.now() - 7200000,
  },
  {
    id: 'default-3',
    name: 'Rini & Keluarga',
    message: 'Selamat menempuh hidup baru ya Mahmudah & Zaky! Semoga langgeng sampai kakek nenek 🥰',
    attendance: 'hadir',
    timestamp: Date.now() - 10800000,
  },
];

const STORAGE_KEY = 'wedding-wishes-mz';

export default function WishesSection() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [attendance, setAttendance] = useState<'hadir' | 'tidak'>('hadir');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Wish[];
        setWishes([...parsed, ...DEFAULT_WISHES]);
      } else {
        setWishes(DEFAULT_WISHES);
      }
    } catch {
      setWishes(DEFAULT_WISHES);
    }
  }, []);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
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

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      showToast('Nama dan ucapan wajib diisi!');
      return;
    }

    setIsSubmitting(true);

    const newWish: Wish = {
      id: `wish-${Date.now()}`,
      name: name.trim(),
      message: message.trim(),
      attendance,
      timestamp: Date.now(),
    };

    setTimeout(() => {
      setWishes((prev) => {
        // Store only user-added wishes in localStorage
        const userWishes = prev.filter((w) => !w.id.startsWith('default'));
        const updatedUserWishes = [newWish, ...userWishes];
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUserWishes));
        } catch { /* empty */ }
        return [newWish, ...prev];
      });

      setName('');
      setMessage('');
      setAttendance('hadir');
      setIsSubmitting(false);
      showToast('Ucapan berhasil dikirim! 🎉');
    }, 600);
  }

  return (
    <section className="wishes-section" id="wishes" ref={ref} aria-label="Ucapan dan RSVP">
      {/* Form */}
      <div className="wishes-form reveal">
        <h2 className="wishes-form-title">Ucapan</h2>
        <p className="wishes-form-subtitle">Berikan doa dan ucapan terbaik untuk kami.</p>

        <form onSubmit={handleSubmit} id="wishes-form" noValidate>
          <div className="form-group">
            <input
              id="wish-name-input"
              type="text"
              className="form-input"
              placeholder="Nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={80}
              aria-label="Nama"
            />
          </div>

          <div className="form-group">
            <textarea
              id="wish-message-input"
              className="form-input"
              placeholder="Ucapan"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={500}
              aria-label="Ucapan"
            />
          </div>

          <p className="attendance-label">Konfirmasi Kehadiran</p>
          <div className="attendance-buttons">
            <button
              type="button"
              id="attendance-hadir-btn"
              className={`attendance-btn ${attendance === 'hadir' ? 'active-hadir' : ''}`}
              onClick={() => setAttendance('hadir')}
              aria-pressed={attendance === 'hadir'}
            >
              ✓ Hadir
            </button>
            <button
              type="button"
              id="attendance-tidak-btn"
              className={`attendance-btn ${attendance === 'tidak' ? 'active-tidak' : ''}`}
              onClick={() => setAttendance('tidak')}
              aria-pressed={attendance === 'tidak'}
            >
              ✕ Tidak Hadir
            </button>
          </div>

          <button
            type="submit"
            id="wish-submit-btn"
            className="form-submit-btn"
            disabled={isSubmitting}
            aria-label="Kirim ucapan"
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim'}
          </button>
        </form>
      </div>

      {/* Wishes list */}
      <div className="wishes-list" aria-label="Daftar ucapan">
        {wishes.map((wish, i) => (
          <div
            key={wish.id}
            className="wish-card reveal"
            style={{ animationDelay: `${i * 0.08}s` }}
            id={`wish-card-${wish.id}`}
          >
            <p className="wish-card-name">{wish.name}</p>
            <p className="wish-card-message">{wish.message}</p>
            <span className={`wish-card-attendance ${wish.attendance}`}>
              {wish.attendance === 'hadir' ? '✓ Hadir' : '✕ Tidak Hadir'}
            </span>
          </div>
        ))}
      </div>

      {/* Toast notification */}
      {toast && (
        <div className="toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </section>
  );
}
