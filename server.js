const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { ApolloServer } = require("apollo-server-express");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const main = async () => {
	mongoose.connect("mongodb://localhost:27017/bookStoreDB", {
		useNewUrlParser: true,
	});

	const app = express();
	const apolloServer = new ApolloServer({ typeDefs, resolvers });

	app.use(cors({ origin: "*" }));

	await apolloServer.start();

	apolloServer.applyMiddleware({ app: app });

	app.listen(4000, () => console.log("listening on port 4000"));
};

main();
