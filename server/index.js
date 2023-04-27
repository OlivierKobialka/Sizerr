const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sql = require("mssql");
const dotenv = require("dotenv").config();
const app = express();
const port = 8080;
const { shoesBrand } = require("./routes/Shoes/Shoes-B");
const { shoesMeasurement } = require("./routes/Shoes/Shoes-M");
const { bottomBrand } = require("./routes/Bottom/Bottom-B");
const { bottomMeasurements } = require("./routes/Bottom/Bottom-M");
const { topBrand } = require("./routes/Top/Top-B");
const { topMeasurements } = require("./routes/Top/Top-M");
const { userComment } = require("./routes/Analitycs/ReviewsFromUsers");
const {
	genderCount,
	avgShoeSize,
	feedbackCategory,
	getGenderCount,
	feedbackCategoryPOST,
} = require("./routes/Analitycs/ChartData");
const { getTableData, getTableDataMale, getTableDataTopsMale, getTableDataTopsFemale, getTableDataBottomsMale, getTableDataBottomsFemale } = require("./routes/Analitycs/GetTableData");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

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
app.get("/api/Bottoms-B", (req, res) => {
	bottomBrand(req, res, dbConfig);
});
app.get("/api/Bottoms-M", (req, res) => {
	bottomMeasurements(req, res, dbConfig);
});

//? GENDER COUNT
app.get("/data/genders/get", (req, res) => {
	getGenderCount(req, res, dbConfig);
});
app.post("/data/genders/post", (req, res) => {
	genderCount(req, res, dbConfig);
});

app.get("/data/opinionCategory", (req, res) => {
	feedbackCategory(req, res, dbConfig);
})
app.post("/data/opinionCategory-post", (req, res) => {
	feedbackCategoryPOST(req, res, dbConfig);
})

//? OPINIONS FROM USERS
app.post("/Opinion", (req, res) => {
	userComment(req, res, dbConfig);
});

//? CONVERSIONS
// SHOES
app.get("/getTableData", (req, res) => {
	getTableData(req, res, dbConfig);
})
app.get("/getTableDataMale", (req, res) => {
	getTableDataMale(req, res, dbConfig);
})
// TOPS
app.get("/getTableDataTopsMale", (req, res) => {
	getTableDataTopsMale(req, res, dbConfig);
})
app.get("/getTableDataTopsFemale", (req, res) => {
	getTableDataTopsFemale(req, res, dbConfig);
})
// BOTTOMS
app.get("/getTableDataBottomsMale", (req, res) => {
	getTableDataBottomsMale(req, res, dbConfig);
})
app.get("/getTableDataBottomsFemale", (req, res) => {
	getTableDataBottomsFemale(req, res, dbConfig);
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
