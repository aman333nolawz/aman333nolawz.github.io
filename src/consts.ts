import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'Nolawz',
  description:
    'Why obey law when you can write it yourself?',
  href: 'https://aman333nolawz.github.io',
  author: 'Nolawz',
  locale: 'en-US',
  featuredPostCount: 2,
  postsPerPage: 5,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/blog',
    label: 'blog',
  },
  {
    href: '/authors',
    label: 'authors',
  },
  {
    href: '/about',
    label: 'about',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/aman333nolawz',
    label: 'GitHub',
  },
  {
    href: 'https://twitter.com/NoLawz333',
    label: 'Twitter',
  },
  {
    href: 'mailto:nolawz46@gmail.com',
    label: 'Email',
  },
  {
    href: '/rss.xml',
    label: 'RSS',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}
