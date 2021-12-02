const resolvers = {
	Query: {
		getBook: () => {
			return { name: "The riding dragon", author: "olalekan Adekanmbi" };
		},
		hello: () => {
			return "hello lekan";
		},
	},
};

module.exports = resolvers;
