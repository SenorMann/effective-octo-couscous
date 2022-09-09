import * as cdk from "aws-cdk-lib";
import * as gateway from "aws-cdk-lib/aws-apigateway";
import { Cors } from "aws-cdk-lib/aws-apigateway";
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

    const api = new gateway.RestApi(this, "rest-api", {
      binaryMediaTypes: ["image/*"],
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
      },
    });

    api.root.addMethod("ANY", new gateway.LambdaIntegration(handler))

    new cdk.CfnOutput(this, "api-url", {
      description: "API Gateway URL",
      value: api.url,
    })
  }
}

const app = new cdk.App();
const stack = new Stack(app, "serverless-http-stack");
cdk.Tags.of(stack).add("Author", "Malik Mahmud");