const { saveRecord } = require("./dependencies");
const { nanoid } = require("nanoid");

module.exports.data = async (event) => {
  if (!event || !event.body) {
    return { statusCode: 400 };
  }
  const record = { id: nanoid(6) };

  const result = await saveRecord(record);

  return {
    statusCode: 200,
    body: JSON.stringify(record),
  };
};
