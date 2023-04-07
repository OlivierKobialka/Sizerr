const sql = require("mssql");

async function shoesBrand(req, res, dbConfig) {
	const { size, gender, measurement } = req.query;

	try {
		const pool = await sql.connect(dbConfig);
		let paramSize = `size${measurement.toUpperCase()}`;

		let result;
		if (gender === "male") {
			result = await pool
				.request()
				.input("size", size)
				.query(`SELECT * from shoesMan WHERE ${paramSize}=@size`, [
					{ name: "size", value: size },
				]);
		} else {
			result = await pool
				.request()
				.query(`SELECT * from shoesWoman WHERE ${paramSize}=@size`, [
					{ name: "size", value: size },
				]);
		}

		res.status(200).json({ shoesBrand: result.recordset });
	} catch (error) {
		res.status(500).send(`${error}`);
	}
}

module.exports = { shoesBrand };
