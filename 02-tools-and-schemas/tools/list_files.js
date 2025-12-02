import {readdir} from "fs/promises";

export default async function list_files() {
    const files = await readdir(process.cwd());

    return `Files in the current directory:\n` + files.join("\n");
}

list_files.description = "List all files in the current project's directory.";
list_files.input_schema = {
    type: "object",
    properties: {},
};