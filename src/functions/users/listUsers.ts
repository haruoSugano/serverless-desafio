import { APIGatewayProxyHandler } from "aws-lambda"
import { join } from "path";
import { readFileSync } from "fs";

export const handler: APIGatewayProxyHandler = async (event) => {
    const users = JSON.parse(readFileSync(join(process.cwd(), "src", "database", "users.json"), "utf8"));
   
    return {
        statusCode: 200,
        body: JSON.stringify({
            users: users,
            message: "Lista de usuários"
        })
    };
}
