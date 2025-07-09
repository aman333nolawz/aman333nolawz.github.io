import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'B34RN00B',
  description:
    'Why obey law when you can write it yourself?',
  href: 'https://b34rn008.github.io',
  author: 'B34RN00B',
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
    href: 'https://github.com/b34rn008',
    label: 'GitHub',
  },
  {
    href: 'https://x.com/ElectroTec32409',
    label: 'Twitter',
  },
  {
    href: 'mailto:b34r@blitzhack.xyz',
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
