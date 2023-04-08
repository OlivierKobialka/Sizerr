// IMPORTS
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sql = require("mssql");
const dotenv = require("dotenv").config();
const app = express();
const port = 8080;
// ROUTES
const { shoesBrand } = require("./routes/Shoes/Shoes-B");
const { shoesMeasurement } = require("./routes/Shoes/Shoes-M");
const {
	genderCount,
	avgShoeSize,
	feedbackCategory,
} = require("./routes/Analitycs/ChartData");

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// DATABASE
const dbConfig = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	server: process.env.DB_SERVER,
	database: process.env.DB_DATABASE,
	options: {
		encrypt: true,
		trustServerCertificate: true,
	},
};

// CONNECT TO DATABASE
sql.connect(dbConfig, error => {
	if (error) {
		console.log(error);
	} else {
		console.log("  Connected to database!");
	}
});

//! Routes
//? SHOES
app.get("/api/Shoes-B", (req, res) => {
	shoesBrand(req, res, dbConfig);
});
app.get("/api/Shoes-M", (req, res) => {
	shoesMeasurement(req, res, dbConfig);
});

//? GENDER COUNT
app.get("/data/genders", (req, res) => {
	getGenderCount(req, res, dbConfig);
});
app.post("/data/genders/post", (req, res) => {
	genderCount(req, res, dbConfig);
});

// app.get("/api/Shoes-M", async (req, res) => {
// 	const { unit, size, gender } = req.query;

// 	try {
// 		const pool = await sql.connect(dbConfig);

// 		let result;

// 		if (gender === "male" && unit === "cm") {
// 			result = await pool.request()
// 				.query`SELECT * FROM dbo.shoesMan WHERE sizeCM = CAST(${size} AS NUMERIC(10, 2))`;
// 		} else if (gender === "male" && unit === "inch") {
// 			result = await pool.request()
// 				.query`SELECT * FROM dbo.shoesMan WHERE sizeIN = ${size}`;
// 		} else {
// 			res.status(400).send("Invalid query parameters");
// 			return;
// 		}

// 		res.send(result.recordset);
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).send("Error");
// 	}
// });

// app.post("/api/Opinion", async function userComment(req, res) {
// 	const { email, comment, category } = req.query;
// 	try {
// 		await sql.connect(dbConfig);

// 		const result =
// 			await dbConfig.query`INSERT INTO Comment (email, comment, category) VALUES (${email}, ${comment}, ${category})`;
// 		res.send("Comment added!");
// 	} catch (error) {
// 		console.log(error);
// 	} finally {
// 		sql.close();
// 	}
// });

app.listen(port, () => {
	function hi() {
		console.clear();
		// 	console.log("   ______   ______  ________  ________  _______   _______  ");
		// 	console.log("  /       /      |/        |/        |/        /         / ");
		// 	console.log(" /$$$$$$  |$$$$$$/ $$$$$$$$/ $$$$$$$$/ $$$$$$$  |$$$$$$$  |");
		// 	console.log(" $$ __$$/   $$ |      /$$/  $$ |__    $$ |__$$ |$$ |__$$ | ");
		// 	console.log(" $$         $$ |     /$$/   $$    |   $$    $$< $$    $$<  ");
		// 	console.log("  $$$$$$ |  $$ |    /$$/    $$$$$/    $$$$$$$  |$$$$$$$  |");
		// 	console.log(" /  __$$ | _$$ |_  /$$/____ $$ |_____ $$ |  $$ |$$ |  $$ | ");
		// 	console.log("$$    $$/ / $$   |/$$      |$$       |$$ |  $$ |$$ |  $$ |");
		// 	console.log("  $$$$$$/  $$$$$$/ $$$$$$$$/ $$$$$$$$/$$/   $$/ $$/   $$/ ");
	}
	hi();
	console.log(`  Running on http://localhost:${port}`);
});
