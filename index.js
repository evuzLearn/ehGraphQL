'use strict'

const express = require('express');
const graphqlHTTP = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean 
 } = require('graphql');

const port = process.env.PROT || 3020;
const server = express();

const videoType = new GraphQLObjectType({
    name: 'Video',
    title: 'A video on Egghhead.io',
    fields: {
        id: {
            type: GraphQLID,
            description: 'The ID of the video'
        },
        title: {
            type: GraphQLString,
            description: 'The title of the video'
        },
        duration: {
            type: GraphQLInt,
            description: 'The duration of the video (in seconds)'
        },
        watched: {
            type: GraphQLBoolean,
            description: 'Whether or not the viewer has watched the video'
        }
    }
});

const queryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type',
    fields: {
        video: {
            type: videoType,
            resolve: () => new Promise(resolve => {
                resolve({
                    id: 'a',
                    title: 'GraphQL',
                    duration: 180,
                    watched: true
                });
            })
        }
    }
});

const schema = new GraphQLSchema({
    query: queryType
})

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

server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})