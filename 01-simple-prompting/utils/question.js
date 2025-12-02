import readline from "readline";

export default function question(title) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(title, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}