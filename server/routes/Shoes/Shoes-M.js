const sql = require("mssql");

async function shoesMeasurements(req, res, dbConfig) {
	const { gender, unit, size } = req.query;

	try {
		const pool = await sql.connect(dbConfig);

		let paramSize;
		if (unit !== undefined) {
			paramSize = `size${unit.toUpperCase()}`;
		} else {
			throw new Error("Measurement parameter is undefined");
		}

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
				.input("size", size)
				.query(`SELECT * from shoesWoman WHERE ${paramSize}=@size`, [
					{ name: "size", value: size },
				]);
		}

		res.status(200).json({ shoesMeasurements: result.recordset });
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	} finally {
		sql.close();
	}
}

module.exports = { shoesMeasurements };
