// Site-wide settings. Most personal info lives here; page content lives in src/content and src/data.

export const site = {
  name: 'Priyanshi',
  initials: 'P',

  description:
    'Research portfolio of Priyanshi — Information Systems, Economics of AI, Human–AI Interaction, and Operations.',

  // Shown above the headline on the home page.
  status:
    'Research Associate at ISB · PhD applicant for Fall 2027 · Information Systems & Operations',

  // The research question highlighted on the home page.
  question:
    'How do AI and digital technologies reshape decision-making, work, organizations, and communities?',

  // Short introduction shown on the home page.
  intro:
    'I am a Research Associate at the Indian School of Business, where I study AI, digital technologies, and technology-enabled decision-making using large-scale digital-trace and text data, causal inference, NLP, LLM evaluation, panel methods, and machine learning. My current research spans geographic bias in LLMs, AI coding assistants and technical debt, the future of work, and the evolution of AI firms. Before moving into academic research, I worked in logistics and operations at Kuehne+Nagel, an experience that shaped my interest in how information, technology, and operational decisions interact.',

  role: 'Research Associate, Indian School of Business',
  location: 'Hyderabad, India',
  email: 'priyanshi8806@gmail.com',

  // Leave a value empty ('') to hide that link.
  links: {
    scholar: '',
    github: 'https://github.com/Priyanshi8806',
    linkedin: 'https://www.linkedin.com/in/priyanshi-35135118a/',
    orcid: '',
    x: '',
  },

  // Leave empty to hide the booking link.
  booking: '',

  // Static CV PDF stored in /public.
  cvPdf: '/Priyanshi_IS.pdf',

  // Privacy-friendly analytics. Leave empty if unused.
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
