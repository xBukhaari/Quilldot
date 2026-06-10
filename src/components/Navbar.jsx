import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = ['About', 'Services', 'Projects', 'Gallery', 'Clients', 'Contact'];

  const scrollToSection = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
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
      backgroundColor: scrolled ? 'rgba(13, 13, 13, 0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
      transition: 'background-color 0.4s ease, border-bottom 0.4s ease',
    }}>

      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
           onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
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

      {/* Desktop Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
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

    </nav>
  );
}