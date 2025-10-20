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
            // Check if it's a model that uses max_completion_tokens
            // This includes: o1/o3/o4 series, gpt-5 series, gpt-4.1 series
            const usesCompletionTokens = /^(o1|o3|o4|gpt-5|gpt-4\.1)/.test(
                this.settings.openaiModel
            );

            // Build request body
            const requestBody = {
                model: this.settings.openaiModel,
                messages: [
                    {
                        role: "user",
                        content: this.settings.promptPrefix + prompt,
                    },
                ],
            };

            // New models use max_completion_tokens, older models use max_tokens
            if (usesCompletionTokens) {
                requestBody.max_completion_tokens = this.settings.maxTokens;
                // Only add temperature for non-reasoning models
                if (!/^(o1|o3|o4)/.test(this.settings.openaiModel)) {
                    requestBody.temperature = this.settings.temperature;
                }
            } else {
                requestBody.temperature = this.settings.temperature;
                requestBody.max_tokens = this.settings.maxTokens;
            }

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + this.settings.openaiApiKey,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("API Error:", errorData);
                return `OpenAI Error: ${
                    errorData?.error?.message || "Unknown error"
                }`;
            }

            const data = await response.json();
            console.log("Full Response:", JSON.stringify(data, null, 2));

            // Check if we have a response
            if (data?.choices?.[0]) {
                const choice = data.choices[0];
                const content = choice.message?.content || choice.text || "";

                // Check if content is empty due to token limit
                if (!content && choice.finish_reason === "length") {
                    return "⚠️ Response was cut off due to token limit. Please increase 'Max Tokens' in settings (recommended: 500-1000 for reasoning models).";
                }

                // Check for other finish reasons
                if (!content && choice.finish_reason) {
                    return `⚠️ No response generated. Reason: ${choice.finish_reason}. Try increasing Max Tokens in settings.`;
                }

                // Return content if we have it
                if (content) {
                    return content;
                }

                // Unexpected case
                console.error(
                    "Unexpected response structure:",
                    JSON.stringify(choice, null, 2)
                );
                return `Unexpected response format.\n\nReceived: ${JSON.stringify(
                    choice,
                    null,
                    2
                )}`;
            }

            console.error(
                "No choices in response:",
                JSON.stringify(data, null, 2)
            );
            return `No response from API.\n\nFull response: ${JSON.stringify(
                data,
                null,
                2
            )}`;
        } catch (error) {
            console.error("Fetch Error:", error);
            return "Connection error. Check your internet.";
        }
    }

    validateSettings() {
        return !!this.settings.openaiApiKey;
    }
}
// Gemini Provider (DEPRECATED - Not supported)
class GeminiProvider extends LLMProvider {
    async getAnswer(prompt) {
        return "⚠️ DEPRECATED: Gemini provider is not currently supported. Please switch to OpenAI in settings.";
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
