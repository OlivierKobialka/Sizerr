const bodyParser = require("body-parser");
const express = require("express");
let cors = require("cors");
const app = express();
const port = 8080;
const sql = require("mssql");

let db = require("../server/database/Shoes.sql");

const dbConfig = new sql.ConnectionPool({
	user: "sa",
	password: "Olivier123!",
	server: "localhost",
	database: "Sizes",
});

//? set middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// app.get("/api/Shoes", function (req, res) {
// 	let connect = new sql.ConnectionPool(dbConfig);
// 	connect.connect().then(function () {
// 		const gender = req.query.gender;
// 		const unit = req.query.unit;
// 		const size = req.query.size;
// 		let request = new sql.Request(connect);
// 		request.query(`Select * from shoesMen`);
// 		request
// 			.then(function (recordSet) {
// 				console.log(recordSet);
// 				connect.close();
// 			})
// 			.catch(function (err) {
// 				console.log(err);
// 				connect.close();
// 			});
// 			res.send(JSON.stringify({ status: 200, error: null, response: `Success` }));
// 	});
// });
app.get("/api/Shoes", function (req, res) {
	const fetchedData = {
		gender: req.query.gender,
		unit: req.query.unit,
		size: req.query.size,
	}
	console.log(fetchedData)
	res.send(fetchedData);
});
// app.get("/api/Shoes", function (req, res) {
// 	let dbCon = new sql.ConnectionPool(dbConfig);
// 	dbCon
// 		.connect()
// 		.then(function () {
// 			const gender = req.query.gender;
// 			const unit = req.query.unit;
// 			const size = req.query.size;
// 			if (gender === "Male") {
// 				let request = new sql.Request(dbCon);
// 				request.query(
// 					`SELECT Brand, Size FROM shoesMen where units = @unit and size = @size`,
// 					{ unit, size }
// 				);
// 			} else {
// 				let request = new sql.Request(dbCon);
// 				request.query(
// 					`SELECT Brand, Size FROM shoesWomen where units = @unit and size = @size`,
// 					{ unit, size }
// 				);
// 			}
// 			request
// 				.then(function (recordSet) {
// 					console.log(recordSet);
// 					dbCon.close();
// 				})
// 				.catch(function (err) {
// 					console.log(err);
// 					dbCon.close();
// 				});
// 		})
// 		.catch(function (err) {
// 			console.log(err);
// 			dbCon.close();
// 		});
// 	//
// 	res.send(JSON.stringify({ status: 200, error: null, response: `Success` }));
// });

// function getShoeMeasurement() {
// 	let dbCon = new sql.ConnectionPool(dbConfig);
// 	dbCon
// 		.connect()
// 		.then(function () {
// 			const gender = req.query.gender;
// 			const unit = req.query.unit;
// 			const size = req.query.size;
// 			if (gender === "Male") {
// 				let request = new sql.Request(dbCon);
// 				request.query(
// 					`SELECT Brand, Size FROM shoesMen where units = @unit and size = @size`,
// 					{ unit, size }
// 				);
// 			} else {
// 				let request = new sql.Request(dbCon);
// 				request.query(
// 					`SELECT Brand, Size FROM shoesWomen where units = @unit and size = @size`,
// 					{ unit, size }
// 				);
// 			}
// 			request
// 				.then(function (recordSet) {
// 					console.log(recordSet);
// 					dbCon.close();
// 				})
// 				.catch(function (err) {
// 					console.log(err);
// 					dbCon.close();
// 				});
// 		})
// 		.catch(function (err) {
// 			console.log(err);
// 			dbCon.close();
// 		});
// }

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
