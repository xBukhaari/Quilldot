import useInView from '../hooks/useInView';

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const CLIENTS = [
  'Azman Oil & Gas Ltd',
  'AA Rano Energy',
  'ASAD Energy Fleet Ltd',
  'Nu Synergy Ltd',
  'Audu Manager Oil & Gas',
  'MDR Nigeria Ltd',
  'Kazaure Energy Services Ltd',
];

// ─────────────────────────────────────────────
// COMPONENT: Clients
// ─────────────────────────────────────────────
export default function Clients() {
  const [titleRef, titleVisible] = useInView(0.2);
  const [gridRef, gridVisible] = useInView(0.1);

  return (
    <section
      id="clients"
      style={{
        backgroundColor: '#0D0D0D',
        padding: '100px 5%',
      }}
    >
      {/* ─────────────────────────────────────
          @keyframes injection.

          We can't write @keyframes inside a JS
          style object — they're a CSS-only concept.
          The cleanest solution without a library is
          to drop a real <style> tag right inside JSX.
          React renders it into the <head> area and
          the browser picks it up normally.

          The ticker works by:
          1. Duplicating the client list twice side
             by side (so the loop is seamless)
          2. Animating the container from
             translateX(0) to translateX(-50%)
             That -50% moves exactly one full copy
             of the list out of view, and then it
             loops back to 0 — creating the infinite
             scroll illusion.
      ───────────────────────────────────────── */}
      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Section header */}
      <div
        ref={titleRef}
        style={{
          marginBottom: '60px',
          opacity: titleVisible ? 1 : 0,
          transform: titleVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        <span style={{
          fontSize: '0.7rem',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          color: '#CC1F2D',
          fontWeight: '700',
          display: 'block',
          marginBottom: '12px',
        }}>
          Who Trusts Us
        </span>

        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3.2rem)',
          fontWeight: '800',
          color: 'white',
          lineHeight: '1.05',
          letterSpacing: '-0.5px',
          marginBottom: '16px',
        }}>
          Our <span style={{ color: '#CC1F2D' }}>Clients</span>
        </h2>

        <p style={{
          color: '#8A94A6',
          fontSize: '0.92rem',
          lineHeight: '1.8',
          maxWidth: '460px',
        }}>
          We are proud to work with leading energy companies across Nigeria,
          delivering projects that meet and exceed international standards.
        </p>
      </div>

      {/* ─────────────────────────────────────
          TICKER / MARQUEE

          overflow: hidden on the outer div clips
          the content so you only see one strip.

          The inner div has width: max-content so
          it stretches as wide as all names combined,
          instead of wrapping onto new lines.

          We render CLIENTS twice — once for display,
          once as the seamless loop continuation.
          When the animation reaches -50%, the second
          copy is now where the first started, and
          it loops back to 0 invisibly.
      ───────────────────────────────────────── */}
      <div style={{
        overflow: 'hidden',
        marginBottom: '64px',
        // Fade edges using a mask so the ticker
        // doesn't hard-cut at the edges
        WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
        maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
      }}>
        <div style={{
          display: 'flex',
          gap: '48px',
          width: 'max-content',
          animation: 'ticker 22s linear infinite',
        }}>
          {[...CLIENTS, ...CLIENTS].map((client, index) => (
            <span
              key={index}
              style={{
                color: 'white',
                fontSize: 'clamp(1rem, 2vw, 1.4rem)',
                fontWeight: '700',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                opacity: 0.4,
                whiteSpace: 'nowrap',
              }}
            >
              {client}
              {/* Dot separator between names */}
              <span style={{ color: '#CC1F2D', marginLeft: '48px', opacity: 0.7 }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────
          CLIENT CARDS GRID

          Same pattern as Services — auto-fill grid
          with staggered fade-in on scroll.
      ───────────────────────────────────────── */}
      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '2px',
        }}
      >
        {CLIENTS.map((client, index) => (
          <div
            key={client}
            style={{
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              opacity: gridVisible ? 1 : 0,
              transform: gridVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: `opacity 0.4s ease ${index * 0.07}s, transform 0.4s ease ${index * 0.07}s`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(204,31,45,0.4)';
              e.currentTarget.style.backgroundColor = '#111111';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {/* Red dot accent */}
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#CC1F2D',
              flexShrink: 0,
            }} />
            <span style={{
              color: '#8A94A6',
              fontSize: '0.88rem',
              letterSpacing: '0.5px',
            }}>
              {client}
            </span>
          </div>
        ))}
      </div>

    </section>
  );
}