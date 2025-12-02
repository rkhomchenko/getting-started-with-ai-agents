import {tools, executeTool} from "./tools/index.js";
import client from "./utils/client.js";
import question from "./utils/question.js";
import {storeMessages, logBlock} from "./utils/log.js";
import {SYSTEM_PROMPT, MODEL} from "./utils/constants.js";

const inMemoryStore = [];

async function sendMessage(query) {
    if (query) {
        const message = {role: "user", content: [{type: "text", text: query}]};

        inMemoryStore.push(message);
    }

    return await client.messages.create({
        model: MODEL,
        system: SYSTEM_PROMPT,
        messages: inMemoryStore,
        tools: tools,
        max_tokens: 1024,
    });
}

async function main() {
    console.log("🤖 AI File Explorer Bot");
    console.log("═".repeat(50));

    console.log('Try to ask the AI anything, for example:\n');
    console.log("• Tell me about claude code");
    console.log("• List files in the current directory");
    console.log("• Read package.json file and summarize its content.");

    console.log("Type 'exit' to quit\n");

    while (true) {
        const query = await question("\n\x1b[1m\x1b[34mUser:\x1b[0m\n");

        if (!query || query.toLowerCase() === "exit") {
            console.log("\n👋 Goodbye!");
            process.exit(0);
        }

        console.log("\n\x1b[1m\x1b[32mAI:\x1b[0m\n");

        const message = await sendMessage(query);

        inMemoryStore.push({role: "assistant", content: message.content});

        for (const block of message.content) {
            console.log("═".repeat(50), block.type, "═".repeat(50));
            logBlock(block);

            if (block.type == "tool_use") {
                const result = await executeTool(
                    block.name,
                    block.input
                );

                logBlock({type: "tool_result", name: block.name, result});

                inMemoryStore.push({
                    role: "user",
                    content: [
                        {
                            type: "tool_result",
                            tool_use_id: block.id,
                            content: result
                        },
                    ],
                });
            }
        }

        if (message.stop_reason === "tool_use") {
            const toolsOutputMessage = await sendMessage();

            inMemoryStore.push({role: "assistant", content: toolsOutputMessage.content});

            for (const block of toolsOutputMessage.content) {
                console.log("═".repeat(50), block.type, "═".repeat(50));
                logBlock(block);
            }
        }
    }

    await storeMessages(inMemoryStore);

    console.log();
}

main().catch(console.error);
