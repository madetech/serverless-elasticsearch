const { Client } = require("@elastic/elasticsearch");
const {
  createAWSConnection,
  awsGetCredentials,
} = require("@acuris/aws-es-connection");

module.exports.run = async (event) => {
  const awsCredentials = await awsGetCredentials();
  const AWSConnection = createAWSConnection(awsCredentials);
  const client = new Client({
    ...AWSConnection,
    node: process.env.ES_ENDPOINT,
  });

  try {
    event.Records.forEach((record) => {
      console.log(record.dynamodb.NewImage);

      const result = await client.create({
        id: record.dynamodb.NewImage.id,
        index: 'bar',
        body: record.dynamodb.NewImage
      });
  
      console.log(`result: ${result}`);
    });
    
  } catch (err) {
    console.error(JSON.stringify({ err }));
  }
};
