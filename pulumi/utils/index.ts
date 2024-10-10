import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';

const awsConfig = new pulumi.Config('aws');

export const provider = new aws.Provider('providerOptions', {
  region: 'eu-north-1',
});
