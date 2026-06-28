import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Loader2, Send } from 'lucide-react'
import { FormStatus } from 'src/config/enums'
import { SITE } from 'src/config/site'
import { env } from 'src/config/env'

interface FieldErrors {
  name?: string
  email?: string
  message?: string
}

interface FormValues {
  name: string
  email: string
  message: string
}

interface FormState {
  status: FormStatus
  errors: FieldErrors
  /** Echoed back so validation failures don't blank the inputs after the
   * action resolves (React 19 auto-resets uncontrolled fields). */
  values: FormValues
  /** Bumped on every submit so AnimatePresence re-keys the live region. */
  submitId: number
}

const EMPTY_VALUES: FormValues = { name: '', email: '', message: '' }
const INITIAL_STATE: FormState = {
  status: FormStatus.Idle,
  errors: {},
  values: EMPTY_VALUES,
  submitId: 0,
}

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Submit button driven by React 19's `useFormStatus`. Reads the parent
 * `<form>`'s pending state without prop drilling.
 */
function SubmitButton() {
  const { t } = useTranslation('portfolio')
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="group mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 font-medium text-white transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? (
        <>
          <Loader2 size={18} aria-hidden="true" className="animate-spin" />
          {t('contact.form.submitting')}
        </>
      ) : (
        <>
          {t('contact.form.submit')}
          <Send
            size={16}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          />
        </>
      )}
    </button>
  )
}

/**
 * Accessible, animated contact form. Submits to Web3Forms using a public
 * access key from the env (your real email stays private on their side). If no
 * key is configured the form validates and shows a friendly error instead of
 * failing silently.
 *
 * Uses React 19's Actions API: `<form action={formAction}>` + `useActionState`
 * gives us automatic pending state (via `useFormStatus`), progressive
 * enhancement, and state transitions without manual `useState` orchestration.
 */
export function ContactForm() {
  const { t } = useTranslation('portfolio')
  const accessKey = env.web3formsKey

  // React 19 Action: receives previous state + FormData, returns next state.
  // React wraps the call in a transition and `useFormStatus().pending` is true
  // for any descendant submit button until this resolves.
  const submitContact = async (prev: FormState, data: FormData): Promise<FormState> => {
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    const values: FormValues = { name, email, message }

    const errors: FieldErrors = {}
    if (!name) errors.name = t('contact.form.validation.nameRequired')
    if (!email) errors.email = t('contact.form.validation.emailRequired')
    else if (!EMAIL_RE.test(email))
      errors.email = t('contact.form.validation.emailInvalid')
    if (!message) errors.message = t('contact.form.validation.messageRequired')

    if (Object.keys(errors).length > 0) {
      return { status: FormStatus.Idle, errors, values, submitId: prev.submitId + 1 }
    }

    if (!accessKey) {
      return {
        status: FormStatus.Error,
        errors: {},
        values,
        submitId: prev.submitId + 1,
      }
    }

    data.append('access_key', accessKey)
    data.append('subject', `Portfolio contact — ${SITE.name}`)

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        body: data,
      })
      return {
        status: res.ok ? FormStatus.Success : FormStatus.Error,
        errors: {},
        // Clear values on success so the empty form is a clean slate.
        values: res.ok ? EMPTY_VALUES : values,
        submitId: prev.submitId + 1,
      }
    } catch {
      return {
        status: FormStatus.Error,
        errors: {},
        values,
        submitId: prev.submitId + 1,
      }
    }
  }

  const [state, formAction] = useActionState(submitContact, INITIAL_STATE)
  const { status, errors, values } = state

  const fieldClass =
    'mt-1 w-full rounded-lg border border-glass-border bg-surface px-4 py-3 text-text outline-none transition-colors focus:border-accent'

  return (
    <form action={formAction} noValidate className="mt-8 w-full text-start">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="text-sm text-text-muted">
            {t('contact.form.name')}
          </label>
          <input
            id="cf-name"
            key={`name-${state.submitId}`}
            name="name"
            type="text"
            autoComplete="name"
            defaultValue={values.name}
            placeholder={t('contact.form.namePlaceholder')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'cf-name-err' : undefined}
            className={fieldClass}
          />
          {errors.name && (
            <p id="cf-name-err" className="mt-1 text-xs text-red-400">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="cf-email" className="text-sm text-text-muted">
            {t('contact.form.email')}
          </label>
          <input
            id="cf-email"
            key={`email-${state.submitId}`}
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={values.email}
            placeholder={t('contact.form.emailPlaceholder')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'cf-email-err' : undefined}
            className={fieldClass}
          />
          {errors.email && (
            <p id="cf-email-err" className="mt-1 text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="cf-message" className="text-sm text-text-muted">
          {t('contact.form.message')}
        </label>
        <textarea
          id="cf-message"
          key={`message-${state.submitId}`}
          name="message"
          rows={4}
          defaultValue={values.message}
          placeholder={t('contact.form.messagePlaceholder')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'cf-message-err' : undefined}
          className={`${fieldClass} resize-none`}
        />
        {errors.message && (
          <p id="cf-message-err" className="mt-1 text-xs text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      <SubmitButton />

      {/* Live status feedback for screen readers + visual users. */}
      <div aria-live="polite" className="mt-4 min-h-6">
        <AnimatePresence mode="wait">
          {status === FormStatus.Success && (
            <motion.p
              key={`ok-${state.submitId}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-emerald-400"
            >
              {t('contact.form.success')}
            </motion.p>
          )}
          {status === FormStatus.Error && (
            <motion.p
              key={`err-${state.submitId}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-red-400"
            >
              {t('contact.form.error')}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}
