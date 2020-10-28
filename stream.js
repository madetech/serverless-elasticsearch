const { Client } = require("@elastic/elasticsearch");
const {
  createAWSConnection,
  awsGetCredentials,
} = require("@acuris/aws-es-connection");

module.exports.run = async (event) => {
  event.Records.forEach((record) => {
    console.log(record.dynamodb.NewImage);
  });

  const awsCredentials = await awsGetCredentials();
  const AWSConnection = createAWSConnection(awsCredentials);
  const client = new Client({
    ...AWSConnection,
    node: process.env.ES_ENDPOINT,
  });

  try {
    const result = await client.search({
      index: "my-index",
      body: {
        query: {
          match: { hello: "world" },
        },
      },
    });
    console.log(`Elasticsearch up: ${result}`);
  } catch (err) {
    console.error(JSON.stringify({ err }));
  }
};
