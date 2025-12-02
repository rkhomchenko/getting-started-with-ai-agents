---
layout: default
---

# Memory - The Agent's Context

<div class="grid grid-cols-3 gap-12 mt-16">

<div v-click>

## 💾 Short-term

<div class="text-md mt-6 mb-8 text-gray-600">
Current conversation context
</div>

- Multi-turn chats
- Task progress tracking
- Session state

</div>

<div v-click>

## 🗄️ Long-term

<div class="text-md mt-6 mb-8 text-gray-600">
Persistent across sessions
</div>

- User preferences
- Past interactions
- Learning patterns

</div>

<div v-click>

## 📚 Semantic

<div class="text-md mt-6 mb-8 text-gray-600">
Structured knowledge base
</div>

- Company docs/policies
- Product catalogs
- Domain knowledge

</div>

</div>

<!--
We can have different types of memory for AI agents, and each performs its unique role.

CLICK.

Short-term memory allows the agent to store information about the current conversation or session. This is similar to working memory in humans, where the agent can recall previous messages or context to maintain coherence in dialogue. For example, if you're discussing code debugging, the agent can remember which files you edited or what errors occurred earlier in this session.

CLICK.

Long-term memory allows the agent to store information between sessions. This is more like how after some meeting we have notes stored on google drive. We can always return to them later. Similarly, the agent can remember your preferences, past interactions, or learned patterns to provide more personalized responses in the future.

CLICK.

Semantic memory is also called a knowledge base. Such memory allows the agent to access a structured knowledge base, such as company documents, confluence, handbooks, etc. This enables the agent to provide accurate answers to questions requiring specific information that can be found in these sources. We can also think of the System prompt as part of semantic memory, since it provides the agent with context about its role and constraints.

Let's move on to the next slide.
-->
