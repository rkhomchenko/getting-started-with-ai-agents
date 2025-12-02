import {mkdir, writeFile} from "fs/promises";
import {dirname, join} from "path";

const WORKSPACES_ROOT = join(process.cwd(), "workspaces");

export default async function upsert_file({project_name, file_path, content}) {
    const fullPath = join(WORKSPACES_ROOT, project_name, file_path);
    const dir = dirname(fullPath);

    await mkdir(dir, {recursive: true});
    await writeFile(fullPath, content, "utf-8");

    return `File ${file_path} written successfully in project ${project_name}`;
}

upsert_file.description = "Create or update a file in a project's workspace directory. If the file exists, it will be updated; otherwise, it will be created.";
upsert_file.input_schema = {
    type: "object",
    properties: {
        project_name: {
            type: "string",
            description: "The name of the project workspace",
        },
        file_path: {
            type: "string",
            description:
                "The path to the file relative to the project root (e.g., 'index.html', 'css/style.css')",
        },
        content: {
            type: "string",
            description: "The complete content of the file",
        },
    },
    required: ["project_name", "file_path", "content"],
};