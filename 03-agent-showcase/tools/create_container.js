import Docker from "dockerode";
import {join} from "path";

const docker = new Docker();
const WORKSPACES_ROOT = join(process.cwd(), "workspaces");

const TECH_STACK_IMAGES = {
    "html": "nginx:alpine",
    "static": "nginx:alpine",
    "node": "node:20-alpine",
    "python": "python:3.12-alpine",
    "php": "php:8.2-apache",
    "react": "node:20-alpine",
    "vue": "node:20-alpine",
    "angular": "node:20-alpine"
};

async function pullImage(image) {
    return new Promise((resolve, reject) => {
        docker.pull(image, function (err, stream) {
            if (err) {
                reject(err);
                return;
            }

            docker.modem.followProgress(stream, onFinished, onProgress);

            function onFinished(err, output) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }

            function onProgress(event) {
                if (event.status === 'Downloading') {
                    process.stdout.clearLine(0);
                    process.stdout.cursorTo(0);
                    process.stdout.write(event.progress || '');
                } else {
                    process.stdout.clearLine(0);
                    process.stdout.cursorTo(0);
                    process.stdout.write(event.status + "\n");
                }
            }
        });
    });
}

function getContainerConfig({project_name, tech_stack, port}) {
    const image = TECH_STACK_IMAGES[tech_stack.toLowerCase()] || "nginx:alpine";
    const containerName = `${project_name}-web`;
    const workspacePath = join(WORKSPACES_ROOT, project_name);
    const containerConfig = {
        Image: image,
        name: containerName,
        HostConfig: {
            Binds: [`${workspacePath}:/usr/share/nginx/html:ro`],
            PortBindings: {
                "80/tcp": [{HostPort: port.toString()}]
            },
            RestartPolicy: {
                Name: "unless-stopped"
            }
        }
    };

    if (tech_stack.toLowerCase() === "node" || tech_stack.toLowerCase().includes("react") || tech_stack.toLowerCase().includes("vue") || tech_stack.toLowerCase().includes("angular")) {
        containerConfig.HostConfig.Binds = [`${workspacePath}:/app:rw`];
        containerConfig.WorkingDir = "/app";
        containerConfig.Cmd = ["sh", "-c", "npm install && npm start"];
    } else if (tech_stack.toLowerCase() === "python") {
        containerConfig.HostConfig.Binds = [`${workspacePath}:/app:rw`];
        containerConfig.WorkingDir = "/app";
        containerConfig.Cmd = ["sh", "-c", "pip install -r requirements.txt 2>/dev/null || true && python -m http.server 80"];
    }

    return containerConfig;
}

export default async function create_container({project_name, tech_stack, port}) {
    const config = getContainerConfig({project_name, tech_stack, port});

    try {
        const existingContainer = docker.getContainer(config.name);
        await existingContainer.remove({force: true});
    } catch (err) {
        // Container doesn't exist, continue
    }

    await pullImage(config.Image);

    const container = await docker.createContainer(config);
    await container.start();

    return `Container '${config.name}' created and started on port ${port} using ${config.Image} image.`;
}

create_container.description = "Create and start a Docker container for a project. The container type is automatically selected based on the tech stack (nginx for static/HTML, node for Node.js/React/Vue/Angular, python for Python, php for PHP).";
create_container.input_schema = {
    type: "object",
    properties: {
        project_name: {
            type: "string",
            description: "The name of the project workspace",
        },
        tech_stack: {
            type: "string",
            description: "The technology stack (html, static, node, react, vue, angular, python, php)",
            enum: ["html", "static", "node", "react", "vue", "angular", "python", "php"],
        },
        port: {
            type: "number",
            description: "The host port to expose the container on (e.g., 8888, 3000)",
        },
    },
    required: ["project_name", "tech_stack", "port"],
};