import type { SkillGroup } from './types'

/**
 * Evidence, not a logo wall. `usedIn` names the project or job where the skill
 * was actually used, so a recruiter can check the claim against a card two
 * sections up instead of taking it on faith.
 *
 * There is no proficiency tier. Everything listed is defensible in an
 * interview; anything that was not got removed, not downgraded. Skills with no
 * `usedIn` are ones whose evidence is the whole list (Git, OOP) rather than one
 * named project.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    label: 'Languages',
    blurb: 'What I write day to day.',
    accent: 'cyan',
    skills: [
      { name: 'Python', icon: 'python', usedIn: ['Career Navigator', 'Code Review Agent'] },
      { name: 'TypeScript', icon: 'typescript', usedIn: ['Salon Platform', 'Local Hangout'] },
      { name: 'JavaScript', icon: 'javascript', usedIn: ['Mental Health App'] },
      { name: 'SQL', icon: 'database', usedIn: ['Dreamerix', 'Mouse Squad'] },
      { name: 'HTML / CSS', icon: 'html', usedIn: ['Salon Platform'] },
    ],
  },
  {
    id: 'frameworks',
    label: 'Frameworks & Libraries',
    blurb: 'What I build with.',
    accent: 'fuchsia',
    skills: [
      { name: 'React', icon: 'react', usedIn: ['Dreamerix', 'Mental Health App'] },
      { name: 'React Native', icon: 'react', usedIn: ['Agon', 'Malware Detection'] },
      { name: 'Expo', icon: 'mobile', usedIn: ['Agon'] },
      { name: 'Node.js', icon: 'node', usedIn: ['Dreamerix', 'Salon Platform'] },
      { name: 'FastAPI', icon: 'server', usedIn: ['Career Navigator', 'Agon'] },
      { name: 'LangGraph', icon: 'graph', usedIn: ['Code Review Agent'] },
    ],
  },
  {
    id: 'ai',
    label: 'AI & ML',
    blurb: 'Building with models, and testing them.',
    accent: 'green',
    skills: [
      { name: 'Claude Code', icon: 'terminal', usedIn: ['Agon', 'Website'] },
      { name: 'Prompt Engineering', icon: 'terminal', usedIn: ['Outlier', 'Agon'] },
      { name: 'Agentic Workflows', icon: 'graph', usedIn: ['Code Review Agent'] },
      { name: 'LLM Evaluation', icon: 'chart', usedIn: ['Outlier'] },
      { name: 'Gemini API', icon: 'robot', usedIn: ['Career Navigator', 'Mental Health App'] },
      { name: 'Groq', icon: 'robot', usedIn: ['Agon'] },
      { name: 'On-device ML', icon: 'chip', usedIn: ['Malware Detection'] },
      { name: 'TensorFlow Lite', icon: 'chip', usedIn: ['Malware Detection'] },
      { name: 'OpenCV', icon: 'eye', usedIn: ['Facial Recognition'] },
    ],
  },
  {
    id: 'data',
    label: 'Data & Infrastructure',
    blurb: 'Where the state lives.',
    accent: 'cyan',
    skills: [
      { name: 'PostgreSQL', icon: 'database', usedIn: ['Dreamerix', 'Agon'] },
      { name: 'Supabase', icon: 'database', usedIn: ['Salon Platform', 'Career Navigator'] },
      { name: 'Firebase', icon: 'fire', usedIn: ['Malware Detection'] },
      { name: 'REST API design', icon: 'plug', usedIn: ['Dreamerix', 'Career Navigator'] },
      { name: 'Docker', icon: 'docker', usedIn: ['Code Review Agent'] },
      { name: 'RevenueCat', icon: 'plug', usedIn: ['Agon'] },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Practice',
    blurb: 'How the work gets shipped.',
    accent: 'fuchsia',
    skills: [
      { name: 'Git / GitHub', icon: 'git' },
      { name: 'Vercel', icon: 'triangle', usedIn: ['Salon Platform', 'Career Navigator'] },
      { name: 'Agile / Scrum', icon: 'rotate', usedIn: ['Dreamerix', 'Outlier'] },
      { name: 'Jira', icon: 'board', usedIn: ['Dreamerix'] },
      { name: 'Unit Testing', icon: 'flask', usedIn: ['Code Review Agent'] },
      { name: 'OOP & System Design', icon: 'cubes' },
    ],
  },
  {
    id: 'spoken',
    label: 'Spoken Languages',
    blurb: 'Fluent in all three.',
    accent: 'green',
    skills: [
      { name: 'English', icon: 'globe' },
      { name: 'Nepali', icon: 'globe' },
      { name: 'Hindi', icon: 'globe' },
    ],
  },
]
