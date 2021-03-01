const newman = require('newman')

newman.run({
    collection: require('./src/api_collection/ArticleSource/ArticleSource.json'), 
    reporters: 'cli',
    environment: require('./src/api_collection/environment.json')
});