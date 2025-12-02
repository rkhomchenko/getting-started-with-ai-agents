import client from "./utils/client.js";
import question from "./utils/question.js";
import {SYSTEM_PROMPT, MODEL} from "./utils/constants.js";

async function sendMessage(query) {
    const message = {role: "user", content: [{type: "text", text: query}]};

    return await client.messages.create({
        model: MODEL,
        system: SYSTEM_PROMPT,
        messages: [message],
        max_tokens: 1024,
    });
}

async function main() {
    console.log("🤖 AI Chat Bot");
    console.log("═".repeat(50));

    console.log('Try to ask the AI anything, for example:\n');
    console.log("• Tell me about claude code");
    console.log("• Read package.json file and summarize its content.");
    console.log("• What's the weather in New York?\n");

    console.log("Type 'exit' to quit\n");

    while (true) {
        const query = await question("\n\x1b[1m\x1b[34mUser:\x1b[0m\n");

        if (!query || query.toLowerCase() === "exit") {
            console.log("\n👋 Goodbye!");
            process.exit(0);
        }

        console.log("\n\x1b[1m\x1b[32mAI:\x1b[0m\n");

        const result = await sendMessage(query);

        for (const block of result.content) {
            if (block.type === "text") {
                console.log(block.text);
            }
        }
    }

    console.log();
}

main().catch(console.error);
