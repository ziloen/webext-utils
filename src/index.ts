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
  options: { signal?: AbortSignal } = {}
): () => void {
  const signal = options.signal

  if (signal?.aborted) {
    return () => { }
  }

  target.addListener(callback)

  const removeListener = () => target.removeListener(callback)

  if (signal) {
    signal.addEventListener('abort', removeListener, { once: true })
    return () => {
      removeListener()
      signal.removeEventListener('abort', removeListener)
    }
  }

  return removeListener
}