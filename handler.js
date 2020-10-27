const hello = require("./lib/hello");

module.exports.hello = async (event) => {
  const message = await hello();

  console.log(`we're gonna boot up a db called ${process.env.DVLA_DB_NAME}`);

  return {
    statusCode: 200,
    body: JSON.stringify(message),
  };
};
