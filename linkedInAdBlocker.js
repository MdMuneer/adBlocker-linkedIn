function removeAds() {
  let spans = document.querySelectorAll("span");

  spans.forEach((span) => {
    if (span.innerText === "Promoted" || span.innerText === "Suggested") {
      // We first use the closest method to find the nearest ancestor with the class feed-shared-update-v2. If it's not found (or if the class name changes in future updates), we then attempt to get the 6th parent element, assuming it's the equivalent container for the ad.

      // Find the closest ancestor element with the class "feed-shared-update-v2"
      let card = span.closest(".feed-shared-update-v2");

      // If not found, attempt to find the parent div up to 6 levels
      if (card === null) {
        let parentNode = span.parentNode;
        for (let i = 0; i < 6 && parentNode !== null; i++) {
          if (parentNode.classList.contains("feed-shared-update-v2")) {
            card = parentNode;
            break;
          }
          parentNode = parentNode.parentNode;
        }
      }

      // If the ad container is found, hide it
      if (card) {
        card.style.display = "none";
      }
    }
  });
}

// Initially remove ads
removeAds();

// Function to remove ads when the user scrolls for the first time
function removeAdsOnScroll() {
  removeAds();

  // Remove the scroll event listener after the initial scroll
  window.removeEventListener("scroll", removeAdsOnScroll);
}

// Attach an event listener to the scroll event
window.addEventListener("scroll", removeAdsOnScroll);
