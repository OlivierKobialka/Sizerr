const sql = require("mssql");

async function genderCount(req, res, dbConfig) {
	const { gender } = req.query;

	try {
		const pool = await sql.connect(dbConfig);

		let query;
		if (gender === "male") {
			query = await pool.request().query(`UPDATE genderCount SET Male += 1`);
		} else {
			query = await pool.request().query(`UPDATE genderCount SET Female += 1`);
		}

		res.status(200).json({ genderCount: query.recordset });
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

module.exports = {
	genderCount,
	avgShoeSize,
	feedbackCategory,
};
