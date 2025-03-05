chrome.storage.sync.get(['disable_auto_save'], (result) => {
  const disableAutoSave = result.disable_auto_save;
  updateDeclarativeNetRequestRule(disableAutoSave);
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key === 'disable_auto_save') {
      const codeAutoSave = newValue;
      updateDeclarativeNetRequestRule(codeAutoSave);
    }
  }
});

function updateDeclarativeNetRequestRule(disableAutoSave: boolean) {
  const ruleId = 'block_tools_request_rule';

  if (disableAutoSave === true) {
    chrome.declarativeNetRequest.updateEnabledRulesets({
      enableRulesetIds: [ruleId],
    });
  } else {
    chrome.declarativeNetRequest.updateEnabledRulesets({
      disableRulesetIds: [ruleId],
    });
  }
}