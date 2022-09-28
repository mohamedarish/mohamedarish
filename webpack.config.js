const path = require("path");

module.exports = {
    entry: {
        script: "./dist/script.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name]/index.js",
    },
};
