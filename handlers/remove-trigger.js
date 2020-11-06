const { removeTrigger } = require("../lib/dependencies");

module.exports.run = async () => {
  console.log("REMOVE TRIGGER START");
  await removeTrigger();
  console.log("REMOVE TRIGGER COMPLETE");
};
