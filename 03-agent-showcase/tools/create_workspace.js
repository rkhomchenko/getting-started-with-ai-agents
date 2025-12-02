import {mkdir} from "fs/promises";
import {join} from "path";

const WORKSPACES_ROOT = join(process.cwd(), "workspaces");

export default async function create_workspace({project_name}) {
    const workspacePath = join(WORKSPACES_ROOT, project_name);
    await mkdir(workspacePath, {recursive: true});

    return `Workspace created at: ${workspacePath}`;
}

create_workspace.description = "Create a new workspace directory for a website project. Each project gets its own isolated directory.";
create_workspace.input_schema = {
    type: "object",
    properties: {
        project_name: {
            type: "string",
            description: "Name of the project (will be used as directory name, e.g., 'portfolio', 'blog', 'landing-page')",
        },
    },
    required: ["project_name"],
};
