const express = require('express');
const bodyParser = require('body-parser');
const { apolloExpress } = require('apollo-server');
 
const schema = require('./schema')

var app = express();
 
app.use('/graphql', bodyParser.json(), apolloExpress({ schema }));
 
app.listen(3000);