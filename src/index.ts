export { isBackgroundPage } from "./env"
export { getActiveTab } from "./tabs"

import type { Events } from "webextension-polyfill"

/**
 * Listen to extension events.
 * 
 * @example
 * ```ts
 * const abortController = new AbortController()
 * const signal = abortController.signal
 * 
 * listenEvent(browser.runtime.onMessage, (message) => {
 *   // handle message
 * }, { signal })
 * ```
 */
export function listenEvent<Callback extends (...args: any[]) => any>(
  target: Events.Event<Callback>,
  callback: NoInfer<Callback>,
  options?: { signal?: AbortSignal }
): () => void {
  target.addListener(callback)

  const removeListener = () => target.removeListener(callback)
  const signal = options?.signal

  if (signal) {
    signal.addEventListener('abort', removeListener, { once: true })
  }

  return () => {
    removeListener()
    if (signal) {
      signal.removeEventListener('abort', removeListener)
    }
  }
}