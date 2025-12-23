import React, { useState, useEffect, ReactNode, useRef } from 'react';
import { CheckCircle, Star, X, ChevronRight, Play } from 'lucide-react';

// --- ANIMATED SECTION COMPONENT ---
interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          if (currentRef) observer.unobserve(currentRef); 
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, [delay]);

  return (
    <div ref={ref} className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
      {children}
    </div>
  );
};

// --- MODAL COMPONENT ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(234,179,8,0.2)] animate-in fade-in zoom-in duration-300">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
            <h2 className="text-3xl font-black text-white tracking-tight">{title}</h2>
            <button onClick={onClose} className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition">
              <X size={24} />
            </button>
          </div>
          <div className="text-zinc-300 space-y-4 text-lg leading-relaxed font-light">
            {children}
          </div>
          <div className="mt-8 pt-6 border-t border-white/10">
            <button 
              onClick={onClose}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold py-4 rounded-xl hover:from-yellow-300 hover:to-amber-400 transition shadow-lg shadow-amber-500/20"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN LANDING PAGE ---
const KiwiKryptoLanding = () => {
  const [scrollY, setScrollY] = useState(0);
  
  // State for Modals
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-500/30">
      
      {/* Global Background Gradient Effect */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-yellow-500/10 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-amber-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Top Navigation / Logo */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-black/80 backdrop-blur-md border-b border-white/5 py-4' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center group cursor-default">
            {/* Icon Box */}
            <div className="relative mr-3">
              <div className="absolute inset-0 bg-yellow-400 blur opacity-40 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-zinc-800 to-black p-1 rounded-xl border border-white/10 overflow-hidden transform group-hover:rotate-6 transition duration-300">
                <img 
                  src="/icon.jpg"
                  alt="KiwiKrypto Logo"
                  className="w-10 h-10 object-cover rounded-lg"
                />
              </div>
            </div>
            
            {/* Brand Name */}
            <span className="text-2xl font-black tracking-tighter text-white">
              Kiwi<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500">Krypto</span>
            </span>
          </div>
          
          {/* UPDATED BUTTON HERE */}
          <a href="https://calendly.com/kiwikrypto33-s0tu/60-minute-consultation?month=2025-12" className="hidden md:block bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black text-sm font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(251,191,36,0.4)] hover:shadow-[0_0_25px_rgba(251,191,36,0.6)]">
            Book Session
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 min-h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* LEFT COLUMN */}
            <div className="text-left">
              <FadeInSection>
                <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                  Expert Crypto Consultation
                </div>
              </FadeInSection>
              
              <FadeInSection delay={200}>
                <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
                  Navigate the <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500">Crypto World</span> <br />
                  with Confidence
                </h1>
              </FadeInSection>
              
              <FadeInSection delay={400}>
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-zinc-200 leading-tight">
                  Get Personalized 1:1 Consultation with <span className="text-yellow-400 border-b-2 border-yellow-400/30">Kiran</span>, An Experienced Crypto Advisor
                </h2>
              </FadeInSection>
              
              <FadeInSection delay={600}>
                <p className="text-lg md:text-xl mb-10 text-zinc-400 font-light leading-relaxed max-w-lg">
                  Get personalized guidance on investment strategies, security best practices, and navigating the complex crypto landscape safely.
                </p>
              </FadeInSection>

              <FadeInSection delay={800}>
                <a href="https://calendly.com/kiwikrypto33-s0tu/60-minute-consultation?month=2025-12" className="group relative inline-flex items-center justify-center bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-10 py-5 rounded-full text-xl font-black transition-all hover:scale-105 shadow-[0_0_40px_rgba(251,191,36,0.3)] hover:shadow-[0_0_60px_rgba(251,191,36,0.5)] mb-12">
                  <span className="relative z-10 flex items-center gap-2">
                    Book your 1:1 - $170
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              </FadeInSection>

              <FadeInSection delay={1000}>
                <div className="flex gap-12 border-t border-white/10 pt-8">
                  <div>
                    <div className="text-4xl font-black mb-1 text-white">100+</div>
                    <div className="text-sm font-medium text-zinc-500 uppercase tracking-wide">Consultations</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black mb-1 text-white">5+</div>
                    <div className="text-sm font-medium text-zinc-500 uppercase tracking-wide">Years Exp.</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black mb-1 text-white">98%</div>
                    <div className="text-sm font-medium text-zinc-500 uppercase tracking-wide">Satisfaction</div>
                  </div>
                </div>
              </FadeInSection>
            </div>

            {/* RIGHT COLUMN */}
            <FadeInSection delay={1200}>
              <div className="relative mx-auto max-w-md group"> 
                 {/* Glow behind video */}
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-[2.6rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-white/10 aspect-[11/16] bg-zinc-900">
                  <video 
                    className="absolute inset-0 w-full h-full object-cover" 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    controls 
                  >
                    <source src="/intro.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 pointer-events-none ring-inset ring-1 ring-white/10 rounded-[2.5rem]"></div>
                </div>
              </div>
            </FadeInSection>

          </div>
        </div>
      </section>

      {/* What You'll Get */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <FadeInSection>
            <h2 className="text-4xl md:text-6xl font-black text-center mb-20 tracking-tight">
              What You'll <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Get</span>
            </h2>
          </FadeInSection>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { letter: 'I', title: 'Investment Strategy', desc: 'Learn how to build a diversified crypto portfolio aligned with your risk tolerance and financial goals.' },
              { letter: 'S', title: 'Security & Safety', desc: 'Master wallet security, identify scams, and implement best practices to protect your assets.' },
              { letter: 'G', title: 'Growth & Navigation', desc: 'Understand market trends, DeFi platforms, and how to make informed decisions in volatile markets.' }
            ].map((item, i) => (
              <FadeInSection key={i} delay={200 + i * 200}>
                <div className="relative group p-8 rounded-3xl bg-zinc-900/40 border border-white/5 hover:border-yellow-500/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 text-center h-full">
                  <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-400 to-transparent mb-6 opacity-30 group-hover:opacity-100 transition-opacity duration-500 font-serif">
                      {item.letter}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-yellow-400 transition-colors">{item.title}</h3>
                    <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">{item.desc}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* 60-Min Breakdown */}
      <section className="py-24 px-6 relative bg-zinc-900/30 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">60-Minute Consultation Breakdown</h2>
              <p className="text-zinc-400 text-xl font-light">Everything we'll cover in your personalized session</p>
            </div>
          </FadeInSection>

          <div className="space-y-6">
            {[
              {
                time: "Minutes 1-20",
                title: "Foundation & Goals",
                items: ["Assess your current crypto knowledge & experience level", "Define your investment goals & risk tolerance", "Review your current holdings (if any)", "Understand your biggest concerns & questions"]
              },
              {
                time: "Minutes 21-45",
                title: "Security & Platform Setup",
                items: ["Help you to set up a wallet & security best practices walkthrough", "How to identify scams, phishing attempts, and fraud", "Exchange selection & account security measures", "Backup strategies & recovery procedures"]
              },
              {
                time: "Minutes 46-60",
                title: "Strategy & Market Analysis",
                items: ["Create your personalized step-by-step action plan", "Understanding market cycles, trends & timing", "Next steps & implementation timeline", "Open Q&A session for any remaining questions"]
              }
            ].map((section, idx) => (
              <FadeInSection key={idx} delay={200 + idx * 200}>
                <div className="group relative bg-black/40 rounded-2xl p-8 md:p-10 border border-white/10 hover:border-yellow-500/30 overflow-hidden transition-all duration-300">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 to-amber-600"></div>
                  
                  <div className="md:flex md:justify-between md:items-start gap-8">
                    <div className="mb-6 md:mb-0 md:w-1/3">
                      <div className="inline-block px-3 py-1 rounded bg-yellow-500/10 text-yellow-400 text-sm font-bold mb-2">
                        {section.time}
                      </div>
                      <h3 className="text-2xl font-black text-white">{section.title}</h3>
                    </div>
                    
                    <div className="md:w-2/3 space-y-4">
                      {section.items.map((item, i) => (
                        <div key={i} className="flex items-start group/item">
                          <CheckCircle className="text-zinc-600 group-hover/item:text-yellow-400 mr-4 mt-1 flex-shrink-0 transition-colors" size={18} />
                          <span className="text-zinc-300 font-light">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Everything You Get */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeInSection><h2 className="text-4xl md:text-5xl font-black text-center mb-16 tracking-tight">Everything You Will Get!</h2></FadeInSection>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {title: '60-Minute Live Video Session', desc: 'One-on-one personalized consultation via Zoom' },
              {title: 'Safe Wallet Setup', desc: 'Learn how to secure recovery phrase, send test transaction, choose networks' },
              {title: 'A Simple Roadmap', desc: 'BTC/ETH/SOL, stablecoins, and safe DCA strategy' },
              {title: 'Your Questions Answered', desc: 'Tailored to your level and goals' },
              {title: 'Notes of the entire consultation', desc: 'After the session, you will receive detailed notes of content of the consultation' },
              {title: 'Avoid Costly Mistakes', desc: 'Identify scams, fees, and beginner pitfalls' }
            ].map((item, i) => (
              <FadeInSection key={i} delay={200 + i * 100}>
                <div className="bg-gradient-to-br from-zinc-900 to-black rounded-2xl p-8 border border-white/10 hover:border-yellow-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(251,191,36,0.1)] group">
                  <div className="flex flex-col h-full">
                    <h3 className="font-bold text-xl mb-3 text-yellow-400 group-hover:text-yellow-300">{item.title}</h3>
                    <p className="text-zinc-400 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* Decorative BG */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-zinc-900/50 to-black pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <FadeInSection><h2 className="text-4xl md:text-5xl font-black text-center mb-16">Meet Your Guide</h2></FadeInSection>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeInSection delay={200}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl rotate-3 group-hover:rotate-6 transition-transform duration-500 blur opacity-70"></div>
                <div className="relative bg-zinc-900 rounded-2xl p-2 border border-white/10 overflow-hidden">
                  <img 
                    src="/Kiran.jpg"  
                    alt="Kiran Patel - Crypto Advisor"
                    className="w-full h-full object-cover rounded-xl transition-all duration-500" 
                  />
                </div>
              </div>
            </FadeInSection>
            <FadeInSection delay={400}>
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white">Hi, I'm <span className="text-yellow-400">Kiran</span></h3>
                <p className="text-zinc-300 text-lg leading-relaxed font-light">
                  With over 5 years in the crypto space, I've helped hundreds of individuals, from complete beginners to experienced traders—navigate the complex world of cryptocurrency.
                </p>
                <p className="text-zinc-300 text-lg leading-relaxed font-light">
                  I built a full tutoring system that breaks crypto down in simple language for beginners. My approach is educational and personalized, and I focus on helping you understand the fundamentals, safety, mindset, risk management, and make informed decisions. Everyone I’ve worked with has walked away more confident and more prepared to invest safely.
                </p>
                <div className="pt-6 space-y-4">
                  {['Certified Blockchain Professional', 'Active investor since 2019', '100+ successful consultations completed'].map((item, i) => (
                    <div key={i} className="flex items-center p-3 bg-white/5 rounded-lg border border-white/5">
                      <CheckCircle className="text-yellow-400 mr-3 flex-shrink-0" size={20} />
                      <span className="text-white font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">What Clients Say</h2>
              <p className="text-zinc-400 text-xl font-light">Real feedback from real people</p>
            </div>
          </FadeInSection>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Muskan', text: 'I had no experience with crypto at all and Kiran made everything really easy to follow. He showed me exactly how wallets work and what to avoid so I don’t get scammed. His teaching style is calm and straightforward, and I learned way more in one session than I expected.' },
              { name: 'Sanjna', text: 'Kiran is incredibly patient and explains everything in a way that actually makes sense. He takes confusing topics and breaks them into simple steps so you never feel lost or overwhelmed. You can tell he genuinely cares about helping beginners feel confident and safe. Anyone learning with him is in good hands.' },
              { name: 'Lesley', text: 'He has guided me step-by-step in managing my investments, and every session has been meaningful, practical, and easy to apply. He explains things in a way that actually clicks, and you can tell he genuinely wants his students to feel confident. I highly recommend him to anyone looking for a trustworthy and supportive tutor.' }
            ].map((t, i) => (
              <FadeInSection key={i} delay={200 + i * 200}>
                <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-8 hover:bg-zinc-900 transition duration-300 relative h-full flex flex-col">
                  <div className="absolute -top-4 left-8 bg-black border border-yellow-500/30 p-2 rounded-full flex gap-1">
                    {[...Array(5)].map((_, j) => <Star key={j} className="text-yellow-400 fill-yellow-400" size={14} />)}
                  </div>
                  <p className="text-zinc-300 text-lg mb-8 italic flex-grow font-light leading-relaxed">"{t.text}"</p>
                  <div className="mt-auto border-t border-white/5 pt-4">
                    <div className="font-bold text-lg text-white">{t.name}</div>
                    <div className="text-yellow-400 text-sm">Client</div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 relative">
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900/50 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <FadeInSection><h2 className="text-4xl md:text-5xl font-black text-center mb-16">Frequently Asked Questions</h2></FadeInSection>
          <div className="space-y-4">
            {[
              { q: 'How long is the consultation?', a: 'Each consultation is 60 minutes, giving us ample time to cover your questions and provide actionable guidance.' },
              { q: "What if I'm a complete beginner?", a: "Perfect! Most of my clients are beginners. I'll start with the basics and tailor the session to your level." },
              { q: 'Is this investment advice?', a: "I provide educational guidance and help you understand options. This is education only, not financial advice." },
              { q: 'Refunds & rescheduling?', a: "You may reschedule once with at least 24 hours' notice. However, calls are non-refundable." },
              { q: 'What if I need follow-up help?', a: 'I offer discounted follow-up sessions.' }
            ].map((faq, i) => (
              <FadeInSection key={i} delay={200 + i * 100}>
                <div className="bg-black border border-white/10 rounded-2xl p-8 hover:border-yellow-500/50 transition-colors duration-300">
                  <h3 className="text-xl font-bold mb-3 text-white flex items-center">
                    <span className="text-yellow-400 mr-3">Q.</span> {faq.q}
                  </h3>
                  <p className="text-zinc-400 text-lg font-light pl-8 border-l-2 border-zinc-800">{faq.a}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInSection><h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tight">Ready to Start Your <br/> <span className="text-yellow-400">Crypto Journey?</span></h2></FadeInSection>
          <FadeInSection delay={200}>
            <div className="relative bg-zinc-900 border border-white/10 rounded-[3rem] p-10 md:p-16 overflow-hidden">
              {/* Background Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-yellow-500/10 blur-[80px]"></div>

              <div className="relative z-10">
                <div className="mb-10">
                  <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-amber-600 mb-2">$170</div>
                  <div className="text-xl font-medium text-zinc-400 uppercase tracking-widest">One-Time Investment</div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-12">
                  {['60-minute 1:1 video session', 'Safe Wallet Setup', 'A Simple Roadmap', 'Your Questions Answered'].map((item, i) => (
                    <div key={i} className="flex items-center bg-white/5 rounded-lg p-4">
                      <CheckCircle className="text-yellow-400 mr-3 flex-shrink-0" size={20} />
                      <span className="font-semibold text-white">{item}</span>
                    </div>
                  ))}
                </div>
                
                <a href="https://calendly.com/kiwikrypto33-s0tu/60-minute-consultation?month=2025-12" className="inline-block w-full md:w-auto bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-12 py-6 rounded-full text-xl font-black hover:scale-105 transition-transform shadow-[0_0_40px_rgba(251,191,36,0.4)]">
                  Book Your Consultation Now!
                </a>
                <p className="text-sm text-zinc-500 mt-8 font-medium">Educational only. Not financial advice.</p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Brand & Email */}
          <div className="mb-12">
            <h3 className="text-3xl font-black mb-4 tracking-tighter">Kiwi<span className="text-yellow-400">Krypto</span></h3>
            <p className="text-zinc-500 mb-6">Professional Crypto Consultation & Education</p>
            <a href="mailto:kiwikrypto33@gmail.com" className="text-xl font-bold text-white hover:text-yellow-400 transition underline decoration-zinc-700 underline-offset-4">kiwikrypto33@gmail.com</a>
          </div>

          {/* --- SOCIAL MEDIA SECTION --- */}
          <div className="flex justify-center space-x-8 mb-12">
            <a href="https://www.instagram.com/kiwikrypto?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="p-4 bg-zinc-900 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition transform hover:scale-110 border border-white/5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
          </div>

          {/* --- TERMS & PRIVACY LINKS --- */}
          <div className="flex justify-center space-x-8 text-zinc-500 text-sm mb-8">
            <button onClick={() => setShowTerms(true)} className="hover:text-white transition">Terms and Conditions</button>
            <button onClick={() => setShowPrivacy(true)} className="hover:text-white transition">Privacy Policy</button>
          </div>

          {/* Copyright */}
          <div className="text-xs text-zinc-600 pt-8 border-t border-zinc-900 max-w-2xl mx-auto leading-relaxed">
            <p className="mb-2">© 2025 KiwiKrypto. All rights reserved.</p>
            <p>Disclaimer: Crypto investments carry risk. This is educational consultation, not financial advice.</p>
          </div>
        </div>
      </footer>

      {/* --- POPUP MODALS (Reused) --- */}
      <Modal isOpen={showTerms} onClose={() => setShowTerms(false)} title="Terms of Service">
        <p>By booking a session with KiwiKrypto, you agree to the following:</p>
        <ol className="list-decimal pl-5 space-y-4 marker:text-yellow-500">
          <li>Sessions are educational only. Nothing shared constitutes financial advice.</li>
          <li>All payments are processed securely via Stripe through Calendly.</li>
          <li>Bookings are non-refundable. You may reschedule once with at least 24 hours' notice.</li>
          <li>You are solely responsible for your actions and financial decisions.</li>
          <li>KiwiKrypto reserves the right to update these Terms at any time.</li>
        </ol>
      </Modal>

      <Modal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} title="Privacy Policy">
        <p>We respect your privacy. KiwiKrypto does not sell or share your personal data.</p>
        <p>Information collected through booking (such as your name, email, and payment information) is used solely for scheduling and communication purposes.</p>
        <p>Payment details are handled securely by Stripe; we do not store sensitive financial data.</p>
        <p>By booking a session, you consent to us using your email for session communication and follow-up.</p>
        <p>For any concerns, contact <span className="text-yellow-400 font-bold">kiwikrypto33@gmail.com</span>.</p>
      </Modal>
    </div>
  );
};

export default KiwiKryptoLanding;