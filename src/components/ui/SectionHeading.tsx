import { motion } from 'framer-motion'
import { fadeUp } from 'src/config/motion'

interface SectionHeadingProps {
  id: string
  title: string
  subtitle?: string
  className?: string
  subtitleClassName?: string
}

/** Standard chapter heading — shared type rhythm and animation (DRY). */
export function SectionHeading({
  id,
  title,
  subtitle,
  className = '',
  subtitleClassName = '',
}: SectionHeadingProps) {
  return (
    <header className="mb-8 sm:mb-10">
      <motion.h2
        variants={fadeUp}
        id={id}
        className={`text-3xl font-semibold sm:text-4xl ${className}`}
      >
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p
          variants={fadeUp}
          className={`mt-3 max-w-prose text-text-muted ${subtitleClassName}`}
        >
          {subtitle}
        </motion.p>
      ) : null}
    </header>
  )
}
