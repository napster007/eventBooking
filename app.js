const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require("express-graphql");
const mongoose = require('mongoose');

const graphqlSchema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index');
const app = express();


app.use(bodyParser.json());

app.use(
  "/api",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

console.log("mongouser: ",process.env.MONGO_USER);
mongoose
  .connect(
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@localhost:27017/${process.env.MONGO_DB}`
  )
  .then(
    app.listen(3000, () => {
      console.log(`Server running on port ${3000}`);
    })
  )
  .catch((err) => console.log(err));
    
