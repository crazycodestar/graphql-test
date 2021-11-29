const graphql = require("graphql");
// const _ = require("lodash");
const Author = require("../models/author");
const Book = require("../models/book");

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
} = graphql;

// dummy data
const books = [
	{ name: "Name of winds", genre: "Fantasy", id: "1", authorId: "1" },
	{ name: "The final Empire", genre: "Fantasy", id: "2", authorId: "2" },
	{ name: "The long earth", genre: "Sci-Fi", id: "3", authorId: "3" },
	{ name: "The Hero of ages", genre: "Fantasy", id: "3", authorId: "2" },
	{ name: "The Colour of magic", genre: "Fantasy", id: "3", authorId: "3" },
	{ name: "The Light Fantastic", genre: "Fantasy", id: "3", authorId: "3" },
];

const authors = [
	{ name: "Olalekan Adekanmbi", age: 18, id: "1" },
	{ name: "Abundance Anyanwu", age: 16, id: "2" },
	{ name: "Natheniel anothernoSurname", age: 19, id: "3" },
];

const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				// return _.find(authors, { id: parent.authorId });
				Author.findById(parent.authorId);
			},
		},
	}),
});

const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				// return _.filter(books, { authorId: parent.id });
				return Book.find({ authorId: parent.id });
			},
		},
	}),
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: () => ({
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// return _.find(books, { id: args.id });
				return Book.findById(args.id);
			},
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// return _.find(authors, { id: args.id });
				return Author.findById(args.id);
			},
		},
	}),
});

const mutation = new GraphQLObjectType({
	name: "mutation",
	fields: () => ({
		addBooks: {
			type: BookType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				authorId: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				const book = new Book({
					name: args.name,
					genre: args.genre,
					authorId: args.authorId,
				});
				return book.save();
			},
		},
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) },
			},
			resolve(parent, args) {
				const author = new Author({
					name: args.name,
					age: args.age,
				});
				return author.save();
			},
		},
	}),
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
