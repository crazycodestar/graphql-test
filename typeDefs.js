// const graphql = require("graphql");
// // const _ = require("lodash");
// const Author = require("../models/author");
// const Book = require("../models/book");

// const {
// 	GraphQLObjectType,
// 	GraphQLString,
// 	GraphQLSchema,
// 	GraphQLID,
// 	GraphQLInt,
// 	GraphQLList,
// 	GraphQLNonNull,
// } = graphql;

// const BookType = new GraphQLObjectType({
// 	name: "Book",
// 	fields: () => ({
// 		id: { type: GraphQLID },
// 		name: { type: GraphQLString },
// 		genre: { type: GraphQLString },
// 		author: {
// 			type: AuthorType,
// 			resolve(parent, args) {
// 				// return _.find(authors, { id: parent.authorId });
// 				return Author.findById(parent.authorId);
// 			},
// 		},
// 	}),
// });

// const AuthorType = new GraphQLObjectType({
// 	name: "Author",
// 	fields: () => ({
// 		id: { type: GraphQLID },
// 		name: { type: GraphQLString },
// 		age: { type: GraphQLInt },
// 		books: {
// 			type: new GraphQLList(BookType),
// 			resolve(parent, args) {
// 				// return _.filter(books, { authorId: parent.id });
// 				return Book.find({ authorId: parent.id });
// 			},
// 		},
// 	}),
// });

// const RootQuery = new GraphQLObjectType({
// 	name: "RootQueryType",
// 	fields: () => ({
// 		book: {
// 			type: BookType,
// 			args: { id: { type: GraphQLID } },
// 			resolve(parent, args) {
// 				// return _.find(books, { id: args.id });
// 				return Book.findById(args.id);
// 			},
// 		},
// 		author: {
// 			type: AuthorType,
// 			args: { id: { type: GraphQLID } },
// 			resolve(parent, args) {
// 				// return _.find(authors, { id: args.id });
// 				return Author.findById(args.id);
// 			},
// 		},
// 	}),
// });

// const mutation = new GraphQLObjectType({
// 	name: "mutation",
// 	fields: () => ({
// 		addBooks: {
// 			type: BookType,
// 			args: {
// 				name: { type: new GraphQLNonNull(GraphQLString) },
// 				genre: { type: new GraphQLNonNull(GraphQLString) },
// 				authorId: { type: new GraphQLNonNull(GraphQLID) },
// 			},
// 			resolve(parent, args) {
// 				const book = new Book({
// 					name: args.name,
// 					genre: args.genre,
// 					authorId: args.authorId,
// 				});
// 				return book.save();
// 			},
// 		},
// 		addAuthor: {
// 			type: AuthorType,
// 			args: {
// 				name: { type: new GraphQLNonNull(GraphQLString) },
// 				age: { type: new GraphQLNonNull(GraphQLInt) },
// 			},
// 			resolve(parent, args) {
// 				const author = new Author({
// 					name: args.name,
// 					age: args.age,
// 				});
// 				return author.save();
// 			},
// 		},
// 	}),
// });

// module.exports = new GraphQLSchema({
// 	query: RootQuery,
// 	mutation: mutation,
// });

const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type Book {
		name: String
		author: String
	}
	type Query {
		getBook: Book
		hello: String
	}
`;

module.exports = typeDefs;
