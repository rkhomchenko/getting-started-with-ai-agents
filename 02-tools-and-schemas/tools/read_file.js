import {readFile as fsReadFile} from "fs/promises";
import {join} from "path";

export default async function read_file({file_name}) {
    const fullPath = join(process.cwd(), file_name);
    const content = await fsReadFile(fullPath, "utf-8");

    return content;
}

read_file.description = "Read and return the content of a file from the project's directory.";
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