# Serverless Elasticsearch

A project to simulate the fix for lost records when a lambda throws an exception when streaming an event batch from DynamoDB to Elasticsearch.

## Quick Start

### Install Packages

```sh
npm i
```

### To run tests

(This requires the global Jest CLI: `npm i -g jest`)

```sh
npm test
```

### To watch tests and rerun on save

```sh
jest --watch
```

### To deploy serverless stack

You'll need to [set up your AWS credentials](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/) and install the serverless CLI globally first (`npm i -g serverless` as `sls` is used in the npm script)

```sh
npm run deploy
```

### To invoke a lambda

Locally:

```sh
sls invoke local --function data -s staging -d '{ "body": "{\"name\":\"Baby Driver\"}"}'
```

or in AWS via:

```sh
sls invoke --function data -s staging -d '{ "body": "{\"name\":\"Baby Driver\"}"}'
```
