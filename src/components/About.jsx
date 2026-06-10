import { useState, useEffect, useRef } from 'react';
import useInView from '../hooks/useInView';


function ValueCard({ label, text, index, visible }) {
  return (
    <div style={{
      borderLeft: '3px solid #CC1F2D',
      paddingLeft: '20px',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      // index * 0.15s means each card starts slightly
      // later than the one above it — the cascade effect
      transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
    }}>
      <div style={{
        color: 'white',
        fontWeight: '700',
        fontSize: '0.9rem',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        marginBottom: '8px',
      }}>
        {label}
      </div>
      <p style={{
        color: '#8A94A6',
        fontSize: '0.88rem',
        lineHeight: '1.8',
      }}>
        {text}
      </p>
    </div>
  );
}

const VALUES = [
  {
    label: 'Our Vision',
    text: 'To become a leading energy infrastructure company in Africa, recognised for innovation, operational excellence, and enabling the transition to cleaner, more efficient energy systems.',
  },
  {
    label: 'Our Mission',
    text: 'To design and deliver safe, scalable, and standards-compliant energy infrastructure solutions that power industries, businesses, and communities while driving sustainable growth.',
  },
  {
    label: 'Safety Commitment',
    text: 'We implement strict engineering standards, risk assessments, instrument calibration, pressure testing, and quality control procedures. These measures are designed to protect personnel, assets, and the environment on every project. We minimize the likelihood of operational failures. Our commitment ensures that each project benefits from evolving industry best practices.',
  },
];

// ─────────────────────────────────────────────
// COMPONENT: About
// ─────────────────────────────────────────────
export default function About() {

  const [ref, visible] = useInView(0.15);

  return (
    <section
      id="about"
      ref={ref}
      style={{
        backgroundColor: '#0F0F0F',
        padding: '100px 5%',
      }}
    >
      {/* Two-column grid.
          auto-fit + minmax means: fill the row with
          columns that are at least 280px wide. If there
          isn't room for two, it drops to one column
          automatically. No media queries needed. */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '60px',
        alignItems: 'start',
      }}>

        {/* LEFT COLUMN */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(-24px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}>
          {/* Eyebrow */}
          <span style={{
            fontSize: '0.7rem',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: '#CC1F2D',
            fontWeight: '700',
          }}>
            Who We Are
          </span>

          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '800',
            color: 'white',
            lineHeight: '1.05',
            margin: '16px 0 24px',
            letterSpacing: '-0.5px',
          }}>
            Built on Safety.<br />
            Driven by <span style={{ color: '#CC1F2D' }}>Innovation.</span>
          </h2>

          <p style={{
            color: '#8A94A6',
            fontSize: '0.92rem',
            lineHeight: '1.8',
            marginBottom: '20px',
          }}>
            Quilldot Limited is a fast-growing energy and engineering company
            delivering integrated infrastructure across the oil, gas, and
            renewable energy sectors.
          </p>

          <p style={{
            color: '#8A94A6',
            fontSize: '0.92rem',
            lineHeight: '1.8',
            marginBottom: '20px',
          }}>
            Registered in Nigeria (RC 17632008) and based in Kano, we combine
            a strong safety culture with adherence to international standards
            to execute scalable, high-capacity projects for industrial,
            commercial, and residential clients.
          </p>

          <p style={{
            color: '#8A94A6',
            fontSize: '0.92rem',
            lineHeight: '1.8',
          }}>
            Positioned at the intersection of clean energy transition and
            downstream infrastructure expansion, we are committed to delivering
            sustainable, revenue-generating energy assets that drive long-term
            value for partners and stakeholders.
          </p>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}>
          {VALUES.map((item, index) => (
            <ValueCard
              key={item.label}
              {...item}
              index={index}
              visible={visible}
            />
          ))}
        </div>

      </div>
    </section>
  );
}