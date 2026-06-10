import { useState, useEffect, useRef } from 'react';
function useCountUp(target, duration = 1500, triggered = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Don't start until triggered
    if (!triggered) return;

    let startTime = null;

    const step = (timestamp) => {
      // On the first frame, record the start time
      if (!startTime) startTime = timestamp;

      // How far through the animation are we? (0 to 1)
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // easeOutQuad: starts fast, slows down near the end
      // This feels more natural than a straight linear count
      const eased = 1 - (1 - progress) * (1 - progress);

      setCount(Math.floor(eased * target));

      // Keep animating until progress reaches 1
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [target, duration, triggered]);
  // The dependency array here means: re-run this effect
  // whenever target, duration, or triggered changes.
  // When `triggered` flips from false to true, the
  // animation kicks off.

  return count;
}

// ─────────────────────────────────────────────
// COMPONENT: StatCard
//
// A single animated stat. Receives its data as
// props and passes `triggered` into useCountUp.
// ─────────────────────────────────────────────
function StatCard({ value, suffix, label, triggered }) {
  const count = useCountUp(value, 1400, triggered);

  return (
    <div style={{ textAlign: 'center', minWidth: '100px' }}>
      <div style={{
        fontSize: 'clamp(2rem, 5vw, 3.2rem)',
        fontWeight: '800',
        color: 'white',
        lineHeight: 1,
        letterSpacing: '1px',
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontSize: '0.72rem',
        color: '#8A94A6',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        marginTop: '6px',
      }}>
        {label}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// DATA
//
// Keeping content as plain arrays at the top of
// the file means you can update copy without
// digging through JSX. In a real app this might
// come from a CMS or API.
// ─────────────────────────────────────────────
const STATS = [

  { value: 4,  suffix: '+', label: 'Active Projects'    },
  { value: 60, suffix: 'T', label: 'Tonnes Under Build'  },
  { value: 7,  suffix: '+', label: 'Major Clients'       },
  { value: 8,  suffix: '',  label: 'Service Lines'       },
];

// ─────────────────────────────────────────────
// COMPONENT: Hero
// ─────────────────────────────────────────────
export default function Hero() {
  // `triggered` controls whether the stat counters
  // start animating. We flip it to true after the
  // component mounts, giving React one render cycle
  // to paint the page first.
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    // A short delay so the user sees the page before
    // the numbers start moving
    const timer = setTimeout(() => setTriggered(true), 400);

    // Cleanup: cancel the timer if the component
    // unmounts before the 400ms is up
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
<section style={{
  minHeight: '100vh', display: 'flex', flexDirection: 'column',
  justifyContent: 'center', padding: '8rem 10vw 4rem',
  position: 'relative', overflow: 'hidden',
  textAlign: 'center', alignItems: 'center',
}}>

      {/* Background grid
          This is pure CSS — two overlapping linear-gradients
          at 90 degrees to each other create the grid lines. */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(10,31,92,0.2) 1px, transparent 1px),
          linear-gradient(90deg, rgba(10,31,92,0.2) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      {/* Red diagonal accent — pure CSS shape using
          a skewed linear-gradient. No images needed. */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-2%',
        width: '380px',
        height: '110%',
        background: 'linear-gradient(135deg, transparent 47%, rgba(204,31,45,0.12) 47%, rgba(204,31,45,0.12) 53%, transparent 53%)',
        pointerEvents: 'none',
      }} />

      {/* Content — sits above the decorative layers
          thanks to position: relative + zIndex */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '860px' }}>

        {/* Eyebrow label */}
        <span style={{
          fontSize: '0.72rem',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          color: '#CC1F2D',
          fontWeight: '600',
        }}>
          RC 17632008 · Kano, Nigeria
        </span>

        {/* Main headline
            clamp(min, preferred, max) is a CSS function
            that scales the font with the viewport width
            but stays within bounds. */}
        <h1 style={{
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          fontWeight: '800',
          color: 'white',
          lineHeight: '0.95',
          margin: '20px 0 24px',
          letterSpacing: '-1px',
        }}>
          Energy <span style={{ color: '#CC1F2D' }}>Infrastructure</span>{' '}
          Built to Last.
        </h1>

        <p style={{
  fontFamily: 'var(--sans)', fontSize: '15px', lineHeight: 1.9,
  color: 'var(--text-mute)', fontWeight: 300, maxWidth: '520px',
  margin: '0 auto 3.5rem', animation: 'fadeUp 0.8s 0.75s ease both',
  textAlign: 'center', width: '100%',
   }}> 
          Quilldot Limited designs, constructs, and installs LNG, LPG,
          CNG, and solar energy infrastructure across Nigeria — with
          international-standard safety and a commitment to clean energy.
        </p>

        {/* CTA Buttons */}
       <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', animation: 'fadeUp 0.8s 0.95s ease both' }}>
          <button
            onClick={() => scrollTo('services')}
            style={{
              backgroundColor: '#CC1F2D',
              border: 'none',
              cursor: 'pointer',
              color: 'white',
              fontSize: '0.8rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              padding: '14px 32px',
              fontWeight: '700',
            }}
          >
            View Services
          </button>

          <button
            onClick={() => scrollTo('contact')}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid rgba(255,255,255,0.25)',
              cursor: 'pointer',
              color: 'white',
              fontSize: '0.8rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              padding: '14px 32px',
              fontWeight: '500',
            }}
          >
            Get in Touch
          </button>
        </div>

        {/* Stat counters */}
<div style={{
  display: 'flex',
  justifyContent: 'center', 
  gap: 'clamp(24px, 5vw, 56px)',
  marginTop: '64px',
  paddingTop: '40px',
  borderTop: '1px solid rgba(255,255,255,0.08)',
  flexWrap: 'wrap',
}}>
            
          {STATS.map((stat) => (
            <StatCard
              key={stat.label}
              {...stat}
              triggered={triggered}
            />
          ))}
        </div>

      </div>
    </section>
  );
}