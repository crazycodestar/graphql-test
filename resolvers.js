const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const resolvers = {
	Query: {
		getBook: () => {
			return { name: "The riding dragon", author: "olalekan Adekanmbi" };
		},
		hello: async (_, __, { userData }) => {
			if (userData) {
				const user = await User.findById(userData.id);
				return { status: "success", message: "fetching successful", user };
			}
			return { status: "failure", message: "failed" };
		},
		getUsers: async () => {
			if (user) return await User.find({});
			return null;
		},
	},
	Mutation: {
		addUser: async (parent, args) => {
			const password = await bcrypt.hash(args.password, 12);
			const user = new User({
				username: args.username,
				password: password,
				email: args.email,
			});
			return user.save();
		},
		login: async (parent, args, { secret }) => {
			const user = await User.findOne({ username: args.username });
			if (!user)
				return {
					status: "failed",
					message: "invalid username or password",
					user: {},
				};
			const isValid = bcrypt.compare(args.password, user.password);
			if (!isValid)
				return { status: "failed", message: "failed to login", user: {} };

			const token = jwt.sign({ id: user.id, username: user.username }, secret);
			return {
				status: "success",
				message: "logged in successfully",
				user,
				token,
			};
		},
	},
};

module.exports = resolvers;
