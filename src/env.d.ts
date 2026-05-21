/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Window {
  posthog?: import('posthog-js').PostHog
  __posthog_initialized?: boolean
}
