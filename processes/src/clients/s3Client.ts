import aws from 'aws-sdk';

aws.config.update({
    accessKeyId: 'QCK265TL5N7S2NE5R5SL',
    secretAccessKey: 'qkzUJ8/AwST1npBhwSzUqOtqgJXhbrb/OlW8nE+81po'
});

const spaceEndpoint = new aws.Endpoint('joinery.nyc3.digitaloceanspaces.com');
const s3 = new aws.S3({endpoint: spaceEndpoint});

export default { s3 }