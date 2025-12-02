# Simple Prompting Chatbot

A foundational example demonstrating how to build a simple interactive AI chatbot using the Anthropic Claude API. This project serves as an educational starting point for developers learning to integrate Claude into Node.js applications.

## Description

This project implements a single-turn conversational AI bot that accepts user input from the command line, sends the message to Claude API, and displays the AI's response. The interaction is straightforward and linear - one user prompt leads to one AI response, then the program terminates.

## Features

- **CLI Interface** - Interactive command-line prompts with colored formatting (blue for user, green for AI)
- **Anthropic SDK Integration** - Uses official `@anthropic-ai/sdk` to communicate with Claude
- **System Prompt Configuration** - Customizable system instruction to define AI behavior
- **Fast Model** - Uses `claude-haiku-4-5` for fast, cost-effective responses
- **Environment Management** - Loads API key from `.env` file using Node's `--env-file` flag
- **Error Handling** - Basic error catching with `.catch(console.error)`
- **Modern JavaScript** - Uses ES6 modules, async/await, and arrow functions

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Anthropic API key:
   ```
   ANTHROPIC_API_KEY=your_actual_api_key_here
   ```

## Run

**Production mode:**
```bash
npm start
```

**Development mode (auto-restarts on file changes):**
```bash
npm run dev
```

## Example Prompts

```
User: What is machine learning?
AI: [Explains ML concepts and applications...]

User: Help me write a Python function to reverse a string
AI: [Provides code solution and explanation...]

User: What are the benefits of TypeScript?
AI: [Discusses TypeScript advantages...]

User: exit
→ Program terminates with "👋 Goodbye!" message
```

## Project Structure

```
01-simple-prompting/
├── index.js              # Main entry point - chatbot logic
├── package.json          # Project metadata and dependencies
├── jsconfig.json         # JavaScript compiler options
├── .env                  # Environment variables (gitignored)
├── .env.example          # Template showing required env vars
├── .gitignore            # Git ignore rules
├── package-lock.json     # Locked dependency versions
└── utils/
    ├── client.js         # Anthropic SDK client initialization
    ├── constants.js      # System prompt and model selection
    └── question.js       # Readline wrapper for user input
```

## Technical Details

### Dependencies
- **@anthropic-ai/sdk** (^0.32.1) - Official Anthropic SDK for Node.js

### Configuration
- **Model**: `claude-haiku-4-5` (fastest, most cost-effective Claude model)
- **System Prompt**: Generic helpful assistant
- **Max Tokens**: 1024 tokens per response
- **Node.js**: ES modules enabled with `"type": "module"`

### Key Components

#### index.js
Main application logic that handles the chat loop, sends messages to Claude, and displays responses.

#### utils/client.js
Centralizes API client creation, reading the API key from environment variables.

#### utils/constants.js
Configuration file containing the system prompt and model selection.

#### utils/question.js
Provides a promise-based wrapper around Node's readline module for cleaner async/await syntax.

## Limitations

- **Single-turn only** - Each run is a fresh conversation (no conversation history)
- **No error recovery** - Exits on API errors rather than retrying
- **Generic system prompt** - Not specialized for any specific use case
- **Fixed max_tokens** - Hard-coded to 1024 tokens
- **No input validation** - Doesn't validate query format or length
- **CLI-only** - No web interface or API server

These limitations are intentional to keep the example simple and educational, focusing on core concepts rather than production-grade robustness.
