const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient({
  region: process.env.REGION,
});

const db = require("./gateway/db")({ client });
const saveRecord = require("./use-case/save-record")({ db });
const saveMultipleRecords = require("./use-case/save-multiple-records")({
  db,
});

module.exports = {
  saveRecord,
  saveMultipleRecords,
};
