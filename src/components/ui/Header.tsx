import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import { SectionId } from 'src/config/enums'
import { SITE } from 'src/config/site'
import { Navigation } from 'src/components/ui/Navigation'
import { ScrollProgressBar } from 'src/components/ui/ScrollProgressBar'
import { ThemeToggle } from 'src/components/ui/ThemeToggle'

export function Header() {
  const { t } = useTranslation('common')
  const [open, setOpen] = useState(false)

  return (
    <header className="pointer-events-none fixed inset-x-4 top-4 z-30 sm:inset-x-6 lg:inset-x-8">
      <div className="glass pointer-events-auto flex flex-col gap-2.5 px-4 py-3 sm:gap-3 sm:px-6 sm:py-3.5">
        <div className="flex min-h-9 items-center justify-between gap-3">
          <a
            href={`#${SectionId.Hero}`}
            className="shrink-0 font-display text-base font-semibold tracking-tight sm:text-lg"
          >
            {SITE.name}
          </a>
          <div className="hidden min-w-0 flex-1 items-center justify-end gap-3 lg:flex xl:gap-5">
            <Navigation />
            <ThemeToggle />
          </div>
          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t('a11y.openMenu')}
              className="cursor-pointer rounded-lg p-2 text-text-muted transition-colors duration-200 hover:text-text"
            >
              <Menu size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
        <ScrollProgressBar />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-auto fixed inset-0 z-40 flex flex-col bg-bg/95 p-6 backdrop-blur lg:hidden"
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t('a11y.closeMenu')}
                className="cursor-pointer rounded-lg p-2 text-text-muted"
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>
            <Navigation orientation="vertical" onNavigate={() => setOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
