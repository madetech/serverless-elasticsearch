module.exports = ({ client }) => {
  return {
    addTrigger: async () => {
      const createResult = await client
        .createEventSourceMapping({
          BatchSize: 25,
          EventSourceArn: process.env.STREAM_ARN,
          FunctionName: process.env.STREAM_HANDLER_ARN,
          StartingPosition: "LATEST",
        })
        .promise();

      console.log(createResult);
    },
    removeTrigger: async () => {
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
    },
  };
};
