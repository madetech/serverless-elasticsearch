module.exports = ({ client }) => {
  return {
    put: async (item) => {
      const request = {
        TableName: process.env.DVLA_DB_NAME,
        Item: item,
      };

      await client.put(request).promise();

      return item;
    },
  };
};
