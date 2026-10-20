import type { SvgComponent } from "astro/types"
import Email from "@/assets/icons/email.svg"
import GitHub from "@/assets/icons/github.svg"
import RSS from "@/assets/icons/rss.svg"
import Twitter from "@/assets/icons/twitter.svg"

export const SITE = {
  title: "Nolawz",
  description: "Why obey law when you can write it yourself?",
  locale: "en-US",
  dir: "ltr",
  defaultPageImage: "/static/twitter-card.png",
  defaultPostImage: "/static/twitter-card.png",
} as const

export const NAVIGATION = [
  { href: "/blog", label: "Blog" },
  { href: "/authors", label: "Authors" },
  { href: "/about", label: "About" },
  { href: "/reading", label: "Reading" },
  { href: "/resources", label: "Resources" },
]

export const SOCIALS: { href: string; label: string; icon: SvgComponent }[] = [
  { href: "https://github.com/aman333nolawz", label: "GitHub", icon: GitHub },
  {
    href: "https://twitter.com/NoLawz333",
    label: "Twitter",
    icon: Twitter,
  },
  { href: "mailto:nolawz46@gmail.com", label: "Email", icon: Email },
  { href: "/rss.xml", label: "RSS", icon: RSS },
]
