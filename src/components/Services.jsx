import useInView from '../hooks/useInView';

// ─────────────────────────────────────────────
// DATA

const SERVICES = [
  {
    icon: '⚗️',
    title: 'LPG Refill Plant Design',
    desc: 'Engineered facilities for safe storage, bottling, and distribution of liquefied petroleum gas — from residential to industrial scale.',
  },
  {
    icon: '🔥',
    title: 'LNG Plant Engineering',
    desc: 'Full-cycle design of gas processing, liquefaction, storage, and distribution systems built to international safety standards.',
  },
  {
    icon: '⛽',
    title: 'CNG & LCNG Auto Stations',
    desc: 'High-pressure compression, storage, and dispensing infrastructure for natural gas vehicle refueling networks.',
  },
  {
    icon: '🏘️',
    title: 'Metered Gas Reticulation',
    desc: 'Smart piped-gas networks for estates with leak detection, flame arresters, and flexible metering plans — no more cylinders.',
  },
  {
    icon: '☀️',
    title: 'Solar Power Infrastructure',
    desc: 'Photovoltaic systems producing clean, renewable electricity for residential, commercial, and industrial clients.',
  },
  {
    icon: '🏗️',
    title: 'Petrol Filling Stations',
    desc: 'Comprehensive design, construction, and installation of petrol stations with full regulatory compliance.',
  },
  {
    icon: '🔄',
    title: 'Petrol-to-CNG Conversion',
    desc: 'Seamless conversion of existing petrol stations to cleaner, cost-efficient compressed natural gas infrastructure.',
  },
  {
    icon: '📐',
    title: 'Engineering Consultancy',
    desc: 'Expert technical advisory, design optimisation, and project oversight across all energy infrastructure sectors.',
  },
];

// ─────────────────────────────────────────────
// COMPONENT: ServiceCard
//
// Each card gets its own useInView so it can
// individually detect when it enters the viewport.
//
// The `index` prop is used to stagger the animation
// delay — card 0 animates immediately, card 1 waits
// 70ms, card 2 waits 140ms, and so on.
// ─────────────────────────────────────────────
function ServiceCard({ icon, title, desc, index }) {
  const [ref, visible] = useInView(0.1);
  // 0.1 threshold — fire when just 10% of the card
  // is visible. Cards are small so we want them to
  // trigger early rather than waiting until they're
  // half in view.

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: '#0D0D0D',
        border: '1px solid rgba(255,255,255,0.07)',
        padding: '28px 24px',
        position: 'relative',
        cursor: 'default',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.5s ease ${index * 0.07}s, transform 0.5s ease ${index * 0.07}s`,
      }}
      // onMouseEnter and onMouseLeave let us do simple
      // hover effects without CSS classes or extra state.
      // e.currentTarget refers to the element the handler
      // is attached to (the card div itself).
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(204,31,45,0.5)';
        e.currentTarget.style.backgroundColor = '#141414';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
        e.currentTarget.style.backgroundColor = '#0D0D0D';
      }}
    >
      {/* Red top-left corner accent bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '3px',
        height: '40px',
        backgroundColor: '#CC1F2D',
      }} />

      <div style={{ fontSize: '1.8rem', marginBottom: '16px' }}>{icon}</div>

      <h3 style={{
        color: 'white',
        fontSize: '1rem',
        fontWeight: '700',
        letterSpacing: '0.5px',
        marginBottom: '12px',
        textTransform: 'uppercase',
      }}>
        {title}
      </h3>

      <p style={{
        color: '#8A94A6',
        fontSize: '0.85rem',
        lineHeight: '1.75',
      }}>
        {desc}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// COMPONENT: Services
// ─────────────────────────────────────────────
export default function Services() {
  const [titleRef, titleVisible] = useInView(0.2);

  return (
    <section
      id="services"
      style={{
        backgroundColor: '#111111',
        padding: '100px 5%',
      }}
    >
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
          What We Offer
        </span>

        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3.2rem)',
          fontWeight: '800',
          color: 'white',
          lineHeight: '1.05',
          letterSpacing: '-0.5px',
          marginBottom: '16px',
        }}>
          Eight Core <span style={{ color: '#CC1F2D' }}>Service Lines</span>
        </h2>

        <p style={{
          color: '#8A94A6',
          fontSize: '0.92rem',
          lineHeight: '1.8',
        }}>
          From concept to commissioning. Complete energy infrastructure
          delivered with precision engineering and safety at every step.
        </p>
      </div>

      {/* Services grid
          auto-fill differs from auto-fit in one subtle way:
          auto-fill creates as many columns as will fit,
          even if some are empty. auto-fit collapses empty
          columns. For a full grid like this, both work the
          same — but auto-fill is semantically more correct
          here since we always have 8 items to fill. */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '2px',
      }}>
        {SERVICES.map((service, index) => (
          <ServiceCard
            key={service.title}
            {...service}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}