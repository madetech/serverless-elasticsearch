const { DynamoDB } = require("aws-sdk")
const { Client } = require("@elastic/elasticsearch");
const {
  createAWSConnection,
  awsGetCredentials,
} = require("@acuris/aws-es-connection");

module.exports.run = async (event) => {
  const awsCredentials = await awsGetCredentials();
  const AWSConnection = createAWSConnection(awsCredentials);
  const esClient = new Client({
    ...AWSConnection,
    node: process.env.ES_ENDPOINT,
  });

  const dynClient = new DynamoDB()

  const result = await dynClient.scan({
    TableName: process.env.DB_NAME
  }).promise()

  for (const item of result.Items) {
    const recordObj = DynamoDB.Converter.unmarshall(item)

    try {
      recordObj['@timestamp'] = new Date()
      const result = await esClient.update({
        id: recordObj.id,
        index: "bar",
        body: recordObj
      });
      console.log(
        `Indexed ${i + 1} of ${event.Records.length} records: ${JSON.stringify(
          result.meta.request.params.body
        )}`
      );
    } catch (err) {
      console.error(err);
    }
  }
}