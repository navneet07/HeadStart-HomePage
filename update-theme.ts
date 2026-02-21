import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add Moon icon
content = content.replace('Hexagon, Sun, BookOpen', 'Hexagon, Sun, Moon, BookOpen');

// 2. Add Header props and toggle
content = content.replace('function Header() {', 'function Header({ isDark, toggleDark }: { isDark: boolean, toggleDark: () => void }) {');
content = content.replace(
  '<button className="p-2 text-slate-400 hover:text-white transition-colors">\\n            <Sun className="w-5 h-5" />\\n          </button>',
  `<button onClick={toggleDark} className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>`
);
// Also replace the mobile menu button if needed, but we'll focus on the desktop one first.
// Let's just do a regex replace to be safe.
content = content.replace(
  /<button className="p-2 text-slate-400 hover:text-white transition-colors">\s*<Sun className="w-5 h-5" \/>\s*<\/button>/,
  `<button onClick={toggleDark} className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>`
);

// 3. Update App component
const appReplacement = `export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleDark = () => setIsDark(!isDark);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#11111a] text-slate-900 dark:text-white transition-colors duration-300">
      <Header isDark={isDark} toggleDark={toggleDark} />
      <main className="flex-1 max-w-7xl mx-auto w-full border-x border-slate-200 dark:border-white/10">
        <Hero />
        <Statistics />
        <HowItWorks />
        <Features />
        <Templates onSelectTemplate={setSelectedTemplate} />
        <Testimonials />
        <Pricing />
        <FAQ />
        <PreFooter />
      </main>
      <Footer />

      {/* Template Modal */}
      <AnimatePresence>
        {selectedTemplate && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
            onClick={() => setSelectedTemplate(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-[#11111a] border border-slate-200 dark:border-white/10 rounded-2xl p-6 max-w-2xl w-full shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedTemplate.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400">ATS-Optimized Professional Template</p>
                </div>
                <button onClick={() => setSelectedTemplate(null)} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="aspect-[1/1.4] w-full max-h-[60vh] bg-slate-100 dark:bg-[#0a0a0f] rounded-lg border border-slate-200 dark:border-white/10 mb-6 overflow-hidden flex flex-col relative">
                <div className={\`h-24 w-full \${selectedTemplate.color} shrink-0\`}></div>
                <div className="p-8 flex-1">
                  <div className="w-1/2 h-6 bg-slate-300 dark:bg-slate-700 rounded mb-4"></div>
                  <div className="w-1/3 h-4 bg-slate-200 dark:bg-slate-800 rounded mb-8"></div>
                  
                  <div className="space-y-6">
                    {[1, 2, 3].map(i => (
                      <div key={i}>
                        <div className="flex justify-between mb-2">
                          <div className="w-1/3 h-4 bg-slate-300 dark:bg-slate-700 rounded"></div>
                          <div className="w-1/4 h-4 bg-slate-200 dark:bg-slate-800 rounded"></div>
                        </div>
                        <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded mb-2"></div>
                        <div className="w-5/6 h-3 bg-slate-200 dark:bg-slate-800 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-4">
                <button onClick={() => setSelectedTemplate(null)} className="px-6 py-3 rounded-lg font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                  Cancel
                </button>
                <button className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-medium transition-colors">
                  Apply to Profile
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}`;

content = content.replace(/export default function App\(\) \{[\s\S]*?\}\);?\n\}/, appReplacement);

// 4. Update Templates section to accept onSelectTemplate
content = content.replace('function Templates() {', 'function Templates({ onSelectTemplate }: { onSelectTemplate: (t: any) => void }) {');
content = content.replace(
  '<div className="w-64 h-80 flex-shrink-0 bg-white rounded-lg p-4 shadow-xl transform -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300 relative overflow-hidden group border border-slate-200 mx-4">',
  '<div onClick={() => onSelectTemplate(t)} className="w-64 h-80 flex-shrink-0 bg-white dark:bg-[#1a1a24] rounded-lg p-4 shadow-xl transform -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300 relative overflow-hidden group border border-slate-200 dark:border-white/10 mx-4 cursor-pointer">'
);

// 5. Replace colors for dark/light mode
const replacements = [
  { from: /bg-\[\#11111a\]/g, to: 'bg-white dark:bg-[#11111a]' },
  { from: /bg-\[\#0a0a0f\]/g, to: 'bg-slate-50 dark:bg-[#0a0a0f]' },
  { from: /bg-\[\#0f0f17\]/g, to: 'bg-white dark:bg-[#0f0f17]' },
  { from: /bg-\[\#1a1a24\]/g, to: 'bg-slate-100 dark:bg-[#1a1a24]' },
  { from: /bg-\[\#13131f\]/g, to: 'bg-slate-50 dark:bg-[#13131f]' },
  { from: /text-white/g, to: 'text-slate-900 dark:text-white' },
  { from: /text-slate-400/g, to: 'text-slate-600 dark:text-slate-400' },
  { from: /text-slate-300/g, to: 'text-slate-700 dark:text-slate-300' },
  { from: /text-slate-200/g, to: 'text-slate-800 dark:text-slate-200' },
  { from: /border-white\/10/g, to: 'border-slate-200 dark:border-white/10' },
  { from: /border-white\/5/g, to: 'border-slate-100 dark:border-white/5' },
  { from: /bg-white\/5/g, to: 'bg-slate-100 dark:bg-white/5' },
  { from: /bg-white\/\[0\.02\]/g, to: 'bg-slate-50 dark:bg-white/[0.02]' },
  { from: /bg-white\/\[0\.03\]/g, to: 'bg-slate-100 dark:bg-white/[0.03]' },
  { from: /bg-white\/\[0\.04\]/g, to: 'bg-slate-200 dark:bg-white/[0.04]' },
  { from: /bg-white\/10/g, to: 'bg-slate-200 dark:bg-white/10' },
  { from: /bg-white\/20/g, to: 'bg-slate-300 dark:bg-white/20' },
  { from: /bg-black\/20/g, to: 'bg-slate-100 dark:bg-black/20' },
  { from: /bg-black\/80/g, to: 'bg-slate-900/90 dark:bg-black/80' },
  { from: /from-\[\#11111a\]/g, to: 'from-white dark:from-[#11111a]' },
  { from: /from-\[\#0a0a0f\]/g, to: 'from-slate-50 dark:from-[#0a0a0f]' },
  { from: /fill-white\/20/g, to: 'fill-slate-900/20 dark:fill-white/20' },
  { from: /text-white\/\[0\.02\]/g, to: 'text-slate-900/[0.02] dark:text-white/[0.02]' },
  { from: /text-white\/\[0\.03\]/g, to: 'text-slate-900/[0.03] dark:text-white/[0.03]' },
  { from: /text-white\/\[0\.04\]/g, to: 'text-slate-900/[0.04] dark:text-white/[0.04]' },
];

for (const { from, to } of replacements) {
  content = content.replace(from, to);
}

// Fix some specific cases where text-white was replaced but shouldn't be (like buttons)
content = content.replace(/bg-violet-600 hover:bg-violet-500 text-slate-900 dark:text-white/g, 'bg-violet-600 hover:bg-violet-500 text-white');
content = content.replace(/bg-violet-500 text-slate-900 dark:text-white/g, 'bg-violet-500 text-white');
content = content.replace(/text-slate-900 dark:text-white block/g, 'text-slate-900 dark:text-white block');
content = content.replace(/bg-violet-500 text-slate-900 dark:text-white text-xs/g, 'bg-violet-500 text-white text-xs');
content = content.replace(/text-slate-900 dark:text-white font-medium text-sm/g, 'text-white font-medium text-sm');
content = content.replace(/text-slate-900 dark:text-white font-medium text-lg/g, 'text-white font-medium text-lg');

fs.writeFileSync('src/App.tsx', content);
