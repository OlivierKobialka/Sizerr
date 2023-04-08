const sql = require("mssql");

async function genderCount(req, res, dbConfig) {
	const { gender } = req.query;

	try {
		const pool = await sql.connect(dbConfig);

		let result;
		if (gender !== undefined) {
			if (gender === "male") {
				result = await pool.request().query(`UPDATE genderCount SET Male += 1`);
			} else {
				result = await pool
					.request()
					.query(`UPDATE genderCount SET Female += 1`);
			}
		} else {
			res.send(`gender error, recived: ${gender}`);
		}

		res.status(200).send(`${gender}`);
		// res.status(200).json({ genderCount: result.recordset });
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
