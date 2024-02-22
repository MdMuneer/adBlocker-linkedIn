// Event listener for web navigation
console.log({chrome})
chrome.webNavigation.onCompleted.addListener(function(details) {
    console.log({details})
    // Check if the loaded page is from LinkedIn
    if (isLinkedIn(details.url)) {
        // Execute content script to block ads
        chrome.tabs.executeScript(details.tabId, { file: "linkedin.js" });
    }
}, { 
    // Specify the filter to listen only for main frames
    url: [{ urlMatches: '.*' }],
    types: ['main_frame']
});

// Function to check if a given URL is from LinkedIn
function isLinkedIn(url) {
    return url.includes("linkedin.com");
}
