import { APIGatewayProxyHandler } from "aws-lambda"
import { v4 as uuidV4 } from "uuid";

interface ICreateUser {
    id?: string;
    name: string;
    username: string;
    todos?: [];
}

export const handler: APIGatewayProxyHandler = async (event) => {
    const users = [];
    const { name, username } = JSON.parse(event.body) as ICreateUser;
    
    const user = {
        id: uuidV4(),
        name: name,
        username: username,
        todos: []
    };

    users.push(user);

    return {
        statusCode: 201,
        body: JSON.stringify({
            user: user,
            message: "Usuário criado com sucesso"
        })
    };
}

