
const { graphqlHTTP } = require('express-graphql');
const { 
  GraphQLObjectType, 
  GraphQLSchema, 
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const userData = require('./../MOCK_DATA.json');
const UserType = require('./TypeDefs/UserType');


const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUser: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt }},
      resolve(parent, args) {
        return userData;
      }
    }
  }
});
const Mutation = new GraphQLObjectType({
  name: "Mutation", 
  fields: {
    createUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString},
        age: {type: GraphQLInt},
        gender: {type: GraphQLInt}
      },
      resolve(parent, args) {
        userData.push({
          id: userData.length + 1,
          username: args.username,
          age: args.age,
          gender: args.gender,
        });
        return args;
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})

module.exports = schema;