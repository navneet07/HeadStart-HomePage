import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { 
  Hexagon, BookOpen, MessageSquare, Search, Rocket, 
  CheckCircle2, ChevronDown, Github, Linkedin, Twitter,
  Sparkles, Zap, FileText, Target, Globe, LayoutDashboard,
  Award, Compass, LayoutTemplate, Download, Heart, Crown, Star,
  Menu, X, Palette, ArrowRight
} from 'lucide-react';

// --- Utility Components ---

function FadeIn({ children, delay = 0, className = "", key }: { children: React.ReactNode, delay?: number, className?: string, key?: React.Key }) {
  return (
    <motion.div
      key={key}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ end, suffix = "", duration = 2 }: { end: number, suffix?: string, duration?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setValue(Math.floor(progress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, end, duration]);

  return <span ref={ref}>{value}{suffix}</span>;
}

function FancyButton({ children, className = "", outline = false }: { children: React.ReactNode, className?: string, outline?: boolean }) {
  return (
    <button className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 font-bold uppercase tracking-widest transition-all duration-300 ${outline ? 'border-2 border-border-color text-text-primary hover:bg-text-primary hover:text-bg-primary' : 'bg-accent-primary text-accent-text hover:scale-105 shadow-[0_8px_30px_rgba(0,0,0,0.12)]'} ${className}`}>
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      {!outline && (
        <div className="absolute inset-0 bg-text-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
      )}
    </button>
  );
}

function SectionHeading({ boldText, grayText, badge, subtext }: { boldText: string, grayText: string, badge?: string, subtext?: string }) {
  return (
    <FadeIn className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 px-6">
      {badge && (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-sm font-bold tracking-widest text-accent-primary uppercase mb-6">
          {badge}
        </div>
      )}
      <h2 className="font-display text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase leading-[0.9]">
        <span className="text-text-primary block">{boldText}</span>
        <span className="text-text-secondary block">{grayText}</span>
      </h2>
      {subtext && (
        <p className="text-lg text-text-secondary leading-relaxed font-medium">
          {subtext}
        </p>
      )}
    </FadeIn>
  );
}

// --- Sections ---

const themes = [
  { id: 'theme-midnight', color: '#c084fc', name: 'Midnight' },
  { id: 'theme-citrus', color: '#ea580c', name: 'Citrus' },
  { id: 'theme-neon', color: '#bef264', name: 'Neon' },
  { id: 'theme-ocean', color: '#38bdf8', name: 'Ocean' },
  { id: 'theme-bubblegum', color: '#db2777', name: 'Bubblegum' },
];

function Header({ theme, setTheme }: { theme: string, setTheme: (t: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-bg-primary/80 backdrop-blur-md border-b border-border-color py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-accent-primary flex items-center justify-center shadow-lg">
            <Hexagon className="w-6 h-6 text-accent-text fill-accent-text/20" />
          </div>
          <span className="text-2xl font-display font-black tracking-tighter text-text-primary uppercase">HeadStart</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          {['Features', 'How It Works', 'Templates', 'Pricing', 'FAQ'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-bold uppercase tracking-widest text-text-secondary hover:text-accent-primary transition-colors">
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2 bg-bg-secondary border border-border-color rounded-full p-1.5 shadow-inner">
            <Palette className="w-4 h-4 text-text-muted ml-2" />
            <div className="w-px h-4 bg-border-color mx-1"></div>
            {themes.map(t => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`w-5 h-5 rounded-full transition-all duration-300 ${theme === t.id ? 'scale-125 ring-2 ring-text-primary ring-offset-2 ring-offset-bg-primary' : 'hover:scale-110 opacity-70 hover:opacity-100'}`}
                style={{ backgroundColor: t.color }}
                title={t.name}
              />
            ))}
          </div>
          
          <button className="text-sm font-bold uppercase tracking-widest text-text-primary hover:text-accent-primary transition-colors">
            Sign In
          </button>
        </div>

        <button className="md:hidden p-2 text-text-secondary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-bg-secondary border-b border-border-color p-6 flex flex-col gap-6 shadow-2xl">
          {['Features', 'How It Works', 'Templates', 'Pricing', 'FAQ'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-lg font-display font-bold uppercase tracking-widest text-text-secondary hover:text-accent-primary" onClick={() => setMobileMenuOpen(false)}>
              {item}
            </a>
          ))}
          <div className="h-px bg-border-color my-2"></div>
          <div className="flex justify-center gap-3 mb-4">
            {themes.map(t => (
              <button
                key={t.id}
                onClick={() => { setTheme(t.id); setMobileMenuOpen(false); }}
                className={`w-8 h-8 rounded-full transition-transform ${theme === t.id ? 'scale-110 ring-2 ring-text-primary ring-offset-2 ring-offset-bg-secondary' : ''}`}
                style={{ backgroundColor: t.color }}
              />
            ))}
          </div>
          <button className="w-full px-4 py-4 text-center font-bold uppercase tracking-widest text-text-primary border-2 border-border-color rounded-full">Sign In</button>
        </div>
      )}
    </header>
  );
}

function MarqueeBanner() {
  const words = ["AI CAREER COACH", "SMART SEARCH", "ATS OPTIMIZED", "PRECISION APPLY", "VISA SIGNALS", "PIPELINE TRACKING"];
  return (
    <div className="w-full bg-accent-primary text-accent-text py-4 overflow-hidden flex whitespace-nowrap border-y border-border-color">
      <motion.div 
        animate={{ x: [0, -1000] }} 
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="flex items-center gap-8 font-display font-black text-2xl tracking-widest"
      >
        {[...words, ...words, ...words, ...words].map((word, i) => (
          <React.Fragment key={i}>
            <span>{word}</span>
            <Star className="w-6 h-6 fill-current" />
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative pt-40 pb-20 md:pt-56 md:pb-32 px-6 border-b border-border-color overflow-hidden">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-sm font-bold tracking-widest text-accent-primary uppercase mb-8">
            <Sparkles className="w-4 h-4" />
            <span>AI That Knows Your Career</span>
          </div>
          <h1 className="font-display text-6xl md:text-[8rem] font-black tracking-tighter mb-8 uppercase leading-[0.85]">
            <span className="text-text-primary block">Search smarter.</span>
            <span className="text-text-secondary block">Apply with precision.</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            HeadStart searches 30+ job sources, learns your career story through an AI coach, then generates tailored resumes and cover letters for every role you target.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            <FancyButton className="w-full sm:w-auto">
              Start Free <ArrowRight className="w-5 h-5" />
            </FancyButton>
            <FancyButton outline className="w-full sm:w-auto">
              <BookOpen className="w-5 h-5" /> See How It Works
            </FancyButton>
          </div>
          <p className="text-sm font-bold uppercase tracking-widest text-text-muted">Free forever &middot; No credit card &middot; Set up in 2 minutes</p>
        </motion.div>

        {/* Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-24 relative mx-auto max-w-5xl text-left"
        >
          <div className="rounded-2xl border-2 border-border-color bg-bg-secondary shadow-2xl overflow-hidden flex flex-col">
            {/* Browser Chrome */}
            <div className="h-14 border-b-2 border-border-color bg-bg-primary flex items-center px-6 gap-4">
              <div className="flex gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-red-500"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-yellow-500"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-text-primary/5 rounded-md px-32 py-2 text-xs text-text-muted font-mono border border-border-color font-bold tracking-widest uppercase">
                  headstart.app
                </div>
              </div>
            </div>
            {/* App Content */}
            <div className="flex flex-col md:flex-row h-auto md:h-[500px]">
              {/* Sidebar */}
              <div className="w-full md:w-1/3 border-r-2 border-border-color bg-bg-secondary p-8 flex flex-col gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded bg-accent-primary/20 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-accent-primary" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest text-text-primary">Echo &mdash; AI Coach</span>
                  </div>
                  <div className="bg-bg-primary border border-border-color rounded-xl p-5 text-sm text-text-secondary leading-relaxed font-medium">
                    Based on your experience in distributed systems, I'd suggest targeting Platform Engineering and SRE Lead roles...
                  </div>
                </div>
                
                <div>
                  <div className="text-xs font-black text-text-muted mb-4 tracking-widest uppercase">Your Niche</div>
                  <div className="flex flex-wrap gap-2">
                    {['Platform', 'SRE', 'Cloud Native', 'Go'].map(tag => (
                      <span key={tag} className="px-3 py-1.5 rounded-full bg-bg-primary border border-border-color text-xs font-bold text-text-secondary uppercase tracking-wider">{tag}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-black text-text-muted mb-4 tracking-widest uppercase">Match Score</div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-accent-primary font-bold uppercase tracking-widest">92% Career Fit</span>
                  </div>
                  <div className="h-3 bg-bg-primary rounded-full overflow-hidden border border-border-color">
                    <div className="h-full bg-accent-primary w-[92%] rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Main Area */}
              <div className="w-full md:w-2/3 bg-bg-primary p-8 flex flex-col gap-6 relative overflow-hidden">
                {/* Search Bar */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 bg-bg-secondary border-2 border-border-color rounded-xl px-5 py-4 flex items-center gap-3">
                    <Search className="w-5 h-5 text-text-muted" />
                    <span className="text-sm font-bold text-text-primary uppercase tracking-widest">Platform Engineer</span>
                  </div>
                  <div className="w-full sm:w-56 bg-bg-secondary border-2 border-border-color rounded-xl px-5 py-4 flex items-center gap-3">
                    <Globe className="w-5 h-5 text-text-muted" />
                    <span className="text-sm font-bold text-text-primary uppercase tracking-widest">San Francisco</span>
                  </div>
                </div>

                {/* Job Cards */}
                <div className="flex flex-col gap-4">
                  {/* Job 1 */}
                  <div className="bg-bg-secondary border-2 border-border-color rounded-xl p-6 hover:border-accent-primary transition-colors cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-text-primary/10 text-text-primary flex items-center justify-center font-display font-black text-xl">G</div>
                        <div>
                          <h3 className="text-text-primary font-bold text-lg mb-1">Staff Platform Engineer</h3>
                          <p className="text-sm font-medium text-text-secondary">Google &middot; Mountain View, CA</p>
                        </div>
                      </div>
                      <div className="px-3 py-1.5 rounded bg-accent-primary/10 text-accent-primary text-xs font-bold uppercase tracking-widest border border-accent-primary/20">
                        98% match
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-bg-primary text-xs font-bold text-text-secondary uppercase tracking-wider">Remote OK</span>
                      <span className="px-3 py-1 rounded-full bg-bg-primary text-xs font-bold text-text-secondary uppercase tracking-wider">Sponsors H1B</span>
                      <span className="px-3 py-1 rounded-full bg-bg-primary text-xs font-bold text-text-secondary uppercase tracking-wider">$220k-$310k</span>
                      <span className="px-3 py-1 rounded-full bg-accent-primary text-accent-text text-xs font-bold uppercase tracking-wider shadow-md">Resume Ready</span>
                    </div>
                  </div>
                  
                  {/* Job 2 */}
                  <div className="bg-bg-secondary border-2 border-border-color rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-text-primary/10 text-text-primary flex items-center justify-center font-display font-black text-xl">S</div>
                        <div>
                          <h3 className="text-text-primary font-bold text-lg mb-1">Senior SRE, Infrastructure</h3>
                          <p className="text-sm font-medium text-text-secondary">Stripe &middot; San Francisco, CA</p>
                        </div>
                      </div>
                      <div className="px-3 py-1.5 rounded bg-accent-primary/10 text-accent-primary text-xs font-bold uppercase tracking-widest border border-accent-primary/20">
                        95% match
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-bg-primary text-xs font-bold text-text-secondary uppercase tracking-wider">Hybrid</span>
                      <span className="px-3 py-1 rounded-full bg-bg-primary text-xs font-bold text-text-secondary uppercase tracking-wider">Sponsors H1B</span>
                      <span className="px-3 py-1 rounded-full bg-bg-primary text-xs font-bold text-text-secondary uppercase tracking-wider">$200k-$280k</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Statistics() {
  const stats = [
    { num: 30, suffix: "+", label: "Job Sources Searched", desc: "LinkedIn, Indeed, Glassdoor, Greenhouse, Lever, and 25+ more in a single query", icon: <Search className="w-6 h-6" /> },
    { num: 10, suffix: " min", label: "Time to First Application", desc: "From sign-up to a tailored resume and cover letter, ready to submit", icon: <Zap className="w-6 h-6" /> },
    { num: 2, suffix: "+", label: "Documents Per Job", desc: "A custom resume and cover letter generated for each role you target", icon: <FileText className="w-6 h-6" /> },
    { num: 95, suffix: "%", label: "Career Fit Accuracy", desc: "AI scoring validated against real hiring outcomes and user feedback", icon: <Target className="w-6 h-6" /> }
  ];

  return (
    <section className="border-b border-border-color bg-bg-secondary">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border-color">
        {stats.map((stat, i) => (
          <FadeIn key={i} delay={i * 0.1} className="p-10 relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 text-text-primary/[0.03] group-hover:text-text-primary/[0.06] transition-colors duration-500">
              {React.cloneElement(stat.icon, { className: "w-56 h-56" })}
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-bg-primary border-2 border-border-color flex items-center justify-center text-accent-primary mb-8 shadow-sm">
                {stat.icon}
              </div>
              <div className="font-display text-5xl font-black text-accent-primary mb-4 tracking-tighter">
                <CountUp end={stat.num} suffix={stat.suffix} />
              </div>
              <div className="text-lg font-bold uppercase tracking-widest text-text-primary mb-3">{stat.label}</div>
              <div className="text-sm font-medium text-text-secondary leading-relaxed">{stat.desc}</div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: <MessageSquare className="w-8 h-8 text-accent-primary" />,
      title: "Tell Echo your story",
      desc: "Our AI career coach learns your background, strengths, career goals, and personality through natural conversation.",
      detail: "Upload your resume or just chat. Echo builds a living fact sheet about you — skills, values, constraints, and career direction. It remembers everything across sessions."
    },
    {
      num: "02",
      icon: <Search className="w-8 h-8 text-accent-primary" />,
      title: "Search with intelligence",
      desc: "Search 30+ job sources at once. AI expands your query, scores match quality, and surfaces roles you might not have considered.",
      detail: "LinkedIn, Indeed, Glassdoor, Greenhouse, Lever, remote boards, gig platforms, government jobs — deduplicated, ranked, and enriched with visa signals and experience classification."
    },
    {
      num: "03",
      icon: <Rocket className="w-8 h-8 text-accent-primary" />,
      title: "Apply with precision",
      desc: "Generate a custom resume and cover letter for each role. ATS-optimized, factually validated, ready to submit in seconds.",
      detail: "Every document pulls from your real profile and role-specific facts. No fabrication, no hallucination. Choose from multiple templates and export as PDF or DOCX."
    }
  ];

  return (
    <section id="how-it-works" className="py-32 px-6 border-b border-border-color">
      <SectionHeading 
        badge="From sign-up to interview in 10 minutes"
        boldText="Three steps."
        grayText="Zero guesswork."
        subtext="HeadStart replaces the fragmented mess of tabs, templates, and spreadsheets with one intelligent workflow."
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {steps.map((step, i) => (
          <FadeIn key={i} delay={i * 0.15} className="bg-bg-secondary border-2 border-border-color rounded-3xl p-10 flex flex-col relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 shadow-xl">
            <div className="absolute top-0 right-0 p-6 font-display text-9xl font-black text-text-primary/[0.03] select-none pointer-events-none leading-none group-hover:text-accent-primary/[0.05] transition-colors">
              {step.num}
            </div>
            <div className="w-20 h-20 rounded-2xl bg-bg-primary border-2 border-border-color flex items-center justify-center mb-10 relative z-10 shadow-sm">
              {step.icon}
            </div>
            <h3 className="font-display text-3xl font-black uppercase tracking-tighter text-text-primary mb-4 relative z-10">{step.title}</h3>
            <p className="text-lg font-medium text-text-secondary mb-10 flex-1 relative z-10 leading-relaxed">{step.desc}</p>
            <div className="bg-bg-primary border border-border-color rounded-2xl p-6 relative z-10">
              <p className="text-sm font-medium text-text-muted leading-relaxed">{step.detail}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: <MessageSquare />, title: "Echo — AI Career Coach", desc: "More than a chatbot. Echo learns your personality, career trajectory, and goals through conversation. It remembers everything, infers your MBTI, and gives advice that actually reflects who you are.", highlight: true },
    { icon: <Search />, title: "30+ Source Search", desc: "One query hits LinkedIn, Indeed, Glassdoor, Greenhouse, Lever, remote boards, gig platforms, and government sites. Results are deduplicated, ranked, and enriched by AI.", highlight: true },
    { icon: <FileText />, title: "Job-Specific Resumes", desc: "Not a template fill. AI reads the job description, restructures your experience around what matters, and outputs an ATS-optimized resume unique to that role.", highlight: true },
    { icon: <LayoutTemplate />, title: "Tailored Cover Letters", desc: "Each letter references the specific company and role. Written from your real profile, not generic filler." },
    { icon: <Globe />, title: "Visa Sponsorship Signals", desc: "Instantly see which jobs are likely to sponsor. AI analyzes descriptions and company patterns for H1B, OPT, and CPT signals." },
    { icon: <LayoutDashboard />, title: "Application Pipeline", desc: "Track every opportunity from saved to applied. See your entire funnel at a glance instead of juggling spreadsheets." },
    { icon: <CheckCircle2 />, title: "ATS-Optimized Output", desc: "Every document is structured to pass Applicant Tracking Systems. Keywords, formatting, and sections aligned to what ATS expects." },
    { icon: <Target />, title: "AI Match Scoring", desc: "Each job is scored against your profile. Know which roles are worth your time before you invest effort." },
    { icon: <Award />, title: "Niche Positioning", desc: "AI generates a summary of your unique market positioning — your niche, your edge, suggested search terms you haven't tried." },
    { icon: <Compass />, title: "Smart Nudges", desc: "Context-aware suggestions while you browse. Your AI coach notices patterns and surfaces career directions you might not see." },
    { icon: <LayoutTemplate />, title: "Multiple Templates", desc: "Professional resume templates, fully customizable with a visual drag-and-drop builder and live preview." },
    { icon: <Download />, title: "PDF & DOCX Export", desc: "Download your tailored documents in any format. Ready to submit in seconds, no reformatting needed." }
  ];

  return (
    <section id="features" className="py-32 border-b border-border-color bg-bg-secondary">
      <SectionHeading 
        boldText="Everything you need."
        grayText="Nothing you don't."
        subtext="An AI career coach, multi-source search, tailored document generation, and pipeline tracking — in one product."
      />
      
      <div className="max-w-7xl mx-auto border-t-2 border-l-2 border-border-color grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <FadeIn key={i} delay={i * 0.05} className={`p-10 border-r-2 border-b-2 border-border-color ${f.highlight ? 'bg-accent-primary/5' : 'bg-transparent'}`}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border-2 ${f.highlight ? 'bg-accent-primary text-accent-text border-accent-primary' : 'bg-bg-primary text-text-muted border-border-color'}`}>
              {React.cloneElement(f.icon, { className: "w-6 h-6" })}
            </div>
            <h3 className={`font-display text-xl font-black uppercase tracking-widest mb-4 ${f.highlight ? 'text-accent-primary' : 'text-text-primary'}`}>{f.title}</h3>
            <p className="text-base font-medium text-text-secondary leading-relaxed">{f.desc}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Templates() {
  const templates = [
    { name: "Onyx", color: "bg-zinc-800" },
    { name: "Azure", color: "bg-blue-600" },
    { name: "Executive", color: "bg-emerald-700" },
    { name: "Minimal", color: "bg-slate-500" },
    { name: "Pikachu", color: "bg-amber-500" },
    { name: "Glalie", color: "bg-slate-300" },
  ];

  const TemplateCard = ({ t, key }: { t: any, key?: React.Key }) => (
    <div key={key} className="w-72 h-96 flex-shrink-0 bg-white rounded-2xl p-5 shadow-2xl transform -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300 relative overflow-hidden group border-4 border-white mx-6">
      <div className={`h-16 w-full ${t.color} rounded-t-sm mb-6`}></div>
      <div className="w-3/4 h-5 bg-slate-200 rounded mb-3"></div>
      <div className="w-1/2 h-4 bg-slate-100 rounded mb-8"></div>
      
      <div className="space-y-5">
        {[1, 2, 3].map(i => (
          <div key={i}>
            <div className="flex justify-between mb-2">
              <div className="w-1/3 h-4 bg-slate-200 rounded"></div>
              <div className="w-1/4 h-4 bg-slate-100 rounded"></div>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded mb-1.5"></div>
            <div className="w-5/6 h-3 bg-slate-100 rounded"></div>
          </div>
        ))}
      </div>
      
      <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
        <span className="font-display text-white font-black text-3xl uppercase tracking-widest mb-3">{t.name}</span>
        <span className="text-accent-primary text-xs font-bold px-4 py-2 rounded-full bg-accent-primary/20 border border-accent-primary/30 uppercase tracking-widest">ATS-Optimized</span>
      </div>
    </div>
  );

  return (
    <section id="templates" className="py-32 border-b border-border-color overflow-hidden bg-bg-primary">
      <SectionHeading 
        boldText="Beautiful templates."
        grayText="Battle-tested formatting."
        subtext="Every template is designed to pass ATS screening and look great to human reviewers. Drag-and-drop builder with live preview. Fully customizable."
      />
      
      <div className="relative w-full max-w-[100vw] mx-auto">
        <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex mb-12">
          <motion.div 
            animate={{ x: [0, -1200] }} 
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            className="flex"
          >
            {[...templates, ...templates, ...templates].map((t, i) => (
              <TemplateCard key={`row1-${i}`} t={t} />
            ))}
          </motion.div>
        </div>
        
        <div className="flex">
          <motion.div 
            animate={{ x: [-1200, 0] }} 
            transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
            className="flex"
          >
            {[...templates, ...templates, ...templates].reverse().map((t, i) => (
              <TemplateCard key={`row2-${i}`} t={t} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    { name: "Priya K.", role: "Staff Software Engineer", quote: "HeadStart completely changed my approach. Instead of blasting generic applications, I targeted 15 roles with tailored resumes. Got 6 interviews and landed a staff role at a FAANG company within 5 weeks.", color: "bg-violet-500", initials: "PK" },
    { name: "Marcus T.", role: "Principal Platform Engineer", quote: "The AI career coach noticed I was underselling my systems design experience. It suggested a pivot to platform engineering I hadn't considered. Now earning 45% more in a role that fits me better.", color: "bg-blue-500", initials: "MT" },
    { name: "Yuki N.", role: "Data Scientist, H1B Holder", quote: "As an international student on F-1, the visa sponsorship signals saved me hundreds of hours. I only applied to companies that actually sponsor. Two offers in three months.", color: "bg-emerald-500", initials: "YN" },
    { name: "Jordan R.", role: "Senior Product Manager", quote: "I was skeptical about AI resumes but the difference was immediate. My callback rate went from near-zero to 40% in the first week. The ATS optimization is real.", color: "bg-orange-500", initials: "JR" },
    { name: "Aisha M.", role: "UX Design Lead", quote: "The cover letter generator actually reads the job description. Each letter felt personal, not templated. Recruiters commented on how well I understood their mission.", color: "bg-pink-500", initials: "AM" },
    { name: "David L.", role: "Business Analyst", quote: "I went from managing job searches in 4 different spreadsheets to having everything in one place. The Kanban pipeline view is exactly what I needed.", color: "bg-cyan-500", initials: "DL" },
    { name: "Sarah C.", role: "SRE Manager", quote: "Echo helped me articulate my career story in a way I never could alone. The niche positioning feature showed me I was a 'cloud-native reliability specialist' — and that framing opened doors.", color: "bg-amber-500", initials: "SC" },
    { name: "Alex P.", role: "Frontend Engineer", quote: "The multi-source search is a game changer. Found a role on a company's Greenhouse board that wasn't listed on LinkedIn. That's where I work now.", color: "bg-indigo-500", initials: "AP" },
    { name: "Elena V.", role: "Career Switcher → Product", quote: "After being laid off, I was demoralized. Echo didn't just help with resumes — it helped me rediscover what I'm good at and what kind of work would make me happy again.", color: "bg-rose-500", initials: "EV" },
    { name: "Chris W.", role: "Full-Stack Developer", quote: "Best job search tool I've used. Period. The fact that it aggregates 30 sources and generates custom docs per role — I can't believe the free tier is this generous.", color: "bg-teal-500", initials: "CW" }
  ];

  const TestimonialCard = ({ t, key }: { t: any, key?: React.Key }) => (
    <div key={key} className="w-96 flex-shrink-0 bg-bg-secondary border-2 border-border-color rounded-3xl p-8 mx-4 flex flex-col h-full hover:border-accent-primary transition-colors duration-300">
      <p className="text-text-primary text-lg font-medium leading-relaxed flex-1 mb-8">"{t.quote}"</p>
      <div className="h-px w-full bg-border-color mb-6"></div>
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-lg shadow-inner`}>
          {t.initials}
        </div>
        <div>
          <div className="text-base font-bold uppercase tracking-widest text-text-primary">{t.name}</div>
          <div className="text-sm font-medium text-text-muted">{t.role}</div>
        </div>
      </div>
    </div>
  );

  const row1 = testimonials.slice(0, 5);
  const row2 = testimonials.slice(5, 10);

  return (
    <section className="py-32 border-b border-border-color overflow-hidden bg-bg-secondary">
      <SectionHeading 
        boldText="Real people."
        grayText="Real results."
        subtext="From new grads to career switchers to visa holders — HeadStart helps job seekers at every stage land roles at companies they want."
      />
      
      <div className="relative w-full max-w-[100vw] mx-auto">
        <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-bg-secondary to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-bg-secondary to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex mb-8">
          <motion.div 
            animate={{ x: [0, -2080] }} 
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            className="flex"
          >
            {[...row1, ...row1, ...row1].map((t, i) => (
              <TestimonialCard key={`t1-${i}`} t={t} />
            ))}
          </motion.div>
        </div>
        
        <div className="flex">
          <motion.div 
            animate={{ x: [-2080, 0] }} 
            transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
            className="flex"
          >
            {[...row2, ...row2, ...row2].map((t, i) => (
              <TestimonialCard key={`t2-${i}`} t={t} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      desc: "Everything you need to start your job search today.",
      features: [
        "Unlimited job searches across 30+ sources",
        "AI career coach (Echo) with full onboarding",
        "5 tailored resumes per month",
        "5 tailored cover letters per month",
        "Application pipeline tracker",
        "Visa sponsorship signals",
        "1 resume template"
      ],
      cta: "Start Free",
      ctaStyle: "outline"
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      desc: "For active job seekers who want maximum velocity.",
      popular: true,
      features: [
        "Everything in Free",
        "Unlimited AI resumes & cover letters",
        "All resume templates",
        "AI match scoring for every job",
        "Niche positioning analysis",
        "Smart nudges & career suggestions",
        "Saved search auto-refresh (every 6h)",
        "Priority document generation"
      ],
      cta: "Start 14-Day Trial",
      ctaStyle: "filled"
    },
    {
      name: "Team",
      price: "$49",
      period: "/month",
      desc: "For career coaches, bootcamps, and organizations.",
      features: [
        "Everything in Pro",
        "Up to 10 team members",
        "Admin dashboard & analytics",
        "Shared templates & branding",
        "Activity monitoring",
        "Bulk user management",
        "Dedicated support"
      ],
      cta: "Contact Sales",
      ctaStyle: "outline"
    }
  ];

  return (
    <section id="pricing" className="py-32 px-6 border-b border-border-color relative overflow-hidden bg-bg-primary">
      {/* Background floating icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <motion.div animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-20 left-[10%] text-accent-primary"><Heart className="w-12 h-12" /></motion.div>
        <motion.div animate={{ y: [0, 40, 0], rotate: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-40 right-[15%] text-accent-primary"><Sparkles className="w-16 h-16" /></motion.div>
        <motion.div animate={{ y: [0, -35, 0], rotate: [0, 25, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute bottom-40 left-[20%] text-accent-primary"><Rocket className="w-20 h-20" /></motion.div>
        <motion.div animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }} transition={{ duration: 9, repeat: Infinity }} className="absolute bottom-20 right-[25%] text-accent-primary"><Crown className="w-12 h-12" /></motion.div>
        <motion.div animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-1/2 left-1/2 text-accent-primary"><Star className="w-10 h-10" /></motion.div>
      </div>

      <SectionHeading 
        boldText="Start free."
        grayText="Scale when ready."
        subtext="No credit card required. The free plan is generous enough to land your next role. Upgrade only if you want unlimited power."
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {plans.map((plan, i) => (
          <FadeIn key={i} delay={i * 0.1} className={`bg-bg-secondary border-2 ${plan.popular ? 'border-accent-primary shadow-[0_0_40px_var(--color-accent-primary)] scale-105 z-10' : 'border-border-color'} rounded-3xl p-10 flex flex-col hover:-translate-y-2 transition-transform duration-300 relative`}>
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-accent-primary text-accent-text text-sm font-black rounded-full uppercase tracking-widest shadow-lg">
                Most Popular
              </div>
            )}
            <h3 className="font-display text-3xl font-black uppercase tracking-widest text-text-primary mb-4">{plan.name}</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-display text-6xl font-black text-text-primary">{plan.price}</span>
              <span className="text-lg font-bold uppercase tracking-widest text-text-muted">{plan.period}</span>
            </div>
            <p className="text-base font-medium text-text-secondary mb-10 h-12">{plan.desc}</p>
            
            <FancyButton outline={plan.ctaStyle === 'outline'} className="w-full mb-10">
              {plan.cta}
            </FancyButton>

            <div className="space-y-5 flex-1">
              {plan.features.map((f, j) => (
                <div key={j} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-accent-primary shrink-0" />
                  <span className="text-base font-medium text-text-primary">{f}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        ))}
      </div>
      <div className="text-center mt-16 text-sm font-bold uppercase tracking-widest text-text-muted relative z-10">
        All paid plans include a 14-day money-back guarantee. Cancel anytime.
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "How is HeadStart different from LinkedIn or Indeed?", a: "LinkedIn and Indeed are single-source job boards. HeadStart searches 30+ sources simultaneously — including Greenhouse and Lever company boards most people never check — deduplicates results, and enriches them with AI-powered match scores, visa signals, and experience classification. Then it generates tailored application documents. Job boards list jobs. HeadStart helps you get them." },
    { q: "What does the AI career coach (Echo) actually do?", a: "Echo learns your background, personality, career goals, and constraints through natural conversation. It builds a persistent fact sheet about you that improves over time. This isn't generic chatbot advice — Echo infers your MBTI, suggests career directions you haven't considered, and gives resume suggestions grounded in your real experience. Everything it learns feeds into better document generation and job matching." },
    { q: "Are the resumes actually different for each job?", a: "Yes. When you generate a resume for a specific role, the AI reads the full job description, identifies the key requirements and keywords, and restructures your experience to highlight the most relevant qualifications. The output is a unique, ATS-optimized document every time — not a template with swapped keywords." },
    { q: "Will the AI fabricate experience I don't have?", a: "No. Every claim in your generated documents traces back to your real profile and the facts Echo has gathered. The system includes anti-fabrication validation that catches hallucinations before they reach your resume. Your career story, told accurately, positioned strategically." },
    { q: "How does the visa sponsorship feature work?", a: "HeadStart scans job descriptions for sponsorship signals — H1B, OPT, CPT, and work authorization keywords. AI classifies each listing as likely-sponsors, unlikely-sponsors, or unknown based on the text and the company's hiring patterns. International candidates can filter results to only see sponsorship-friendly opportunities." },
    { q: "Is my data secure? Can I run it locally?", a: "Your data is encrypted at rest and in transit. We never share or sell personal information. For maximum privacy, HeadStart supports Ollama for 100% local AI processing — your resume data never has to leave your machine. You can export or delete all your data at any time." },
    { q: "Is the free plan actually usable?", a: "Genuinely, yes. The free plan includes unlimited job searches, full AI coaching with Echo, 5 tailored resumes and cover letters per month, visa signals, and the application tracker. That's enough for most job seekers to land their next role. Pro is for people who want unlimited generation and advanced features." },
    { q: "What job sources do you search?", a: "LinkedIn, Indeed, Glassdoor, ZipRecruiter, Monster, Dice, Built In, Wellfound, USAJOBS, GovernmentJobs, Remotive, RemoteOK, WeWorkRemotely, Upwork, Freelancer, and direct company boards via Greenhouse and Lever APIs. Over 30 sources total, with more being added regularly." }
  ];

  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="faq" className="py-32 px-6 border-b border-border-color bg-bg-secondary">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4">
          <div className="sticky top-32">
            <h2 className="font-display text-5xl font-black tracking-tighter mb-6 uppercase leading-[0.9]">
              <span className="text-text-primary block">Questions?</span>
              <span className="text-text-secondary block">Answers.</span>
            </h2>
            <p className="text-lg font-medium text-text-secondary leading-relaxed">
              Can't find what you're looking for? Reach out at <a href="mailto:hello@headstart.app" className="text-accent-primary hover:underline transition-all">hello@headstart.app</a>
            </p>
          </div>
        </div>
        
        <div className="lg:col-span-8">
          <div className="divide-y-2 divide-border-color border-y-2 border-border-color">
            {faqs.map((faq, i) => (
              <div key={i} className="py-8">
                <button 
                  onClick={() => toggleItem(i)}
                  className="w-full flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className="font-display text-2xl font-bold uppercase tracking-widest text-text-primary group-hover:text-accent-primary transition-colors pr-8">{faq.q}</span>
                  <div className={`w-10 h-10 rounded-full border-2 border-border-color flex items-center justify-center transition-all duration-300 ${openItems.includes(i) ? 'bg-accent-primary border-accent-primary text-accent-text rotate-180' : 'text-text-muted group-hover:border-accent-primary group-hover:text-accent-primary'}`}>
                    <ChevronDown className="w-6 h-6" />
                  </div>
                </button>
                <AnimatePresence>
                  {openItems.includes(i) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-6 text-lg font-medium text-text-secondary leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PreFooter() {
  return (
    <section className="py-40 px-6 relative overflow-hidden bg-accent-primary text-accent-text">
      {/* Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-display font-black opacity-10 whitespace-nowrap pointer-events-none select-none uppercase tracking-tighter">
        HeadStart
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="font-display text-6xl md:text-8xl font-black tracking-tighter mb-8 uppercase leading-[0.9]">
          Your next career move starts here.
        </h2>
        <p className="text-xl md:text-2xl opacity-90 mb-12 leading-relaxed font-medium max-w-3xl mx-auto">
          Stop sending generic applications into the void. Let AI learn your story, search intelligently, and craft documents that get you interviews.
        </p>
        <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-10 py-5 font-bold uppercase tracking-widest transition-all duration-300 bg-bg-primary text-text-primary hover:scale-105 shadow-2xl mx-auto mb-8">
          <span className="relative z-10 flex items-center gap-3">
            Start Your First Application <ArrowRight className="w-6 h-6" />
          </span>
        </button>
        <p className="text-sm font-bold uppercase tracking-widest opacity-80">Free forever &middot; No credit card &middot; 2 minute setup</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-bg-primary pt-24 pb-12 px-6 border-t border-border-color">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-16 mb-20">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-accent-primary flex items-center justify-center shadow-lg">
                <Hexagon className="w-6 h-6 text-accent-text fill-accent-text/20" />
              </div>
              <span className="text-3xl font-display font-black tracking-tighter text-text-primary uppercase">HeadStart</span>
            </div>
            <p className="text-text-secondary text-base font-medium leading-relaxed mb-10 max-w-sm">
              AI-powered job search, career coaching, and tailored application documents. Your intelligent career companion.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="w-12 h-12 rounded-full border-2 border-border-color flex items-center justify-center text-text-muted hover:border-accent-primary hover:text-accent-primary transition-all"><Github className="w-5 h-5" /></a>
              <a href="#" className="w-12 h-12 rounded-full border-2 border-border-color flex items-center justify-center text-text-muted hover:border-accent-primary hover:text-accent-primary transition-all"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="w-12 h-12 rounded-full border-2 border-border-color flex items-center justify-center text-text-muted hover:border-accent-primary hover:text-accent-primary transition-all"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-display text-xl font-bold uppercase tracking-widest text-text-primary mb-8">Product</h4>
            <ul className="space-y-5">
              {['Features', 'How It Works', 'Templates', 'Pricing'].map(link => (
                <li key={link}><a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-base font-medium text-text-secondary hover:text-accent-primary transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-display text-xl font-bold uppercase tracking-widest text-text-primary mb-8">Resources</h4>
            <ul className="space-y-5">
              {['FAQ', 'Career Tips', 'Resume Guide', 'API Docs'].map(link => (
                <li key={link}><a href="#" className="text-base font-medium text-text-secondary hover:text-accent-primary transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-display text-xl font-bold uppercase tracking-widest text-text-primary mb-8">Legal</h4>
            <ul className="space-y-5">
              {['Privacy Policy', 'Terms of Service', 'Security'].map(link => (
                <li key={link}><a href="#" className="text-base font-medium text-text-secondary hover:text-accent-primary transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t-2 border-border-color flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm font-bold uppercase tracking-widest text-text-muted">&copy; 2026 HeadStart. All rights reserved.</p>
          <p className="text-sm font-bold uppercase tracking-widest text-text-muted">Built for job seekers who refuse to be generic.</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [theme, setTheme] = useState('theme-midnight');

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 bg-bg-primary text-text-primary ${theme}`}>
      <Header theme={theme} setTheme={setTheme} />
      <main className="flex-1 w-full">
        <Hero />
        <MarqueeBanner />
        <Statistics />
        <HowItWorks />
        <Features />
        <Templates />
        <Testimonials />
        <Pricing />
        <FAQ />
        <PreFooter />
      </main>
      <Footer />
    </div>
  );
}
