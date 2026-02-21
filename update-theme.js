const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add Moon to lucide-react imports
content = content.replace('Hexagon, Sun, BookOpen', 'Hexagon, Sun, Moon, BookOpen');

// Add dark mode toggle to Header
content = content.replace('function Header() {', 'function Header({ isDark, toggleDark }: { isDark: boolean, toggleDark: () => void }) {');
content = content.replace(
  '<button className="p-2 text-slate-400 hover:text-white transition-colors">\n            <Sun className="w-5 h-5" />\n          </button>',
  '<button onClick={toggleDark} className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">\n            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}\n          </button>'
);

// Update App component to manage dark mode state
content = content.replace(
  'export default function App() {\n  return (\n    <div className="min-h-screen flex flex-col">',
  `export default function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleDark = () => setIsDark(!isDark);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#11111a] text-slate-900 dark:text-white transition-colors duration-300">`
);

content = content.replace('<Header />', '<Header isDark={isDark} toggleDark={toggleDark} />');

// Replace hardcoded dark mode classes with responsive ones
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
  { from: /bg-black\/80/g, to: 'bg-white/90 dark:bg-black/80' },
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

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx updated successfully.');
