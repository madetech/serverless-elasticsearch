const { Client } = require("@elastic/elasticsearch");
const {
  createAWSConnection,
  awsGetCredentials,
} = require("@acuris/aws-es-connection");
const { Converter } = require('aws-sdk/clients/dynamodb')

module.exports.run = async (event) => {
  const awsCredentials = await awsGetCredentials();
  const AWSConnection = createAWSConnection(awsCredentials);
  const client = new Client({
    ...AWSConnection,
    node: process.env.ES_ENDPOINT,
  });

  try {
    for(const record of event.Records) {
      const obj = Converter.unmarshall(record.dynamodb.NewImage)
      console.log(obj);

      const result = await client.create({
        id: obj.id,
        index: 'bar',
        body: obj
      });
  
      console.log(`result: ${result}`);
    }
    
  } catch (err) {
    console.error(JSON.stringify({ err }));
  }
};
