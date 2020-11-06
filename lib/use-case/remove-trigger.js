module.exports = ({ lambda }) => {
  return async () => {
    return await lambda.removeTrigger();
  };
};
