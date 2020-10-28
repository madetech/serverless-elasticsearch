const { nanoid } = require('nanoid');

module.exports = ({ client }) => { 
  return {
    put: async (item) => {
      item.id = nanoid(6);

      const request = {
        TableName: process.env.DB_NAME,
        Item: item,
      };

      await client.put(request).promise();

      return item;
    },
  };
};
