import { APIGatewayProxyHandler } from "aws-lambda"
import { join } from "path";
import { readFileSync } from "fs";

export const handler: APIGatewayProxyHandler = async (event) => {
    const { id } = event.pathParameters;
    const users = JSON.parse(readFileSync(join(process.cwd(), "src", "database", "users.json"), "utf8"));
   
    const user = users.find(user => user.id === id);

    if (!user) {
        throw new Error("User not found!");
    }

    const todos = user.todos;

    return {
        statusCode: 200,
        body: JSON.stringify({
            todos: todos,
            message: `List todos by ${user.name}`
        })
    };
}