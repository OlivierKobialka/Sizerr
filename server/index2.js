const sql = require("mssql");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors());

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
sql.connect(dbConfig, err => {
	if (err) {
		console.log(err);
	} else {
		console.log("Connected to database");
	}
});

app.get("/api/Shoes-M", async function (req, res) {
	const { unit, size, gender } = req.body;
	try {
		const pool = await sql.connect(dbConfig);

		if (gender === "male" && unit === "cm") {
			const result = await pool.request()
				.query`SELECT * FROM dbo.shoesMan WHERE sizeCM = ${size}`;

			res.send(result.recordset);
		}
		if (gender === "male" && unit === "inch") {
			const result = await pool.request()
				.query`SELECT * FROM dbo.shoesMan WHERE sizeIN = ${size}`;

			res.send(result.recordset);
		}
		// } else {
		// 	const result =
		// 		await sql.query`SELECT * FROM dbo.shoesWoman WHERE Size = ${size} AND Unit = ${unit}`;

		// 	res.send(result);
		// }
	} catch (error) {
		console.log(error);
		res.status(500).send(`Error`);
	}
});

app.post("/api/Opinion", async function userComment(req, res) {
	const { email, comment, category } = req.body;
	try {
		await sql.connect(dbConfig);

		const result =
			await dbConfig.query`INSERT INTO Comment (email, comment, category) VALUES (${email}, ${comment}, ${category})`;

		res.send(result);
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
