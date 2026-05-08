// IranTour Advisor — AI Planner v2 (no pricing)

const useIsMobile = () => {
  const [m, setM] = React.useState(window.innerWidth < 768);
  React.useEffect(() => { const h = () => setM(window.innerWidth < 768); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h); }, []);
  return m;
};

const AIPlanner = ({ lang }) => {
  const t = (fa, en) => lang === 'fa' ? fa : en;
  const isMobile = useIsMobile();

  const [messages, setMessages] = React.useState([
    { id:1, isUser:false, text: t(
      'سلام! من دستیار هوشمند IranTour هستم 🌟\n\nبرای ساختن برنامه سفر ایده‌آل شما، چند سوال می‌پرسم. هدف اصلی سفر شما به ایران چیست؟',
      'Hello! I\'m the IranTour AI assistant 🌟\n\nTo build your perfect Iran itinerary, I\'ll ask a few questions. What\'s your main interest in visiting Iran?'
    )},
  ]);
  const [inputVal, setInputVal] = React.useState('');
  const [step, setStep] = React.useState(1);
  const [isTyping, setIsTyping] = React.useState(false);
  const [itinerary, setItinerary] = React.useState(null);
  const chatEndRef = React.useRef(null);

  React.useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView && chatEndRef.current.parentElement &&
        (chatEndRef.current.parentElement.scrollTop = chatEndRef.current.parentElement.scrollHeight);
    }
  }, [messages, isTyping]);

  const QUICK_REPLIES = [
    [
      { fa:'معماری و تاریخ', en:'Architecture & History' },
      { fa:'طبیعت و اکوتوریسم', en:'Nature & Eco-tourism' },
      { fa:'هنر و فرهنگ', en:'Culture & Art' },
      { fa:'آشپزی ایرانی', en:'Persian Cuisine' },
      { fa:'ادبیات کلاسیک', en:'Classical Literature' },
      { fa:'زیارت و معنویت', en:'Pilgrimage & Spirituality' },
    ],
    [
      { fa:'۵-۷ روز', en:'5-7 days' },
      { fa:'۸-۱۰ روز', en:'8-10 days' },
      { fa:'۱۱-۱۴ روز', en:'11-14 days' },
      { fa:'بیش از ۲ هفته', en:'2+ weeks' },
    ],
    [
      { fa:'ماجراجویانه', en:'Adventurous' },
      { fa:'فرهنگی و آرام', en:'Cultural & Relaxed' },
      { fa:'خانوادگی', en:'Family-friendly' },
      { fa:'عکاسی و رسانه', en:'Photography & Media' },
    ],
  ];

  const AI_RESPONSES = [
    (msg) => t(
      `انتخاب فوق‌العاده‌ای! به "${msg}" علاقه دارید. چند روز برای سفر به ایران وقت دارید؟`,
      `Excellent choice! You\'re interested in "${msg}". How many days do you have for your Iran trip?`
    ),
    (msg) => t(
      `${msg} — کافی برای یک سفر به‌یادماندنی! سبک سفر شما چطور است؟`,
      `${msg} — enough for an unforgettable trip! What\'s your travel style?`
    ),
    () => null,
  ];

  const SAMPLE_ITINERARY = [
    { day:t('روز ۱','Day 1'),    city:t('تهران','Tehran'),    activities:[t('موزه ملی','National Museum'),t('کاخ گلستان','Golestan Palace'),t('بازار بزرگ','Grand Bazaar')], accommodation:t('هتل استقلال','Esteghlal Hotel'), color:'#8B1A1A' },
    { day:t('روز ۲-۳','Day 2-3'), city:t('کاشان','Kashan'),    activities:[t('خانه بروجردی‌ها','Borujerdi House'),t('باغ فین','Fin Garden'),t('حمام تاریخی','Historic Bathhouse')], accommodation:t('اقامتگاه سنتی','Traditional House'), color:'#1B3A6B' },
    { day:t('روز ۴-۶','Day 4-6'), city:t('اصفهان','Isfahan'),  activities:[t('میدان نقش‌جهان','Naqsh-e Jahan Square'),t('مسجد جامع','Jameh Mosque'),t('پل خواجو','Khaju Bridge')], accommodation:t('هتل عباسی','Abbasi Hotel'), color:'#1A7A8A' },
    { day:t('روز ۷-۸','Day 7-8'), city:t('یزد','Yazd'),        activities:[t('برج‌های باد','Wind Towers'),t('آتشکده','Fire Temple'),t('بافت تاریخی','Historic Fabric')], accommodation:t('هتل داد','Dad Hotel'), color:'#2D5A27' },
    { day:t('روز ۹-۱۰','Day 9-10'),city:t('شیراز','Shiraz'),  activities:[t('تخت‌جمشید','Persepolis'),t('حافظیه','Hafeziyeh'),t('مسجد نصیرالملک','Nasir al-Mulk Mosque')], accommodation:t('هتل پارس','Pars Hotel'), color:'#4A235A' },
  ];

  const addMessage = (text, isUser) => setMessages(prev => [...prev, { id:Date.now(), isUser, text }]);

  const handleSend = (text) => {
    const msg = text || inputVal.trim();
    if (!msg) return;
    setInputVal('');
    addMessage(msg, true);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      if (step < 3) {
        addMessage(AI_RESPONSES[step - 1](msg), false);
        setStep(s => s + 1);
      } else {
        addMessage(t(
          'عالی! بر اساس پاسخ‌های شما، این مسیر ۱۰ روزه را برایتان طراحی کردم 🏛️',
          'Perfect! Based on your answers, here\'s a 10-day itinerary I\'ve designed for you 🏛️'
        ), false);
        setTimeout(() => setItinerary(SAMPLE_ITINERARY), 500);
      }
    }, 1400);
  };

  const currentReplies = step <= 3 && !itinerary ? QUICK_REPLIES[step - 1] : [];

  return (
    <div style={{background:'#0A0A0A', minHeight:'100vh', paddingTop:68, display:'flex', flexDirection:'column', position:'relative'}}>
      <StarWatermark size={500} style={{top:'10%', right:'5%', color:'#C9A96E'}}/>

      <div style={{maxWidth:1100, margin:'0 auto', padding:'0 24px', flex:1, display:'flex', gap:0, height:'calc(100vh - 68px)', position:'relative', zIndex:1}}>

        {/* ── Sidebar ─────────────────────────────────────── */}
        {!isMobile && (
          <div style={{width:250, borderRight:'1px solid rgba(212,136,10,0.12)', padding:'24px 20px 24px 0', display:'flex', flexDirection:'column', gap:20, flexShrink:0}}>
            <div>
              <div style={{fontSize:10, color:'rgba(245,240,232,0.3)', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:12, fontFamily:'var(--font-en)'}}>TRIP FILTERS</div>
              {[
                { label: t('مدت سفر','Duration'), opts:[t('۵-۷ روز','5-7 days'),t('۸-۱۰ روز','8-10 days'),t('۱۴+ روز','14+ days')] },
                { label: t('سبک سفر','Travel Style'), opts:[t('فرهنگی','Cultural'),t('ماجراجویانه','Adventurous'),t('زیارتی','Pilgrimage')] },
                { label: t('اندازه گروه','Group Size'), opts:[t('انفرادی','Solo'),t('زوج','Couple'),t('گروه','Group')] },
              ].map(f => (
                <div key={f.label} style={{marginBottom:16}}>
                  <div style={{fontSize:11, color:'rgba(245,240,232,0.45)', marginBottom:8, fontFamily:'var(--font-body)'}}>{f.label}</div>
                  <div style={{display:'flex', flexDirection:'column', gap:4}}>
                    {f.opts.map((o, i) => (
                      <button key={o} style={{
                        background: i===0 ? 'rgba(139,26,26,0.2)' : 'rgba(255,255,255,0.03)',
                        border: i===0 ? '1px solid rgba(139,26,26,0.4)' : '1px solid rgba(255,255,255,0.06)',
                        padding:'7px 12px', color: i===0 ? '#E57373' : 'rgba(255,255,255,0.4)',
                        fontSize:12, cursor:'pointer', textAlign: lang==='fa' ? 'right' : 'left',
                        fontFamily:'var(--font-body)', transition:'all 0.15s',
                      }}>
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{marginTop:'auto', background:'rgba(139,26,26,0.1)', border:'1px solid rgba(139,26,26,0.2)', padding:16}}>
              <CarpetBorder color="#8B1A1A" accent="#D4880A" height={8}/>
              <div style={{paddingTop:10}}>
                <div style={{color:'#E57373', fontSize:12, fontWeight:700, marginBottom:6, fontFamily:'var(--font-body)'}}>{t('نیاز به کمک دارید؟','Need Help?')}</div>
                <div style={{color:'rgba(255,255,255,0.4)', fontSize:11, lineHeight:1.6, fontFamily:'var(--font-body)'}}>{t('با یک کارشناس سفر ایران صحبت کنید.','Chat with an Iran travel expert.')}</div>
                <button style={{marginTop:10, background:'#8B1A1A', color:'#F5F0E8', border:'none', padding:'8px 0', fontSize:12, fontWeight:700, cursor:'pointer', width:'100%', fontFamily:'var(--font-body)'}}>
                  {t('تماس با ما','Contact Us')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Chat ────────────────────────────────────────── */}
        <div style={{flex:1, display:'flex', flexDirection:'column', padding: isMobile ? '24px 0' : '24px 0 24px 24px', minHeight:0}}>
          {/* Header */}
          <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:18, paddingBottom:14, borderBottom:'1px solid rgba(212,136,10,0.1)'}}>
            <CarpetMedallion size={44} color="#8B1A1A" accent="#D4880A"/>
            <div>
              <div style={{color:'#F5F0E8', fontWeight:800, fontSize:16, fontFamily:'var(--font-heading)'}}>IranTour AI Planner</div>
              <div style={{color:'rgba(245,240,232,0.4)', fontSize:11, fontFamily:'var(--font-en)'}}>{t('دستیار هوشمند سفر ایران','Powered by IranTour Intelligence')}</div>
            </div>
            {/* Steps */}
            <div style={{marginRight:'auto', display:'flex', alignItems:'center', gap:5}}>
              {[t('علاقه','Interest'), t('مدت','Duration'), t('سبک','Style'), t('نتیجه','Result')].map((s,i) => (
                <React.Fragment key={s}>
                  <div style={{
                    padding:'3px 10px', fontSize:10, fontWeight:700,
                    background: i < step ? 'rgba(139,26,26,0.3)' : i===step-1 ? 'rgba(139,26,26,0.2)' : 'rgba(255,255,255,0.04)',
                    color: i < step ? '#E57373' : i===step-1 ? '#F5F0E8' : 'rgba(255,255,255,0.25)',
                    border: i===step-1 ? '1px solid rgba(139,26,26,0.4)' : '1px solid transparent',
                    fontFamily:'var(--font-body)',
                  }}>
                    {i < step ? '✓ ' : ''}{s}
                  </div>
                  {i < 3 && <div style={{width:16, height:1, background:'rgba(212,136,10,0.15)'}}/>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div style={{flex:1, overflowY:'auto', display:'flex', flexDirection:'column', gap:14, paddingRight:4}}>
            {messages.map(msg => <ChatBubble key={msg.id} msg={msg} isUser={msg.isUser}/>)}
            {isTyping && <ChatBubble isTyping={true} msg={{}}/>}

            {/* Itinerary card */}
            {itinerary && (
              <div style={{background:'#1A2332', padding:24, border:'1px solid rgba(212,136,10,0.15)', marginTop:8, position:'relative', overflow:'hidden'}}>
                <CarpetBorder color="#8B1A1A" accent="#D4880A" height={10}/>
                <div style={{paddingTop:16}}>
                  <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:18, flexWrap:'wrap', gap:10}}>
                    <div>
                      <div style={{fontFamily:'var(--font-heading)', fontSize:18, fontWeight:800, color:'#F5F0E8', marginBottom:4}}>
                        {t('مسیر ۱۰ روزه معماری ایران','10-Day Iran Architecture Route')}
                      </div>
                      <div style={{color:'rgba(245,240,232,0.4)', fontSize:12, fontFamily:'var(--font-en)'}}>
                        {t('تهران → کاشان → اصفهان → یزد → شیراز','Tehran → Kashan → Isfahan → Yazd → Shiraz')}
                      </div>
                    </div>
                    <DurationBadge days={10}/>
                  </div>

                  <div style={{display:'flex', flexDirection:'column', gap:0}}>
                    {itinerary.map((day, i) => (
                      <div key={i} style={{display:'flex', gap:14, paddingBottom: i < itinerary.length-1 ? 18 : 0}}>
                        <div style={{display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0}}>
                          <div style={{width:34, height:34, borderRadius:'50%', background:day.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800, color:'#fff'}}>{i+1}</div>
                          {i < itinerary.length-1 && <div style={{width:2, flex:1, minHeight:16, background:`linear-gradient(to bottom,${day.color},rgba(255,255,255,0.04))`, marginTop:4}}/>}
                        </div>
                        <div style={{flex:1, paddingBottom:4}}>
                          <div style={{display:'flex', alignItems:'baseline', gap:8, marginBottom:5}}>
                            <span style={{fontSize:10, color:'rgba(245,240,232,0.35)', fontFamily:'var(--font-en)'}}>{day.day}</span>
                            <span style={{fontWeight:700, color:'#F5F0E8', fontSize:14, fontFamily:'var(--font-heading)'}}>{day.city}</span>
                          </div>
                          <div style={{display:'flex', flexWrap:'wrap', gap:5, marginBottom:4}}>
                            {day.activities.map(a => (
                              <span key={a} style={{background:'rgba(255,255,255,0.06)', color:'rgba(245,240,232,0.65)', padding:'2px 9px', fontSize:11, fontFamily:'var(--font-body)'}}>{a}</span>
                            ))}
                          </div>
                          <div style={{fontSize:10, color:'rgba(245,240,232,0.3)', display:'flex', alignItems:'center', gap:4, fontFamily:'var(--font-body)'}}>
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
                            {day.accommodation}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTAs — NO PRICING */}
                  <div style={{display:'flex', gap:10, marginTop:18, paddingTop:18, borderTop:'1px solid rgba(212,136,10,0.1)'}}>
                    <button style={{flex:1, background:'linear-gradient(135deg,#8B1A1A,#5C0F0F)', color:'#F5F0E8', border:'none', padding:'11px 0', fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'var(--font-body)'}}>
                      {t('ذخیره برنامه','Save Itinerary')}
                    </button>
                    <button style={{flex:1, background:'rgba(27,58,107,0.25)', color:'#93C5FD', border:'1px solid rgba(27,58,107,0.4)', padding:'11px 0', fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'var(--font-body)'}}>
                      {t('اتصال به راهنما','Connect with Guide')}
                    </button>
                    <button style={{flex:1, background:'rgba(212,136,10,0.15)', color:'#D4880A', border:'1px solid rgba(212,136,10,0.3)', padding:'11px 0', fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'var(--font-body)'}}>
                      {t('برنامه‌ریزی بیشتر','Plan Further')}
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef}/>
          </div>

          {/* Quick replies */}
          {currentReplies.length > 0 && (
            <div style={{display:'flex', gap:7, flexWrap:'wrap', marginBottom:10, marginTop:8}}>
              {currentReplies.map(r => (
                <button key={r.fa} onClick={() => handleSend(lang==='fa' ? r.fa : r.en)}
                  style={{
                    background:'rgba(255,255,255,0.05)', color:'rgba(245,240,232,0.7)',
                    border:'1px solid rgba(212,136,10,0.15)', padding:'6px 14px',
                    fontSize:12, cursor:'pointer', fontFamily:'var(--font-body)', transition:'all 0.15s',
                  }}
                  onMouseEnter={e => { e.target.style.background='rgba(139,26,26,0.2)'; e.target.style.borderColor='rgba(139,26,26,0.4)'; e.target.style.color='#E57373'; }}
                  onMouseLeave={e => { e.target.style.background='rgba(255,255,255,0.05)'; e.target.style.borderColor='rgba(212,136,10,0.15)'; e.target.style.color='rgba(245,240,232,0.7)'; }}>
                  {lang==='fa' ? r.fa : r.en}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{display:'flex', gap:8, paddingTop:10, borderTop:'1px solid rgba(212,136,10,0.1)'}}>
            <input
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={e => e.key==='Enter' && handleSend()}
              placeholder={t('پیام خود را بنویسید...','Type your message...')}
              style={{
                flex:1, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(212,136,10,0.15)',
                padding:'11px 14px', color:'#F5F0E8', fontSize:13, outline:'none',
                fontFamily:'var(--font-body)', transition:'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor='rgba(139,26,26,0.5)'}
              onBlur={e => e.target.style.borderColor='rgba(212,136,10,0.15)'}
            />
            <button onClick={() => handleSend()} style={{
              background:'linear-gradient(135deg,#8B1A1A,#5C0F0F)', border:'none',
              padding:'11px 16px', cursor:'pointer', color:'#F5F0E8',
              boxShadow:'0 4px 12px rgba(139,26,26,0.4)', transition:'all 0.2s',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { AIPlanner });
