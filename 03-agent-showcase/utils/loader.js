export function startThinkingLoader() {
    let dots = '';
    const maxDots = 3;

    process.stdout.write('Thinking');

    return setInterval(() => {
        // Clear the current line and move cursor to beginning
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);

        // Add dots in cycle
        dots = dots.length >= maxDots ? '' : dots + '.';
        process.stdout.write(`Thinking${dots}`);
    }, 500);
}

export function stopThinkingLoader(interval) {
    clearInterval(interval);
    // Clear the thinking line completely
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
}