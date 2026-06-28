import { useCallback, useState } from 'react'
import Cookies from 'js-cookie'
import { env } from 'src/config/env'

/**
 * A single, reusable cookie-backed state hook (DRY).
 *
 * Both the theme and any future preferences persist through this one place,
 * so cookie security flags live in exactly one spot. The cookie is Secure +
 * SameSite=Lax in production. It is NOT httpOnly because client-side code
 * must read it; httpOnly is only meaningful for server-set secrets.
 */
export function useCookieState<T extends string>(
  name: string,
  defaultValue: T,
  options: { expires?: number } = {},
): readonly [T, (value: T) => void] {
  const [value, setValue] = useState<T>(
    () => (Cookies.get(name) as T | undefined) ?? defaultValue,
  )

  const set = useCallback(
    (next: T) => {
      setValue(next)
      Cookies.set(name, next, {
        path: '/',
        sameSite: 'lax',
        secure: env.isProduction,
        expires: options.expires ?? 365,
      })
    },
    [name, options.expires],
  )

  return [value, set] as const
}
