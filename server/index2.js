const sql = require("mssql");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 8080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

const dbConfig = {
	user: "sa",
	password: "Olivier123!",
	server: "localhost",
	database: "Sizes",
	options: {
		encrypt: true,
		trustServerCertificate: true,
	},
};
const pool = new sql.ConnectionPool(dbConfig);

sql.connect(dbConfig, err => {
	if (err) {
		console.error(err);
	} else {
		console.log("Connected to database!");
	}
});

app.get("/api/Shoes-B", async (req, res) => {
	const { brand, size, gender, measurement } = req.query;

	try {
		const pool = await sql.connect(dbConfig);
		const measurementUp = measurement.toUpperCase();
		const paramSize = `size${measurementUp}`;
		if (gender === "male") {
			const result = await pool.request()
				.query`SELECT * from shoesMan WHERE ${paramSize}=${size}`;
		} else {
			const result = await pool.request()
				.query`SELECT * from shoesWoman WHERE ${paramSize}=${size}`;
		}

		res.status(200).send("Response Send!");
		res.status(200).send(result.recordset);
	} catch (err) {
		console.log(err);
		res.status(500).send("Błąd");
	}
});

app.get("/api/Shoes-M", async (req, res) => {
	const { unit, size, gender } = req.query;

	try {
		const pool = await sql.connect(dbConfig);

		let result;

		if (gender === "male" && unit === "cm") {
			result = await pool.request()
				.query`SELECT * FROM dbo.shoesMan WHERE sizeCM = CAST(${size} AS NUMERIC(10, 2))`;
		} else if (gender === "male" && unit === "inch") {
			result = await pool.request()
				.query`SELECT * FROM dbo.shoesMan WHERE sizeIN = ${size}`;
		} else {
			res.status(400).send("Invalid query parameters");
			return;
		}

		res.send(result.recordset);
	} catch (error) {
		console.error(error);
		res.status(500).send("Error");
	}
});

app.post("/api/Opinion", async function userComment(req, res) {
	const { email, comment, category } = req.query;
	try {
		await sql.connect(dbConfig);

		const result =
			await dbConfig.query`INSERT INTO Comment (email, comment, category) VALUES (${email}, ${comment}, ${category})`;
		res.send("Comment added!");
	} catch (error) {
		console.log(error);
	} finally {
		sql.close();
	}
});

app.listen(port, () => {
	// function hi() {
	// 	console.clear();
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
	console.log(`  Running on http://localhost:${port}`);
});
