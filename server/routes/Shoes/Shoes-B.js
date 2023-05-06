const sql = require("mssql");

async function shoesBrand(req, res, dbConfig) {
	const { size, gender, measurement } = req.query;

	try {
		const pool = await sql.connect(dbConfig);
		let paramSize = `Size${measurement}`;

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

		res.status(200).json({ shoesBrand: result.recordset });
	} catch (error) {
		res.status(500).send(`${error}`);
	}
}

module.exports = { shoesBrand };
