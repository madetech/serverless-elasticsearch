const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient({
  region: process.env.REGION,
});

const db = require("./lib/gateway/db")({ client });
const saveRecord = require("./lib/use-case/save-record")({ db });
const saveMultipleRecords = require("./lib/use-case/save-multiple-records")({
  db,
});

module.exports = {
  saveRecord,
  saveMultipleRecords,
};
