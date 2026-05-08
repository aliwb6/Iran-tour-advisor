// IranTour Advisor — Pages v3 (Modern Premium)

// ─────────────────────────────────────────────────────────────
// PACKAGES PAGE
// ─────────────────────────────────────────────────────────────
const PackagesPage = ({ lang, setPage, initialSelectedPkg }) => {
  const t = (fa, en) => lang === 'fa' ? fa : en;
  const [activePurpose, setActivePurpose] = React.useState('all');
  const [selectedPkg, setSelectedPkg] = React.useState(initialSelectedPkg || null);
  const [isMobilePkgPg, setIsMobilePkgPg] = React.useState(window.innerWidth < 768);
  React.useEffect(() => { const h = () => setIsMobilePkgPg(window.innerWidth < 768); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h); }, []);

  const filtered = activePurpose === 'all' ?
  PACKAGES :
  PACKAGES.filter((p) => p.purposes.includes(activePurpose));

  if (selectedPkg) {
    return <PackageDetail pkg={selectedPkg} lang={lang} onBack={() => setSelectedPkg(null)} setPage={setPage} />;
  }

  return (
    <div style={{ background: '#F8F6F2', minHeight: '100vh', paddingTop: 68 }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(145deg,#0A0A0A 0%,#1A0A02 40%,#2C1208 100%)', padding: isMobilePkgPg ? '48px 16px 40px' : '72px 32px 56px', position: 'relative', overflow: 'hidden', fontFamily: "Khamenei" }}>
        <StarWatermark size={isMobilePkgPg ? 220 : 440} style={{ top: '50%', right: '4%', transform: 'translateY(-50%)', color: '#C9A96E' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ color: '#C9A96E', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'var(--font-en)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <GeoLine width={20} color="#C9A96E" /> CURATED JOURNEYS <GeoLine width={20} color="#C9A96E" />
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px,5vw,58px)', fontWeight: 800, color: '#F8F6F2', margin: '0 0 14px', letterSpacing: '-0.025em', lineHeight: 1.05 }}>
            {t('ایران را به روش خودتان کشف کنید', 'Explore Iran Your Way')}
          </h1>
          <p style={{ color: 'rgba(248,246,242,0.55)', fontSize: 16, margin: 0, fontFamily: 'var(--font-body)', maxWidth: 560, lineHeight: 1.7 }}>
            {t('سفرهای چند شهری موضوعی — هر تور یک سفر کامل است، نه یک شهر', 'Multi-city themed journeys — each package a complete journey, not just one city')}
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ background: 'rgba(248,246,242,0.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid #EFEFEF', position: 'sticky', top: 68, zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobilePkgPg ? '0 16px' : '0 32px' }}>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '14px 0', scrollbarWidth: 'none', alignItems: 'center' }}>
            <span style={{ fontSize: 10, color: '#9CA3AF', flexShrink: 0, fontFamily: 'var(--font-en)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>WHY VISITING:</span>
            <button onClick={() => setActivePurpose('all')} style={{
              background: activePurpose === 'all' ? '#1A1A1A' : 'transparent',
              color: activePurpose === 'all' ? '#F8F6F2' : '#6B6B6B',
              border: activePurpose === 'all' ? '1px solid #1A1A1A' : '1px solid #E5E7EB',
              borderRadius: 999, padding: '7px 18px', fontSize: 12, fontWeight: 700,
              cursor: 'pointer', flexShrink: 0, transition: 'all 0.2s', fontFamily: 'var(--font-body)'
            }}>
              {t('همه', 'All')}
            </button>
            {VISIT_PURPOSES.map((p) =>
            <button key={p.key} onClick={() => setActivePurpose(p.key)} style={{
              background: activePurpose === p.key ? '#1A1A1A' : 'transparent',
              color: activePurpose === p.key ? '#F8F6F2' : '#6B6B6B',
              border: activePurpose === p.key ? '1px solid #1A1A1A' : '1px solid #E5E7EB',
              borderRadius: 999, padding: '7px 18px', fontSize: 12, fontWeight: 600,
              cursor: 'pointer', flexShrink: 0, transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: 5, fontFamily: "Khamenei"
            }}>
                <span>{p.faIcon}</span>
                {lang === 'fa' ? p.fa : p.en}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobilePkgPg ? '32px 16px' : '48px 32px', fontFamily: "Khamenei" }}>
        {filtered.length === 0 ?
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#1A1A1A', fontFamily: 'var(--font-heading)' }}>{t('توری یافت نشد', 'No packages found')}</div>
          </div> :

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: 24 }}>
            {filtered.map((pkg) =>
          <PackageCard key={pkg.id} pkg={pkg} lang={lang} onClick={() => setSelectedPkg(pkg)} />
          )}
          </div>
        }

        {/* AI CTA */}
        <div style={{ marginTop: 56, background: '#0A0A0A', borderRadius: 20, padding: isMobilePkgPg ? '32px 20px' : '44px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, position: 'relative', overflow: 'hidden', fontFamily: "Khamenei" }}>
          <StarWatermark size={300} style={{ top: '50%', right: '20px', transform: 'translateY(-50%)', color: '#C9A96E' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 800, color: '#F8F6F2', margin: '0 0 8px' }}>
              {t('تور مناسب پیدا نکردید؟', "Can't find the right package?")}
            </h3>
            <p style={{ color: 'rgba(248,246,242,0.45)', fontSize: 14, margin: 0, fontFamily: 'var(--font-body)' }}>
              {t('هوش مصنوعی ما تور اختصاصی برای شما می‌سازد', 'Let our AI build a custom itinerary just for you')}
            </p>
          </div>
          <button onClick={() => setPage('ai')} style={{
            background: '#C9A96E', color: '#0A0A0A', border: 'none', borderRadius: 999,
            padding: '14px 28px', fontSize: 14, fontWeight: 800, cursor: 'pointer',
            fontFamily: 'var(--font-en)', flexShrink: 0, transition: 'all 0.2s',
            boxShadow: '0 8px 24px rgba(201,169,110,0.3)', position: 'relative', zIndex: 1
          }}
          onMouseEnter={(e) => {e.currentTarget.style.transform = 'translateY(-2px)';e.currentTarget.style.boxShadow = '0 12px 32px rgba(201,169,110,0.4)';}}
          onMouseLeave={(e) => {e.currentTarget.style.transform = 'none';e.currentTarget.style.boxShadow = '0 8px 24px rgba(201,169,110,0.3)';}}>
            {t('برنامه‌ریز هوشمند', 'Try AI Planner')} →
          </button>
        </div>
      </div>
    </div>);

};

// ─── Package Detail ───────────────────────────────────────────
const PackageDetail = ({ pkg, lang, onBack, setPage }) => {
  const t = (fa, en) => lang === 'fa' ? fa : en;
  const [contactOpen, setContactOpen] = React.useState(false);
  const [isMobilePkg, setIsMobilePkg] = React.useState(window.innerWidth < 768);
  React.useEffect(() => { const h = () => setIsMobilePkg(window.innerWidth < 768); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h); }, []);
  const name = lang === 'fa' ? pkg.nameFa : pkg.nameEn;
  const tag = lang === 'fa' ? pkg.tagFa : pkg.tagEn;
  const desc = lang === 'fa' ? pkg.descFa : pkg.descEn;
  const cities = lang === 'fa' ? pkg.cities : pkg.citiesEn;
  const highs = lang === 'fa' ? pkg.highlights : pkg.highlightsEn;

  const relatedGuides = GUIDES.filter((g) =>
  (lang === 'fa' ? pkg.cities : pkg.citiesEn).some((c) => c === (lang === 'fa' ? g.city : g.cityEn))
  );

  return (
    <div style={{ background: '#F8F6F2', minHeight: '100vh', paddingTop: 68 }}>
      {contactOpen && <ContactModal lang={lang} onClose={() => setContactOpen(false)} title={t('تماس با راهنما', 'Contact a Guide')} />}
      <div style={{ height: 320, background: pkg.gradient, position: 'relative', overflow: 'hidden' }}>
        <StarWatermark size={400} style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: '#fff' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(10,10,10,0.75) 0%,transparent 60%)' }} />
        <div style={{ position: 'absolute', bottom: 32, left: 0, right: 0, padding: '0 32px', zIndex: 2 }}>
          <button onClick={onBack} style={{ background: 'rgba(248,246,242,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(248,246,242,0.2)', color: '#F8F6F2', borderRadius: 999, padding: '7px 18px', fontSize: 12, fontWeight: 600, cursor: 'pointer', marginBottom: 16, fontFamily: 'var(--font-en)' }}>
            ← {t('بازگشت', 'Back')}
          </button>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px,4vw,44px)', fontWeight: 800, color: '#F8F6F2', margin: 0, letterSpacing: '-0.025em' }}>{name}</h1>
            <span style={{ background: 'rgba(201,169,110,0.2)', color: '#C9A96E', border: '1px solid rgba(201,169,110,0.4)', borderRadius: 999, padding: '4px 14px', fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-en)' }}>{tag}</span>
            <DurationBadge days={pkg.days} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: isMobilePkg ? '32px 16px' : '48px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobilePkg ? '1fr' : '1fr 280px', gap: 28 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* About */}
            <div style={{ background: '#fff', borderRadius: 16, padding: 28, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #EFEFEF' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: '#1A1A1A', margin: '0 0 14px' }}>{t('درباره این تور', 'About This Package')}</h2>
              <p style={{ fontSize: 15, color: '#374151', lineHeight: lang === 'fa' ? 2.0 : 1.85, margin: 0, fontFamily: lang === 'fa' ? 'var(--font-fa)' : 'var(--font-body)' }}>{desc}</p>
            </div>

            {/* Route */}
            <div style={{ background: '#fff', borderRadius: 16, padding: 28, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #EFEFEF' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: '#1A1A1A', margin: '0 0 20px' }}>{t('مسیر سفر', 'Journey Route')}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                {cities.map((c, i) =>
                <React.Fragment key={c}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                      <div style={{ width: 44, height: 44, borderRadius: '50%', background: pkg.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#fff', border: '2px solid #C9A96E' }}>{i + 1}</div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#1A1A1A', fontFamily: lang === 'fa' ? 'var(--font-fa)' : 'var(--font-en)' }}>{c}</span>
                    </div>
                    {i < cities.length - 1 && <div style={{ height: 2, flex: 1, minWidth: 24, background: 'linear-gradient(90deg,#C9A96E,rgba(201,169,110,0.3))', marginBottom: 20 }} />}
                  </React.Fragment>
                )}
              </div>
            </div>

            {/* Highlights */}
            <div style={{ background: '#fff', borderRadius: 16, padding: 28, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #EFEFEF' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: '#1A1A1A', margin: '0 0 16px' }}>{t('چه خواهید دید', 'What You\'ll Experience')}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: isMobilePkg ? '1fr' : '1fr 1fr', gap: 10 }}>
                {highs.map((h, i) =>
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: '#F8F6F2', borderRadius: 10, border: '1px solid #EFEFEF' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#C9A96E', flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: '#374151', fontWeight: 500, fontFamily: lang === 'fa' ? 'var(--font-fa)' : 'var(--font-body)' }}>{h}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Related guides */}
            {relatedGuides.length > 0 &&
            <div style={{ background: '#fff', borderRadius: 16, padding: 28, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #EFEFEF' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: '#1A1A1A', margin: '0 0 16px' }}>{t('راهنمایان این مسیر', 'Guides for This Route')}</h2>
                {relatedGuides.map((g) => {
                const aC = { shiraz: ['#8B1A1A', '#C9A96E'], isfahan: ['#1B3A6B', '#C9A96E'], yazd: ['#2C5F5D', '#C9A96E'] }[g.carpetPattern] || ['#1B3A6B', '#C9A96E'];
                return (
                  <div key={g.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: '#F8F6F2', borderRadius: 12, border: '1px solid #EFEFEF', marginBottom: 10 }}>
                      <div style={{ width: 48, height: 48, borderRadius: '50%', background: `linear-gradient(135deg,${aC[0]},${aC[1]})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="24" height="24" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="14" r="9" fill="rgba(255,255,255,0.4)" /><ellipse cx="20" cy="34" rx="14" ry="9" fill="rgba(255,255,255,0.3)" /></svg>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: '#1A1A1A', fontFamily: 'var(--font-heading)' }}>{lang === 'fa' ? g.nameFa : g.nameEn}</div>
                        <div style={{ fontSize: 11, color: '#C9A96E', fontWeight: 600, fontFamily: lang === 'fa' ? 'var(--font-fa)' : 'var(--font-en)' }}>{lang === 'fa' ? g.city : g.cityEn}</div>
                      </div>
                      <Stars rating={g.rating} size={12} />
                    </div>);

              })}
              </div>
            }
          </div>

          {/* Sidebar */}
          <div>
            <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #EFEFEF', position: 'sticky', top: 84 }}>
              <div style={{ height: 3, background: 'linear-gradient(90deg,#8B1A1A,#C9A96E)' }} />
              <div style={{ padding: '24px 20px' }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                  <DurationBadge days={pkg.days} />
                  <DiffBadge level={pkg.difficulty} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
                  <Stars rating={pkg.rating} size={14} />
                  <span style={{ fontWeight: 800, fontSize: 14, fontFamily: 'var(--font-en)' }}>{pkg.rating}</span>
                  <span style={{ fontSize: 12, color: '#9CA3AF', fontFamily: 'var(--font-en)' }}>({pkg.reviews})</span>
                </div>
                <button onClick={() => setContactOpen(true)} style={{ width: '100%', background: '#1A1A1A', color: '#F8F6F2', border: 'none', borderRadius: 999, padding: '13px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-en)', marginBottom: 10, transition: 'background 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#C9A96E'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#1A1A1A'}>
                  {t('اتصال به راهنما', 'Contact a Guide')}
                </button>
                <button onClick={() => setPage('ai')} style={{ width: '100%', background: 'transparent', color: '#1A1A1A', border: '1.5px solid #1A1A1A', borderRadius: 999, padding: '11px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-en)', transition: 'all 0.2s' }}
                onMouseEnter={(e) => {e.currentTarget.style.background = '#1A1A1A';e.currentTarget.style.color = '#F8F6F2';}}
                onMouseLeave={(e) => {e.currentTarget.style.background = 'transparent';e.currentTarget.style.color = '#1A1A1A';}}>
                  {t('برنامه‌ریزی با هوش مصنوعی', 'Plan with AI')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

// ─────────────────────────────────────────────────────────────
// GUIDES PAGE
// ─────────────────────────────────────────────────────────────
const GuidesPage = ({ lang, selectedGuide: initialSelectedGuide }) => {
  const t = (fa, en) => lang === 'fa' ? fa : en;
  const [selectedGuide, setSelectedGuide] = React.useState(initialSelectedGuide || null);
  const [registerOpen, setRegisterOpen] = React.useState(false);
  const [isMobileGuidePg, setIsMobileGuidePg] = React.useState(window.innerWidth < 768);
  React.useEffect(() => { const h = () => setIsMobileGuidePg(window.innerWidth < 768); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h); }, []);

  if (selectedGuide) {
    return <GuideProfile guide={selectedGuide} lang={lang} onBack={() => setSelectedGuide(null)} />;
  }

  return (
    <div style={{ background: '#F8F6F2', minHeight: '100vh', paddingTop: 68 }}>
      {registerOpen && <ContactModal lang={lang} onClose={() => setRegisterOpen(false)} title={t('ثبت‌نام به عنوان راهنما', 'Register as a Guide')} />}
      {/* Hero */}
      <div style={{ background: 'linear-gradient(145deg,#0A0A0A 0%,#0D1520 50%,#0A1A25 100%)', padding: isMobileGuidePg ? '48px 16px 40px' : '72px 32px 56px', position: 'relative', overflow: 'hidden' }}>
        <StarWatermark size={isMobileGuidePg ? 220 : 440} style={{ top: '50%', right: '4%', transform: 'translateY(-50%)', color: '#C9A96E' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ color: '#C9A96E', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'var(--font-en)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <GeoLine width={20} color="#C9A96E" /> LOCAL EXPERTS <GeoLine width={20} color="#C9A96E" />
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px,5vw,58px)', fontWeight: 800, color: '#F8F6F2', margin: '0 0 14px', letterSpacing: '-0.025em', lineHeight: 1.05 }}>
            {t('راهنمایان محلی ما', 'Our Local Guides')}
          </h1>
          <p style={{ color: 'rgba(248,246,242,0.55)', fontSize: 16, margin: 0, fontFamily: 'var(--font-body)', lineHeight: 1.7 }}>
            {t('هر راهنما تخصص عمیق در یک شهر دارد — تجربه واقعی، نه همه‌کاره', 'Each guide holds deep expertise in exactly one city — real expertise, not a generalist')}
          </p>
        </div>
      </div>

      {/* Single-city rule callout */}
      <div style={{ background: 'rgba(201,169,110,0.05)', borderBottom: '1px solid rgba(201,169,110,0.1)', padding: isMobileGuidePg ? '14px 16px' : '14px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
          <span style={{ fontSize: 13, color: '#6B6B6B', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
            {t('هر راهنما فقط در یک شهر فعالیت می‌کند — تخصص واقعی، نه همه‌کاره', 'Each guide specializes in exactly one city — real expertise, not a generalist')}
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: isMobileGuidePg ? '32px 16px' : '56px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 24 }}>
          {GUIDES.map((g) => <GuideCard key={g.id} guide={g} lang={lang} onClick={() => setSelectedGuide(g)} />)}
        </div>

        {/* Become a guide CTA */}
        <div style={{ marginTop: 56, background: '#0A0A0A', borderRadius: 20, padding: isMobileGuidePg ? '32px 20px' : '44px 40px', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', position: 'relative', overflow: 'hidden' }}>
          <StarWatermark size={280} style={{ top: '50%', right: '20px', transform: 'translateY(-50%)', color: '#C9A96E' }} />
          <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 800, color: '#F8F6F2', margin: '0 0 8px' }}>
              {t('راهنمای محلی هستید؟', 'Are You a Local Guide?')}
            </h3>
            <p style={{ color: 'rgba(248,246,242,0.45)', fontSize: 14, margin: 0, fontFamily: 'var(--font-body)' }}>
              {t('پروفایل خود را ثبت کنید و با گردشگران بین‌المللی ارتباط برقرار کنید', 'Register your profile and connect with international travelers')}
            </p>
          </div>
          <button onClick={() => setRegisterOpen(true)} style={{ background: '#C9A96E', color: '#0A0A0A', border: 'none', borderRadius: 999, padding: '13px 28px', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'var(--font-en)', position: 'relative', zIndex: 1, flexShrink: 0, transition: 'all 0.2s', boxShadow: '0 8px 24px rgba(201,169,110,0.25)' }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
            {t('ثبت‌نام به عنوان راهنما', 'Register as a Guide')}
          </button>
        </div>
      </div>
    </div>);

};

// ─────────────────────────────────────────────────────────────
// DESTINATION DETAIL PAGE
// ─────────────────────────────────────────────────────────────
const DestinationDetail = ({ prov, lang, onBack, setPage }) => {
  const t = (fa, en) => lang === 'fa' ? fa : en;
  const [isMobileDest, setIsMobileDest] = React.useState(window.innerWidth < 768);
  React.useEffect(() => { const h = () => setIsMobileDest(window.innerWidth < 768); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h); }, []);
  const name = lang === 'fa' ? prov.nameFa : prov.nameEn;
  const highlights = lang === 'fa' ? prov.highlights : (prov.highlightsEn || prov.highlights);

  // Guides available in this province/city
  const relatedGuides = GUIDES.filter((g) => {
    const provNameEn = prov.nameEn.toLowerCase();
    const provNameFa = prov.nameFa;
    const cityEn = (g.cityEn || '').toLowerCase();
    const cityFa = (g.city || '');
    return provNameEn.includes(cityEn) || cityEn.includes(provNameEn) ||
           provNameFa.includes(cityFa) || cityFa.includes(provNameFa);
  });

  // Province descriptions (brief)
  const descMap = {
    tehran: { fa: 'پایتخت ایران — شهر موزه‌ها، کاخ‌ها و بازارهای تاریخی', en: 'Iran\'s capital — city of museums, palaces and historic bazaars' },
    isfahan: { fa: 'نصف جهان — شاهکار معماری اسلامی با میدان نقش‌جهان', en: 'Half of the World — Islamic architecture masterpiece with Naqsh-e Jahan Square' },
    fars: { fa: 'گهواره تمدن ایران — خانه حافظ، سعدی و تخت‌جمشید', en: 'Cradle of Persian civilization — home of Hafez, Saadi and Persepolis' },
    khorasan: { fa: 'قلب جهان شیعه — حرم امام رضا در مشهد', en: 'Heart of the Shia world — Imam Reza Shrine in Mashhad' },
    eastazarbaijan: { fa: 'شهر تاریخی تبریز با بازار جهانی‌اش', en: 'Historic Tabriz with its UNESCO-listed bazaar' },
    westazarbaijan: { fa: 'دریاچه ارومیه و کلیساهای تاریخی مسیحی', en: 'Lake Urmia and historic Christian monasteries' },
    khuzestan: { fa: 'گهواره تمدن‌های باستانی — چغازنبیل و شوشتر', en: 'Cradle of ancient civilizations — Chogha Zanbil and Shushtar' },
    kerman: { fa: 'دروازه کویر لوت — باغ شاهزاده و قلعه بم', en: 'Gateway to Dasht-e Lut — Shahzade Garden and Bam Citadel' },
    gilan: { fa: 'جنگل‌های سرسبز و ماسوله — طبیعت شمال ایران', en: 'Lush green forests and Masuleh village — Northern Iran\'s nature' },
    mazandaran: { fa: 'جنگل‌های هیرکانی و سواحل دریای خزر', en: 'Hyrcanian Forests and Caspian Sea coastline' },
    alborz: { fa: 'دروازه کوه‌های البرز و طبیعت بکر', en: 'Gateway to Alborz mountains and pristine nature' },
    yazd: { fa: 'قدیمی‌ترین شهر زنده زمین — برج‌های باد و فرهنگ زرتشتی', en: 'Earth\'s oldest living city — wind towers and Zoroastrian culture' },
    qom: { fa: 'قلب معنوی ایران — حرم حضرت معصومه و حوزه علمیه', en: 'Iran\'s spiritual heart — Masoumeh Shrine and Islamic seminary' },
    semnan: { fa: 'کویر ملی و کاروانسراهای تاریخی جاده ابریشم', en: 'Kavir National Park and historic Silk Road caravanserais' },
    golestan: { fa: 'جنگل‌های انبوه و دشت ترکمن‌صحرا', en: 'Dense forests and the Turkmen Steppe' },
    nkhorasan: { fa: 'قلعه‌های کوهستانی و دره‌های سرسبز شمال', en: 'Mountain fortresses and green northern valleys' },
    skhorasan: { fa: 'بیرجند تاریخی و مسیرهای جاده ابریشم', en: 'Historic Birjand and Silk Road routes' },
    lorestan: { fa: 'آبشارهای پر شور و کوه‌های لرستان', en: 'Powerful waterfalls and Lorestan mountains' },
    ilam: { fa: 'چشمه‌های طبیعی و جنگل‌های غرب ایران', en: 'Natural springs and western Iran\'s forests' },
    chahar: { fa: 'چلگرد پوشیده از برف و دره کوه‌رنگ', en: 'Snow-covered Chelgerd and Kouhrang Valley' },
    kohgiluyeh: { fa: 'کوه دنا، قله‌های سر به فلک کشیده زاگرس', en: 'Mount Dena and the towering Zagros peaks' },
    hormozgan: { fa: 'جزیره رنگارنگ هرمز و جنگل حرا در خلیج فارس', en: 'Colorful Hormuz Island and Hara mangrove forest in the Persian Gulf' },
    bushehr: { fa: 'بافت قدیمی بوشهر و آب‌های آبی خلیج فارس', en: 'Old Bushehr city and blue waters of the Persian Gulf' },
    zanjan: { fa: 'گنبد سلطانیه، سومین گنبد بزرگ آجری جهان', en: 'Soltaniyeh Dome, the world\'s third largest brick dome' },
    qazvin: { fa: 'قلعه الموت و قزوین — پایتخت صفوی ایران', en: 'Alamut Castle and Qazvin — Safavid capital of Iran' },
    ardabil: { fa: 'آرامگاه شیخ صفی‌الدین و آب‌های گرم سرعین', en: 'Sheikh Safi Shrine and Sarein hot springs' },
    hamedan: { fa: 'هگمتانه باستانی — اولین پایتخت ایران در تاریخ', en: 'Ancient Ecbatana — Iran\'s first capital in history' },
    kermanshah: { fa: 'طاق بستان و بیستون — نقش‌برجسته‌های دوران باستان', en: 'Taq Bostan and Bisotun — ancient bas-reliefs' },
    kurdistan: { fa: 'درّه اورامانات و موسیقی و رقص کردی', en: 'Uraman Valley and Kurdish music and dance traditions' },
    markazi: { fa: 'اراک صنعتی و فرش‌های مشهور سلطان‌آباد', en: 'Industrial Arak and the famous Sultanabad carpets' },
    sistan: { fa: 'شهر سوخته باستانی و ساحل مکران دریای عمان', en: 'Ancient Shahr-e Sukhteh and Makran coast on the Sea of Oman' },
  };

  const desc = (descMap[prov.id] || { fa: '', en: '' })[lang === 'fa' ? 'fa' : 'en'];

  return (
    <div style={{ background: '#F8F6F2', minHeight: '100vh', paddingTop: 68 }}>
      {/* Hero */}
      <div style={{ background: prov.gradient, padding: isMobileDest ? '40px 16px 36px' : '64px 32px 56px', position: 'relative', overflow: 'hidden', minHeight: isMobileDest ? 200 : 280 }}>
        <StarWatermark size={isMobileDest ? 220 : 440} style={{ top: '50%', right: '4%', transform: 'translateY(-50%)', color: '#fff' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.7) 0%, rgba(0,0,0,0.2) 100%)' }} />
        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: 999, padding: '7px 18px', fontSize: 12, fontWeight: 600, cursor: 'pointer', marginBottom: 24, fontFamily: 'var(--font-en)' }}>
            ← {t('بازگشت به استان‌ها', 'Back to Provinces')}
          </button>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(201,169,110,0.2)', border: '1px solid rgba(201,169,110,0.4)', borderRadius: 999, padding: '4px 14px', marginBottom: 14 }}>
            <span style={{ fontSize: 14 }}>📍</span>
            <span style={{ color: '#C9A96E', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-en)' }}>PROVINCE</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px,6vw,64px)', fontWeight: 800, color: '#fff', margin: '0 0 14px', letterSpacing: '-0.025em', lineHeight: 1.05 }}>{name}</h1>
          {desc && <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16, margin: 0, fontFamily: lang === 'fa' ? 'var(--font-fa)' : 'var(--font-body)', lineHeight: lang === 'fa' ? 2.0 : 1.7, maxWidth: 560 }}>{desc}</p>}
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: isMobileDest ? '32px 16px' : '48px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobileDest ? '1fr' : '1fr 300px', gap: 28 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Top Attractions */}
            <div style={{ background: '#fff', borderRadius: 16, padding: 28, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #EFEFEF' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: '#1A1A1A', margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20 }}>🏛️</span> {t('جاذبه‌های برتر', 'Top Attractions')}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {highlights.map((h, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: '#F8F6F2', borderRadius: 12, border: '1px solid #EFEFEF' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: prov.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#fff', flexShrink: 0 }}>{i + 1}</div>
                    <span style={{ fontSize: 14, color: '#374151', fontWeight: 500, fontFamily: lang === 'fa' ? 'var(--font-fa)' : 'var(--font-body)' }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Guides */}
            {relatedGuides.length > 0 && (
              <div style={{ background: '#fff', borderRadius: 16, padding: 28, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #EFEFEF' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: '#1A1A1A', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 20 }}>🧭</span> {t('راهنمایان این استان', 'Guides in This Province')}
                </h2>
                {relatedGuides.map((g) => {
                  const aC = { shiraz: ['#8B1A1A', '#C9A96E'], isfahan: ['#1B3A6B', '#C9A96E'], yazd: ['#2C5F5D', '#C9A96E'] }[g.carpetPattern] || ['#1B3A6B', '#C9A96E'];
                  return (
                    <div key={g.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', background: '#F8F6F2', borderRadius: 12, border: '1px solid #EFEFEF', marginBottom: 10 }}>
                      <div style={{ width: 52, height: 52, borderRadius: '50%', background: `linear-gradient(135deg,${aC[0]},${aC[1]})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="26" height="26" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="14" r="9" fill="rgba(255,255,255,0.4)" /><ellipse cx="20" cy="34" rx="14" ry="9" fill="rgba(255,255,255,0.3)" /></svg>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 15, color: '#1A1A1A', fontFamily: 'var(--font-heading)' }}>{lang === 'fa' ? g.nameFa : g.nameEn}</div>
                        <div style={{ fontSize: 12, color: '#C9A96E', fontWeight: 600, marginBottom: 3, fontFamily: lang === 'fa' ? 'var(--font-fa)' : 'var(--font-en)' }}>
                          📍 {lang === 'fa' ? g.city : g.cityEn} {t('متخصص', 'Specialist')}
                        </div>
                        <div style={{ display: 'flex', gap: 4 }}>
                          {g.languages.map((l) => <span key={l.code} style={{ fontSize: 11, background: '#fff', border: '1px solid #EFEFEF', borderRadius: 4, padding: '1px 6px', fontFamily: 'var(--font-en)' }}>{l.flag} {l.name}</span>)}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <Stars rating={g.rating} size={12} />
                        <div style={{ fontSize: 11, color: '#9CA3AF', fontFamily: 'var(--font-en)' }}>{g.reviews} reviews</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #EFEFEF', position: 'sticky', top: 84 }}>
              <div style={{ height: 4, background: prov.gradient }} />
              <div style={{ padding: '24px 20px' }}>
                <div style={{ width: '100%', height: 100, background: prov.gradient, borderRadius: 12, marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
                  <StarWatermark size={120} style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: '#fff' }} />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 32, fontWeight: 800, color: 'rgba(255,255,255,0.9)', fontFamily: 'var(--font-heading)' }}>{lang === 'fa' ? prov.nameFa : prov.nameEn}</span>
                  </div>
                </div>
                <button onClick={() => setPage('ai')} style={{ width: '100%', background: '#1A1A1A', color: '#F8F6F2', border: 'none', borderRadius: 999, padding: '13px', marginBottom: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-en)', transition: 'background 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#C9A96E'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#1A1A1A'}>
                  {t('برنامه‌ریزی با هوش مصنوعی', 'Plan with AI')}
                </button>
                <button onClick={() => setPage('guides')} style={{ width: '100%', background: 'transparent', color: '#1A1A1A', border: '1.5px solid #1A1A1A', borderRadius: 999, padding: '11px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-en)', transition: 'all 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#1A1A1A'; e.currentTarget.style.color = '#F8F6F2'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1A1A1A'; }}>
                  {t('مشاهده راهنمایان', 'Find a Guide')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// DESTINATIONS PAGE
// ─────────────────────────────────────────────────────────────
const DestinationsPage = ({ lang, setPage, selectedProvince, setSelectedProvince }) => {
  const t = (fa, en) => lang === 'fa' ? fa : en;
  const [search, setSearch] = React.useState('');
  const [isMobileDestPg, setIsMobileDestPg] = React.useState(window.innerWidth < 768);
  React.useEffect(() => { const h = () => setIsMobileDestPg(window.innerWidth < 768); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h); }, []);

  // Show detail view if a province is selected
  if (selectedProvince) {
    return <DestinationDetail prov={selectedProvince} lang={lang} onBack={() => setSelectedProvince(null)} setPage={setPage} />;
  }

  const filtered = search.trim() ?
  PROVINCES.filter((p) => p.nameFa.includes(search) || p.nameEn.toLowerCase().includes(search.toLowerCase())) :
  PROVINCES;

  return (
    <div style={{ background: '#F8F6F2', minHeight: '100vh', paddingTop: 68 }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(145deg,#0A0A0A 0%,#0D1B2A 50%,#0A2030 100%)', padding: isMobileDestPg ? '48px 16px 40px' : '72px 32px 56px', position: 'relative', overflow: 'hidden' }}>
        <StarWatermark size={isMobileDestPg ? 220 : 440} style={{ top: '50%', right: '4%', transform: 'translateY(-50%)', color: '#C9A96E' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ color: '#C9A96E', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'var(--font-en)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <GeoLine width={20} color="#C9A96E" /> 31 PROVINCES <GeoLine width={20} color="#C9A96E" />
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px,5vw,58px)', fontWeight: 800, color: '#F8F6F2', margin: '0 0 14px', letterSpacing: '-0.025em', lineHeight: 1.05 }}>
            {t('استان‌های ایران', 'Provinces of Iran')}
          </h1>
          <p style={{ color: 'rgba(248,246,242,0.55)', fontSize: 16, margin: '0 0 28px', fontFamily: 'var(--font-body)', lineHeight: 1.7 }}>
            {t('از کویر تا جنگل، از کوه تا دریا — ۳۱ استان، بی‌نهایت کشف', 'From desert to forest, mountain to sea — 31 provinces, infinite discovery')}
          </p>
          {/* Search */}
          <div style={{ display: 'flex', maxWidth: 440, background: 'rgba(248,246,242,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(248,246,242,0.12)', borderRadius: 999, overflow: 'hidden' }}>
            <svg style={{ margin: '0 0 0 18px', color: 'rgba(248,246,242,0.4)', flexShrink: 0, alignSelf: 'center' }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder={t('جستجوی استان...', 'Search province...')}
            style={{ flex: 1, background: 'transparent', border: 'none', padding: '13px 14px', color: '#F8F6F2', fontSize: 14, outline: 'none', fontFamily: lang === 'fa' ? 'var(--font-fa)' : 'var(--font-en)' }} />
            <button style={{ background: '#C9A96E', border: 'none', padding: '0 20px', cursor: 'pointer', color: '#0A0A0A', fontWeight: 700, fontSize: 12, fontFamily: 'var(--font-en)', flexShrink: 0 }}>
              {t('جستجو', 'Search')}
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobileDestPg ? '32px 16px' : '48px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <span style={{ color: '#6B6B6B', fontSize: 14, fontFamily: 'var(--font-body)' }}>
            {filtered.length} {t('استان', 'provinces')} {search ? t('یافت شد', 'found') : ''}
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 14 }}>
          {filtered.map((p) =>
          <ProvinceCard key={p.id} prov={p} lang={lang} onClick={() => setSelectedProvince(p)} />
          )}
        </div>
        {filtered.length === 0 &&
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🗺️</div>
            <div style={{ fontSize: 18, fontFamily: 'var(--font-heading)', color: '#1A1A1A' }}>{t('استانی یافت نشد', 'No province found')}</div>
          </div>
        }
      </div>
    </div>);

};

// ─────────────────────────────────────────────────────────────
// ABOUT PAGE
// ─────────────────────────────────────────────────────────────
const AboutPage = ({ lang, setPage }) => {
  const t = (fa, en) => lang === 'fa' ? fa : en;
  const [contactOpen, setContactOpen] = React.useState(false);
  const [isMobileAbout, setIsMobileAbout] = React.useState(window.innerWidth < 768);
  React.useEffect(() => { const h = () => setIsMobileAbout(window.innerWidth < 768); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h); }, []);

  const teamMembers = [
    { nameFa: 'دکتر مریم رضایی', nameEn: 'Dr. Maryam Rezaei', roleFa: 'بنیان‌گذار و مدیر فرهنگی', roleEn: 'Founder & Cultural Director', color: '#8B1A1A' },
    { nameFa: 'علی محمدی', nameEn: 'Ali Mohammadi', roleFa: 'مدیر فناوری', roleEn: 'Head of Technology', color: '#1B3A6B' },
    { nameFa: 'سارا حسینی', nameEn: 'Sara Hosseini', roleFa: 'هماهنگ‌کننده راهنمایان', roleEn: 'Guides Coordinator', color: '#2C5F5D' },
  ];

  const stats = [
    { numEn: '31', numFa: '۳۱', labelEn: 'Provinces Covered', labelFa: 'استان پوشش داده شده' },
    { numEn: '50+', numFa: '۵۰+', labelEn: 'Verified Local Guides', labelFa: 'راهنمای محلی تأیید شده' },
    { numEn: '12+', numFa: '۱۲+', labelEn: 'Curated Packages', labelFa: 'تور انتخابی' },
    { numEn: '4,000+', numFa: '۴۰۰۰+', labelEn: 'Travelers Served', labelFa: 'مسافر پذیرفته شده' },
  ];

  const values = [
    { icon: '🌍', titleFa: 'اصالت فرهنگی', titleEn: 'Cultural Authenticity', descFa: 'تجربه‌هایی که توسط ایرانیان برای جهان طراحی شده‌اند', descEn: 'Experiences crafted by Iranians for the world' },
    { icon: '🤝', titleFa: 'تخصص محلی', titleEn: 'Local Expertise', descFa: 'هر راهنما متخصص یک شهر، نه همه‌کاره', descEn: 'Every guide a specialist in one city, not a generalist' },
    { icon: '🔮', titleFa: 'فناوری هوشمند', titleEn: 'Smart Technology', descFa: 'هوش مصنوعی برای برنامه‌ریزی سفر شخصی‌سازی‌شده', descEn: 'AI for deeply personalized itinerary planning' },
    { icon: '🏛️', titleFa: 'میراث فرهنگی', titleEn: 'Heritage Preservation', descFa: 'گردشگری مسئولانه که از فرهنگ و اقتصاد محلی حمایت می‌کند', descEn: 'Responsible tourism that supports local culture and economy' },
  ];

  return (
    <div style={{ background: '#F8F6F2', minHeight: '100vh', paddingTop: 68 }}>
      {contactOpen && <ContactModal lang={lang} onClose={() => setContactOpen(false)} title={t('تماس با ما', 'Contact Us')} />}

      {/* Hero */}
      <div style={{ background: 'linear-gradient(145deg,#0A0A0A 0%,#1A0A02 40%,#2C1208 100%)', padding: isMobileAbout ? '56px 16px 48px' : '80px 32px 64px', position: 'relative', overflow: 'hidden' }}>
        <StarWatermark size={isMobileAbout ? 250 : 500} style={{ top: '50%', right: '4%', transform: 'translateY(-50%)', color: '#C9A96E' }} />
        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ color: '#C9A96E', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'var(--font-en)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <GeoLine width={20} color="#C9A96E" /> {t('ابتکار فرهنگی ملی', 'NATIONAL CULTURAL INITIATIVE')} <GeoLine width={20} color="#C9A96E" />
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px,5vw,58px)', fontWeight: 800, color: '#F8F6F2', margin: '0 0 18px', letterSpacing: '-0.025em', lineHeight: 1.05 }}>
            {t('درباره IranTour Advisor', 'About IranTour Advisor')}
          </h1>
          <p style={{ color: 'rgba(248,246,242,0.65)', fontSize: 17, maxWidth: 600, lineHeight: lang === 'fa' ? 2.0 : 1.75, fontFamily: 'var(--font-body)', margin: '0 0 32px' }}>
            {t(
              'ما یک ابتکار فرهنگی ملی هستیم — نه یک آژانس تجاری. مأموریت ما نشان دادن چهره واقعی ایران به جهان است.',
              'We are a national cultural initiative — not a commercial agency. Our mission is to show the world the authentic face of Iran.'
            )}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={() => setPage('ai')} style={{ background: '#C9A96E', color: '#0A0A0A', border: 'none', borderRadius: 999, padding: '13px 28px', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'var(--font-en)', boxShadow: '0 8px 24px rgba(201,169,110,0.3)', transition: 'all 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
              {t('برنامه‌ریزی سفر', 'Plan Your Trip')} →
            </button>
            <button onClick={() => setContactOpen(true)} style={{ background: 'rgba(255,255,255,0.08)', color: '#F8F6F2', border: '1px solid rgba(248,246,242,0.2)', borderRadius: 999, padding: '13px 28px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-en)', backdropFilter: 'blur(8px)', transition: 'all 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}>
              {t('تماس با ما', 'Contact Us')}
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: '#fff', borderBottom: '1px solid #EFEFEF' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 32px', display: 'grid', gridTemplateColumns: isMobileAbout ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 24 }}>
          {stats.map((s) => (
            <div key={s.numEn} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 36, fontWeight: 800, color: '#C9A96E', lineHeight: 1 }}>{lang === 'fa' ? s.numFa : s.numEn}</div>
              <div style={{ color: '#6B6B6B', fontSize: 13, marginTop: 6, fontFamily: 'var(--font-body)' }}>{lang === 'fa' ? s.labelFa : s.labelEn}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: isMobileAbout ? '40px 16px' : '64px 32px' }}>

        {/* Mission */}
        <div style={{ background: '#fff', borderRadius: 20, padding: isMobileAbout ? '24px' : '40px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #EFEFEF', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <div style={{ width: 4, height: 28, background: 'linear-gradient(to bottom,#8B1A1A,#C9A96E)', borderRadius: 2 }} />
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 800, color: '#1A1A1A', margin: 0 }}>{t('مأموریت ما', 'Our Mission')}</h2>
          </div>
          <p style={{ fontSize: 15, color: '#374151', lineHeight: lang === 'fa' ? 2.0 : 1.85, margin: '0 0 16px', fontFamily: lang === 'fa' ? 'var(--font-fa)' : 'var(--font-body)' }}>
            {t(
              'ایران سرزمینی است با هزاران سال تاریخ، هنر، معماری و مهمان‌نوازی. IranTour Advisor با هدف معرفی چهره واقعی این سرزمین به جهانیان، پل ارتباطی میان مسافران بین‌المللی و راهنمایان محلی متخصص است.',
              'Iran is a land with thousands of years of history, art, architecture, and hospitality. IranTour Advisor was created to bridge international travelers with expert local guides — showing the world the authentic Iran, beyond the headlines.'
            )}
          </p>
          <p style={{ fontSize: 15, color: '#374151', lineHeight: lang === 'fa' ? 2.0 : 1.85, margin: 0, fontFamily: lang === 'fa' ? 'var(--font-fa)' : 'var(--font-body)' }}>
            {t(
              'ما به گردشگری مسئولانه باور داریم — گردشگری که از فرهنگ، اقتصاد محلی و محیط زیست حمایت کند و به جوامع محلی بهره برساند.',
              'We believe in responsible tourism — tourism that supports local culture, economy, and environment, and genuinely benefits local communities.'
            )}
          </p>
        </div>

        {/* Values */}
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 800, color: '#1A1A1A', margin: '0 0 20px' }}>{t('ارزش‌های ما', 'Our Values')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobileAbout ? '1fr' : 'repeat(2, 1fr)', gap: 16 }}>
            {values.map((v) => (
              <div key={v.icon} style={{ background: '#fff', borderRadius: 16, padding: '24px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #EFEFEF', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: '#F8F6F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0, border: '1px solid #EFEFEF' }}>{v.icon}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>{lang === 'fa' ? v.titleFa : v.titleEn}</div>
                  <div style={{ fontSize: 13, color: '#6B6B6B', lineHeight: lang === 'fa' ? 1.9 : 1.6, fontFamily: lang === 'fa' ? 'var(--font-fa)' : 'var(--font-body)' }}>{lang === 'fa' ? v.descFa : v.descEn}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 800, color: '#1A1A1A', margin: '0 0 20px' }}>{t('تیم ما', 'Our Team')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobileAbout ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
            {teamMembers.map((m) => (
              <div key={m.nameEn} style={{ background: '#fff', borderRadius: 16, padding: '28px 24px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #EFEFEF', textAlign: 'center' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: `linear-gradient(135deg,${m.color},#C9A96E)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', border: '3px solid #EFEFEF' }}>
                  <svg width="36" height="36" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="14" r="10" fill="rgba(255,255,255,0.45)" /><ellipse cx="20" cy="36" rx="15" ry="10" fill="rgba(255,255,255,0.3)" /></svg>
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>{lang === 'fa' ? m.nameFa : m.nameEn}</div>
                <div style={{ fontSize: 12, color: '#C9A96E', fontWeight: 600, fontFamily: lang === 'fa' ? 'var(--font-fa)' : 'var(--font-en)' }}>{lang === 'fa' ? m.roleFa : m.roleEn}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div style={{ background: '#0A0A0A', borderRadius: 20, padding: isMobileAbout ? '32px 20px' : '44px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, position: 'relative', overflow: 'hidden' }}>
          <StarWatermark size={isMobileAbout ? 150 : 300} style={{ top: '50%', right: '20px', transform: 'translateY(-50%)', color: '#C9A96E' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 800, color: '#F8F6F2', margin: '0 0 8px' }}>{t('سؤالی دارید؟', 'Have a Question?')}</h3>
            <p style={{ color: 'rgba(248,246,242,0.45)', fontSize: 14, margin: 0, fontFamily: 'var(--font-body)' }}>{t('تیم ما آماده پاسخگویی است', 'Our team is ready to help')}</p>
          </div>
          <button onClick={() => setContactOpen(true)} style={{ background: '#C9A96E', color: '#0A0A0A', border: 'none', borderRadius: 999, padding: '13px 28px', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'var(--font-en)', flexShrink: 0, position: 'relative', zIndex: 1, transition: 'all 0.2s', boxShadow: '0 8px 24px rgba(201,169,110,0.3)' }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
            {t('تماس با ما', 'Get In Touch')}
          </button>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { PackagesPage, PackageDetail, GuidesPage, DestinationsPage, DestinationDetail, AboutPage });