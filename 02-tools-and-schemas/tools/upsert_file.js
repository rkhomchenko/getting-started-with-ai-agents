import {writeFile} from "fs/promises";
import {join} from "path";

export default async function upsert_file({file_name, content}) {
    const fullPath = join(process.cwd(), file_name);

    await writeFile(fullPath, content, "utf-8");

    return `File ${file_name} written successfully at ${fullPath}`;
}

upsert_file.description =
    "Create or update a file in a project's directory. If the file exists, it will be updated; otherwise, it will be created.";
upsert_file.input_schema = {
    type: "object",
    properties: {
        file_name: {
            type: "string",
            description: "The name of the file to create or update",
        },
        content: {
            type: "string",
            description: "The complete content of the file",
        },
    },
    required: ["file_name", "content"],
};