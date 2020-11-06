# Serverless Elasticsearch

Re-index data from DynamoDB to Elasticsearch in case of indexing failure or bad data.

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

### To pause db streaming and reindex to a new index

- sls invoke -function remove-trigger -s staging
- update ES_INDEX_NAME in serverless.yml and deploy (would be good to pass this in as arg in future)
- sls invoke -function reindex -s staging
- sls invoke -function add-trigger -s staging
