import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { NAV_LINKS } from '@/consts'
import { Menu, X } from 'lucide-react'

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const closeMenu = () => setIsOpen(false)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu()
    }
    const handleResize = () => {
      if (window.matchMedia('(min-width: 640px)').matches) closeMenu()
    }

    document.addEventListener('astro:before-swap', closeMenu)
    document.addEventListener('astro:page-load', closeMenu)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)

    return () => {
      document.removeEventListener('astro:before-swap', closeMenu)
      document.removeEventListener('astro:page-load', closeMenu)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="size-8 sm:hidden"
        title="Menu"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        onClick={() => setIsOpen((value) => !value)}
      >
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        <span className="sr-only">Toggle menu</span>
      </Button>

      <div
        id="mobile-nav-panel"
        className={`bg-background/95 fixed top-[3.25rem] right-0 left-0 z-50 border-y backdrop-blur-sm sm:hidden ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <nav className="mx-auto max-w-3xl px-4 py-3" aria-label="Mobile">
          <ul className="flex list-none flex-col gap-y-1">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="hover:bg-muted/50 text-muted-foreground hover:text-foreground flex items-center rounded-md px-2 py-2 text-sm font-medium capitalize transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 top-[3.25rem] z-40 cursor-default bg-transparent sm:hidden"
          aria-label="Close menu"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default MobileMenu
