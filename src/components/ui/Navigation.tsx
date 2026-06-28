import { useTranslation } from 'react-i18next'
import { NAV_ITEMS } from 'src/config/navigation'
import { useStore } from 'src/store/useStore'
import { SECTIONS } from 'src/config/scenes'

interface NavigationProps {
  orientation?: 'horizontal' | 'vertical'
  onNavigate?: () => void
}

export function Navigation({ orientation = 'horizontal', onNavigate }: NavigationProps) {
  const { t } = useTranslation('common')
  const section = useStore((s) => s.section)
  const isVertical = orientation === 'vertical'

  return (
    <nav aria-label={t('nav.home')} className={isVertical ? '' : 'min-w-0 max-w-full'}>
      <ul
        className={
          isVertical
            ? 'flex flex-col gap-2 text-lg'
            : 'flex max-w-full flex-nowrap items-center gap-0.5 overflow-x-auto text-xs xl:gap-1 xl:text-sm'
        }
      >
        {NAV_ITEMS.map(({ section: id, key, Icon }) => {
          const active = SECTIONS[section] === id
          return (
            <li key={id} className="shrink-0">
              <a
                href={`#${id}`}
                onClick={onNavigate}
                title={t(key)}
                aria-current={active ? 'page' : undefined}
                className={`flex cursor-pointer items-center gap-1 rounded-md px-1.5 py-1 transition-colors duration-200 xl:gap-1.5 xl:rounded-lg xl:px-2 xl:py-1.5 ${
                  active
                    ? 'bg-accent/10 text-accent'
                    : 'text-text-muted hover:bg-surface/60 hover:text-text'
                } ${isVertical ? 'gap-3 px-3 py-2.5' : ''}`}
              >
                <Icon
                  size={isVertical ? 20 : 15}
                  strokeWidth={active ? 2.25 : 1.85}
                  aria-hidden="true"
                  className="shrink-0"
                />
                {isVertical ? (
                  <span>{t(key)}</span>
                ) : (
                  <span className="hidden xl:inline">{t(key)}</span>
                )}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
