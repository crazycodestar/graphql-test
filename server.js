const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");

const schema = require("./schema/schema");

const app = express();

mongoose.connect("mongodb://localhost:27017/bookStoreDB", {
	useNewUrlParser: true,
});

app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: true,
	})
);

app.listen(4000, () => console.log("listening on port 4000"));
