'use strict'

const express = require('express');
const graphqlHTTP = require('express-graphql');
const { graphql, buildSchema } = require('graphql');

const port = process.env.PROT || 3020;
const server = express();

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

server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
    rootValue: resolvers 
}))

server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})