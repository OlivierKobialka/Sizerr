const sql = require("mssql");

async function topBrand(req, res, dbConfig) {
	const { gender, brand, size, unit } = req.query;
	try {
		const pool = await sql.connect(dbConfig);

		let result;
		if (gender === "male") {
			if (unit === false) {
				result = await pool
					.request()
					.input("size", size)
					.query(
						`SELECT
    Brand.Brand, Size, ChestCM_min, ChestCM_max, WaistCM_min, WaistCM_max, HipCM_min, HipCM_max
FROM TopsMan INNER JOIN Brand ON Brand.Id = TopsMan.BrandId
WHERE Size = @size`,
						[
							{ name: "size", value: size },
						]
					);
				res.status(200).json({ topBrand: result.recordset });

			} else {
				result = await pool
					.request()
					.input("size", size)
					.query(
						`SELECT
    Brand.Brand, Size, ChestIN_min, ChestIN_max, WaistIN_min, WaistIN_max, HipIN_min, HipIN_max
FROM TopsMan INNER JOIN Brand ON Brand.Id = TopsMan.BrandId
WHERE Size = @size`,
						[
							{ name: "size", value: size },
						]
					);
				res.status(200).json({ topBrandINCH: result.recordset });
			}

		} else {
			result = await pool
				.request()
				.input("size", size)
				.input("brand", brand)
				.query(
					`SELECT
    Brand.Brand, Size, ChestCM_min, ChestCM_max, WaistCM_min, WaistCM_max, HipCM_min, HipCM_max
FROM TopsWoman INNER JOIN Brand ON Brand.Id = TopsWoman.BrandId
WHERE Brand.Brand = @brand AND Size = @size`,
					[
						{ name: "size", value: size },
						{ name: "brand", value: brand },
					]
				);

			res.status(200).json({ topBrand: result.recordset });
		}
	} catch (error) {
		res.status(500).send(`${error}`);
	}
}

module.exports = { topBrand };
