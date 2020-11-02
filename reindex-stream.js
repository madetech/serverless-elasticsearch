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

    const deleteResult = await client.deleteEventSourceMapping({ UUID: mapping.UUID }).promise();

    console.log(deleteResult);
  }

  const createResult = await client.createEventSourceMapping({
    BatchSize: 25,
    EventSourceArn: process.env.STREAM_ARN,
    FunctionName: "sls-es-staging-stream",
    StartingPosition: "TRIM_HORIZON"
  }).promise();

  console.log(createResult);
}