// IranTour Advisor — Components v3 (Modern Premium, no carpet)

// ─── Persian 8-pointed star watermark (subtle, 3% opacity) ──
const StarWatermark = ({ size = 400, style = {} }) =>
<svg width={size} height={size} viewBox="0 0 100 100"
style={{ position: 'absolute', pointerEvents: 'none', ...style }} aria-hidden="true">
    <g opacity="0.03" fill="currentColor">
      <polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" />
      <polygon points="50,15 58,38 83,38 63,53 71,78 50,63 29,78 37,53 17,38 42,38"
    fill="none" stroke="currentColor" strokeWidth="0.5" />
    </g>
  </svg>;


// ─── Subtle geometric accent line ────────────────────────────
const GeoLine = ({ color = '#C9A96E', width = 48, style = {} }) =>
<div style={{
  width, height: 2,
  background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
  ...style
}} />;


// ─── Stars (modern 5-point) ───────────────────────────────────
const Stars = ({ rating = 4.8, size = 13 }) =>
<span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
    {[...Array(5)].map((_, i) =>
  <svg key={i} width={size} height={size} viewBox="0 0 24 24"
  fill={i < Math.floor(rating) ? '#C9A96E' : 'none'}
  stroke="#C9A96E" strokeWidth="1.8">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
  )}
  </span>;


// ─── Duration badge ───────────────────────────────────────────
const DurationBadge = ({ days }) =>
<span style={{
  background: 'rgba(201,169,110,0.12)', color: '#C9A96E',
  border: '1px solid rgba(201,169,110,0.3)',
  borderRadius: 999, padding: '3px 12px', fontSize: 12, fontWeight: 600,
  display: 'inline-flex', alignItems: 'center', gap: 4,
  fontFamily: 'var(--font-en)'
}}>
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
    {days} days
  </span>;


const DiffBadge = ({ level }) => {
  const map = {
    easy: ['Easy', '#2C5F5D', 'rgba(44,95,93,0.1)'],
    medium: ['Moderate', '#C9A96E', 'rgba(201,169,110,0.1)'],
    hard: ['Challenging', '#8B1A1A', 'rgba(139,26,26,0.1)']
  };
  const [label, color, bg] = map[level] || map.easy;
  return (
    <span style={{ background: bg, color, borderRadius: 999, padding: '2px 10px', fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-en)' }}>
      {label}
    </span>);

};

// ─── Package Card ─────────────────────────────────────────────
const PackageCard = ({ pkg, lang, onClick }) => {
  const [hov, setHov] = React.useState(false);
  const name = lang === 'fa' ? pkg.nameFa : pkg.nameEn;
  const tag = lang === 'fa' ? pkg.tagFa : pkg.tagEn;
  const desc = lang === 'fa' ? pkg.descFa : pkg.descEn;
  const cities = lang === 'fa' ? pkg.cities : pkg.citiesEn;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
        background: '#fff',
        boxShadow: hov ?
        '0 20px 60px rgba(0,0,0,0.14), 0 0 0 1px rgba(201,169,110,0.3)' :
        '0 4px 24px rgba(0,0,0,0.08)',
        transform: hov ? 'translateY(-6px)' : 'none',
        transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', flexDirection: 'column'
      }}>
      
      {/* Image — 60% of card */}
      <div style={{
        height: 220, position: 'relative', overflow: 'hidden',
        background: pkg.gradient
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.05) 60%, transparent 100%)',
          transition: 'opacity 0.3s',
          opacity: hov ? 0.8 : 1
        }} />
        {/* Image zoom on hover */}
        <div style={{
          position: 'absolute', inset: 0, background: pkg.gradient,
          transform: hov ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)'
        }} />
        <StarWatermark size={200} style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: '#fff' }} />
        <div style={{ position: 'absolute', top: 14, right: 14 }}>
          <DurationBadge days={pkg.days} />
        </div>
        {pkg.featured &&
        <div style={{ position: 'absolute', top: 14, left: 14, background: '#C9A96E', color: '#0A0A0A', borderRadius: 999, padding: '3px 12px', fontSize: 11, fontWeight: 800, fontFamily: 'var(--font-en)' }}>
            FEATURED
          </div>
        }
        <div style={{ position: 'absolute', bottom: 14, left: 14, display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {cities.slice(0, 3).map((c) =>
          <span key={c} style={{
            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
            color: '#fff', borderRadius: 6, padding: '2px 9px', fontSize: 11, fontWeight: 600,
            border: '1px solid rgba(255,255,255,0.2)',
            fontFamily: lang === 'fa' ? 'var(--font-fa)' : 'var(--font-en)'
          }}>{c}</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 22px 22px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <h3 style={{

            fontSize: 18, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.3, margin: 0, fontFamily: "Khamenei"
          }}>{name}</h3>
          <span style={{
            background: 'rgba(44,95,93,0.08)', color: '#2C5F5D',
            borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700, flexShrink: 0, fontFamily: "Khamenei"

          }}>{tag}</span>
        </div>
        <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0, lineHeight: 1.6,
          fontFamily: lang === 'fa' ? 'var(--font-fa)' : 'var(--font-body)'
        }}>{desc}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
          <Stars rating={pkg.rating} size={12} />
          <span style={{ fontSize: 12, color: '#1A1A1A', fontWeight: 700, fontFamily: 'var(--font-en)' }}>{pkg.rating}</span>
          <span style={{ fontSize: 11, color: '#9CA3AF', fontFamily: 'var(--font-en)' }}>({pkg.reviews} reviews)</span>
          <DiffBadge level={pkg.difficulty} />
        </div>
        <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid #EFEFEF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {cities.slice(0, 2).map((c) =>
            <span key={c} style={{ fontSize: 11, color: '#9CA3AF', fontFamily: lang === 'fa' ? 'var(--font-fa)' : 'var(--font-en)' }}>
                {c}{cities.indexOf(c) < Math.min(cities.length, 2) - 1 ? ' →' : ''}
              </span>
            )}
          </div>
          <button style={{
            background: '#1A1A1A', color: '#F8F6F2', border: 'none',
            borderRadius: 999, padding: '8px 20px',
            fontSize: 12, fontWeight: 700, cursor: 'pointer',
            fontFamily: 'var(--font-en)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#C9A96E'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#1A1A1A'}>
            {lang === 'fa' ? 'مشاهده' : 'View →'}
          </button>
        </div>
      </div>
    </div>);

};

// ─── Guide Card ───────────────────────────────────────────────
const GuideCard = ({ guide, lang, onClick }) => {
  const [hov, setHov] = React.useState(false);
  const name = lang === 'fa' ? guide.nameFa : guide.nameEn;
  const city = lang === 'fa' ? guide.city : guide.cityEn;
  const specialty = lang === 'fa' ? guide.specialtyFa : guide.specialtyEn;

  const avatarColors = {
    shiraz: ['#8B1A1A', '#C9A96E'],
    isfahan: ['#1B3A6B', '#C9A96E'],
    yazd: ['#2C5F5D', '#C9A96E']
  };
  const [from, to] = avatarColors[guide.carpetPattern] || avatarColors.isfahan;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        background: '#fff', borderRadius: 16,
        boxShadow: hov ? '0 20px 60px rgba(0,0,0,0.12)' : '0 4px 24px rgba(0,0,0,0.07)',
        transform: hov ? 'translateY(-4px)' : 'none',
        transition: 'all 0.28s cubic-bezier(0.4,0,0.2,1)',
        cursor: 'pointer', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        border: hov ? '1px solid rgba(201,169,110,0.3)' : '1px solid #EFEFEF'
      }}>
      
      {/* Top colored band */}
      <div style={{ height: 6, background: `linear-gradient(90deg,${from},${to})` }} />
      <div style={{ padding: '28px 24px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
        {/* Avatar */}
        <div style={{ position: 'relative' }}>
          <div style={{
            width: 96, height: 96, borderRadius: '50%',
            background: `linear-gradient(135deg,${from},${to})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '3px solid #EFEFEF',
            boxShadow: `0 8px 24px rgba(0,0,0,0.12)`
          }}>
            <svg width="48" height="48" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="14" r="10" fill="rgba(255,255,255,0.45)" />
              <ellipse cx="20" cy="36" rx="15" ry="10" fill="rgba(255,255,255,0.3)" />
            </svg>
          </div>
          {/* Verified dot */}
          <div style={{
            position: 'absolute', bottom: 2, right: 2,
            width: 22, height: 22, borderRadius: '50%',
            background: '#2C5F5D', border: '2px solid #fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="white" stroke="none">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>

        {/* Info */}
        <div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>{name}</div>
          <div style={{ fontSize: 13, color: '#C9A96E', fontWeight: 700, marginBottom: 4, fontFamily: lang === 'fa' ? 'var(--font-fa)' : 'var(--font-en)' }}>{city}</div>
          <div style={{ fontSize: 12, color: '#6B6B6B', fontFamily: lang === 'fa' ? 'var(--font-fa)' : 'var(--font-body)' }}>{specialty}</div>
        </div>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
          <Stars rating={guide.rating} size={13} />
          <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', fontFamily: 'var(--font-en)' }}>{guide.rating}</span>
          <span style={{ fontSize: 11, color: '#9CA3AF', fontFamily: 'var(--font-en)' }}>({guide.reviews})</span>
        </div>

        {/* Languages */}
        <div style={{ display: 'flex', gap: 5, justifyContent: 'center', flexWrap: 'wrap' }}>
          {guide.languages.map((l) =>
          <span key={l.code} style={{
            background: '#F8F6F2', border: '1px solid #EFEFEF',
            borderRadius: 6, padding: '2px 9px', fontSize: 11, fontWeight: 600,
            color: '#6B6B6B', display: 'flex', alignItems: 'center', gap: 4,
            fontFamily: 'var(--font-en)'
          }}>
              {l.flag} {l.name}
            </span>
          )}
        </div>

        {/* CTA */}
        <button style={{
          width: '100%', background: '#1A1A1A', color: '#F8F6F2',
          border: 'none', borderRadius: 999, padding: '11px 0',
          fontSize: 13, fontWeight: 700, cursor: 'pointer',
          fontFamily: 'var(--font-en)',
          transition: 'background 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = '#C9A96E'}
        onMouseLeave={(e) => e.currentTarget.style.background = '#1A1A1A'}>
          {lang === 'fa' ? 'مشاهده پروفایل' : 'View Profile'}
        </button>
      </div>
    </div>);

};

// ─── Guide Profile ────────────────────────────────────────────
const GuideProfile = ({ guide, lang, onBack }) => {
  const [contactOpen, setContactOpen] = React.useState(false);
  const [isMobileGuide, setIsMobileGuide] = React.useState(window.innerWidth < 768);
  React.useEffect(() => { const h = () => setIsMobileGuide(window.innerWidth < 768); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h); }, []);
  const name = lang === 'fa' ? guide.nameFa : guide.nameEn;
  const city = lang === 'fa' ? guide.city : guide.cityEn;
  const specialty = lang === 'fa' ? guide.specialtyFa : guide.specialtyEn;
  const bio = lang === 'fa' ? guide.bioFa : guide.bioEn;
  const reviews = (GUIDE_REVIEWS || {})[guide.id] || [];
  const avatarColors = { shiraz: ['#8B1A1A', '#C9A96E'], isfahan: ['#1B3A6B', '#C9A96E'], yazd: ['#2C5F5D', '#C9A96E'] };
  const [from, to] = avatarColors[guide.carpetPattern] || avatarColors.isfahan;

  return (
    <div style={{ background: '#F8F6F2', minHeight: '100vh', paddingTop: 68 }}>
      {contactOpen && <ContactModal lang={lang} onClose={() => setContactOpen(false)} title={`${lang === 'fa' ? 'تماس با' : 'Contact'} ${name}`} />}
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg,${from} 0%,#0A0A0A 100%)`, padding: isMobileGuide ? '40px 16px 48px' : '56px 24px 64px', position: 'relative', overflow: 'hidden' }}>
        <StarWatermark size={isMobileGuide ? 250 : 500} style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: '#fff' }} />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: 999, padding: '7px 18px', fontSize: 12, fontWeight: 600, cursor: 'pointer', marginBottom: 28, fontFamily: 'var(--font-en)' }}>
            ← {lang === 'fa' ? 'بازگشت' : 'Back'}
          </button>
          <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', flexWrap: 'wrap', flexDirection: isMobileGuide ? 'column' : 'row' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: 120, height: 120, borderRadius: '50%', background: `linear-gradient(135deg,${from},${to})`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '4px solid rgba(255,255,255,0.2)', boxShadow: '0 12px 32px rgba(0,0,0,0.3)' }}>
                <svg width="64" height="64" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="14" r="10" fill="rgba(255,255,255,0.45)" />
                  <ellipse cx="20" cy="36" rx="15" ry="10" fill="rgba(255,255,255,0.3)" />
                </svg>
              </div>
              <div style={{ position: 'absolute', bottom: 4, right: 4, width: 28, height: 28, borderRadius: '50%', background: '#C9A96E', border: '3px solid #0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
            </div>
            <div style={{ color: '#fff' }}>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 36, fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.02em' }}>{name}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                <span style={{ background: 'rgba(201,169,110,0.18)', color: '#C9A96E', border: '1px solid rgba(201,169,110,0.35)', borderRadius: 999, padding: '3px 12px', fontSize: 12, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: lang === 'fa' ? 'var(--font-fa)' : 'var(--font-en)' }}>
                  📍 {city} {lang === 'fa' ? 'متخصص' : 'Specialist'}
                </span>
              </div>
              <div style={{ color: 'rgba(248,246,242,0.65)', fontSize: 13, marginBottom: 10, fontFamily: lang === 'fa' ? 'var(--font-fa)' : 'var(--font-en)' }}>{specialty}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Stars rating={guide.rating} size={15} />
                <span style={{ fontWeight: 800, fontSize: 15, fontFamily: 'var(--font-en)' }}>{guide.rating}/5</span>
                <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, fontFamily: 'var(--font-en)' }}>({guide.reviews} reviews)</span>
                <span style={{ color: 'rgba(255,255,255,0.3)' }}>·</span>
                <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, fontFamily: 'var(--font-en)' }}>{guide.experience} yrs experience</span>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                {guide.languages.map((l) =>
                <span key={l.code} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '4px 12px', fontSize: 12, fontWeight: 600, color: '#fff', fontFamily: 'var(--font-en)' }}>
                    {l.flag} {l.name}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: isMobileGuide ? '24px 16px' : '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobileGuide ? '1fr' : '1fr 300px', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
            { title: lang === 'fa' ? 'درباره من' : 'About Me', content:
              <p style={{ fontSize: 15, color: '#374151', lineHeight: lang === 'fa' ? 2.0 : 1.8, margin: 0, fontFamily: lang === 'fa' ? 'var(--font-fa)' : 'var(--font-body)' }}>{bio}</p>
            },
            { title: lang === 'fa' ? 'فعالیت‌های تور' : 'Tour Activities', content:
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {guide.activities.map((act, i) =>
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: '#F8F6F2', borderRadius: 10, border: '1px solid #EFEFEF' }}>
                      <span style={{ fontSize: 20 }}>{act.icon}</span>
                      <span style={{ fontSize: 14, color: '#374151', fontWeight: 500, fontFamily: lang === 'fa' ? 'var(--font-fa)' : 'var(--font-body)' }}>{lang === 'fa' ? act.fa : act.en}</span>
                    </div>
                )}
                </div>
            },
            { title: lang === 'fa' ? 'نظرات مسافران' : 'Traveler Reviews', content:
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {reviews.map((r, i) =>
                <div key={i} style={{ padding: '16px 20px', background: '#F8F6F2', borderRadius: 12, border: '1px solid #EFEFEF' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                        <span style={{ fontSize: 22 }}>{r.flag}</span>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 14, color: '#1A1A1A', fontFamily: 'var(--font-en)' }}>{r.name}</div>
                          <div style={{ fontSize: 11, color: '#9CA3AF', fontFamily: 'var(--font-en)' }}>{r.date}</div>
                        </div>
                        <div style={{ marginRight: 'auto', marginLeft: 'auto' }}><Stars rating={r.rating} size={12} /></div>
                      </div>
                      <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.7, margin: 0, fontStyle: 'italic', fontFamily: 'var(--font-body)' }}>"{r.text}"</p>
                    </div>
                )}
                </div>
            }].
            map(({ title, content }) =>
            <div key={title} style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #EFEFEF' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, color: '#1A1A1A', margin: '0 0 16px' }}>{title}</h3>
                {content}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #EFEFEF', position: 'sticky', top: 84 }}>
              <div style={{ height: 4, background: `linear-gradient(90deg,${from},${to})` }} />
              <div style={{ padding: '24px 20px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 700, color: '#1A1A1A', margin: '0 0 18px' }}>{lang === 'fa' ? 'تماس با راهنما' : 'Contact Guide'}</h3>
                {[
                { icon: '✉️', label: 'Email', value: guide.contact.email, href: `mailto:${guide.contact.email}` },
                { icon: '📞', label: 'Phone', value: guide.contact.phone, href: `tel:${guide.contact.phone}` },
                { icon: '📷', label: 'Instagram', value: guide.contact.instagram, href: `#` },
                { icon: '✈️', label: 'Telegram', value: guide.contact.telegram, href: `#` }].
                map((c) =>
                <a key={c.label} href={c.href} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid #F8F6F2', textDecoration: 'none', color: '#374151', transition: 'color 0.15s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#C9A96E'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#374151'}>
                    <span style={{ fontSize: 18 }}>{c.icon}</span>
                    <div>
                      <div style={{ fontSize: 10, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-en)' }}>{c.label}</div>
                      <div style={{ fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-en)' }}>{c.value}</div>
                    </div>
                  </a>
                )}
                <button onClick={() => setContactOpen(true)} style={{ width: '100%', background: '#1A1A1A', color: '#F8F6F2', border: 'none', borderRadius: 999, padding: '13px', marginTop: 18, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-en)', transition: 'background 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#C9A96E'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#1A1A1A'}>
                  {lang === 'fa' ? 'تماس با این راهنما' : 'Contact This Guide'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

// ─── Review Card ──────────────────────────────────────────────
const ReviewCard = ({ review }) =>
<div style={{ background: '#fff', borderRadius: 16, padding: '28px', border: '1px solid #EFEFEF', boxShadow: '0 2px 16px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: 16 }}>
    <div style={{ fontSize: 36, color: '#C9A96E', lineHeight: 1, fontFamily: 'var(--font-fa)', opacity: 0.4 }}>"</div>
    <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.8, margin: '-16px 0 0', fontStyle: 'italic', fontFamily: 'var(--font-body)' }}>{review.text}</p>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 14, borderTop: '1px solid #F8F6F2' }}>
      <div style={{ width: 44, height: 44, borderRadius: '50%', background: review.avatarGradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{review.avatar}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: '#1A1A1A', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-en)' }}>
          {review.name} <span style={{ fontSize: 16 }}>{review.flag}</span>
        </div>
        <div style={{ fontSize: 12, color: '#9CA3AF', fontFamily: 'var(--font-en)' }}>{review.tripType}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <Stars rating={review.rating} size={12} />
        <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2, fontFamily: 'var(--font-en)' }}>{review.date}</div>
      </div>
    </div>
  </div>;


// ─── Province Card ────────────────────────────────────────────
const ProvinceCard = ({ prov, lang, onClick }) => {
  const [hov, setHov] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        borderRadius: 12, overflow: 'hidden', cursor: 'pointer',
        height: 180, background: prov.gradient, position: 'relative',
        boxShadow: hov ? '0 16px 40px rgba(0,0,0,0.2)' : '0 4px 16px rgba(0,0,0,0.1)',
        transform: hov ? 'scale(1.03)' : 'scale(1)',
        transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)'
      }}>
      
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.75) 0%, transparent 60%)' }} />
      {hov && <div style={{ position: 'absolute', inset: 0, background: 'rgba(201,169,110,0.1)' }} />}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 16px' }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 5 }}>
          {lang === 'fa' ? prov.nameFa : prov.nameEn}
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {(lang === 'fa' ? prov.highlights : (prov.highlightsEn || prov.highlights)).slice(0, 2).map((h) =>
          <span key={h} style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(4px)', color: 'rgba(255,255,255,0.85)', fontSize: 10, padding: '1px 7px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.15)', fontFamily: lang === 'fa' ? 'var(--font-fa)' : 'var(--font-en)' }}>{h}</span>
          )}
        </div>
      </div>
    </div>);

};

// ─── Chat Bubble ──────────────────────────────────────────────
const ChatBubble = ({ msg, isUser, isTyping }) => {
  if (isTyping) return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
      <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,#8B1A1A,#C9A96E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff', fontWeight: 800, flexShrink: 0, fontFamily: 'var(--font-en)' }}>AI</div>
      <div style={{ background: '#1E2432', borderRadius: '18px 18px 18px 4px', padding: '12px 16px', display: 'flex', gap: 4, alignItems: 'center' }}>
        {[0, 1, 2].map((i) =>
        <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#64748B', animation: `typing-dot 1.2s ${i * 0.2}s ease-in-out infinite` }} />
        )}
      </div>
    </div>);

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, flexDirection: isUser ? 'row-reverse' : 'row' }}>
      {!isUser &&
      <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,#8B1A1A,#C9A96E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff', fontWeight: 800, flexShrink: 0, fontFamily: 'var(--font-en)' }}>AI</div>
      }
      <div style={{
        maxWidth: '80%',
        background: isUser ? 'linear-gradient(135deg,#2C5F5D,#1A4A48)' : '#1E2432',
        color: '#fff', borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        padding: '11px 16px', fontSize: 13, lineHeight: 1.65,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        fontFamily: 'var(--font-body)'
      }}>
        {msg.text && <div style={{ whiteSpace: 'pre-line' }}>{msg.text}</div>}
        {msg.itinerary &&
        <div style={{ marginTop: 12, background: 'rgba(255,255,255,0.07)', borderRadius: 10, padding: 12 }}>
            {msg.itinerary.map((day, i) =>
          <div key={i} style={{ display: 'flex', gap: 10, marginBottom: i < msg.itinerary.length - 1 ? 10 : 0, alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#C9A96E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#0A0A0A', flexShrink: 0 }}>{i + 1}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 12, color: '#C9A96E', fontFamily: 'var(--font-en)' }}>{day.city}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>{day.activity}</div>
                </div>
              </div>
          )}
          </div>
        }
      </div>
    </div>);

};

// ─── Section Header ───────────────────────────────────────────
const SectionHeader = ({ overline, title, subtitle, centered = true, light = false, lang = 'en' }) =>
<div style={{ textAlign: centered ? 'center' : 'start', marginBottom: 48, direction: lang === 'fa' ? 'rtl' : 'ltr' }}>
    {overline &&
  <div style={{
    color: '#C9A96E', fontSize: 11, fontWeight: 700,
    letterSpacing: lang === 'fa' ? 0 : '0.18em', textTransform: 'uppercase',
    marginBottom: 12,
    display: 'flex', alignItems: 'center', gap: 10,
    justifyContent: centered ? 'center' : 'flex-start', fontFamily: "Khamenei, sans-serif"
  }}>
        <GeoLine width={24} color="#C9A96E" />
        {overline}
        <GeoLine width={24} color="#C9A96E" />
      </div>
  }
    <h2 style={{
    fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800,
    color: light ? '#F8F6F2' : '#1A1A1A',
    margin: '0 0 14px',
    letterSpacing: lang === 'fa' ? 0 : '-0.025em',
    lineHeight: lang === 'fa' ? 1.6 : 1.1,
    fontFamily: "Khamenei, sans-serif"
  }}>{title}</h2>
    {subtitle &&
  <p style={{
    color: light ? 'rgba(248,246,242,0.6)' : '#6B6B6B',
    fontSize: 16, lineHeight: lang === 'fa' ? 2.0 : 1.7, maxWidth: 520,
    margin: centered ? '0 auto' : '0', fontFamily: "Khamenei, sans-serif"
  }}>{subtitle}</p>
  }
  </div>;


// ─── Carpet Border ───────────────────────────────────────────
// Decorative geometric border strip for dark panels
const CarpetBorder = ({ color = '#8B1A1A', accent = '#D4880A', height = 8 }) =>
<div style={{ height, width: '100%', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, ${color} 0%, ${accent} 25%, ${color} 50%, ${accent} 75%, ${color} 100%)` }} />
  {/* Geometric diamond row */}
  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
    {[...Array(16)].map((_, i) =>
      <div key={i} style={{
        width: height * 0.6, height: height * 0.6,
        background: i % 2 === 0 ? `rgba(255,255,255,0.25)` : `rgba(0,0,0,0.15)`,
        transform: 'rotate(45deg)',
        flexShrink: 0
      }} />
    )}
  </div>
  {/* Center accent line */}
  <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 1, background: `rgba(255,255,255,0.2)`, transform: 'translateY(-50%)' }} />
</div>;


// ─── Carpet Medallion ─────────────────────────────────────────
// Circular avatar with Persian star motif — used as AI assistant icon
const CarpetMedallion = ({ size = 44, color = '#8B1A1A', accent = '#D4880A' }) => {
  const r = size / 2;
  const inner = r * 0.55;
  const starR = r * 0.38;
  // Build 8-point star polygon
  const starPoints = [...Array(16)].map((_, i) => {
    const angle = (i * Math.PI) / 8 - Math.PI / 2;
    const dist = i % 2 === 0 ? starR : starR * 0.5;
    return `${r + dist * Math.cos(angle)},${r + dist * Math.sin(angle)}`;
  }).join(' ');

  return (
    <div style={{ width: size, height: size, borderRadius: '50%', flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
        {/* Outer ring gradient */}
        <defs>
          <radialGradient id="mgrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.9" />
            <stop offset="60%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor="#0A0A0A" stopOpacity="1" />
          </radialGradient>
        </defs>
        <circle cx={r} cy={r} r={r} fill={`url(#mgrad)`} />
        {/* Outer decorative ring */}
        <circle cx={r} cy={r} r={r - 2} fill="none" stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
        {/* Inner circle */}
        <circle cx={r} cy={r} r={inner} fill={color} fillOpacity="0.6" />
        {/* 8-point star */}
        <polygon points={starPoints} fill={accent} fillOpacity="0.9" />
        {/* Center dot */}
        <circle cx={r} cy={r} r={r * 0.1} fill="#fff" fillOpacity="0.9" />
        {/* Subtle cross lines */}
        <line x1={r} y1={r - starR * 0.3} x2={r} y2={r + starR * 0.3} stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
        <line x1={r - starR * 0.3} y1={r} x2={r + starR * 0.3} y2={r} stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
      </svg>
    </div>
  );
};


// ─── Contact Modal ────────────────────────────────────────────
const ContactModal = ({ lang, onClose, title }) => {
  const t = (fa, en) => lang === 'fa' ? fa : en;
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.7)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, backdropFilter: 'blur(6px)' }}
    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: '#fff', borderRadius: 20, padding: 36, maxWidth: 480, width: '100%', position: 'relative', boxShadow: '0 32px 80px rgba(0,0,0,0.25)' }}>
        <div style={{ height: 4, background: 'linear-gradient(90deg,#8B1A1A,#C9A96E)', borderRadius: '4px 4px 0 0', position: 'absolute', top: 0, left: 0, right: 0 }} />
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', fontSize: 20, lineHeight: 1 }}>✕</button>
        {sent ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 800, color: '#1A1A1A', marginBottom: 10 }}>
              {t('پیام ارسال شد!', 'Message Sent!')}
            </h3>
            <p style={{ color: '#6B6B6B', fontSize: 14, lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
              {t('به زودی با شما تماس خواهیم گرفت.', "We'll get back to you soon.")}
            </p>
            <button onClick={onClose} style={{ marginTop: 20, background: '#1A1A1A', color: '#F8F6F2', border: 'none', borderRadius: 999, padding: '12px 28px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-en)' }}>
              {t('بستن', 'Close')}
            </button>
          </div>
        ) : (
          <>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 800, color: '#1A1A1A', marginBottom: 6 }}>{title || t('تماس با ما', 'Contact Us')}</h3>
            <p style={{ color: '#6B6B6B', fontSize: 13, marginBottom: 24, fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
              {t('پیام خود را بنویسید. در اسرع وقت پاسخ خواهیم داد.', "Write your message and we'll respond as soon as possible.")}
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { key: 'name',  placeholder: t('نام شما', 'Your Name'),    type: 'text' },
                { key: 'email', placeholder: t('ایمیل شما', 'Your Email'), type: 'email' },
              ].map(({ key, placeholder, type }) => (
                <input key={key} type={type} placeholder={placeholder} value={form[key]}
                onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))}
                style={{ border: '1.5px solid #EFEFEF', borderRadius: 10, padding: '11px 16px', fontSize: 14, outline: 'none', fontFamily: 'var(--font-body)', transition: 'border-color 0.2s', color: '#1A1A1A', background: '#FAFAFA' }}
                onFocus={(e) => e.target.style.borderColor = '#C9A96E'}
                onBlur={(e) => e.target.style.borderColor = '#EFEFEF'} />
              ))}
              <textarea placeholder={t('پیام شما...', 'Your message...')} value={form.message} rows={4}
              onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
              style={{ border: '1.5px solid #EFEFEF', borderRadius: 10, padding: '11px 16px', fontSize: 14, outline: 'none', fontFamily: 'var(--font-body)', resize: 'vertical', transition: 'border-color 0.2s', color: '#1A1A1A', background: '#FAFAFA' }}
              onFocus={(e) => e.target.style.borderColor = '#C9A96E'}
              onBlur={(e) => e.target.style.borderColor = '#EFEFEF'} />
              <button type="submit" style={{ background: '#1A1A1A', color: '#F8F6F2', border: 'none', borderRadius: 999, padding: '13px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-en)', transition: 'background 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#C9A96E'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#1A1A1A'}>
                {t('ارسال پیام', 'Send Message')}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

Object.assign(window, {
  StarWatermark, GeoLine, Stars, DurationBadge, DiffBadge,
  PackageCard, GuideCard, GuideProfile, ReviewCard, ProvinceCard,
  ChatBubble, SectionHeader, CarpetBorder, CarpetMedallion, ContactModal
});