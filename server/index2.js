const sql = require("mssql");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const dbConfig = new sql.ConnectionPool({
	user: process.env.DB_USER,
	password: process.env.DB_PASWORD,
	server: process.env.DB_SERVER,
	database: process.env.DB_DATABASE,
	options: {
		encrypt: true,
		trustServerCertificate: false,
	},
});
const poolConnect = dbConfig.connect();

app.post("/api/Opinion", async (req, res) => {
	try {
		await poolConnect; // wait for the connection pool to be established
		const request = pool.request();
		const query = `INSERT INTO Comment (email, comment, category) VALUES (${email}, ${comment}, ${category})`;
	} catch {
		request.query(query, (err, result) => {
			if (err) console.log(err);
			res.send(result);
		});
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
