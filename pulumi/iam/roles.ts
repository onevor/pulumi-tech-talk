import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';

import { provider } from '../utils';

import {
  execApiPolicy,
  lambdaInvokePolicy,
  lambdaLoggingPolicy,
  apiGatewayWebSocPolicy,
} from './policies'

const statupLabLambdaRoleName = `${pulumi.getStack()}-startup-lambda-role`;
export const statupLabLambdaRole = new aws.iam.Role(
  statupLabLambdaRoleName,
  {
    assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({
      Service: ['lambda.amazonaws.com'],
    }),
    managedPolicyArns: [
      execApiPolicy.arn,
      lambdaInvokePolicy.arn,
      lambdaLoggingPolicy.arn,
      apiGatewayWebSocPolicy.arn,
    ],
  },
  {
    provider,
  },
);