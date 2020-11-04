const { Lambda } = require("aws-sdk");

module.exports.run = async () => {
  console.log("ADD TRIGGER START");
  const client = new Lambda();

  const createResult = await client
    .createEventSourceMapping({
      BatchSize: 25,
      EventSourceArn: process.env.STREAM_ARN,
      FunctionName: process.env.STREAM_HANDLER_ARN,
    })
    .promise();

  console.log(createResult);

  console.log("ADD TRIGGER COMPLETE");
};
