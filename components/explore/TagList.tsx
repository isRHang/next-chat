import { Tag } from '@/components/explore/Tag'

const tags = [
  'writing',
  'code',
  'translation',
  'teaching',
  'programming',
  'creative',
  'software-development',
  'language-learning',
  'education',
  'Writing',
  'typescript',
  'consulting',
  'copywriting',
  'prompt',
  'coding',
  'guidance',
  'game',
  'vocabulary',
  'communication',
  'research',
  'productivity',
  'testing',
  'editing',
  'agulu',
  'conversation',
  'ecommerce',
  'language',
  'learning',
  'english-conversation',
  'design',
  'academic',
  'software development',
  'User Experience',
  'Designer',
  'Documentation',
  'summary',
  'lyrics',
  'seo',
  'markdown',
  'explanation',
  'assistance',
  'interaction',
  'English',
  'stable-diffusion',
  'deployment',
  'feedback',
  'react',
  'expert',
  'assessment',
  'english',
  'language-proficiency',
  'language-coaching',
  'conversation-partner',
  'Copywriting',
  'proofreading',
  'it',
  'frontend',
]

export function TagList() {
  return (
    <div className="my-4 flex h-64 w-full flex-row flex-wrap gap-2">
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} />
      ))}
    </div>
  )
}
