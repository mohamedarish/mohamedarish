import * as express from "express";

const app = express();

app.get("/", (_req, res) => {
	res.sendFile(__dirname + "/index.html");
});

app.listen(3000, () => {
	console.log("Listening to requests on port 3000");
});