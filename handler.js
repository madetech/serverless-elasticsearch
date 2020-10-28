const { saveRecord } = require("./dependencies");
const { nanoid } = require("nanoid");

module.exports.data = async (event) => {
  if (!event || !event.body) {
    return { statusCode: 400 };
  }
  const request = JSON.parse(event.body);

  if (!request.id) { // This check needs to change -- either 'name' or just any object
    return { statusCode: 400 };
  }

  //const record = { id: nanoid(6) };

  let result;

  try {
    result = await saveRecord(request);
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({error})
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result), //This should be result
  };
};
