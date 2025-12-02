import {Agent} from "./agent.js";
import {WORKSPACE_FOLDER} from "./utils/constants.js";
import {mkdir, rmdir} from "fs/promises";
import * as readline from "readline";

function prompt(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

async function main() {
    await mkdir(WORKSPACE_FOLDER, {recursive: true});

    const agent = new Agent();

    console.log("🤖 Website Generator Agent");
    console.log("═".repeat(50));
    console.log("Type 'exit' to quit\n");

    while (true) {
        const query = await prompt("\x1b[1m\x1b[34mUser:\x1b[0m ");

        if (!query || query.toLowerCase() === "exit") {
            console.log("\n👋 Goodbye!");
            process.exit(0);
        }

        console.log("\n\x1b[1m\x1b[32mAgent:\x1b[0m\n");

        await agent.start(query);

        console.log();
    }
}

main().catch(console.error);