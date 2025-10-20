// Base provider interface
class LLMProvider {
    constructor(settings) {
        this.settings = settings;
    }

    async getAnswer(prompt) {
        throw new Error("getAnswer() must be implemented");
    }

    validateSettings() {
        throw new Error("validateSettings() must be implemented");
    }
}

// OpenAI Provider
class OpenAIProvider extends LLMProvider {
    async getAnswer(prompt) {
        const url = "https://api.openai.com/v1/chat/completions";

        if (!this.settings.openaiApiKey) {
            return "Please set your OpenAI API key in settings";
        }

        console.log("=== OpenAI API Call ===");
        console.log("Model:", this.settings.openaiModel);
        console.log("Prompt:", this.settings.promptPrefix + prompt);

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + this.settings.openaiApiKey,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: this.settings.openaiModel,
                    messages: [
                        {
                            role: "user",
                            content: this.settings.promptPrefix + prompt,
                        },
                    ],
                    temperature: this.settings.temperature,
                    max_tokens: this.settings.maxTokens,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("API Error:", errorData);
                return `OpenAI Error: ${errorData.error.message}`;
            }

            const data = await response.json();
            console.log("Response:", data);

            if (data?.choices?.[0]?.message?.content) {
                return data.choices[0].message.content;
            }
            return "Unexpected response format";
        } catch (error) {
            console.error("Fetch Error:", error);
            return "Connection error. Check your internet.";
        }
    }

    validateSettings() {
        return !!this.settings.openaiApiKey;
    }
}
// Gemini Provider
class GeminiProvider extends LLMProvider {
    async getAnswer(prompt) {
        return "not implemented for now";
    }

    validateSettings() {
        return false;
    }
}

// Factory function
function getProvider(settings) {
    switch (settings.provider) {
        case "openai":
            return new OpenAIProvider(settings);
        case "gemini":
            return new GeminiProvider(settings);
        default:
            return new OpenAIProvider(settings);
    }
}
