import Browser from 'webextension-polyfill'

export async function getActiveTab() {
  if (!Browser.tabs) {
    throw new Error('Browser.tabs is not available')
  }

  const tab = (await Browser.tabs.query({ active: true, currentWindow: true }))[0]

  if (!tab) {
    throw new Error('No active tab found')
  }
  
  return tab
}