import Docker from "dockerode";

const docker = new Docker();

export default async function stop_container({project_name}) {
    const containerName = `${project_name}-web`;
    try {
        const container = docker.getContainer(containerName);
        await container.stop();
        await container.remove();
        return `Container '${containerName}' stopped and removed`;
    } catch (err) {
        throw new Error(`Failed to stop container: ${err.message}`);
    }
}

stop_container.description = "Stop and remove a project's Docker container.";
stop_container.input_schema = {
    type: "object",
    properties: {
        project_name: {
            type: "string",
            description: "The name of the project workspace",
        },
    },
    required: ["project_name"],
};