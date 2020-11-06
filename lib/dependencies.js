const AWS = require("aws-sdk");
const dynamoClient = new AWS.DynamoDB.DocumentClient({
  region: process.env.REGION,
});
const lambdaClient = new AWS.Lambda();

const lambda = require("./gateway/lambda")({ client: lambdaClient });
const db = require("./gateway/db")({ client: dynamoClient });

const addTrigger = require("./use-case/add-trigger")({ lambda });
const removeTrigger = require("./use-case/remove-trigger")({ lambda });
const saveRecord = require("./use-case/save-record")({ db });
const saveMultipleRecords = require("./use-case/save-multiple-records")({
  db,
});

module.exports = {
  addTrigger,
  removeTrigger,
  saveRecord,
  saveMultipleRecords,
};
