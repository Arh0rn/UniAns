# UniS Hotkey Answer

A Chrome extension that uses OpenAI's API to quickly get answers for selected text using a keyboard shortcut.

## Features

-   🔥 Quick answers via keyboard shortcut (Alt+Shift+A)
-   🤖 OpenAI integration with frontier models
-   💰 Built-in pricing table for all models
-   ⚙️ Configurable settings (API key, model, temperature, etc.)
-   🎨 Customizable themes (Dark, Light, Blue, Green, Custom)
-   🎯 Works on any webpage
-   💾 Settings saved in Chrome sync storage

## Installation

1. Clone or download this repository
2. Open Chrome and go to [chrome://extensions/shortcuts](chrome://extensions/shortcuts)
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the extension folder

## Setup

1. Click the extension icon or use the keyboard shortcut
2. Click the ⚙️ settings button
3. Choose your AI provider:
    - **OpenAI**: Get API key from [platform.openai.com](https://platform.openai.com)
4. Configure other settings as needed:
    - **Model**: Choose your preferred model
    - **Temperature**: Control response creativity (0-2)
    - **Max Tokens**: Limit response length
    - **Prompt Prefix**: Text added before your selection
    - **Theme**: Choose or customize your color scheme

## Usage

1. Select any text on a webpage
2. Press `Alt+Shift+X` (or click the extension icon)
3. Select the text on any page and wait for the answer in popup.

## Configuration

### You can customize the keyboard shortcut:

1. Go to [chrome://extensions/shortcuts](chrome://extensions/shortcuts)
2. Find "UniS Hotkey Answer"
3. Set your preferred shortcut

## Privacy

-   Your API keys are stored locally in Chrome's sync storage
-   No data is sent anywhere except directly to your chosen AI provider's API
-   The extension only accesses the currently selected text

## Supported AI Providers

### OpenAI (Active)

The extension supports OpenAI's frontier models (recommended for most tasks):

-   **gpt-5**: Best model for coding and agentic tasks across domains
-   **gpt-5-mini**: Faster, cost-efficient version of GPT-5 for well-defined tasks
-   **gpt-5-nano**: Fastest, most cost-efficient version of GPT-5
-   **gpt-5-pro**: Version of GPT-5 that produces smarter and more precise responses
-   **gpt-4.1**: Smartest non-reasoning model

You can also use the "Custom Model" option to manually enter any OpenAI model name (e.g., gpt-4o, o1-pro, etc.).

View detailed pricing for all models in the settings page.

### Google Gemini (DEPRECATED)

⚠️ **Note**: The Gemini provider is currently deprecated and not supported. Please use OpenAI.

## Requirements

-   Chrome browser
-   OpenAI API key from [platform.openai.com](https://platform.openai.com)

## License

MIT
