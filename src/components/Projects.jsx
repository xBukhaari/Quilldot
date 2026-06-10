import useInView from '../hooks/useInView';

const PROJECTS = [
  { client: 'Chediya Oil & Gas',       capacity: '10 Tonnes', pct: 90 },
  { client: 'Walhajje Global Limited',  capacity: '30 Tonnes', pct: 80 },
  { client: 'A2F Megaplus Co. Limited', capacity: '10 Tonnes', pct: 20 },
  { client: 'Alsafa',                   capacity: '10 Tonnes', pct: 10 },
];

function ProjectRow({ client, capacity, pct, index, visible }) {
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateX(0)' : 'translateX(-24px)',
      transition: `opacity 0.5s ease ${index * 0.12}s, transform 0.5s ease ${index * 0.12}s`,
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '10px',
        flexWrap: 'wrap',
        gap: '8px',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
          <span style={{
            color: 'white',
            fontWeight: '700',
            fontSize: '1rem',
            letterSpacing: '0.5px',
          }}>
            {client}
          </span>
          <span style={{
            color: '#8A94A6',
            fontSize: '0.72rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}>
            {capacity}
          </span>
        </div>
        <span style={{
          color: '#CC1F2D',
          fontWeight: '800',
          fontSize: '1.1rem',
        }}>
          {pct}%
        </span>
      </div>

      {/* Progress bar track */}
      <div style={{
        height: '4px',
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        {/* Progress bar fill */}
        <div style={{
          height: '100%',
          borderRadius: '2px',
          backgroundColor: '#CC1F2D',
          width: visible ? `${pct}%` : '0%',
          transition: `width 1s ease ${index * 0.15 + 0.3}s`,
        }} />
      </div>
    </div>
  );
}

export default function Projects() {
  const [titleRef, titleVisible] = useInView(0.2);
  const [listRef, listVisible] = useInView(0.2);

  return (
    <section
      id="projects"
      style={{
        backgroundColor: '#0A1F5C',
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
          Live on the Ground
        </span>

        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3.2rem)',
          fontWeight: '800',
          color: 'white',
          lineHeight: '1.05',
          letterSpacing: '-0.5px',
          marginBottom: '16px',
        }}>
          On-going <span style={{ color: '#CC1F2D' }}>Projects</span>
        </h2>

        <p style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: '0.92rem',
          lineHeight: '1.8',
        }}>
          Four active LPG plant builds at various stages of completion
          across Nigeria. Each project is delivered under strict safety
          protocols and international engineering standards.
        </p>
      </div>

      {/* Project list */}
      <div
        ref={listRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '36px',
        }}
      >
        {PROJECTS.map((project, index) => (
          <ProjectRow
            key={project.client}
            {...project}
            index={index}
            visible={listVisible}
          />
        ))}
      </div>

      <p style={{
        color: 'rgba(255,255,255,0.25)',
        fontSize: '0.78rem',
        letterSpacing: '1px',
        marginTop: '60px',
        fontStyle: 'italic',
      }}>
        * Project completion percentages reflect status as of 2026.
      </p>
    </section>
  );
}