const sql = require("mssql");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors());

const dbConfig = {
	user: process.env.DB_USER,
	password: process.env.DB_PASWORD,
	server: process.env.DB_SERVER,
	database: process.env.DB_DATABASE,
	options: {
		encrypt: true,
		trustServerCertificate: false,
	},
};
sql.connect(dbConfig, err => {
	if (err) console.log(err);
	console.log("Connected to database");
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
