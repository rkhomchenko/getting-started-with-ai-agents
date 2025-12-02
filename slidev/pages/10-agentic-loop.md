---
layout: default
---

# The Agentic Loop

<div class="grid grid-cols-2 gap-8 h-full">

<div class="flex items-center justify-center">
<Excalidraw
  drawFilePath="/diagrams/thought-action-observation.json"
  class="w-[500px]"
  :darkMode="false"
  :background="false"
/>
</div>

<div class="flex flex-col justify-center">

<div v-click class="mb-2">

### 💭 Thought
<div class="text-md text-gray-600">
The LLM analyzes the task and decides what action to take next
</div>
<div class="text-sm text-gray-500 mt-2 italic">
"I need to check the weather API for New York"
</div>

</div>

<div v-click class="mb-2">

### ⚡ Action
<div class="text-md text-gray-600">
The agent calls a tool with the necessary parameters
</div>
<div class="text-sm text-gray-500 mt-2 italic">
<code>get_weather(location: "New York")</code>
</div>

</div>

<div v-click class="mb-2">

### 👁️ Observation
<div class="text-md text-gray-600">
The agent receives feedback from the tool execution
</div>
<div class="text-sm text-gray-500 mt-2 italic">
"Partly cloudy, 15°C, 60% humidity"
</div>

</div>

<div v-click class="mt-2 p-2 bg-blue-50 rounded-lg text-center">
<div class="text-md font-semibold text-blue-900">
This cycle repeats until the objective is fulfilled
</div>
</div>

</div>

</div>

<!--

The Agentic Loop or Thought-Action-Observation Cycle is what unifies all the components we've discussed so far. This is the main cycle that underlies the operation of AI agents. This cycle consists of three main stages:

CLICK.

Thought
At the thought stage, the LLM receives the input task or request and analyzes it. This is where the reasoning mechanism is needed so the agent can "think" about what needs to be done to complete the task - what data needs to be searched for, what tools to use, what steps to execute. The agent makes a decision and plans the next action.
For example, if a user asks: "What's the weather in New York right now?", the agent might think: "The user needs current weather information. I have access to a weather tool through an API. I need to call get_weather with the location parameter."

CLICK.

Action

At the action stage, the agent executes the planned action by calling the appropriate tool or function with the required parameters. This could be an API call, a database query, reading a file, etc. It's important to understand that at this stage, the agent doesn't just generate a text response but actually "does" something in the external world.

For example, the agent can call the get_weather function with the location parameter to get current weather information for New York.

CLICK.

Observation

At the observation stage, the agent receives feedback from the executed action. This could be the result of calling the tool, data that was received, or any other information that helps the agent understand what happened after executing the action.
This information is added to the LLM's context, and the agent can use it for further analysis and decision-making.
For example, after calling get_weather, the agent receives the response: "Cloudy, 15°C, 60% humidity". This information becomes new context for the LLM, and the agent can update its thinking based on the received data. Or if the tool returns an error, the agent can decide to try a different approach or repeat the action.

CLICK.

All of this happens iteratively - the agent can go through this cycle multiple times until it achieves the set goal. Each cycle allows the agent to add new information and adjust its approach in real time.
-->
