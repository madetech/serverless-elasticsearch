const { saveRecord } = require("./dependencies");
const { nanoid } = require("nanoid");

module.exports.data = async (event) => {
  if (!event || !event.body || !event.body.id) {
    return { statusCode: 400 };
  }
  const record = { id: nanoid(6) };

  try {
    const result = await saveRecord(record);
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({error})
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(record),
  };
};
