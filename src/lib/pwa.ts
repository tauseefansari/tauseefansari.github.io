import { registerSW } from 'virtual:pwa-register'
import { env } from 'src/config/env'
import { scheduleIdleTask } from 'src/lib/idleCallback'

/** Register the service worker in production builds only — deferred off the critical path. */
export function registerPwa(): void {
  if (!env.isProduction) return

  const register = (): void => {
    registerSW({
      immediate: true,
      onRegisteredSW(_url, registration) {
        if (registration) {
          registration.update().catch(() => undefined)
        }
      },
    })
  }

  const schedule = (): void => {
    scheduleIdleTask(register, 6000)
  }

  if (document.readyState === 'complete') {
    schedule()
    return
  }

  window.addEventListener('load', schedule, { once: true })
}
