chrome.browserAction.onClicked.addListener(buttonClicked);

// causes content script to begin running
function buttonClicked(tab) {
	chrome.tabs.sendMessage(tab.id, "clicked");
}



