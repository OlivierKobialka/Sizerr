const sql = require("mssql");

async function shoesMeasurement(req, res, dbConfig) {
	const { unit, size, gender } = req.query;

	try {
		const pool = await sql.connect(dbConfig);
		let paramSize;
		if (unit === false) {
			paramSize = "SizeCM";
		} else {
			paramSize = "SizeIN";
		}

		let result;
		if (gender === "Male") {
			result = await pool
				.request()
				.input("size", size)
				.query(
					`SELECT Brand.Brand, SizeCM, SizeIN, SizeEU, SizeUK, SizeUS
				FROM ShoesMan 
				INNER JOIN Brand ON Brand.Id = ShoesMan.BrandID
				WHERE ${paramSize}=@size`,
					[{ name: "size", value: size }]
				);
		} else {
			result = await pool
				.request()
				.input("size", size)
				.query(
					`SELECT Brand.Brand, SizeCM, SizeIN, SizeEU, SizeUK, SizeUS
				FROM ShoesWoman 
				INNER JOIN Brand ON Brand.Id = ShoesWoman.BrandID
				WHERE ${paramSize}=@size`,
					[{ name: "size", value: size }]
				);
		}

		res.status(200).json({ shoesMeasurement: result.recordset });
	} catch (error) {
		res.status(500).send(`${error}`);
	}
}

module.exports = { shoesMeasurement };
