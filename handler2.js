module.exports.hello = async (event) => {
  let name = "";
  if (event.queryStringParameters && event.queryStringParameters.hi) {
    name = event.queryStringParameters.hi;
  }

  return {
    statusCode: 200,
    body: `hello ${name}`,
  };
};
