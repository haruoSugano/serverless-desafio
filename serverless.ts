import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'serverless-desafio-ignite',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-offline'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: { 
    createUsers: {
      handler: "src/functions/users/createUsers.handler",
      events: [
        {
          http: {
            path: "createUsers",
            method: "post",
            cors: true,
          }
        }
      ]
    },
    listUsers: {
      handler: "src/functions/users/listUsers.handler",
      events: [
        {
          http: {
            path: "listUsers",
            method: "get",
            cors: true,
          }
        }
      ]
    },
    getUserById: {
      handler: "src/functions/users/getUserById.handler",
      events: [
        {
          http: {
            path: "getUserById/{id}",
            method: "get",
            cors: true,
          }
        }
      ]
    },
    createTodos: {
      handler: "src/functions/todos/createTodos.handler",
      events: [
        {
          http: {
            path: "createTodos/{id}",
            method: "post",
            cors: true,
          }
        }
      ]
    },
    getTodosByIdUser: {
      handler: "src/functions/todos/getTodosByIdUser.handler",
      events: [
        {
          http: {
            path: "getTodosByUserId/{id}",
            method: "get",
            cors: true,
          }
        }
      ]
    },
   },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
