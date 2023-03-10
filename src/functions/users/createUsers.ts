import { APIGatewayProxyHandler } from "aws-lambda"
import { writeFileSync } from "fs";
import { join } from "path";
import { v4 as uuidV4 } from "uuid";

interface ICreateUser {
    id?: string;
    name: string;
    username: string;
    todos?: [];
}

const users = [];

export const handler: APIGatewayProxyHandler = async (event) => {
    const { name, username } = JSON.parse(event.body) as ICreateUser;

    const user = {
        id: uuidV4(),
        name: name,
        username: username,
        todos: []
    };

    users.push(user);

    writeFileSync(join(process.cwd(), "src", "database", "users.json"), JSON.stringify(users));

    return {
        statusCode: 201,
        body: JSON.stringify({
            user: user,
            message: "Usuário criado com sucesso"
        })
    };
}
