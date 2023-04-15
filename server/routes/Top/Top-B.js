const sql = require("mssql");

async function topBrand(req, res, dbConfig) {
	const { gender, brand, size } = req.query;
	try {
		const pool = await sql.connect(dbConfig);

		let result;
		if (gender === "male") {
			result = await pool
				.request()
				.input("size", size)
				.input("brand", brand)
				.query(
					`SELECT
    Brand.Brand, Size, ChestCM_min, ChestCM_max, WaistCM_min, WaistCM_max, HipCM_min, HipCM_max
FROM TopsMan INNER JOIN Brand ON Brand.Id = TopsMan.BrandId
WHERE Brand.Brand = @brand AND Size = @size`,
					[
						{ name: "size", value: size },
						{ name: "brand", value: brand },
					]
				);

			res.status(200).json({ topBrand: result.recordset });
		} else {
		}
	} catch (error) {
		res.status(500).send(`${error}`);
	}
}

module.exports = { topBrand };
