import * as cdk from "aws-cdk-lib";
import * as gateway from "aws-cdk-lib/aws-apigateway";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import path from "path";

class Stack extends cdk.Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const handler = new NodejsFunction(this, "default-handler", {
      runtime: Runtime.NODEJS_16_X,
      entry: path.resolve(__dirname, "./handlers/index.ts"),
      memorySize: 256,
      timeout: cdk.Duration.seconds(5),
      handler: "main",
    });

    const lambdaApi = new gateway.LambdaRestApi(this, "lambda-rest-api", {
      proxy: true,
      handler,
    });

    // const defaultHandler = new NodejsFunction(this, "fallback-handler", {
    //   runtime: Runtime.NODEJS_16_X,
    //   entry: path.resolve(__dirname, "./handlers/default.ts"),
    //   memorySize: 256,
    //   timeout: cdk.Duration.seconds(5),
    // });

    // const api = new gateway.RestApi(this, "rest-api", {
    //   binaryMediaTypes: ["image/*"],
    //   defaultCorsPreflightOptions: {
    //     allowOrigins: Cors.ALL_ORIGINS,
    //     allowMethods: Cors.ALL_METHODS,
    //   },
    //   defaultIntegration: new gateway.LambdaIntegration(defaultHandler),
    // });

    // api.root.addMethod("ANY", new gateway.LambdaIntegration(handler))

    new cdk.CfnOutput(this, "api-url", {
      description: "API Gateway URL",
      value: lambdaApi.url,
    })
  }
}

const app = new cdk.App();
const stack = new Stack(app, "serverless-http-stack");
cdk.Tags.of(stack).add("Author", "Malik Mahmud");