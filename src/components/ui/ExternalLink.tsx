import type { AnchorHTMLAttributes, ReactNode } from 'react'

const EXTERNAL_REL = 'noopener noreferrer'

type ExternalLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'rel' | 'target'
> & {
  href: string
  children: ReactNode
}

/** External anchor with consistent security attributes. */
export function ExternalLink({ href, children, ...props }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel={EXTERNAL_REL} {...props}>
      {children}
    </a>
  )
}
