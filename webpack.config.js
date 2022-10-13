const path = require("path");

module.exports = {
	entry: {
		script: "./public/dist/script.js",
	},
	output: {
		path: path.resolve(__dirname, "public/dist"),
		filename: "[name]/index.js",
	},
};
