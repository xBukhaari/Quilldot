import { useState } from 'react';
import useInView from '../hooks/useInView';

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const CONTACT_DETAILS = [
  {
    icon: '📍',
    label: 'Address',
    value: 'Suite 4, No. 287 Malaga Street, Hotoro, Kano, Nigeria',
  },
  {
    icon: '📞',
    label: 'Phone',
    value: '09162195616 · 08068127660',
  },
  {
    icon: '✉️',
    label: 'Email',
    value: 'quilldotlimited@gmail.com',
  },
  {
    icon: '🌐',
    label: 'Website',
    value: 'www.quilldot.com.ng',
  },
];

// ─────────────────────────────────────────────
// COMPONENT: ContactForm
//
// A controlled form. Every input's value is stored
// in React state. When the user types, onChange
// fires and updates state. React re-renders the
// input with the new value. The input never holds
// its own value — React does.
//
// This is different from a regular HTML form where
// the DOM manages the input values itself.
// ─────────────────────────────────────────────
function ContactForm() {
  // One state object holds all three field values.
  // This is cleaner than three separate useState calls.
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // submitted controls whether we show the form
  // or the success message
  const [submitted, setSubmitted] = useState(false);

  // focused tracks which input is currently active
  // so we can highlight its border
  const [focused, setFocused] = useState('');

  // ─────────────────────────────────────────
  // handleChange
  //
  // Instead of writing a separate onChange for
  // each field, we write one handler that uses
  // the input's `name` attribute to know which
  // field to update.
  //
  // The spread ...prev keeps all existing field
  // values and only overwrites the one that changed.
  // ─────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // [name] is a computed property key.
      // If name is "email", this becomes { email: value }
    }));
  };

  // ─────────────────────────────────────────
  // handleSubmit
  //
  // e.preventDefault() stops the browser's default
  // form behaviour, which would be to reload the page.
  // In React we always do this and handle submission
  // ourselves.
  //
  // In a real app you'd send formData to an API here.
  // For now we just flip submitted to true.
  // ─────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  // Shared styles for inputs and textarea
  const inputStyle = (fieldName) => ({
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.04)',
    border: `1px solid ${focused === fieldName ? '#CC1F2D' : 'rgba(255,255,255,0.1)'}`,
    padding: '14px 16px',
    color: 'white',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    // Smooth border color change on focus
  });

  const labelStyle = {
    display: 'block',
    color: '#8A94A6',
    fontSize: '0.72rem',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginBottom: '8px',
    fontWeight: '600',
  };

  // ─────────────────────────────────────────
  // SUCCESS STATE
  //
  // If the form was submitted, show a thank-you
  // message instead of the form.
  // This is a ternary render — the most common
  // way to conditionally render in JSX.
  // condition ? <ShowThis /> : <ShowThat />
  // ─────────────────────────────────────────
  if (submitted) {
    return (
      <div style={{
        border: '1px solid rgba(204,31,45,0.3)',
        padding: '48px 32px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '16px' }}>✅</div>
        <h3 style={{
          color: 'white',
          fontSize: '1.2rem',
          fontWeight: '700',
          marginBottom: '12px',
          letterSpacing: '1px',
        }}>
          Message Received
        </h3>
        <p style={{
          color: '#8A94A6',
          fontSize: '0.9rem',
          lineHeight: '1.8',
          maxWidth: '320px',
          margin: '0 auto 24px',
        }}>
          Thank you for reaching out. The Quilldot team will get
          back to you shortly.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', message: '' });
          }}
          style={{
            background: 'none',
            border: '1px solid rgba(255,255,255,0.15)',
            color: '#8A94A6',
            fontSize: '0.75rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            padding: '10px 20px',
            cursor: 'pointer',
          }}
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Name */}
      <div>
        <label style={labelStyle}>Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onFocus={() => setFocused('name')}
          onBlur={() => setFocused('')}
          placeholder="e.g. Aminu Ibrahim"
          required
          style={inputStyle('name')}
        />
      </div>

      {/* Email */}
      <div>
        <label style={labelStyle}>Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => setFocused('email')}
          onBlur={() => setFocused('')}
          placeholder="you@company.com"
          required
          style={inputStyle('email')}
        />
      </div>

      {/* Message */}
      <div>
        <label style={labelStyle}>Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          onFocus={() => setFocused('message')}
          onBlur={() => setFocused('')}
          placeholder="Tell us about your project..."
          required
          rows={5}
          style={{
            ...inputStyle('message'),
            resize: 'vertical',
            // vertical only — we don't want users
            // breaking the horizontal layout
          }}
        />
      </div>

      <button
        type="submit"
        style={{
          backgroundColor: '#CC1F2D',
          border: 'none',
          color: 'white',
          fontSize: '0.8rem',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          padding: '16px 32px',
          fontWeight: '700',
          cursor: 'pointer',
          alignSelf: 'flex-start',
          transition: 'opacity 0.2s ease',
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
      >
        Send Message
      </button>

    </form>
  );
}

// ─────────────────────────────────────────────
// COMPONENT: Contact
// ─────────────────────────────────────────────
export default function Contact() {
  const [ref, visible] = useInView(0.1);

  return (
    <section
      id="contact"
      style={{
        backgroundColor: '#0A1F5C',
        padding: '100px 5% 60px',
      }}
    >
      <div
        ref={ref}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '60px',
          marginBottom: '60px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >

        {/* LEFT — contact details */}
        <div>
          <span style={{
            fontSize: '0.7rem',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: '#CC1F2D',
            fontWeight: '700',
            display: 'block',
            marginBottom: '12px',
          }}>
            Reach Out
          </span>

          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: '800',
            color: 'white',
            lineHeight: '1.05',
            letterSpacing: '-0.5px',
            marginBottom: '40px',
          }}>
            Let's Build <span style={{ color: '#CC1F2D' }}>Together</span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {CONTACT_DETAILS.map(({ icon, label, value }) => (
              <div key={label} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.1rem', marginTop: '2px' }}>{icon}</span>
                <div>
                  <div style={{
                    fontSize: '0.68rem',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: '#CC1F2D',
                    fontWeight: '700',
                    marginBottom: '4px',
                  }}>
                    {label}
                  </div>
                  <div style={{
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                  }}>
                    {value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — contact form */}
        <div>
          <ContactForm />
        </div>

      </div>

      {/* Footer bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.1)',
        paddingTop: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <span style={{
          color: 'rgba(255,255,255,0.25)',
          fontSize: '0.78rem',
          letterSpacing: '1px',
        }}>
          © 2026 Quilldot Limited. RC 17632008. All rights reserved.
        </span>
        <span style={{
          color: 'rgba(255,255,255,0.25)',
          fontSize: '0.78rem',
          letterSpacing: '1px',
        }}>
          Design, Construction & Consultancy for Energy and Engineering
        </span>
      </div>

    </section>
  );
}