module.exports = async () => {
  try {
    throw "ERROR BAD";
  } catch (err) {
    console.log(err);
    return { message: err };
  }
};
