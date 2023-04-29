const sql = require("mssql");

async function genderCount(req, res, dbConfig) {
	const { gender } = req.query;

	try {
		const pool = await sql.connect(dbConfig);

		let result;
		if (gender !== undefined) {
			if (gender === "male") {
				result = await pool.request().query(`UPDATE GenderCount SET Male += 1`);
			} else {
				result = await pool
					.request()
					.query(`UPDATE GenderCount SET Female += 1`);
			}
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

async function feedbackCategory(req, res, dbConfig) {
	try {
		const pool = await sql.connect(dbConfig);
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

async function getGenderCount(req, res, dbConfig) {
	try {
		const pool = await sql.connect(dbConfig);

		const result = await pool
			.request()
			.query("SELECT * FROM GenderCount");
		res.status(200).send({ getGenderCount: result.recordset });
	} catch (error) {
		res.status(500).send(`${error}`);
	}
}

module.exports = {
	genderCount,
	avgShoeSize,
	feedbackCategory,
	getGenderCount, feedbackCategoryPOST
};
