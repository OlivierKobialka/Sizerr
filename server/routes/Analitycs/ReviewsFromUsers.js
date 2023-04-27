const sql = require("mssql");

async function userComment(req, res, dbConfig) {
	const { email, comment, category } = req.query;

	if (email || comment || category === undefined) {
		res.status(501).send(
			'parameters are undefined'
		);
		return;
	} else {
		try {
			const pool = await sql.connect(dbConfig);

			let result = await pool
				.request()
				.query(
					`INSERT INTO Comment (email, comment, category) VALUES ('${email}', '${comment}', '${category}')`
				);

			res.status(200).json({ userComment: result.recordset });
		} catch (error) {
			res.status(500).send(`${error}`);
		}
	}
}

module.exports = { userComment };
