const DEFAULT_SETTINGS = {
    provider: "openai",
    openaiApiKey: "",
    openaiModel: "gpt-4o-mini",
    geminiApiKey: "",
    geminiModel: "gemini-1.5-flash",
    temperature: 0.7,
    maxTokens: 150,
    promptPrefix: "answer shortly: ",
    theme: "dark",
    customBg: "#2d2550",
    customText: "#ffd016",
};

const THEMES = {
    dark: {
        background: "rgb(30, 35, 54)",
        text: "rgb(255, 222, 77)",
    },
    light: {
        background: "#ffffff",
        text: "#333333",
    },
    blue: {
        background: "#1e3a5f",
        text: "#e0f2ff",
    },
    green: {
        background: "#1a3a2e",
        text: "#d4f1d4",
    },
    custom: {
        background: "#2d2550",
        text: "#ffd016",
    },
};

async function getSettings() {
    return await chrome.storage.sync.get(DEFAULT_SETTINGS);
}

async function getSelectedText() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) return null;

    let result;
    try {
        [{ result }] = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => getSelection().toString(),
        });
    } catch (e) {
        return null;
    }
    return result;
}

document.getElementById("settingsBtn").addEventListener("click", () => {
    chrome.runtime.openOptionsPage();
});

async function main() {
    console.log("=== Extension Started ===");
    const answerDiv = document.getElementById("answer");
    const settings = await getSettings();
    console.log("Settings:", settings);

    let theme = THEMES[settings.theme] || THEMES.dark;
    if (
        settings.theme === "custom" &&
        settings.customBg &&
        settings.customText
    ) {
        theme = {
            background: settings.customBg,
            text: settings.customText,
        };
    }
    document.body.style.backgroundColor = theme.background;
    document.body.style.color = theme.text;

    const selectedText = await getSelectedText();
    console.log("Selected text:", selectedText);

    if (selectedText && selectedText.trim() !== "") {
        answerDiv.textContent = "...";

        const provider = getProvider(settings);
        const answer = await provider.getAnswer(selectedText);

        answerDiv.textContent = answer;
    } else {
        answerDiv.textContent = "Text not selected";
    }
}

main();
