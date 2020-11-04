const { Lambda } = require("aws-sdk");

module.exports.run = async () => {
  console.log("REMOVE TRIGGER START");
  const client = new Lambda();

  const eventsSourceMappings = await client
    .listEventSourceMappings({
      FunctionName: process.env.STREAM_HANDLER_ARN,
    })
    .promise();

  for (const mapping of eventsSourceMappings.EventSourceMappings) {
    console.log(`Removing event source mapping ${mapping.UUID}`);
    const deleteResult = await client
      .deleteEventSourceMapping({ UUID: mapping.UUID })
      .promise();
    console.log(deleteResult);
  }

  console.log("REMOVE TRIGGER COMPLETE");
};
