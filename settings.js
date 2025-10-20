const DEFAULT_SETTINGS = {
    provider: "openai",
    openaiApiKey: "",
    openaiModel: "gpt-4o-mini",
    geminiApiKey: "",
    geminiModel: "gemini-1.5-flash",
    temperature: 0.7,
    maxTokens: 150,
    promptPrefix: "answer shortly A B C D: ",
    theme: "dark",
    customBg: "#2d2550",
    customText: "#ffd016",
};

const THEMES = {
    dark: {
        background: "rgb(30, 35, 54)",
        text: "rgb(255, 222, 77)",
        border: "#444",
    },
    light: {
        background: "#ffffff",
        text: "#333333",
        border: "#ccc",
    },
    blue: {
        background: "#1e3a5f",
        text: "#e0f2ff",
        border: "#2d5a8f",
    },
    green: {
        background: "#1a3a2e",
        text: "#d4f1d4",
        border: "#2d5a4a",
    },
    custom: {
        background: "#2d2550",
        text: "#ffd016",
        border: "#555",
    },
};

function applyTheme(themeName, customBg, customText) {
    let theme = THEMES[themeName] || THEMES.dark;

    if (themeName === "custom" && customBg && customText) {
        theme = {
            background: customBg,
            text: customText,
            border: "#555",
        };
    }

    document.body.style.backgroundColor = theme.background;
    document.body.style.color = theme.text;

    const inputs = document.querySelectorAll(
        "input:not([type='color']), textarea, select"
    );
    inputs.forEach((input) => {
        input.style.backgroundColor = theme.background;
        input.style.color = theme.text;
        input.style.borderColor = theme.border;
    });

    const saveBtn = document.getElementById("saveBtn");
    saveBtn.style.backgroundColor = theme.background;
    saveBtn.style.color = theme.text;
    saveBtn.style.borderColor = theme.text;

    const customColorsDiv = document.getElementById("customColors");
    if (themeName === "custom") {
        customColorsDiv.style.display = "block";
    } else {
        customColorsDiv.style.display = "none";
    }
}

function toggleProviderSettings(provider) {
    const openaiSettings = document.getElementById("openaiSettings");
    const geminiSettings = document.getElementById("geminiSettings");
    const geminiWarning = document.getElementById("geminiWarning");

    if (provider === "openai") {
        openaiSettings.style.display = "block";
        geminiSettings.style.display = "none";
        geminiWarning.style.display = "none";
    } else if (provider === "gemini") {
        openaiSettings.style.display = "none";
        geminiSettings.style.display = "block";
        geminiWarning.style.display = "block";
    }
}

async function loadSettings() {
    const settings = await chrome.storage.sync.get(DEFAULT_SETTINGS);

    document.getElementById("provider").value = settings.provider;
    if (settings.provider === "gemini") {
        const geminiWarning = document.getElementById("geminiWarning");
        geminiWarning.style.display = "block";
    }
    document.getElementById("openaiApiKey").value = settings.openaiApiKey;
    document.getElementById("openaiModel").value = settings.openaiModel;
    document.getElementById("geminiApiKey").value = settings.geminiApiKey;
    document.getElementById("geminiModel").value = settings.geminiModel;
    document.getElementById("temperature").value = settings.temperature;
    document.getElementById("maxTokens").value = settings.maxTokens;
    document.getElementById("promptPrefix").value = settings.promptPrefix;
    document.getElementById("theme").value = settings.theme;

    if (settings.customBg) {
        document.getElementById("customBg").value = settings.customBg;
    }
    if (settings.customText) {
        document.getElementById("customText").value = settings.customText;
    }

    toggleProviderSettings(settings.provider);
    applyTheme(settings.theme, settings.customBg, settings.customText);
}

document.getElementById("provider").addEventListener("change", (e) => {
    toggleProviderSettings(e.target.value);
});

document.getElementById("theme").addEventListener("change", (e) => {
    const customBg = document.getElementById("customBg").value;
    const customText = document.getElementById("customText").value;
    applyTheme(e.target.value, customBg, customText);
});

document.getElementById("customBg").addEventListener("input", (e) => {
    if (document.getElementById("theme").value === "custom") {
        const customText = document.getElementById("customText").value;
        applyTheme("custom", e.target.value, customText);
    }
});

document.getElementById("customText").addEventListener("input", (e) => {
    if (document.getElementById("theme").value === "custom") {
        const customBg = document.getElementById("customBg").value;
        applyTheme("custom", customBg, e.target.value);
    }
});

document
    .getElementById("settingsForm")
    .addEventListener("submit", async (e) => {
        e.preventDefault();

        const settings = {
            provider: document.getElementById("provider").value,
            openaiApiKey: document.getElementById("openaiApiKey").value.trim(),
            openaiModel: document.getElementById("openaiModel").value,
            geminiApiKey: document.getElementById("geminiApiKey").value.trim(),
            geminiModel: document.getElementById("geminiModel").value,
            temperature: parseFloat(
                document.getElementById("temperature").value
            ),
            maxTokens: parseInt(document.getElementById("maxTokens").value),
            promptPrefix: document.getElementById("promptPrefix").value,
            theme: document.getElementById("theme").value,
            customBg: document.getElementById("customBg").value,
            customText: document.getElementById("customText").value,
        };

        await chrome.storage.sync.set(settings);

        const status = document.getElementById("status");
        status.textContent = "Settings saved successfully!";
        status.className = "status success";

        setTimeout(() => {
            status.style.display = "none";
        }, 3000);
    });

loadSettings();
