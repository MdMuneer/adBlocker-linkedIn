chrome.webNavigation.onCompleted.addListener(
  function (details) {
    // Check if the loaded page is from LinkedIn
    if (isLinkedIn(details.url)) {
      // Execute content script to block ads
      chrome.scripting.executeScript({
        target: { tabId: details.tabId },
        files: ["linkedinAdBlocker.js"],
      });
    }
  },
  {
    // Specify the filter to listen only for main frames
    url: [{ urlMatches: ".*linkedin.com.*" }],
    types: ["main_frame"],
  }
);

function isLinkedIn(url) {
  return url.includes("linkedin.com");
}
