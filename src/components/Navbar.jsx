import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['About', 'Services', 'Projects', 'Gallery', 'Clients', 'Contact'];

  const scrollToSection = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      {/* This style tag handles the responsive switching.
          We can't do display:none for a specific breakpoint
          using inline styles alone, so we drop a real
          <style> block here. The nav-desktop class hides
          the desktop links on mobile, and the hamburger
          class hides the burger button on desktop. */}
      <style>{`
        .nav-desktop { display: flex; }
        .hamburger   { display: none; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .hamburger   { display: block !important; }
        }
      `}</style>

      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: '64px',
        padding: '0 5%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: scrolled ? 'rgba(13,13,13,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
        transition: 'background-color 0.4s ease, border-bottom 0.4s ease',
      }}>

        {/* Logo */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#CC1F2D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>Q</span>
          </div>
          <span style={{ color: 'white', fontWeight: '700', fontSize: '1rem', letterSpacing: '2px' }}>
            QUILLDOT <span style={{ color: '#CC1F2D' }}>LTD</span>
          </span>
        </div>

        {/* Desktop links — hidden on mobile via .nav-desktop class */}
        <div className="nav-desktop" style={{ alignItems: 'center', gap: '32px' }}>
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollToSection(link)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'white',
                fontSize: '0.8rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                opacity: 0.8,
              }}
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('Contact')}
            style={{
              backgroundColor: '#CC1F2D',
              border: 'none',
              cursor: 'pointer',
              color: 'white',
              fontSize: '0.78rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              padding: '10px 22px',
              fontWeight: '700',
            }}
          >
            Get a Quote
          </button>
        </div>

        {/* Hamburger button — hidden on desktop, shown on mobile */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'white',
            fontSize: '1.4rem',
            lineHeight: 1,
          }}
        >
          {/* Ternary: if menuOpen show ✕, otherwise show ☰ */}
          {menuOpen ? '✕' : '☰'}
        </button>

      </nav>

      {/* Mobile dropdown menu.
          The && operator means: only render this div
          when menuOpen is true. When menuOpen is false,
          nothing is rendered here at all. */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          right: 0,
          backgroundColor: 'rgba(13,13,13,0.97)',
          backdropFilter: 'blur(12px)',
          padding: '24px 5%',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          zIndex: 999,
        }}>
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollToSection(link)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer',
                color: 'white',
                fontSize: '1rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                textAlign: 'left',
                padding: '14px 0',
              }}
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('Contact')}
            style={{
              backgroundColor: '#CC1F2D',
              border: 'none',
              cursor: 'pointer',
              color: 'white',
              fontSize: '0.78rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              padding: '14px',
              fontWeight: '700',
              marginTop: '8px',
            }}
          >
            Get a Quote
          </button>
        </div>
      )}
    </>
  );
}