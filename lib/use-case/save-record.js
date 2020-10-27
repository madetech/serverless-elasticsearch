module.exports = ({ db }) => {
  return async (record) => {
    return await db.put(record);
  };
};
