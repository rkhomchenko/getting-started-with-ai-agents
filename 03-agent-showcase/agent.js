import {appendFile} from "fs/promises";
import Anthropic from "@anthropic-ai/sdk";
import {executeTool, tools} from "./tools/index.js";
import {storeMessages, logBlock} from './utils/log.js';
import {MODEL, SYSTEM_PROMPT} from "./utils/constants.js";
import {startThinkingLoader, stopThinkingLoader} from "./utils/loader.js";

const client = new Anthropic({apiKey: process.env.ANTHROPIC_API_KEY});

export class Agent {
    messages = [];

    addUserMessage(content) {
        this.messages.push({role: "user", content});
    }

    addAssistantMessage(content) {
        this.messages.push({role: "assistant", content});
    }

    async start(query) {
        this.addUserMessage(query);

        await this.agenticLoop();

        await storeMessages(this.messages);
    }

    async agenticLoop() {
        const loaderInterval = startThinkingLoader();

        const message = await client.messages.create({
            model: MODEL,
            max_tokens: 64_000,
            system: SYSTEM_PROMPT,
            messages: this.messages,
            tools: tools
        });

        stopThinkingLoader(loaderInterval);

        this.addAssistantMessage(message.content);

        for (const block of message.content) {
            console.log("═".repeat(50), block.type, "═".repeat(50));
            logBlock(block);

            if (block.type === "tool_use") {
                let result;
                let is_error;

                try {
                    result = await executeTool(
                        block.name,
                        block.input
                    );

                    logBlock({type: "tool_result", name: block.name, result});
                } catch (error) {
                    is_error = true;
                    result = `Tool '${block.name}' failed with error: ${error.message}. Please analyze the error and try a different approach or fix the input parameters.`;

                    logBlock({type: "tool_error", name: block.name, error: error.message});
                }

                this.addUserMessage([
                    {
                        type: "tool_result",
                        tool_use_id: block.id,
                        content: result,
                        is_error
                    },
                ]);
            }
        }

        if (message.stop_reason === "tool_use") {
            await this.agenticLoop();
        }
    }
}