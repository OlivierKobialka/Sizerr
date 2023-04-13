const sql = require("mssql");

async function shoesMeasurement(req, res, dbConfig) {
	const { unit, size, gender } = req.query;

	try {
		const pool = await sql.connect(dbConfig);
		let paramSize;
		if (unit !== undefined) {
			paramSize = `Size${unit.toUpperCase()}`;
		} else {
			throw new Error("Measurement parameter is undefined");
		}

		let result;
		if (gender === "male") {
			result = await pool
				.request()
				.input("size", size)
				.query(`SELECT * FROM ShoesMan WHERE ${paramSize}=@size`, [
					{ name: "size", value: size },
				]);
		} else {
			result = await pool
				.request()
				.input("size", size)
				.query(`SELECT * FROM ShoesWoman WHERE ${paramSize}=@size`, [
					{ name: "size", value: size },
				]);
		}

		res.status(200).json({ shoesMeasurement: result.recordset });
	} catch (error) {
		res.status(500).send(`${error}`);
	}
}

module.exports = { shoesMeasurement };
