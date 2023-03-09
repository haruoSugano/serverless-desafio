import { APIGatewayProxyHandler } from "aws-lambda"

export const handler: APIGatewayProxyHandler = async (event) => {
    const request = event.resource;
    return {
        statusCode: 200,
        body: JSON.stringify({
            test: request,
            message: "Lista de usuários"
        })
    };
}
