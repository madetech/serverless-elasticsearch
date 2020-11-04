const { Client } = require("@elastic/elasticsearch");
const {
  createAWSConnection,
  awsGetCredentials,
} = require("@acuris/aws-es-connection");
const { Converter } = require("aws-sdk/clients/dynamodb");

module.exports.run = async (event) => {
  const awsCredentials = await awsGetCredentials();
  const AWSConnection = createAWSConnection(awsCredentials);
  const client = new Client({
    ...AWSConnection,
    node: process.env.ES_ENDPOINT,
  });

  for (const [i, record] of event.Records.entries()) {
    const recordObj = Converter.unmarshall(record.dynamodb.NewImage);
    if (recordObj.explode === true) throw "This is an error.";
    recordObj["@timestamp"] = new Date();
    console.log(`RecordObject from stream.js : ${JSON.stringify(recordObj)}`);
    const result = await client.update({
      id: recordObj.id,
      index: process.env.ES_INDEX_NAME,
      body: {
        doc: recordObj,
        doc_as_upsert: true,
      },
    });
    console.log(
      `Indexed ${i + 1} of ${event.Records.length} records: ${JSON.stringify(
        result.meta.request.params.body
      )}`
    );
  }
};
