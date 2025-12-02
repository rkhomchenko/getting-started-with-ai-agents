import {writeFile} from "fs/promises";

export async function storeMessages(messages) {
    if (messages.length === 0) return;

    const content = messages.map(msg => `${msg.role}: ${JSON.stringify(msg.content, null, 2)}`).join('\n\n') + '\n';

    return await writeFile('messages.log', content);
}

export function logBlock(block) {
    switch (block.type) {
        case "text":
            console.log(`${block.text}\n`);
            break;

        case "tool_use":
            console.log(
                `🔧 \x1b[36m${block.name}\x1b[0m\n${JSON.stringify(block.input, null, 2)}\n`
            );
            break;

        case "tool_result":
            console.log(`✓ \x1b[32m${block.name}\x1b[0m\n${JSON.stringify(block.result, null, 2)}\n`);
            break;

        case "tool_error":
            console.log(`✗ \x1b[31m${block.name} Error:\x1b[0m\n${block.error}\n`);
            break;
    }
}