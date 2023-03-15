const bodyParser = require("body-parser");
const express = require("express");
let cors = require("cors");
const app = express();
const port = 8080;
const sql = require("mssql");

let db = require("../server/database/a.sql");

// const dbConfig = {
// 	user: "sa",
// 	password: "Olivier123!",
// 	server: "localhost",
// 	database: "DB-Project",
// };
const dbConfig = new sql.ConnectionPool({
	user: "sa",
	password: "Olivier123!",
	server: "localhost",
	database: "DB-Project",
});

//? set middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//? ENDPOINT FOR SHOE MEASUREMENTS
// app.post("/form-data-S-M", (req, res) => {
// 	const formData = req.body;
// 	console.log(formData);
// 	//? Process the form data and send a response
// 	const gender = req.query.gender;
// 	db.query(`SELECT * FROM test WHERE gender = @gender`, (err, result) => {
// 		if (err) {
// 			console.error(err);
// 		} else {
// 			console.log(result);
// 		}
// 	});

// 	res.send(`Gender received: ${gender}`);
// });
// describe("Shoe Measurement", () => {
// 	it("200 Response", () => {
// app.get("/form-data-S-M", async (req, res) => {
// 	const gender = req.query.gender;
// 	try {
// 		await dbConfig.connect();
// 		const result = await dbConfig
// 			.request()
// 			.query(`SELECT * FROM test WHERE gender = @gender`, { gender });
// 		const users = result.recordset;
// 		res.json(users);
// 	} catch (error) {
// 		console.log(error);
// 		res.sendStatus(500);
// 	} finally {
// 		dbConfig.close();
// 	}
// });
// 	});
// });

app.get("/form-data-S-M", function (req, res) {});

function getShoeMeasurement() {
	let dbCon = new sql.ConnectionPool(dbConfig);
	dbCon
		.connect()
		.then(function () {
			let request = new sql.Request(dbCon);
			request
				.query("SELECT * FROM test")
				.then(function (recordSet) {
					console.log(recordSet);
					dbCon.close();
				})
				.catch(function (err) {
					console.log(err);
					dbCon.close();
				});
		})
		.catch(function (err) {
			console.log(err);
			dbCon.close();
		});
}

app.listen(port, () => {
	// function hi() {
	// 	console.log("   ______   ______  ________  ________  _______   _______  ");
	// 	console.log("  /       /      |/        |/        |/        /         / ");
	// 	console.log(" /$$$$$$  |$$$$$$/ $$$$$$$$/ $$$$$$$$/ $$$$$$$  |$$$$$$$  |");
	// 	console.log(" $$ __$$/   $$ |      /$$/  $$ |__    $$ |__$$ |$$ |__$$ | ");
	// 	console.log(" $$         $$ |     /$$/   $$    |   $$    $$< $$    $$<  ");
	// 	console.log("  $$$$$$ |  $$ |    /$$/    $$$$$/    $$$$$$$  |$$$$$$$  |");
	// 	console.log(" /  __$$ | _$$ |_  /$$/____ $$ |_____ $$ |  $$ |$$ |  $$ | ");
	// 	console.log("$$    $$/ / $$   |/$$      |$$       |$$ |  $$ |$$ |  $$ |");
	// 	console.log("  $$$$$$/  $$$$$$/ $$$$$$$$/ $$$$$$$$/$$/   $$/ $$/   $$/ ");
	// }
	// hi();
	console.log(`Running on http://localhost:${port}`);
});
