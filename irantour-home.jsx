// IranTour Advisor — Navbar + Homepage v3 (Modern Premium)

// ─── Navbar ──────────────────────────────────────────────────
const Navbar = ({ page, setPage, lang, setLang, scrolled }) => {
  const t = (fa, en) => lang === 'fa' ? fa : en;

  const navStyle = scrolled ? {
    background: 'rgba(248,246,242,0.85)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow: '0 1px 0 rgba(0,0,0,0.08)',
    borderBottom: '1px solid rgba(0,0,0,0.06)'
  } : {
    background: 'transparent',
    backdropFilter: 'none',
    boxShadow: 'none'
  };

  const textColor = scrolled ? '#1A1A1A' : '#F8F6F2';
  const logoColor = scrolled ? '#1A1A1A' : '#F8F6F2';
  const activeColor = '#C9A96E';

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
      ...navStyle
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>

        {/* Logo */}
        <button onClick={() => setPage('home')} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#8B1A1A,#C9A96E)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" fill="white" stroke="none" />
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: logoColor, letterSpacing: '-0.02em', lineHeight: 1.1, transition: 'color 0.3s', fontFamily: "Khamenei" }}>IranTour</div>
            <div style={{ fontSize: 9, color: scrolled ? '#9CA3AF' : 'rgba(248,246,242,0.55)', fontFamily: 'var(--font-en)', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>ADVISOR</div>
          </div>
        </button>

        {/* Center nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {NAV_ITEMS.map((n) =>
          <button key={n.key} onClick={() => setPage(n.key)}
          style={{
            background: page === n.key ? scrolled ? 'rgba(201,169,110,0.1)' : 'rgba(248,246,242,0.1)' : 'transparent',
            border: 'none', borderRadius: 8,
            padding: '8px 16px', cursor: 'pointer',
            fontSize: 13, fontWeight: page === n.key ? 700 : 500,
            color: page === n.key ? activeColor : textColor,
            transition: 'all 0.2s',
            fontFamily: lang === 'fa' ? 'var(--font-fa)' : 'var(--font-en)'
          }}
          onMouseEnter={(e) => {if (page !== n.key) e.currentTarget.style.color = activeColor;}}
          onMouseLeave={(e) => {if (page !== n.key) e.currentTarget.style.color = textColor;}}>
              {lang === 'fa' ? n.fa : n.en}
            </button>
          )}
        </nav>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          {/* Language toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, background: scrolled ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)', borderRadius: 999, padding: '3px', border: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.15)' }}>
            {[{ code: 'en', label: 'EN' }, { code: 'fa', label: 'FA' }, { code: 'ar', label: 'AR' }].map((l) => {
              const isActive = lang === l.code || l.code === 'ar' && lang === 'fa';
              return (
                <button key={l.code}
                onClick={() => setLang(l.code === 'ar' ? 'fa' : l.code)}
                style={{
                  background: isActive ? scrolled ? '#1A1A1A' : 'rgba(255,255,255,0.2)' : 'transparent',
                  color: isActive ? scrolled ? '#F8F6F2' : '#fff' : textColor,
                  border: 'none', padding: '5px 12px', fontSize: 11, fontWeight: 700,
                  cursor: 'pointer', borderRadius: 999,
                  transition: 'all 0.2s', fontFamily: 'var(--font-en)'
                }}>
                  {l.label}
                </button>);

            })}
          </div>

          {/* CTA */}
          <button onClick={() => setPage('ai')} style={{
            background: '#C9A96E', color: '#0A0A0A',
            border: 'none', borderRadius: 999, padding: '9px 22px',
            fontSize: 13, fontWeight: 700, cursor: 'pointer',
            fontFamily: 'var(--font-en)',
            boxShadow: '0 4px 16px rgba(201,169,110,0.35)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {e.currentTarget.style.background = '#B8924A';e.currentTarget.style.transform = 'translateY(-1px)';}}
          onMouseLeave={(e) => {e.currentTarget.style.background = '#C9A96E';e.currentTarget.style.transform = 'none';}}>
            {lang === 'fa' ? 'برنامه‌ریز هوشمند' : 'AI Planner'}
          </button>
        </div>
      </div>
    </header>);

};

// ─── Homepage ─────────────────────────────────────────────────
const HomePage = ({ setPage, lang }) => {
  const t = (fa, en) => lang === 'fa' ? fa : en;
  const [citySearch, setCitySearch] = React.useState('');
  const [cityResults, setCityResults] = React.useState([]);
  const [visibleMsgs, setVisibleMsgs] = React.useState(1);

  React.useEffect(() => {
    if (visibleMsgs < AI_CONVERSATION.length) {
      const timer = setTimeout(() => setVisibleMsgs((v) => v + 1), 1300);
      return () => clearTimeout(timer);
    }
  }, [visibleMsgs]);

  React.useEffect(() => {
    if (!citySearch.trim()) {setCityResults([]);return;}
    const q = citySearch.trim().toLowerCase();
    setCityResults(PROVINCES.filter((p) =>
    p.nameFa.includes(citySearch) || p.nameEn.toLowerCase().includes(q)
    ).slice(0, 5));
  }, [citySearch]);

  return (
    <div style={{ background: '#F8F6F2', minHeight: '100vh' }}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 640, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Cinematic dark background — deep gradient simulating Iran landscape */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(145deg, #0A0A0A 0%, #1A0A02 20%, #2C1208 40%, #3D1A08 60%, #1A2535 80%, #0A0A0A 100%)'
        }} />
        {/* Atmospheric layers */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(201,169,110,0.07) 0%, transparent 55%), radial-gradient(ellipse at 70% 30%, rgba(44,95,93,0.08) 0%, transparent 50%)' }} />
        {/* 8-star watermark */}
        <StarWatermark size={700} style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: '#C9A96E', opacity: 1 }} />

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 860, padding: '0 32px' }}>
          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28,
            background: 'rgba(201,169,110,0.1)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(201,169,110,0.2)', borderRadius: 999,
            padding: '7px 20px', color: '#C9A96E', fontSize: 11,
            fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "Khamenei"

          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            {t('ابتکار فرهنگی ملی ایران', "Iran's National Cultural Initiative")}
          </div>

          {/* Main headline */}
          <h1 style={{

            fontSize: 'clamp(44px, 7vw, 80px)', fontWeight: 800,
            color: '#F8F6F2', lineHeight: 1.0, margin: '0 0 6px',
            letterSpacing: '-0.03em',
            textShadow: '0 2px 40px rgba(0,0,0,0.4)', fontFamily: "Khamenei"
          }}>
            {t('ایران را کشف کنید', 'Discover Iran')}
          </h1>
          <h2 style={{

            fontSize: 'clamp(22px, 3.5vw, 40px)', fontWeight: 400,
            color: '#C9A96E', lineHeight: 1.2, margin: '0 0 28px',
            fontStyle: 'italic', letterSpacing: '-0.01em', fontFamily: "Khamenei"
          }}>
            {t('— فراتر از اخبار', '— Beyond the Headlines')}
          </h2>
          <p style={{
            fontSize: 'clamp(15px, 1.8vw, 18px)',
            color: 'rgba(248,246,242,0.65)', marginBottom: 48,
            lineHeight: 1.75, maxWidth: 560, margin: '0 auto 48px', fontFamily: "Khamenei"

          }}>
            {t(
              'هزار تجربه، یک سفر — ایران را با هوش مصنوعی، راهنمایان محلی و تجربیات انتخابی کشف کنید',
              'A thousand experiences, one journey — discover Iran through AI, local guides and curated experiences'
            )}
          </p>

          {/* TWO BOLD CTAs */}
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
            <button onClick={() => setPage('ai')} style={{
              background: '#C9A96E', color: '#0A0A0A',
              border: 'none', borderRadius: 999, padding: '16px 36px',
              fontSize: 15, fontWeight: 800, cursor: 'pointer',

              boxShadow: '0 8px 32px rgba(201,169,110,0.35)',
              transition: 'all 0.25s',
              display: 'flex', alignItems: 'center', gap: 8, fontFamily: "Khamenei"
            }}
            onMouseEnter={(e) => {e.currentTarget.style.transform = 'translateY(-3px)';e.currentTarget.style.boxShadow = '0 14px 40px rgba(201,169,110,0.45)';}}
            onMouseLeave={(e) => {e.currentTarget.style.transform = 'none';e.currentTarget.style.boxShadow = '0 8px 32px rgba(201,169,110,0.35)';}}>
              {t('برنامه‌ریز هوشمند', 'Plan with AI')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </button>
            <button onClick={() => setPage('packages')} style={{
              background: 'rgba(255,255,255,0.08)', color: '#F8F6F2',
              border: '1px solid rgba(248,246,242,0.25)', borderRadius: 999, padding: '16px 36px',
              fontSize: 15, fontWeight: 600, cursor: 'pointer', backdropFilter: 'blur(8px)',

              transition: 'all 0.25s', fontFamily: "Khamenei"
            }}
            onMouseEnter={(e) => {e.currentTarget.style.background = 'rgba(255,255,255,0.15)';e.currentTarget.style.transform = 'translateY(-3px)';}}
            onMouseLeave={(e) => {e.currentTarget.style.background = 'rgba(255,255,255,0.08)';e.currentTarget.style.transform = 'none';}}>
              {t('مشاهده تورها', 'Our Tour Packages')}
            </button>
          </div>

          {/* City search */}
          <div style={{ maxWidth: 480, margin: '0 auto', position: 'relative' }}>
            <div style={{
              display: 'flex', alignItems: 'center',
              background: 'rgba(248,246,242,0.08)', backdropFilter: 'blur(16px)',
              border: '1px solid rgba(248,246,242,0.15)', borderRadius: 999,
              overflow: 'visible'
            }}>
              <svg style={{ marginLeft: 18, color: 'rgba(248,246,242,0.4)', flexShrink: 0 }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input value={citySearch} onChange={(e) => setCitySearch(e.target.value)}
              placeholder={t('جستجوی شهر یا استان...', 'Search a city or province...')}
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                color: '#F8F6F2', fontSize: 14, padding: '13px 12px',
                fontFamily: lang === 'fa' ? 'var(--font-fa)' : 'var(--font-en)'
              }} />
              <button style={{ background: '#C9A96E', border: 'none', borderRadius: 999, margin: 4, padding: '9px 18px', fontSize: 12, fontWeight: 700, cursor: 'pointer', color: '#0A0A0A', flexShrink: 0, fontFamily: "Khamenei" }}>
                {t('جستجو', 'Search')}
              </button>
            </div>
            {cityResults.length > 0 &&
            <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, background: '#fff', borderRadius: 14, border: '1px solid #EFEFEF', boxShadow: '0 16px 48px rgba(0,0,0,0.15)', zIndex: 50, overflow: 'hidden' }}>
                {cityResults.map((p) =>
              <button key={p.id} onClick={() => {setPage('destinations');setCitySearch('');setCityResults([]);}}
              style={{ display: 'flex', alignItems: 'center', gap: 14, width: '100%', padding: '13px 18px', background: 'none', border: 'none', borderBottom: '1px solid #F8F6F2', cursor: 'pointer', textAlign: lang === 'fa' ? 'right' : 'left', transition: 'background 0.15s' }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#F8F6F2'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'none'}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: p.gradient, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: '#1A1A1A', fontFamily: lang === 'fa' ? 'var(--font-fa)' : 'var(--font-en)' }}>{lang === 'fa' ? p.nameFa : p.nameEn}</div>
                      <div style={{ fontSize: 11, color: '#9CA3AF', fontFamily: lang === 'fa' ? 'var(--font-fa)' : 'var(--font-en)' }}>{p.highlights[0]}</div>
                    </div>
                  </button>
              )}
              </div>
            }
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, transparent, rgba(201,169,110,0.6), transparent)' }} />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.6)" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
        </div>
      </section>

      {/* ── PACKAGES ──────────────────────────────────────── */}
      <section style={{ padding: '96px 32px', background: '#F8F6F2' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', fontFamily: "Khamenei" }}>
          <SectionHeader
            overline={t('سفرهای انتخابی', 'CURATED JOURNEYS')}
            title={t('تورهای موضوعی', 'Featured Packages')}
            subtitle={t('سفرهای چند شهری طراحی‌شده توسط متخصصان ایران‌شناس', 'Multi-city themed journeys crafted by Iran experts')} />
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
            {PACKAGES.map((pkg) =>
            <PackageCard key={pkg.id} pkg={pkg} lang={lang} onClick={() => setPage('packages')} />
            )}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <button onClick={() => setPage('packages')} style={{
              background: 'transparent', border: '1.5px solid #1A1A1A', color: '#1A1A1A',
              borderRadius: 999, padding: '12px 32px', fontSize: 13, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'var(--font-en)', transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {e.currentTarget.style.background = '#1A1A1A';e.currentTarget.style.color = '#F8F6F2';}}
            onMouseLeave={(e) => {e.currentTarget.style.background = 'transparent';e.currentTarget.style.color = '#1A1A1A';}}>
              {t('مشاهده همه تورها', 'View All Packages')} →
            </button>
          </div>
        </div>
      </section>

      {/* ── AI TEASER ──────────────────────────────────────── */}
      <section style={{ background: '#0A0A0A', padding: '96px 32px', position: 'relative', overflow: 'hidden' }}>
        <StarWatermark size={600} style={{ top: '50%', right: '-100px', transform: 'translateY(-50%)', color: '#C9A96E' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center', position: 'relative', zIndex: 1 }}>
          {/* Chat mockup */}
          <div style={{ background: '#111520', borderRadius: 20, padding: 24, border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 32px 80px rgba(0,0,0,0.6)', fontFamily: "Khamenei" }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#8B1A1A,#C9A96E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#fff', fontWeight: 800, fontFamily: 'var(--font-en)' }}>AI</div>
              <div>
                <div style={{ color: '#F8F6F2', fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-heading)' }}>IranTour AI Planner</div>
                <div style={{ color: '#2C5F5D', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-en)' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2C5F5D' }} /> Online
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {AI_CONVERSATION.slice(0, visibleMsgs).map((msg) =>
              <ChatBubble key={msg.id} msg={msg} isUser={msg.isUser} />
              )}
              {visibleMsgs < AI_CONVERSATION.length && <ChatBubble isTyping={true} msg={{}} />}
            </div>
            <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
              <input placeholder={t('پیام بنویسید...', 'Type a message...')}
              style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 999, padding: '10px 16px', color: '#F8F6F2', fontSize: 13, outline: 'none', fontFamily: 'var(--font-body)' }} />
              <button onClick={() => setPage('ai')} style={{ background: '#C9A96E', border: 'none', borderRadius: '50%', width: 40, height: 40, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0A0A0A', flexShrink: 0 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
              </button>
            </div>
          </div>
          {/* Text */}
          <div style={{ color: '#F8F6F2' }}>
            <SectionHeader
              overline="AI-POWERED"
              title={t('دستیار هوشمند سفر به ایران', 'Your Personal Iran Travel AI')}
              subtitle={t('علاقه‌مندی‌ها و سبک سفرتان را بگویید. هوش مصنوعی ما برنامه روز به روز سفر کامل ایران شما را می‌سازد.', 'Tell us your interests and travel style. Our AI builds your perfect Iran itinerary — day by day, city by city.')}
              centered={false}
              light={true} />
            
            {[
            t('برنامه روز به روز اختصاصی', 'Personalized day-by-day itinerary'),
            t('پیشنهاد راهنمای محلی', 'Local guide matching'),
            t('مسیر بهینه چند شهری', 'Optimized multi-city route')].
            map((f, i) =>
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <span style={{ fontSize: 14, color: 'rgba(248,246,242,0.75)', fontFamily: "Khamenei" }}>{f}</span>
              </div>
            )}
            <button onClick={() => setPage('ai')} style={{
              background: '#C9A96E', color: '#0A0A0A', border: 'none', borderRadius: 999,
              padding: '14px 32px', fontSize: 14, fontWeight: 700, cursor: 'pointer',
              marginTop: 28,
              boxShadow: '0 8px 32px rgba(201,169,110,0.25)', transition: 'all 0.2s', fontFamily: "Khamenei"
            }}
            onMouseEnter={(e) => {e.currentTarget.style.transform = 'translateY(-2px)';}}
            onMouseLeave={(e) => {e.currentTarget.style.transform = 'none';}}>
              {t('امتحان کنید', 'Try AI Planner')} →
            </button>
          </div>
        </div>
      </section>

      {/* ── GUIDES ─────────────────────────────────────────── */}
      <section style={{ padding: '96px 32px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', fontFamily: "Khamenei" }}>
          <SectionHeader
            overline={t('متخصصان محلی', 'LOCAL EXPERTS')}
            title={t('راهنمایان محلی ما', 'Meet Our Expert Guides')}
            subtitle={t('هر راهنما تخصص عمیق در یک شهر دارد', 'Each guide holds deep expertise in exactly one city')} />
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {GUIDES.map((g) => <GuideCard key={g.id} guide={g} lang={lang} onClick={() => setPage('guides')} />)}
          </div>
        </div>
      </section>

      {/* ── PROVINCES ──────────────────────────────────────── */}
      <section style={{ padding: '96px 32px', background: '#0A0A0A', position: 'relative', overflow: 'hidden' }}>
        <StarWatermark size={500} style={{ bottom: '-100px', left: '-100px', color: '#C9A96E' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1, fontFamily: "Khamenei" }}>
          <SectionHeader
            overline="31 PROVINCES"
            title={t('استان‌های ایران', 'Destinations Across Iran')}
            subtitle={t('از کویر تا جنگل، از کوه تا دریا', 'From desert to forest, mountain to sea')}
            light={true} />
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {PROVINCES.slice(0, 12).map((p) =>
            <ProvinceCard key={p.id} prov={p} lang={lang} onClick={() => setPage('destinations')} />
            )}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <button onClick={() => setPage('destinations')} style={{
              background: 'transparent', border: '1.5px solid rgba(201,169,110,0.5)', color: '#C9A96E',
              borderRadius: 999, padding: '12px 32px', fontSize: 13, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'var(--font-en)', transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {e.currentTarget.style.background = 'rgba(201,169,110,0.1)';}}
            onMouseLeave={(e) => {e.currentTarget.style.background = 'transparent';}}>
              {t('مشاهده همه ۳۱ استان', 'View All 31 Provinces')} →
            </button>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ────────────────────────────────────────── */}
      <section style={{ padding: '96px 32px', background: '#F8F6F2' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', fontFamily: "Khamenei" }}>
          <SectionHeader
            overline={t('روایت‌های مسافران', 'TRAVELER STORIES')}
            title={t('تجربیات واقعی', 'Real Stories from Real Travelers')} />
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {REVIEWS.map((r) => <ReviewCard key={r.id} review={r} />)}
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer style={{ background: '#0A0A0A', color: 'rgba(248,246,242,0.45)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)', opacity: 0.3 }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 32px 40px', fontFamily: "Khamenei" }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 56 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#8B1A1A,#C9A96E)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" fill="white" stroke="none" /></svg>
                </div>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: 17, fontWeight: 800, color: '#F8F6F2' }}>IranTour Advisor</span>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.8, maxWidth: 260, fontFamily: 'var(--font-body)' }}>
                {t('ایران — هزار تجربه، یک سفر', 'Iran — A Thousand Experiences, One Journey')}
              </p>
              <div style={{ marginTop: 12, fontSize: 11, color: 'rgba(248,246,242,0.2)', fontStyle: 'italic', fontFamily: 'var(--font-body)' }}>
                {t('یک ابتکار فرهنگی ملی — نه یک آژانس تجاری', 'A National Cultural Initiative — Not a Commercial Agency')}
              </div>
            </div>
            {[
            [t('کاوش', 'Explore'), [t('تورها', 'Packages'), t('استان‌ها', 'Provinces'), t('راهنماها', 'Guides'), t('برنامه‌ریز هوشمند', 'AI Planner')]],
            [t('اطلاعات', 'Info'), [t('درباره ما', 'About'), t('بلاگ', 'Blog'), t('پرسش‌های متداول', 'FAQ'), t('تماس', 'Contact')]],
            [t('زبان', 'Language'), ['English', 'فارسی']]].
            map(([heading, links]) =>
            <div key={heading}>
                <div style={{ color: 'rgba(248,246,242,0.25)', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 18, fontFamily: 'var(--font-en)' }}>{heading}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {links.map((l) =>
                <a key={l} href="#" style={{ color: 'rgba(248,246,242,0.5)', fontSize: 13, textDecoration: 'none', transition: 'color 0.2s', fontFamily: lang === 'fa' ? 'var(--font-fa)' : 'var(--font-body)' }}
                onMouseEnter={(e) => e.target.style.color = '#C9A96E'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(248,246,242,0.5)'}>{l}</a>
                )}
                </div>
              </div>
            )}
          </div>
          <div style={{ height: 1, background: 'rgba(248,246,242,0.06)', marginBottom: 28 }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
            <span style={{ fontSize: 12, fontFamily: 'var(--font-en)' }}>© 2026 IranTour Advisor</span>
            <div style={{ display: 'flex', gap: 20 }}>
              {['Instagram', 'Telegram', 'YouTube', 'LinkedIn'].map((s) =>
              <a key={s} href="#" style={{ color: 'rgba(248,246,242,0.3)', fontSize: 12, textDecoration: 'none', fontFamily: 'var(--font-en)', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.target.style.color = '#C9A96E'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(248,246,242,0.3)'}>{s}</a>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>);

};

Object.assign(window, { Navbar, HomePage });