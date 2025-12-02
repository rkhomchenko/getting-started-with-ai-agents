---
layout: center
class: text-center
---

# AI Prompt vs AI Agent

<div class="grid grid-cols-2 gap-20 mt-4">

<div class="flex flex-col items-center">

<h2 class="text-2xl mb-4">AI Prompt</h2>

<div class="flex items-center justify-center flex-1">
<Excalidraw
  drawFilePath="/diagrams/simple-llm-flow.json"
  class="w-[500px]"
  :darkMode="false"
  :background="false"
/>
</div>

</div>

<div class="flex flex-col items-center">

<h2 class="text-2xl mb-4">AI Agent</h2>

<div class="flex items-center justify-center flex-1">
<Excalidraw
  drawFilePath="/diagrams/agentic-loop.json"
  class="w-[500px]"
  :darkMode="false"
  :background="false"
/>
</div>

</div>

</div>

<div class="absolute bottom-8 left-0 right-0">

<div class="text-4xl font-bold">
  AI Agent = <span class="text-orange-400">Autonomy</span> + <span class="text-blue-400">Perception</span> + <span class="text-green-400">Actions</span>
</div>

</div>

<!--
So, what is an AI Agent? And what is the difference from LLM prompts?

On the left, we see the classic interaction with LLM through a prompt. The user sends a request, the LLM generates a response, and that's where it ends. Here the LLM doesn't make any decisions or perform any actions.

On the right, we see an AI agent. Here the LLM is at the center, but it interacts with various components: Reasoning, memory, tools, and decision-making. The agent can analyze information, store context, use tools to perform actions, and make decisions based on the data received.

The main characteristics of AI agents are:
1. Autonomy - they can independently decide how best to solve a given task.
2. Goal-orientation - they have clear context and tasks they can execute.
3. Action execution - they can not only generate text but also perform real actions through integrations with tools.
4. Memory - they can store context and information about previous interactions to improve their responses.
5. Planning - they can break down complex tasks into subtasks and execute them sequentially.

Let's move forward and examine each of these components in more detail.
-->
