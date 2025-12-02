import read_file from "./read_file.js";
import list_files from "./list_files.js";
import upsert_file from "./upsert_file.js";

export const tools = [
    {
        name: read_file.name,
        description: read_file.description,
        input_schema: read_file.input_schema,
    },
    {
        name: list_files.name,
        description: list_files.description,
        input_schema: list_files.input_schema,
    },
    {
        name: upsert_file.name,
        description: upsert_file.description,
        input_schema: upsert_file.input_schema,
    },
];

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