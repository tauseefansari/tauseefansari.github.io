/** `requestIdleCallback` with a timeout fallback for Safari and older browsers. */
export function scheduleIdleTask(task: () => void, timeoutMs = 2000): () => void {
  if (typeof requestIdleCallback === 'function') {
    const id = requestIdleCallback(task, { timeout: timeoutMs })
    return () => cancelIdleCallback(id)
  }

  const id = window.setTimeout(task, 1)
  return () => clearTimeout(id)
}
