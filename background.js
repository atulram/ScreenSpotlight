// Background script to handle extension installation and tab injection

chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install' || details.reason === 'update') {
    // Inject content script into all existing tabs
    await injectIntoExistingTabs();
  }
});

async function injectIntoExistingTabs() {
  try {
    // Get all tabs
    const tabs = await chrome.tabs.query({});
    
    for (const tab of tabs) {
      // Skip special pages (chrome://, chrome-extension://, etc.)
      if (tab.url.startsWith('chrome://') || 
          tab.url.startsWith('chrome-extension://') ||
          tab.url.startsWith('edge://') ||
          tab.url.startsWith('moz-extension://') ||
          tab.url === 'about:blank') {
        continue;
      }

      try {
        // Try to inject CSS first
        await chrome.scripting.insertCSS({
          target: { tabId: tab.id },
          files: ['overlay.css']
        });

        // Then inject JavaScript
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content.js']
        });

        console.log(`Successfully injected into tab: ${tab.url}`);
      } catch (error) {
        // Some tabs might not allow injection (e.g., chrome web store)
        console.log(`Could not inject into tab ${tab.url}:`, error.message);
      }
    }
  } catch (error) {
    console.error('Error injecting into existing tabs:', error);
  }
}

// Handle extension icon click - not needed for popup, but good to have
chrome.action.onClicked.addListener(async (tab) => {
  // This won't trigger if popup is set, but keeping for future use
  console.log('Extension icon clicked');
});
