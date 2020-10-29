const { saveRecord, saveMultipleRecords } = require("./dependencies");

module.exports.data = async (event) => {
  if (!event || !event.body) {
    return { statusCode: 400 };
  }
  const request = JSON.parse(event.body);

  if (typeof request !== "object") {
    return { statusCode: 400 };
  }

  let result;

  try {
    if (Array.isArray(request)) {
      result = await saveMultipleRecords(request);
    } else {
      result = await saveRecord(request);
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ err }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};
