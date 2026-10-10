export const statusLabel: Record<string, string> = {
  idea: 'Idea',
  'in-progress': 'In progress',
  'working-paper': 'Working paper',
  'under-review': 'Under review',
  published: 'Published',
  completed: 'Completed',
};

export const kindLabel: Record<string, string> = {
  paper: 'Research',
  industry: 'Industry',
  academic: 'Academic project',
};

export const stageLabel: Record<string, string> = {
  active: 'Working on it now',
  next: 'Next up',
  someday: 'Longer horizon',
};

export const notebookKindLabel: Record<string, string> = {
  progress: 'Progress',
  idea: 'Idea',
  'null-result': 'Null result',
  'reading-note': 'Reading note',
  method: 'Method',
};

export const linkLabels: Record<string, { label: string; icon: string }> = {
  paper: { label: 'Paper', icon: 'lucide:file-text' },
  code: { label: 'Code', icon: 'lucide:code' },
  slides: { label: 'Slides', icon: 'lucide:presentation' },
  data: { label: 'Data', icon: 'lucide:database' },
  poster: { label: 'Poster', icon: 'lucide:image' },
  video: { label: 'Video', icon: 'lucide:play' },
};
