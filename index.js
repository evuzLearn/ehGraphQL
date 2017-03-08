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
        video: Video,
        videos: [Video]
    }

    type Schema {
        query: Query
    }
`);

const videoA = {
    id: 3,
    title: 'Create a GraphQL Schema',
    duration: 30,
    watched: true
}


const videoB = {
    id: 4,
    title: 'Ember.js CLI',
    duration: 50,
    watched: false 
}

const videos = [videoA, videoB];

const resolvers = {
    video: () => ({
        id: '2',
        title: 'VideoFoo',
        duration: 90,
        watched: false
    }),
    videos: () => videos
}

const query = `
    query myFirstQuery {
        videos {
            id,
            title,
            duration,
            watched
        }
    }
`

graphql(schema, query, resolvers)
.then(result => {
    console.log(JSON.stringify(result));
})
.catch(err => {
    console.error(err);
})