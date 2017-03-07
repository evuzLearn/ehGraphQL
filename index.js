'use strict'

const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
    type Video {
        id: ID,
        title: String,
        duration: Int,
        watched: Boolean
    }
    
    type Query {
        video: Video 
    }

    type Schema {
        query: Query
    }
`);

const resolvers = {
    video: () => ({
        id: '2',
        title: 'VideoFoo',
        duration: 90,
        watched: false
    })
}

const query = `
    query myFirstQuery {
        video {
            id,
            title,
            duration,
            watched
        }
    }
`

graphql(schema, query, resolvers)
.then(result => {
    console.log(result);
})
.catch(err => {
    console.error(err);
})