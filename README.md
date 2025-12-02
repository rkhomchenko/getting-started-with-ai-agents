# Getting Started with AI Agents

A comprehensive workshop repository demonstrating how to build AI agents from basic prompting to advanced autonomous systems. This project includes both practical code examples and presentation slides covering the theory and implementation of AI agents.

## 🎯 Overview

This workshop takes you from simple LLM interactions to building sophisticated AI agents capable of autonomous decision-making, tool use, and complex task execution. Learn by doing through three progressive examples and a complete slide deck.

## 📚 Project Structure

### 🧪 Practical Examples

#### [01-simple-prompting](./01-simple-prompting/)
**Basic LLM Interaction**

A foundational example showing how to build a simple chatbot using the Anthropic Claude API.

- ✅ Single-turn conversations
- ✅ CLI interface with colored output
- ✅ Environment variable configuration
- ✅ Fast responses with `claude-haiku-4-5`

**Quick Start:**
```bash
cd 01-simple-prompting
npm install
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env
npm start
```

#### [02-tools-and-schemas](./02-tools-and-schemas/)
**Tool Use & Schema Definitions**

An interactive file explorer bot demonstrating Claude's tool use capabilities with proper JSON Schema definitions.

- ✅ File system operations (list, read, create/update)
- ✅ Tool registration with schemas
- ✅ Multi-turn conversations
- ✅ Message history logging
- ✅ Agentic loop implementation

**Quick Start:**
```bash
cd 02-tools-and-schemas
npm install
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env
npm start
```

#### [03-agent-showcase](./03-agent-showcase/)
**Autonomous Agent with Docker Integration**

An advanced AI agent that creates complete web projects, manages Docker containers, and deploys applications autonomously.

- ✅ Multi-tech stack support (HTML, Node.js, React, Vue, Python, PHP)
- ✅ Docker containerization and management
- ✅ Complete project generation
- ✅ Multi-project isolation
- ✅ Autonomous planning and execution

**Quick Start:**
```bash
cd 03-agent-showcase
npm install
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env
# Ensure Docker is running
npm start
```

### 📊 Presentation

#### [slidev](./slidev/)
**Workshop Slides**

A comprehensive slide deck built with [Slidev](https://sli.dev/) covering AI agent theory and implementation.

**Topics Covered:**
- What are AI Agents?
- Agent Components (LLM, Memory, Tools)
- Intelligence vs Reasoning Models
- Memory Types (Short-term, Long-term, Semantic)
- Tool Implementation
- The Agentic Loop (Thought-Action-Observation)
- Practice Examples
- Key Takeaways

**Quick Start:**
```bash
cd slidev
npm install
npm start
# Visit http://localhost:3030
```

**Export to PDF:**
```bash
npm run export
```

## 🔗 Key Resources

### AI & LLMs
- [Anthropic](https://www.anthropic.com/) - Claude AI models
- [Anthropic Documentation](https://docs.anthropic.com/) - API documentation
- [Claude API Reference](https://docs.anthropic.com/en/api/messages) - Messages API
- [Tool Use Guide](https://docs.anthropic.com/en/docs/build-with-claude/tool-use) - Implementing tools
- [Prompt Engineering](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) - Best practices

### Development Tools
- [Slidev](https://sli.dev/) - Presentation slides for developers
- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Docker](https://www.docker.com/) - Containerization platform
- [Dockerode](https://github.com/apocas/dockerode) - Docker API for Node.js

### Learning Resources
- [Anthropic Cookbook](https://github.com/anthropics/anthropic-cookbook) - Code examples and guides
- [OpenRouter](https://openrouter.ai/) - Compare LLM models
- [OpenAI Model Comparison](https://platform.openai.com/docs/models/compare) - Model capabilities

## 🚀 Getting Started

### Prerequisites

- **Node.js** v20 or later
- **npm** or **yarn**
- **Docker** (for agent-showcase example)
- **Anthropic API Key** ([Get one here](https://console.anthropic.com/))

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd getting-started-with-ai-agents
   ```

2. **Set up each example:**
   ```bash
   # Example 1
   cd 01-simple-prompting
   npm install
   cp .env.example .env
   # Edit .env and add your API key

   # Example 2
   cd ../02-tools-and-schemas
   npm install
   cp .env.example .env
   # Edit .env and add your API key

   # Example 3
   cd ../03-agent-showcase
   npm install
   cp .env.example .env
   # Edit .env and add your API key
   ```

3. **Install slides:**
   ```bash
   cd ../slidev
   npm install
   ```

## 📖 Learning Path

### Beginner: Simple Prompting
Start with `01-simple-prompting` to understand:
- Basic LLM API integration
- Message structure
- System prompts
- Response handling

### Intermediate: Tools & Schemas
Move to `02-tools-and-schemas` to learn:
- Tool registration
- JSON Schema definitions
- Tool execution
- Multi-turn conversations
- Agentic loops

### Advanced: Autonomous Agents
Explore `03-agent-showcase` to master:
- Complex tool orchestration
- Docker integration
- Project generation
- Multi-step planning
- Error handling and recovery

### Theory: Presentation
Review the `slidev` slides to understand:
- AI agent architecture
- Component breakdown
- The Agentic Loop pattern
- Memory management
- Best practices

## 🎓 Workshop Flow

1. **Introduction** (Slides 1-4)
   - About the instructor
   - What you'll learn
   - Workshop agenda

2. **Theory Section** (Slides 5-10)
   - AI Agent vs AI Prompt
   - Agent components
   - LLM types and selection
   - Memory architecture
   - Tools implementation
   - The Agentic Loop

3. **Hands-on Practice** (Example Code)
   - Walk through `01-simple-prompting`
   - Explore `02-tools-and-schemas`
   - Demo `03-agent-showcase`

4. **Wrap-up** (Slides 11-14)
   - Key takeaways
   - Q&A
   - Thank you

## 🛠️ Technologies Used

- **[@anthropic-ai/sdk](https://www.npmjs.com/package/@anthropic-ai/sdk)** - Official Anthropic SDK
- **[dockerode](https://www.npmjs.com/package/dockerode)** - Docker API client
- **[@slidev/cli](https://www.npmjs.com/package/@slidev/cli)** - Slidev presentation framework
- **Node.js** - JavaScript runtime
- **ES Modules** - Modern JavaScript module system

## 📝 License

This project is intended for educational purposes. Please check individual dependencies for their licensing terms.

## 👤 Author

**Roman Khomchenko**
- Senior Software Engineer @ Techmagic
- Email: roman.khomchenko@techmagic.com
- LinkedIn: [linkedin.com/in/roman-khomchenko](https://www.linkedin.com/in/roman-khomchenko/)
- GitHub: [github.com/rkhomchenko](https://github.com/rkhomchenko)

## 🙏 Acknowledgments

- [Anthropic](https://www.anthropic.com/) for Claude AI
- [Slidev](https://sli.dev/) for the amazing presentation framework
- The AI community for continuous learning and inspiration

---

**Happy Learning! 🚀 Build intelligent agents that can reason, act, and learn!**
