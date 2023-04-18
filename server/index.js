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
const { topBrand } = require("./routes/Top/Top-B");
const { topMeasurements } = require("./routes/Top/Top-M");
const { userComment } = require("./routes/Analitycs/ReviewsFromUsers");
const {
	genderCount,
	avgShoeSize,
	feedbackCategory,
	getGenderCount,
} = require("./routes/Analitycs/ChartData");
const { getTableData, getTableDataCustom } = require("./routes/Analitycs/GetTableData");

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
//? TOPS
app.get("/api/Tops-B", (req, res) => {
	topBrand(req, res, dbConfig);
});
app.get("/api/Tops-M", (req, res) => {
	topMeasurements(req, res, dbConfig);
});
//? BOTTOMS

//? GENDER COUNT
app.get("/data/genders/get", (req, res) => {
	getGenderCount(req, res, dbConfig);
});
// app.post("/data/genders/post", (req, res) => {
// 	genderCount(req, res, dbConfig);
// });

//? OPINIONS FROM USERS
app.post("/Opinion", (req, res) => {
	userComment(req, res, dbConfig);
});

//? CONVERSIONS
app.get("/getTableData", (req, res) => {
	getTableData(req, res, dbConfig);
})

app.listen(port, () => {
	function hi() {
		console.clear();
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
