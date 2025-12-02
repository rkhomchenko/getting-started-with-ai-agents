---
layout: default
---

# Tools - The Agent's Actions

<div class="grid grid-cols-2 gap-8">

<div v-click>

**What are tools?**
- Functions the LLM can invoke
- Extend capabilities beyond text

**Why tools?**
- Access external data
- Perform computations
- Interact with systems

**Examples:**
- 🌐 API calls
- 💿 Database queries
- 🔍 Web searches

</div>

<div v-click>

```javascript {fontSize:'11px'}
import {readFile} from "fs/promises";
import {join} from "path";

// Tool implementation
export default async function read_file({file_name}) {
    const fullPath = join(process.cwd(), file_name);
    const content = await readFile(fullPath, "utf-8");
    return content;
}

// Tool definition for the LLM
read_file.description = 
  "Read and return the content of a file.";
read_file.input_schema = {
    type: "object",
    properties: {
        file_name: {
            type: "string",
            description: "The name of the file to read",
        },
    },
    required: ["file_name"],
};
```

</div>

</div>

<!--
Tools or instruments are functions that the LLM can call to extend its capabilities beyond text generation. Without tools, the LLM can only respond with text based on its training. But with tools, the agent can perform actions such as reading files, querying databases, making API calls, etc.

It's important to understand that the LLM doesn't execute these functions directly. Instead, it decides when and which tool to use, and then "tells" the agent to call the appropriate function with the required parameters. We will see this in an example.

On the right is a small example of a tool for reading a file from the file system.
The main function here is read_file, which takes a file name as a parameter, builds the full path to the file, reads its content, and returns that content.

Besides the function implementation itself, we also define the tool description and its input schema. These parameters are very important because they help the LLM understand what this tool does and how to call it correctly.

And let's move on to the next slide.
-->
