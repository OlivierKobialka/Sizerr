const bodyParser = require("body-parser");
const express = require("express");
let cors = require("cors");
const app = express();
const port = 8080;
const sql = require("mssql");

const shoesMeasurements = require("./routes/Shoes/Shoes-M");
const shoesBrand = require("./routes/Shoes/Shoes-B");
const userComment = require("./routes/Analitycs/ReviewsFromUsers");

let db = require("../server/database/Shoes.sql");

const dbConfig = new sql.ConnectionPool({
	user: "sa",
	password: "Olivier123!",
	server: "localhost",
	database: "Sizes",
	options: {
		encrypt: true,
	},
});

//? set middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/api/Opinion", userComment);

app.get("/api/Shoes-M", shoesMeasurements);
app.get("/api/Shoes-B", shoesBrand);

app.listen(port, () => {
	function hi() {
		console.log("   ______   ______  ________  ________  _______   _______  ");
		console.log("  /       /      |/        |/        |/        /         / ");
		console.log(" /$$$$$$  |$$$$$$/ $$$$$$$$/ $$$$$$$$/ $$$$$$$  |$$$$$$$  |");
		console.log(" $$ __$$/   $$ |      /$$/  $$ |__    $$ |__$$ |$$ |__$$ | ");
		console.log(" $$         $$ |     /$$/   $$    |   $$    $$< $$    $$<  ");
		console.log("  $$$$$$ |  $$ |    /$$/    $$$$$/    $$$$$$$  |$$$$$$$  |");
		console.log(" /  __$$ | _$$ |_  /$$/____ $$ |_____ $$ |  $$ |$$ |  $$ | ");
		console.log("$$    $$/ / $$   |/$$      |$$       |$$ |  $$ |$$ |  $$ |");
		console.log("  $$$$$$/  $$$$$$/ $$$$$$$$/ $$$$$$$$/$$/   $$/ $$/   $$/ ");
	}
	hi();
	console.log(`  Running on http://localhost:${port}`);
});
