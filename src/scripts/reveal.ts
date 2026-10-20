export function setupReveals() {
  document.documentElement.setAttribute("data-reveal-active", "")

  const targets = document.querySelectorAll<HTMLElement>("[data-reveal]")

  if (!targets.length) return

  if (!("IntersectionObserver" in window)) {
    for (const target of targets) target.setAttribute("data-revealed", "")
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.setAttribute("data-revealed", "")
        observer.unobserve(entry.target)
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  )

  for (const target of targets) observer.observe(target)
}
