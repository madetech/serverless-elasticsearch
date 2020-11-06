const { addTrigger } = require("../lib/dependencies");

module.exports.run = async () => {
  console.log("ADD TRIGGER START");
  await addTrigger();
  console.log("ADD TRIGGER COMPLETE");
};
