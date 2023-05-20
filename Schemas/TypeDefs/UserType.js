const { 
  GraphQLObjectType, 
  GraphQLInt,
  GraphQLString,
} = require('graphql');

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: {type: GraphQLInt},
    username: {type: GraphQLString},
    age: {type: GraphQLInt},
    gender: {type: GraphQLInt},
  })
})

module.exports = UserType;

/*
type User {
  id: ID!
  firstName: String
  lastName: String
  email: String
  age: Int
  job: Job
}
*/