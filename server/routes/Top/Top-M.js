const sql = require("mssql");

async function topMeasurements(req, res, dbConfig) {
	try {
		const pool = await sql.connect(dbConfig);
	} catch (error) {
		res.status(500).send(`${error}`);
	}
}

module.exports = { topMeasurements };
