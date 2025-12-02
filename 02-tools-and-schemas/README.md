# AI File Explorer Bot

An interactive AI chatbot that demonstrates Claude's tool use capabilities with proper schema definitions. This project showcases how to build an agent that can manage files through a conversational interface, understanding natural language requests and executing appropriate file system operations.

## Description

This application creates an interactive chatbot that accepts natural language queries, communicates with Claude AI, automatically determines which tools to use based on user intent, executes file system operations, and maintains conversation history. The bot implements a full agentic loop where Claude can call tools, process results, and make additional tool calls as needed.

## Features

- **Tool Registration & Schema Definitions** - Tools are properly exported with JSON Schema definitions that Claude understands
- **Agentic Loop** - Full conversational loop where Claude can make multiple tool calls and process results
- **Conversation History** - Maintains all messages in an in-memory store to preserve context across exchanges
- **Message Logging** - Automatically logs all conversation messages to a `messages.log` file
- **Interactive CLI** - Users interact via command-line prompts with colored formatting
- **Error Handling** - Properly handles unknown tools and provides error feedback
- **Multi-turn Conversations** - Supports complex workflows requiring multiple tool calls

## Tools

### list_files
Lists all files in the current working directory.

**Parameters:** None

**Example Use:** "What files are in this directory?"

### read_file
Reads the complete content of a specified file.

**Parameters:**
- `file_name` (string, required) - The name of the file to read

**Example Use:** "Show me the contents of package.json"

### upsert_file
Creates a new file or updates an existing file with new content.

**Parameters:**
- `file_name` (string, required) - The name of the file to create or update
- `content` (string, required) - The complete content of the file

**Example Use:** "Create a new file called hello.txt with the content 'Hello World'"

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

**Development mode (watches for changes and auto-restarts):**
```bash
npm run dev
```

## Example Prompts

1. **List files**: "What files are in this directory?"
2. **Read files**: "Show me the contents of package.json"
3. **Create files**: "Create a new file called hello.txt with the content 'Hello World'"
4. **Update files**: "Update the README file with instructions on how to use this tool"
5. **Complex workflows**: "Read the package.json file, tell me what dependencies it has, then create a summary.md file with that information"

## Project Structure

```
02-tools-and-schemas/
├── index.js              # Main application entry point - conversation loop
├── package.json          # Project metadata and dependencies
├── jsconfig.json         # JavaScript compiler configuration
├── package-lock.json     # Locked dependency versions
├── messages.log          # Conversation history (generated at runtime)
│
├── tools/                # Tool implementations and registration
│   ├── index.js          # Tool export and execution routing
│   ├── list_files.js     # Lists directory contents
│   ├── read_file.js      # Reads file content
│   └── upsert_file.js    # Creates/updates files
│
└── utils/                # Utility functions and configuration
    ├── client.js         # Anthropic SDK client initialization
    ├── constants.js      # System prompt and model configuration
    ├── log.js            # Message history persistence
    └── question.js       # CLI input prompt helper
```

## Application Flow

1. **User Input** - User is prompted for input in the CLI
2. **Send Message** - Message is sent to Claude API with available tools
3. **Message Processing** - Claude analyzes the request and decides which tools to use
4. **Tool Execution** - If tools are needed, they are executed and results collected
5. **Follow-up** - If stop_reason is "tool_use", results are sent back to Claude for processing
6. **Logging** - All conversation messages are saved to `messages.log`
7. **Loop** - Process continues recursively for multi-turn conversations

## Technical Details

### Dependencies
- **@anthropic-ai/sdk** (^0.32.1) - Official Anthropic SDK for Node.js

### Configuration
- **Model**: `claude-haiku-4-5` (fast and cost-effective)
- **System Prompt**: "You are a helpful AI assistant with access to file system tools. You can help users manage files and directories in their current project."
- **Max Tokens**: 1024 tokens per response

### Key Code Sections

#### Tool Execution Routing (tools/index.js)
```javascript
export async function executeTool(name, params) {
    switch (name) {
        case list_files.name:
            return await list_files();
        case read_file.name:
            return await read_file(params);
        case upsert_file.name:
            return await upsert_file(params);
        default:
            throw new Error(`Unknown tool: ${name}`);
    }
}
```

#### Main Message Handling (index.js)
```javascript
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
```

## Schema Definitions

Each tool includes a JSON Schema definition that describes its parameters:

```javascript
tool_name.description = "Description of what the tool does";
tool_name.input_schema = {
    type: "object",
    properties: {
        param_name: {
            type: "string",
            description: "Description of the parameter"
        }
    },
    required: ["param_name"]
};
```

This allows Claude to understand how to use each tool correctly and generate appropriate tool calls based on user requests.

## Notes

- The agent operates on files in the current working directory
- All conversation history is maintained in memory during the session
- Messages are logged to `messages.log` for debugging and review
- The system supports multi-step workflows where Claude can chain multiple tool calls together
- Tool results are automatically formatted and sent back to Claude for processing
