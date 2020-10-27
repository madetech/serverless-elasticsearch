const AWS = require("aws-sdk");
const { nanoid } = require("nanoid");

module.exports = async () => {
  try {
    const client = new AWS.DynamoDB.DocumentClient({
      region: process.env.REGION,
    });

    const item = { id: nanoid(6) };
    const request = {
      TableName: process.env.DVLA_DB_NAME,
      Item: item,
    };

    console.log(request);

    await client.put(request).promise();

    return item;
  } catch (err) {
    console.log(err);
  }
};
