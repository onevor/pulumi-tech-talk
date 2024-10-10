import * as nodePath from 'path';
import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import * as awsx from '@pulumi/awsx';

import { provider } from './utils';
import { statupLabLambdaRole } from './iam/roles';

const codePath = nodePath.join(__dirname, '../dist', 'functions');

const statupLabLambdaName = `${pulumi.getStack()}-startup-lambda`;

const statupLabLambda = new aws.lambda.Function(
  statupLabLambdaName,
  {
    name: statupLabLambdaName,
    code: new pulumi.asset.FileArchive(codePath),
    handler: 'startuplab.handler',
    role: statupLabLambdaRole.arn,
    runtime: aws.lambda.Runtime.NodeJS20dX,
    timeout: 300,
  },
  {
    provider,
  },
);

const apiName = `${pulumi.getStack()}-frode-api`;
const api = new awsx.classic.apigateway.API(apiName, {
  routes: [
    {
      path: '/ping',
      method: 'GET',
      eventHandler: statupLabLambda,
    },
    {
      path: '/hello',
      method: 'GET',
      eventHandler: statupLabLambda,
    },
  ],
});

export const apiUrl = api.url;
