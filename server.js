const express = require("express");
const mongoose = require("mongoose");

const { ApolloServer } = require("apollo-server");

const typeDefs = require("./schema/schema");

const app = express();

mongoose.connect("mongodb://localhost:27017/bookStoreDB", {
	useNewUrlParser: true,
});

const server = new ApolloServer({ typeDefs });

app.listen(4000, () => console.log("listening on port 4000"));
