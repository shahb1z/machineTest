import * as AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: 'AKIAZQ3DQARZG26MGLAQ',
  secretAccessKey: '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',
 });

export const iam = new AWS.IAM();
