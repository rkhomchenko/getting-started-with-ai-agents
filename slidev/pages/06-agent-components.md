---
layout: two-cols
---

# AI Agent Components

<div class="flex items-center justify-center h-full">
<Excalidraw
  drawFilePath="/diagrams/agentic-loop.json"
  class="w-[600px]"
  :darkMode="false"
  :background="false"
/>
</div>

::right::

<div class="pl-8 flex flex-col justify-center h-full">

<div v-click class="my-6">

### 🧠 LLM (Brain)
<div class="text-lg text-gray-600">
The reasoning engine that makes decisions and plans actions
</div>

</div>

<div v-click class="my-6">

### 💾 Memory (Context)
<div class="text-lg text-gray-600">
Stores conversation history and maintains state across interactions
</div>

</div>

<div v-click class="my-6">

### 🛠️ Tools (Actions)
<div class="text-lg text-gray-600">
Tools are like hands - functions that allow the agent to interact with the world
</div>

</div>

</div>

<!--
So, this is the diagram of the main AI agent components from the previous slide.

CLICK.

Let's start with the central component - LLM and Reasoning.
Reasoning LLM is the brain of the agent that makes all decisions and plans actions. It analyzes input data, determines what to do next, and develops multi-step solutions.

CLICK.

The next component is Memory and Context.
It stores conversation history and maintains state between interactions.

CLICK.

The last component is Tools and Actions.
Tools are like the agent's hands, functions that allow it to interact with the world. During the demo, we will see examples of how tools work.

This was a quick overview of the main AI agent components. In the following slides, we will examine each of them in more detail.
-->
