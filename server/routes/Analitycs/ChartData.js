const sql = require("mssql");

async function genderCount(req, res, dbConfig) {
	const { gender } = req.body;

	try {
		const pool = await sql.connect(dbConfig);

		let result;
		if (gender !== undefined) {
			result = await pool.request().query(`UPDATE GenderCount SET ${gender} += 1`);
		} else {
			res.status(500).send(`Recived: ${gender}`);
		}

		res.status(200).json({ GenderCount: result.recordset });
	} catch (error) {
		res.status(500).send(`${error}`);
	}
}

async function avgShoeSize(req, res, dbConfig) {
	try {
		const pool = await sql.connect(dbConfig);
	} catch (error) {
		res.status(500).send(`${error}`);
	}
}

async function feedbackCategory(res, dbConfig) {
	try {
		const pool = await sql.connect(dbConfig);

		let result = await pool.request().query("SELECT * FROM FeedbackCount");

		res.status(200).json({ FeedbackCount: result.recordset });
	} catch (error) {
		res.status(500).send(`${error}`);
	}
}
async function feedbackCategoryPOST(req, res, dbConfig) {
	const { category } = req.body;

	let option = "";

	if (category === "feedback") {
		option = "feedback";
	} else if (category === "suggestion") {
		option = "suggestion";
	} else if (category === "complain") {
		option = "complain";
	} else { res.status(500).send(`Recived: ${category}`); }
	try {
		const pool = await sql.connect(dbConfig);

		let result = await pool
			.request()
			.input("category", option)
			.query(`UPDATE FeedbackCount SET ${option} += 1
`, [
				{
					name: 'category', value: option
				}
			])
		res.status(200)
	} catch (error) {
		res.status(500).send(`${error}`);
	}
}

async function getGenderCount(res, dbConfig) {
	try {
		const pool = await sql.connect(dbConfig);

		let result = await pool
			.request()
			.query("SELECT * FROM GenderCount");
		// .query("SELECT SUM(CASE WHEN gender='male' THEN 1 ELSE 0 END) AS male_count, SUM(CASE WHEN gender='female' THEN 1 ELSE 0 END) AS female_count FROM GenderCount");

		// let { male_count, female_count } = result.recordset[0];

		// res.status(200).send({ maleCount: male_count, femaleCount: female_count });
		res.status(200).json({ getGenderCount: result.recordset });
	} catch (error) {
		res.status(500).send(`${error}`);
	}
}

module.exports = {
	genderCount,
	avgShoeSize,
	feedbackCategory,
	getGenderCount,
	feedbackCategoryPOST
};
