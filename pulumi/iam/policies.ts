import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';

const awsConfig = new pulumi.Config('aws');

const execApiPolicyName = `${pulumi.getStack()}-execute-api-policy`;
export const execApiPolicy = new aws.iam.Policy(execApiPolicyName, {
  policy: pulumi.interpolate`{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "execute-api:Invoke",
          "execute-api:ManageConnections"
        ],
        "Resource": "arn:aws:execute-api:${awsConfig.require(
          'region',
        )}:*:**/@connections/*"
      }
    ]
  }`,
});

const lambdaPolicyName = `${pulumi.getStack()}-lambda-invoke-policy`;
export const lambdaInvokePolicy = new aws.iam.Policy(lambdaPolicyName, {
  policy: JSON.stringify({
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Action: ['lambda:InvokeFunction'],
        Resource: '*',
      },
    ],
  }),
});

export const lambdaLoggingPolicyName = `${pulumi.getStack()}-lambda-logging-policy`;
export const lambdaLoggingPolicy = new aws.iam.Policy(lambdaLoggingPolicyName, {
  path: '/',
  description: 'Allows Lambda functions to write logs to CloudWatch',
  policy: JSON.stringify({
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Action: [
          'logs:CreateLogGroup',
          'logs:CreateLogStream',
          'logs:PutLogEvents',
        ],
        Resource: 'arn:aws:logs:*:*:*',
      },
    ],
  }),
});

const apiGatewayWebSocPolicyName = `${pulumi.getStack()}-apiGatewayWebSocPolicy`;
export const apiGatewayWebSocPolicy = new aws.iam.Policy(
  apiGatewayWebSocPolicyName,
  {
    policy: pulumi.interpolate`{
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": "execute-api:ManageConnections",
                "Resource": "arn:aws:execute-api:${awsConfig.require(
                  'region',
                )}:*:*/*/*/@connections/*"
            }
        ]
    }`,
  },
);
