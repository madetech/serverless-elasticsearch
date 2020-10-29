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
      try {
        if (obj.explode === true)
          throw "This is an error."
        
        const result = await client.create({
          id: obj.id,
          index: 'bar',
          body: obj
        });
      } catch (err) {
        console.error(`Error on ${obj.id}: ${err.message}.`)
      }
  
      console.log(`result: ${result}`);
    }
    
  } catch (err) {
    console.error(JSON.stringify({ err }));
  }
};
