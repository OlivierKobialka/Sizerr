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

export const dbConfig = new sql.ConnectionPool({
	user: "sa",
	password: "Olivier123!",
	server: "localhost",
	database: "Sizes",
	options: {
		encrypt: true,
	},
});

//? set middleware
app.use(dbConfig);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
//? set middleware

app.post("/api/Opinion", async function userComment(req, res) {
	const { email, comment, category } = req.body;
	try {
		// await sql.connect(dbConfig);

		const result =
			await dbConfig.query`INSERT INTO Comment (email, comment, category) VALUES (${email}, ${comment}, ${category})`;

		res.status(200).json({ message: "Comment added successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	} finally {
		sql.close();
	}
});

app.get("/api/opinionCategory", async (req, res) => {
	try {
		const result = await dbConfig.query(
			"SELECT COUNT(*) AS submitCounter FROM Comment"
		);

		res.status(200).json({ submitCounter: result[0].submitCounter });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
});

// app.post("/api/Opinion", userComment);

app.get("/api/Shoes-M", shoesMeasurements);
app.get("/api/Shoes-B", shoesBrand);

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
