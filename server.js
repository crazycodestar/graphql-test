const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const { ApolloServer } = require("apollo-server-express");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const main = async () => {
	mongoose.connect("mongodb://localhost:27017/bookStoreDB", {
		useNewUrlParser: true,
	});

	const app = express();

	const authorization = async (req) => {
		const bearer = req.headers.authorization || "";
		const token = bearer.split(" ")[1];
		try {
			const user = await jwt.verify(token, secret);
			req.user = user;
		} catch (err) {
			console.log(err);
		}
		req.next();
	};

	// jwt
	const secret = "8926f94a56d3a174e838f235ac6be65d6ab606933766eea2e4ca4";
	app.use(authorization);
	const apolloServer = new ApolloServer({
		typeDefs,
		resolvers,
		context: ({ req }) => {
			return { secret, userData: req.user };
		},
	});

	app.use(cors({ origin: "*" }));

	await apolloServer.start();

	apolloServer.applyMiddleware({ app: app });

	app.listen(4000, () => console.log("listening on port 4000"));
};

main();
