window.onload = () => {
  for (let i of document.getElementsByClassName("setting")) {
    const name = i.id;
    chrome.storage.sync.get(name, (result) => {
      if (result[name] !== undefined) {
        if ((i as HTMLInputElement).type === "checkbox") {
          (i as HTMLInputElement).checked = result[name];
        } else {
          (i as HTMLInputElement).value = result[name];
        }
      }
    });
  }
};

chrome.storage.onChanged.addListener((changes, namespace) => {
  function needReload(key: string) {
    const keys = ["massage_to_message", "enable_better_table", "enable_space_newline_display"];
    for (let i of keys) {
      if (i === key) {
        return true;
      }
    }
    return false;
  };

  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (needReload(key)) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (tab.id === undefined) {
          return;
        }

        function executeScript() {
          window.location.reload();
        }

        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: executeScript,
        });
      });
    }
  }
});

// function setting
for (let i of document.getElementsByClassName("setting")) {
  i.addEventListener("change", () => {
    const name = i.id;
    const value =
      (i as HTMLInputElement).type === "checkbox"
        ? (i as HTMLInputElement).checked
        : (i as HTMLInputElement).value;
    console.log(`setting ${name} to ${value}`);
    chrome.storage.sync.set({ [name]: value });
  });
}
