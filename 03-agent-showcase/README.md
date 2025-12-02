# AI Website Generator Agent

An advanced AI-powered agent that leverages Claude's extended tool use capabilities to create and manage complete web projects. This project demonstrates how to build autonomous agents that can analyze requirements, generate code, manage Docker containers, and deploy web applications.

## Description

The Website Generator Agent is a sophisticated AI assistant that understands user requirements, selects appropriate tech stacks, creates isolated workspaces, generates complete code, builds Docker containers, and manages deployments. Multiple projects can run simultaneously on different ports, each isolated in its own workspace and Docker container.

## Features

- **Autonomous Planning** - Agent analyzes requirements and plans project implementation
- **Multi-Tech Stack Support** - Supports HTML, Node.js, React, Vue, Angular, Python, and PHP
- **Docker Integration** - Automatic containerization using dockerode library
- **File Generation** - Creates complete, production-ready code
- **Responsive Design** - Generated websites are mobile-friendly
- **Error Handling** - Tool failures are caught and reported back to Claude
- **Conversation Logging** - All messages saved to `messages.log` for debugging
- **Interactive CLI** - User-friendly command-line interface with colorized output
- **Port Management** - Multiple projects can run on different ports simultaneously
- **Agentic Loop** - Agent autonomously decides next steps based on Claude's responses

## Tools

### create_workspace
Creates a dedicated directory for a project.

**Parameters:**
- `project_name` (string, required) - Name of the project (e.g., 'portfolio', 'blog', 'landing-page')

**Returns:** Workspace path

### create_container
Creates and starts Docker containers with appropriate images based on tech stack.

**Parameters:**
- `project_name` (string, required) - Name of the project
- `tech_stack` (string, required) - One of: html, static, node, react, vue, angular, python, php
- `port` (number, required) - Host port to expose (e.g., 8888, 3000)

**Tech Stack to Docker Image Mapping:**
- html/static → nginx:alpine
- node/react/vue/angular → node:20-alpine
- python → python:3.12-alpine
- php → php:8.2-apache

### upsert_file
Creates or updates files in a project's workspace.

**Parameters:**
- `project_name` (string, required) - Name of the project
- `file_path` (string, required) - Path relative to project root (e.g., 'index.html', 'css/style.css')
- `content` (string, required) - Complete file content

**Features:**
- Creates nested directories automatically
- Overwrites existing files (upsert = update or insert)

### run_command
Executes shell commands inside a project's Docker container.

**Parameters:**
- `project_name` (string, required) - Name of the project
- `command` (string, required) - Shell command to execute

**Use Cases:**
- Testing if the application is running correctly
- Installing dependencies
- Running build commands
- Verifying file existence

### stop_container
Stops and removes a Docker container.

**Parameters:**
- `project_name` (string, required) - Name of the project

**Actions:**
- Stops the running container
- Removes the container (cleans up resources)

## Setup

### Prerequisites
- Node.js (v20 or later recommended)
- Docker (Docker daemon must be running)
- Anthropic API key

### Installation

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

3. **Ensure Docker is running:**
   ```bash
   docker ps
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

### Static Websites
- "create a tic tac toe html game"
- "Create a portfolio website with sections for about, projects, and contact"
- "Build a landing page for a SaaS product"

### JavaScript Applications
- "Build a weather app using HTML, CSS, and JavaScript"
- "Create an interactive calculator with modern design"

### Node.js/Express APIs
- "Now lets run some express.js server that has some CRUD operations for todo list. Mock the data."
- "Create a Node.js API for a blog with posts and comments"

### Frontend Frameworks
- "Build a React todo application with local storage"
- "Create a Vue.js dashboard with charts"

### Python Applications
- "Create a Flask web app for expense tracking"
- "Build a Python data dashboard"

### Management
- Type "exit" to stop the agent
- Agent can manage multiple projects simultaneously
- Each project is isolated and independent

## Project Structure

```
03-agent-showcase/
├── agent.js                    # Core agentic loop
├── index.js                    # Entry point / CLI
├── constants.js                # System prompt constant
├── package.json               # Dependencies
├── .env.example              # Environment template
├── .gitignore                # Git ignore rules
├── jsconfig.json             # JS config
├── messages.log              # Conversation history (runtime)
│
├── tools/                    # Tool implementations
│   ├── index.js             # Tool registry & executor
│   ├── create_workspace.js  # Create project directory
│   ├── create_container.js  # Setup Docker container
│   ├── upsert_file.js       # Create/update files
│   ├── run_command.js       # Execute container commands
│   └── stop_container.js    # Stop/remove container
│
├── utils/                   # Utility modules
│   ├── constants.js         # System prompt & config
│   ├── client.js           # Anthropic SDK client
│   ├── log.js              # Logging & message formatting
│   ├── loader.js           # Thinking animation
│   └── question.js         # CLI prompt utility
│
└── workspaces/             # Generated projects (runtime)
    ├── tic-tac-toe/        # Example: Tic Tac Toe game
    │   └── index.html
    └── todo-api/           # Example: Express.js API
        ├── package.json
        ├── server.js
        └── API_DOCUMENTATION.md
```

## Agent Execution Flow

1. **User provides a prompt** (e.g., "create a tic tac toe html game")
2. **Agent loops and calls Claude** with tools available
3. **Claude analyzes request** and decides which tools to use
4. **Agent executes tools** and returns results to Claude
5. **Claude processes results** and decides next steps (create more files, run commands, etc.)
6. **Process continues** until Claude stops requesting tool use
7. **Conversation is saved** to `messages.log`

## Example Projects

### Tic-Tac-Toe Game
- **Port**: 8888
- **Tech Stack**: HTML (nginx:alpine)
- **Features**: Two-player gameplay, win detection, score tracking, responsive design
- **Access**: http://localhost:8888

### Todo API
- **Port**: 3000
- **Tech Stack**: Node.js (node:20-alpine)
- **Features**: Full CRUD API with Express, mock data, filtering, sorting
- **Endpoints**: GET/POST/PUT/DELETE for todos, statistics, health check
- **Access**: http://localhost:3000

## Technical Details

### Dependencies
- **@anthropic-ai/sdk** (^0.32.1) - Claude API client
- **dockerode** (^4.0.2) - Docker API client

### Configuration
- **Model**: `claude-haiku-4-5-20251001`
- **System Prompt**: Comprehensive instructions for analyzing requirements, selecting tech stacks, and creating projects
- **Max Tokens**: 8000 tokens per response

### Agentic Loop Implementation

The `Agent` class implements a recursive loop:

```javascript
async agenticLoop() {
    // Call Claude API with tools
    const message = await client.messages.create({
        model: MODEL,
        max_tokens: 8000,
        system: SYSTEM_PROMPT,
        messages: this.messages,
        tools: tools
    });

    // Process tool calls
    for (const block of message.content) {
        if (block.type === "tool_use") {
            let result = await executeTool(block.name, block.input);
            this.addUserMessage([{
                type: "tool_result",
                tool_use_id: block.id,
                content: result,
                is_error: false
            }]);
        }
    }

    // Continue if more tools needed
    if (message.stop_reason === "tool_use") {
        await this.agenticLoop();  // Recursive call
    }
}
```

### Docker Container Configuration

Containers are configured with:
- Automatic image pulling with progress display
- Volume binding from workspace to container
- Port mapping (host:container)
- Auto-restart policy (unless-stopped)
- Special handling for Node.js: `npm install && npm start`
- Special handling for Python: installs requirements and starts HTTP server

## System Prompt Guidance

The agent operates under a comprehensive system prompt that guides it through:

1. **Request Analysis** - Understand user requirements, identify tech stack, determine features
2. **Project Setup** - Create workspace and Docker container with appropriate image
3. **Application Creation** - Use upsert_file to create all necessary files
4. **File Organization** - Maintain logical directory structure
5. **Testing & Access** - Verify the application is running on the correct port
6. **Multi-Project Management** - Each project isolated in own workspace/container

## Notes

- Each project gets its own isolated workspace in the `workspaces/` directory
- Docker images are automatically pulled on first use
- User must have Docker permissions to run containers
- All conversation history is logged to `messages.log`
- Projects continue running until containers are stopped
- Multiple projects can run simultaneously on different ports
- The agent writes clean, well-structured, production-ready code
- Generated websites are responsive and mobile-friendly
