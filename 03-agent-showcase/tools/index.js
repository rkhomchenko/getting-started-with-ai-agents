import create_workspace from "./create_workspace.js";
import upsert_file from "./upsert_file.js";
import create_container from "./create_container.js";
import run_command from "./run_command.js";
import stop_container from "./stop_container.js";

const handlers = {
    [create_workspace.name]: create_workspace,
    [upsert_file.name]: upsert_file,
    [create_container.name]: create_container,
    [run_command.name]: run_command,
    [stop_container.name]: stop_container
};

export const tools = Object.values(handlers)
    .map((handler) => ({
        name: handler.name,
        description: handler.description,
        input_schema: handler.input_schema,
    }));

export async function executeTool(name, params) {
    if (handlers[name]) {
        return await handlers[name](params);
    }

    throw new Error(`Unknown tool: ${name}`);
}