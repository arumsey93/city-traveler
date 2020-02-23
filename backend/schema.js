'use strict';

const { GraphQLSchema, GraphQLNonNull, GraphQLList, GraphQLString, GraphQLObjectType, GraphQLBoolean } = require('graphql');
const createCity = require('./resolvers/create');
const viewCity = require('./resolvers/view');
const listCity = require('./resolvers/list');
const removeCity = require('./resolvers/remove');

const cityType = new GraphQLObjectType({
    name: 'City',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        createdAt: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
    }
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            viewCity: {
                args: {
                    id: { type: new GraphQLNonNull(GraphQLString) }
                },
                type: cityType,
                resolve: (parent, args) => viewCity(args.id)
            },
            listCity:  {
                type: new GraphQLList(cityType),
                resolve: (parent, args) => listCity()
            }
        }
    }),

    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            createCity: {
                args: {
                    id: { type: new GraphQLNonNull(GraphQLString) },
                    createdAt: { type: new GraphQLNonNull(GraphQLString) },
                    name: { type: new GraphQLNonNull(GraphQLString) },
                    description: { type: new GraphQLNonNull(GraphQLString) },
                },
                type: cityType,
                resolve: (parent, args) => createCity(args)
            },
            removeCity: {
                args: {
                    id: { type: new GraphQLNonNull(GraphQLString) }
                },
                type: GraphQLBoolean,
                resolve: (parent, args) => removeCity(args.id)
            },
        }
    })
});

module.exports = schema;