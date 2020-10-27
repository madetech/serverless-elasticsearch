const putRecord = require("./lib/putRecord");

module.exports.data = async (event) => {
  const result = await putRecord();

  return {
    statusCode: 200,
    body: JSON.stringify({ result }),
  };
};
