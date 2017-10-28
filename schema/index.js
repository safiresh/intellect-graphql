
const { find, filter } = require('lodash');
const moment = require('moment');
const { makeExecutableSchema } = require('graphql-tools');
const Todo = `
  type Todo {
    id: String!
    text: String
    done : Boolean
    targetDate: String
    user: User
  }
`;
const User = `
  type User {
    id: String!
    fName: String
    lName: String
    email: String
    pinCode: Int
    birthDate: String
    isActive: Boolean 
    todos: [Todo]
  }
`;
const RootQuery = `
  type RootQuery {
    user(id: String!): User
    todo(id: String!): Todo
    users: [User]
    activeTodoByUser(userId:String) : [Todo]
  }
`;
const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`;
const users = [
    { id: "1", fName: 'sathish', lName: 'kumar',isActive:true , email:'safiresh@gmail.com',birthDate:"24-Nov-1988",pinCode:123456},
    { id: "2", fName: 'Alagu', lName: 'jeyaraj',isActive:true,email:'alagu@gmail.com',birthDate:"24-Jan-1988",pinCode:123456 },
    { id: "3", fName: 'jaya', lName: 'kumar',isActive:false, email:'jaya@gmail.com',birthDate:"24-Oct-1988",pinCode:123456 },
];
const todos = [
    { id: "1", userId: "1", text: 'Work 1', done: false ,targetDate:"28-Oct-2017"},
    { id: "21", userId: "2", text: 'Work 2', done: false ,targetDate:"27-Oct-2017"},
    { id: "2", userId: "2", text: 'login task', done: false,targetDate:"28-Oct-2017" },
    { id: "3", userId: "2", text: 'create user api', done: false,targetDate:"29-Oct-2017" },
    { id: "3", userId: "2", text: 'create user api', done: false,targetDate:"30-Oct-2017" },
];


const resolvers = {
    RootQuery: {
        user: (_, { id }) => find(users, { id: id }),
        todo: (_, { id }) => find(todos, { id: id }),
        users: () => filter(users,{isActive:true}),
        activeTodoByUser: (_, { userId }) => filter(todos, (todo) => {
                    if(todo.userId===userId && todo.done === false && todo.targetDate && (moment(todo.targetDate,'DD-MMM-YYYY').isSame(moment(),'date') || moment(todo.targetDate,'DD-MMM-YYYY').add(-1,'day').isSame(moment(),'date')  ))
                     return true;
                     return false
        }),
    },
    User: {
        todos: (user) => filter(todos, { userId: user.id, done: false }),
    },
    Todo: {
        user: (todo) => find(users, { id: todo.userId }),
    },
};
module.exports = makeExecutableSchema({
    typeDefs: [SchemaDefinition, RootQuery].concat([User, Todo]),
    resolvers,
});