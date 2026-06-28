import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { GlassPanel } from 'src/components/ui/GlassPanel'
import { SECTION_ICON_LIST } from 'src/config/sectionIcons'
import { EASE_OUT, DURATION } from 'src/config/motion'
import { useStore } from 'src/store/useStore'
import { SITE } from 'src/config/site'
import { usePrefersReducedMotion } from 'src/hooks/useMediaQuery'

const RING_SIZE = 112
const STROKE = 4
const RADIUS = (RING_SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function loaderStatusKey(
  progress: number,
  sceneReady: boolean,
): 'preparing' | 'scene' | 'almost' | 'ready' {
  if (progress >= 100) return 'ready'
  if (sceneReady) return 'almost'
  if (progress >= 40) return 'scene'
  return 'preparing'
}

/** Branded preloader — brief splash; dismisses quickly so hero can become LCP. */
export function Loader({ onComplete }: { onComplete?: () => void }) {
  const { t } = useTranslation('common')
  const sceneReady = useStore((s) => s.sceneReady)
  const reducedMotion = usePrefersReducedMotion()
  const [progress, setProgress] = useState(() => (reducedMotion ? 100 : 0))
  const [done, setDone] = useState(false)

  const loaderDurationMs = reducedMotion ? 0 : 450

  useEffect(() => {
    if (done || loaderDurationMs === 0) return

    const start = performance.now()
    const id = window.setInterval(() => {
      const elapsed = performance.now() - start
      if (elapsed >= loaderDurationMs) {
        setProgress(100)
        return
      }
      const target = (elapsed / loaderDurationMs) * 100
      setProgress((p) => Math.max(p, target))
    }, 16)

    return () => clearInterval(id)
  }, [done, loaderDurationMs])

  useEffect(() => {
    if (progress < 100) return undefined
    const id = setTimeout(() => setDone(true), reducedMotion ? 0 : 80)
    return () => clearTimeout(id)
  }, [progress, reducedMotion])

  useEffect(() => {
    if (!done) return
    onComplete?.()
  }, [done, onComplete])

  const statusKey = loaderStatusKey(progress, sceneReady)
  const activeIcon = Math.min(
    SECTION_ICON_LIST.length - 1,
    Math.floor((progress / 100) * SECTION_ICON_LIST.length),
  )
  const dashOffset = CIRCUMFERENCE * (1 - progress / 100)
  const statusText = t(`loader.status.${statusKey}`)
  const percentLabel = t('loader.progress', { percent: Math.floor(progress) })

  const iconTransition = useMemo(
    () => (reducedMotion ? { duration: 0.2 } : { duration: DURATION, ease: EASE_OUT }),
    [reducedMotion],
  )

  const exitTransition = reducedMotion
    ? { duration: 0.2 }
    : { duration: 0.55, ease: EASE_OUT }

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg px-5"
          exit={{ opacity: 0 }}
          transition={exitTransition}
          role="status"
          aria-live="polite"
          aria-busy="true"
          aria-label={t('a11y.loading')}
        >
          <div
            className="pointer-events-none absolute inset-0 before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_70%_55%_at_50%_38%,var(--color-glow),transparent)]"
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reducedMotion ? { duration: 0.15 } : { duration: 0.45, ease: EASE_OUT }
            }
            className="relative w-full max-w-sm"
          >
            <GlassPanel className="text-center">
              <div className="mx-auto flex flex-col items-center">
                <div className="relative" style={{ width: RING_SIZE, height: RING_SIZE }}>
                  <svg
                    width={RING_SIZE}
                    height={RING_SIZE}
                    viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
                    className="-rotate-90"
                    aria-hidden="true"
                  >
                    <circle
                      cx={RING_SIZE / 2}
                      cy={RING_SIZE / 2}
                      r={RADIUS}
                      fill="none"
                      stroke="var(--color-surface)"
                      strokeWidth={STROKE}
                    />
                    <motion.circle
                      cx={RING_SIZE / 2}
                      cy={RING_SIZE / 2}
                      r={RADIUS}
                      fill="none"
                      stroke="var(--color-accent)"
                      strokeWidth={STROKE}
                      strokeLinecap="round"
                      strokeDasharray={CIRCUMFERENCE}
                      animate={{ strokeDashoffset: dashOffset }}
                      transition={{
                        ease: 'easeOut',
                        duration: reducedMotion ? 0 : DURATION,
                      }}
                    />
                  </svg>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      key={activeIcon}
                      initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={iconTransition}
                      className="flex h-12 w-12 items-center justify-center rounded-glass border border-glass-border bg-surface text-accent"
                    >
                      {(() => {
                        const Icon = SECTION_ICON_LIST[activeIcon]!.Icon
                        return <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                      })()}
                    </motion.div>
                  </div>
                </div>

                <ul
                  className="mt-6 flex items-center justify-center gap-2"
                  aria-hidden="true"
                >
                  {SECTION_ICON_LIST.map(({ Icon }, index) => {
                    const active = index === activeIcon
                    return (
                      <li key={index}>
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-lg border transition-colors duration-200 ${
                            active
                              ? 'border-glass-border bg-accent/10 text-accent'
                              : 'border-transparent bg-surface text-text-muted'
                          }`}
                        >
                          <Icon size={14} strokeWidth={active ? 2 : 1.75} />
                        </span>
                      </li>
                    )
                  })}
                </ul>

                <div className="mt-6 w-full">
                  <div
                    className="h-1.5 overflow-hidden rounded-full border border-glass-border bg-surface"
                    role="progressbar"
                    aria-valuenow={Math.floor(progress)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={percentLabel}
                  >
                    <motion.div
                      className="h-full rounded-full bg-cta"
                      animate={{ width: `${progress}%` }}
                      transition={{
                        ease: 'easeOut',
                        duration: reducedMotion ? 0 : DURATION,
                      }}
                    />
                  </div>
                  <p className="mt-2 font-mono text-xs tracking-wide text-text">
                    {percentLabel}
                  </p>
                </div>

                <p className="mt-5 text-sm text-text">{statusText}</p>
                <p className="mt-1 font-display text-xl font-semibold tracking-tight text-text">
                  {SITE.name}
                </p>
              </div>
            </GlassPanel>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
