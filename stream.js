module.exports.run = (event) => {
    event.Records.forEach((record) => {
        console.log(record.dynamodb.NewImage)
    })
}