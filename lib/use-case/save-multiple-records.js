module.exports = ({ db }) => {
  return async (records) => {
    return await db.batchWrite(records);
  };
};
