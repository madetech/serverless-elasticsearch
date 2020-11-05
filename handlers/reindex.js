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
  const dynamoResult = await dynClient
    .scan({
      TableName: process.env.DB_NAME,
    })
    .promise();

  console.log(`Reindexing ${dynamoResult.Items.length} records...`);
  for (const [i, item] of dynamoResult.Items.entries()) {
    const recordObj = DynamoDB.Converter.unmarshall(item);

    try {
      recordObj["@timestamp"] = new Date();
      const esResult = await esClient.update({
        id: recordObj.id,
        index: process.env.ES_INDEX_NAME,
        body: {
          doc: recordObj,
          doc_as_upsert: true,
        },
      });
      console.log(
        `Indexed ${i + 1} of ${
          dynamoResult.Items.length
        } records: ${JSON.stringify(esResult.meta.request.params.body)}`
      );
    } catch (error) {
      console.error(error);
    }
  }

  const indexSize = await esClient.count({
    index: process.env.ES_INDEX_NAME,
  });
  console.log(
    `Index ${process.env.ES_INDEX_NAME} now contains ${indexSize.body.count} items.`
  );
  console.log("REINDEX COMPLETE");
};
