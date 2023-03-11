import { APIGatewayProxyHandler } from "aws-lambda"
import { readFileSync, writeFileSync} from "fs";
import { join } from "path";
import { v4 as uuidV4 } from "uuid";

interface ICreateTodo {
    id: string;
    user_id: string;
    title: string;
    done: boolean;
    deadline?: Date;
}

const todos = [];

export const handler: APIGatewayProxyHandler = async (event) => {
    const { id } = event.pathParameters;
    const { title, deadline } = JSON.parse(event.body) as ICreateTodo;
    
    const users = JSON.parse(readFileSync(join(process.cwd(), "src", "database", "users.json"), "utf8"));
    
    const user = users.find(user => user.id === id);

    if (!user) {
        throw new Error("User not found!");
    }

    const todo = {
        id: uuidV4(),
        user_id: id,
        title: title,
        done: false,
        deadline: deadline
    }

    todos.push(todo);
    user.todos.push(todo);

    writeFileSync(join(process.cwd(), "src", "database", "users.json"), JSON.stringify(users));
    writeFileSync(join(process.cwd(), "src", "database", "todos.json"), JSON.stringify(todos));

    return {
        statusCode: 200,
        body: JSON.stringify({
            todo: todo,
            message: "TODO added successfully"
        })
    };
}
