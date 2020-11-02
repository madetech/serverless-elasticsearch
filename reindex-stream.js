const { Lambda } = require("aws-sdk")

module.exports.run = async () => {
  const client = new Lambda();

  const params = {
    FunctionName: "sls-es-staging-stream"
   };

  const events = await client.listEventSourceMappings(params).promise();
  console.log(events.EventSourceMappings);

  for (const mapping of events.EventSourceMappings) {
    console.log(mapping.UUID);

    const result = await client.deleteEventSourceMapping({ UUID: mapping.UUID }).promise();

    console.log(result);
  }
}