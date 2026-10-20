/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Window {
  posthog?: {
    capture: (event: string, properties?: Record<string, unknown>) => void
    init: (token: string, config?: Record<string, unknown>) => void
  }
  __posthog_initialized?: boolean
}
