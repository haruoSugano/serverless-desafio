import { APIGatewayProxyHandler } from "aws-lambda"

interface ICreateTodo {
    id: string;
    title: string;
    deadline: Date;
}

export const handler: APIGatewayProxyHandler = async (event) => {
    
    return {
        statusCode: 201,
        body: JSON.stringify({
            message: "Hello World ignite Serverless"
        })
    }
}
