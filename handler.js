const hello = require("./lib/hello");

module.exports.hello = async (event) => {
  const body = hello();

  console.log("this is where i say hello");

  return {
    statusCode: 200,
    body,
  };
};
