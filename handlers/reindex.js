const { DynamoDB } = require("aws-sdk");
const { Client } = require("@elastic/elasticsearch");
const {
  createAWSConnection,
  awsGetCredentials,
} = require("@acuris/aws-es-connection");

module.exports.run = async (event) => {
  console.log('"REINDEX START"');
  const awsCredentials = await awsGetCredentials();
  const AWSConnection = createAWSConnection(awsCredentials);
  const esClient = new Client({
    ...AWSConnection,
    node: process.env.ES_ENDPOINT,
  });
  const dynClient = new DynamoDB();

  console.log(`Fetching records from ${process.env.DB_NAME}...`);
  const result = await dynClient
    .scan({
      TableName: process.env.DB_NAME,
    })
    .promise();

  console.log(`Reindexing records...`);
  for (const [i, item] of result.Items.entries()) {
    const recordObj = DynamoDB.Converter.unmarshall(item);

    try {
      recordObj["@timestamp"] = new Date();
      const result = await esClient.update({
        id: recordObj.id,
        index: process.env.ES_INDEX_NAME,
        body: recordObj,
      });
      console.log(
        `Indexed ${i + 1} of ${event.Records.length} records: ${JSON.stringify(
          result.meta.request.params.body
        )}`
      );
    } catch (error) {
      console.error(error);
    }
  }

  console.log("REINDEX COMPLETE");
};
