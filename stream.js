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
    try {
      if (recordObj.explode === true) throw "This is an error.";
      recordObj['@timestamp'] = new Date()
      const result = await client.update({
        id: recordObj.id,
        index: "bar",
        body: { doc: recordObj },
      });
      console.log(
        `Indexed ${i + 1} of ${event.Records.length} records: ${JSON.stringify(
          result.meta.request.params.body
        )}`
      );
    } catch (error) {
      console.error(JSON.stringify({ error }));
    }
  }
};
