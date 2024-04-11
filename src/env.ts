import Browser from 'webextension-polyfill'

/**
 * 
 */
export function isBackgroundPage() {
  // Chromium
  if (!('serviceWorker' in navigator) && !Browser.extension.getViews) {
    return true
  }

  // Firefox
  try {
    const currentUrl = new URL(window.location.href)
    // @ts-expect-error background is not in all manifest type
    const scripts = Browser.runtime.getManifest().background.scripts as string[]
    return scripts.some((script: string) => {
      const url = new URL(Browser.runtime.getURL(script))
      return currentUrl.pathname === url.pathname && currentUrl.origin === url.origin
    })
  } catch {
    return false
  }
}

/**
 * 
 */
async function isSidebarPage() {
  return false
}


function isPopupPage() {

}