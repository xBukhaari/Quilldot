import { useState, useEffect } from 'react';
import useInView from '../hooks/useInView';

// ─────────────────────────────────────────────
// DATA
//
// Each image has a src, an alt description, and
// a `span` value. span: 2 means that image takes
// up 2 columns in the grid instead of 1, giving
// the layout variety and visual interest.
// ─────────────────────────────────────────────
const IMAGES = [
  { src: 'https://picsum.photos/seed/1/800/600', alt: 'Site team on location',         span: 2 },
  { src: 'https://picsum.photos/seed/2/800/600', alt: 'LPG vessel installation',        span: 1 },
  { src: 'https://picsum.photos/seed/3/800/600', alt: 'Gas tank positioning',           span: 1 },
  { src: 'https://picsum.photos/seed/4/800/600', alt: 'Foundation work in progress',    span: 1 },
  { src: 'https://picsum.photos/seed/5/800/600', alt: 'Excavation at project site',     span: 1 },
  { src: 'https://picsum.photos/seed/6/800/600', alt: 'Team briefing on site',          span: 2 },
  { src: 'https://picsum.photos/seed/7/800/600', alt: 'LPG storage tank installed',     span: 1 },
  { src: 'https://picsum.photos/seed/8/800/600', alt: 'Site construction progress',     span: 1 },
];

// ─────────────────────────────────────────────
// COMPONENT: Lightbox
//
// This renders when the user clicks an image.
// It sits fixed over the entire screen.
//
// Key concepts:
//
// e.stopPropagation() — when you click the image
// itself, we don't want the click to "bubble up"
// to the backdrop div and trigger onClose. So we
// stop the event from propagating upward.
//
// useEffect for keyboard — we add an Escape key
// listener when the lightbox opens, and clean it
// up when it closes. Classic useEffect pattern.
// ─────────────────────────────────────────────
function Lightbox({ image, onClose }) {
  // Listen for Escape key to close lightbox
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);

    // Cleanup: remove listener when lightbox closes
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Also prevent the page from scrolling while
  // the lightbox is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    // Backdrop — clicking this dark area closes the lightbox
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.92)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        // Animate in with a quick fade
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.92); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }
      `}</style>

      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'fixed',
          top: '20px',
          right: '24px',
          background: 'none',
          border: '1px solid rgba(255,255,255,0.2)',
          color: 'white',
          fontSize: '1rem',
          cursor: 'pointer',
          padding: '8px 14px',
          letterSpacing: '1px',
          zIndex: 2001,
        }}
      >
        ESC ✕
      </button>

      {/* Image container
          stopPropagation prevents clicks on the image
          from reaching the backdrop and closing the lightbox */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '90vw',
          maxHeight: '90vh',
          animation: 'scaleIn 0.25s ease',
        }}
      >
        <img
          src={image.src}
          alt={image.alt}
          style={{
            maxWidth: '100%',
            maxHeight: '85vh',
            objectFit: 'contain',
            display: 'block',
          }}
        />
        {/* Caption */}
        <p style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: '0.8rem',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginTop: '12px',
          textAlign: 'center',
        }}>
          {image.alt}
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// COMPONENT: Gallery
// ─────────────────────────────────────────────
export default function Gallery() {
  // selectedImage holds the image object the user
  // clicked. null means the lightbox is closed.
  const [selectedImage, setSelectedImage] = useState(null);

  const [titleRef, titleVisible] = useInView(0.2);
  const [gridRef, gridVisible] = useInView(0.1);

  return (
    <section
      id="gallery"
      style={{
        backgroundColor: '#111111',
        padding: '100px 5%',
      }}
    >
      {/* ─────────────────────────────────────
          CONDITIONAL RENDERING

          {selectedImage && <Lightbox />} means:
          "only render Lightbox if selectedImage
          is not null/undefined/false."

          This is one of the most common React
          patterns — showing a component only
          when a condition is true.
      ───────────────────────────────────────── */}
      {selectedImage && (
        <Lightbox
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}

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
          On the Ground
        </span>

        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3.2rem)',
          fontWeight: '800',
          color: 'white',
          lineHeight: '1.05',
          letterSpacing: '-0.5px',
          marginBottom: '16px',
        }}>
          Project <span style={{ color: '#CC1F2D' }}>Gallery</span>
        </h2>

        <p style={{
          color: '#8A94A6',
          fontSize: '0.92rem',
          lineHeight: '1.8',
        }}>
          A look at our teams and infrastructure builds across Nigeria.
          Click any image to view full screen.
        </p>
      </div>

      {/* ─────────────────────────────────────
          GRID

          gridTemplateColumns: repeat(4, 1fr)
          gives us 4 equal columns.

          Each image card uses gridColumn: span X
          where X comes from the image's span value.
          span 2 means that card stretches across
          2 of the 4 columns.

          On mobile (handled via a media query in
          the style tag) we collapse to 2 columns.
      ───────────────────────────────────────── */}
      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }
        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      <div ref={gridRef} className="gallery-grid">
        {IMAGES.map((image, index) => (
          <div
            key={image.alt}
            onClick={() => setSelectedImage(image)}
            style={{
              gridColumn: `span ${image.span}`,
              aspectRatio: image.span === 2 ? '16/9' : '4/3',
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative',
              opacity: gridVisible ? 1 : 0,
              transform: gridVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.5s ease ${index * 0.06}s, transform 0.5s ease ${index * 0.06}s`,
            }}
            // Hover overlay effect
            onMouseEnter={(e) => {
              e.currentTarget.querySelector('.overlay').style.opacity = '1';
              e.currentTarget.querySelector('img').style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.querySelector('.overlay').style.opacity = '0';
              e.currentTarget.querySelector('img').style.transform = 'scale(1)';
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.4s ease',
              }}
            />

            {/* Hover overlay
                className here so we can select it
                with querySelector in the hover handlers */}
            <div
              className="overlay"
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(204,31,45,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                transition: 'opacity 0.3s ease',
              }}
            >
              <span style={{
                color: 'white',
                fontSize: '0.75rem',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontWeight: '700',
              }}>
                View
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}