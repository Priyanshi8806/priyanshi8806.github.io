// Site-wide settings. Most personal info lives here; page content lives in src/content and src/data.

export const site = {
  name: 'Your Name',
  initials: 'YN',
  description:
    'Research portfolio of Your Name — Information Systems & Operations Management.',

  // Shown above the headline on the home page.
  status: 'Applying to PhD programs · Fall 2027 · Information Systems & Operations Management',

  // The one question you want a reader to remember. Keep it to a sentence.
  question:
    'How should organizations design information flows so that people and algorithms make better operational decisions together?',

  // 2–3 sentences: who you are, what you do, how you work.
  intro:
    'I am a Research Associate at [Institution], where I study [topic] using [methods]. Before that, I spent [N] years at [Company] building [thing], which is where I first ran into the problems I now study. I combine [empirical / analytical / computational] methods with real operational data.',

  role: 'Research Associate, [Institution]',
  location: '[City, Country]',
  email: 'you@example.com',

  // Leave a value empty ('') to hide that link.
  links: {
    scholar: 'https://scholar.google.com/',
    github: 'https://github.com/Priyanshi8806',
    linkedin: 'https://www.linkedin.com/in/yourusername',
    orcid: '',
    x: '',
  },

  // Calendly / cal.com link for "book a chat". Empty to hide.
  booking: 'https://cal.com/yourusername/20min',

  // Path to a static CV PDF in /public (e.g. '/cv.pdf'). Empty → the CV page offers "Print / Save as PDF".
  cvPdf: '',

  // Privacy-friendly analytics. Create a free site at goatcounter.com and put its code here (e.g. 'yourname').
  goatcounter: '',
};

export const nav = [
  { href: '/research/', label: 'Research' },
  { href: '/agenda/', label: 'Agenda' },
  { href: '/explainers/', label: 'Explainers' },
  { href: '/notebook/', label: 'Notebook' },
  { href: '/reading/', label: 'Reading' },
  { href: '/photos/', label: 'Photos' },
  { href: '/cv/', label: 'CV' },
];
