# UniS Hotkey Answer

A Chrome extension that uses OpenAI's API to quickly get answers for selected text using a keyboard shortcut.

## Features

-   🔥 Quick answers via keyboard shortcut (Alt+Shift+A)
-   🤖 Multiple AI providers (OpenAI & Google Gemini)
-   ⚙️ Configurable settings (API key, model, temperature, etc.)
-   🎨 Customizable themes (Dark, Light, Blue, Green, Custom)
-   🎯 Works on any webpage
-   💾 Settings saved in Chrome sync storage

## Installation

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the extension folder

## Setup

1. Click the extension icon or use the keyboard shortcut
2. Click the ⚙️ settings button
3. Choose your AI provider:
    - **OpenAI**: Get API key from [platform.openai.com](https://platform.openai.com)
    - **Google Gemini**: Get API key from [aistudio.google.com](https://aistudio.google.com)
4. Configure other settings as needed:
    - **Model**: Choose your preferred model
    - **Temperature**: Control response creativity (0-2)
    - **Max Tokens**: Limit response length
    - **Prompt Prefix**: Text added before your selection
    - **Theme**: Choose or customize your color scheme

## Usage

1. Select any text on a webpage
2. Press `Alt+Shift+A` (or click the extension icon)
3. Get your answer instantly in the popup

## Configuration

You can customize the keyboard shortcut:

1. Go to `chrome://extensions/shortcuts`
2. Find "UniS Hotkey Answer"
3. Set your preferred shortcut

## Privacy

-   Your API keys are stored locally in Chrome's sync storage
-   No data is sent anywhere except directly to your chosen AI provider's API
-   The extension only accesses the currently selected text

## Supported AI Providers

### OpenAI

-   GPT-4o (Recommended)
-   GPT-4o Mini (Faster & Cheaper)
-   GPT-4 Turbo
-   GPT-4
-   GPT-3.5 Turbo

### Google Gemini

-   Gemini 1.5 Flash (Recommended)
-   Gemini 1.5 Pro
-   Gemini Pro

## Requirements

-   Chrome browser
-   API key from your chosen provider (OpenAI or Google Gemini)

## License

MIT
