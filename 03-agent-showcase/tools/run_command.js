import Docker from "dockerode";

const docker = new Docker();

export default async function run_command({project_name, command}) {
    const containerName = `${project_name}-web`;
    const container = docker.getContainer(containerName);
    const exec = await container.exec({
        Cmd: ["sh", "-c", command],
        AttachStdout: true,
        AttachStderr: true,
    });

    const stream = await exec.start({hijack: false, stdin: false});
    const chunks = [];

    return new Promise((resolve, reject) => {
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("end", () => {
            const output = Buffer.concat(chunks).toString("utf-8");
            resolve(output.replace(/[\x00-\x09\x0B-\x1F\x7F]/g, ""));
        });
        stream.on("error", reject);
    });
}

run_command.description = "Run a shell command in a project's container. Use this to test or verify the website setup.";
run_command.input_schema = {
    type: "object",
    properties: {
        project_name: {
            type: "string",
            description: "The name of the project workspace",
        },
        command: {
            type: "string",
            description: "The shell command to execute",
        },
    },
    required: ["project_name", "command"],
};