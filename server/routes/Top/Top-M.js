const sql = require("mssql");

async function topMeasurements(req, res, dbConfig) {
	const { chest, hips, waist, gender } = req.query;

	try {
		const pool = await sql.connect(dbConfig);
		let result;

		if (typeof chest === "undefined" || chest === null || chest === "") {
			res.status(400).json({ error: "Chest measurement is required." });
		} else if (typeof hips === "undefined" || hips === null || hips === "") {
			res.status(400).json({ error: "Hip measurement is required." });
		} else if (typeof waist === "undefined" || waist === null || waist === "") {
			res.status(400).json({ error: "Waist measurement is required." });
		} else {
			if (gender === "Male") {
				result = await pool
					.request()
					.input("chest", chest)
					.input("hips", hips)
					.input("waist", waist)
					.query(
						`SELECT Brand.Brand, Size, ChestCM_min,ChestCM_max, WaistCM_min WaistCM_max, HipCM_min, HipCM_max,ChestIN_min,ChestIN_max, WaistIN_min WaistIN_max, HipIN_min, HipIN_max FROM TopsMan INNER JOIN Brand ON Brand.Id = TopsMan.BrandId WHERE ChestCM_min <= @chest AND ChestCM_max >= @chest AND HipCM_min <= @hips AND HipCM_max >= @hips`,
						[
							{ name: "chest", value: chest },
							{ name: "hips", value: hips },
							{ name: "waist", value: waist },
						]
					);

				res.status(200).json({ topMeasurements: result.recordset });
			} else {
				result = await pool
					.request()
					.input("chest", chest)
					.input("hips", hips)
					.input("waist", waist)
					.query(
						`SELECT Brand.Brand, Size, ChestCM_min,ChestCM_max, WaistCM_min WaistCM_max, HipCM_min, HipCM_max, ChestIN_min, ChestIN_max, WaistIN_min WaistIN_max, HipIN_min, HipIN_max FROM TopsWoman INNER JOIN Brand ON Brand.Id = TopsWoman.BrandId WHERE ChestCM_min <= @chest AND ChestCM_max >= @chest AND HipCM_min <= @hips AND HipCM_max >= @hips`,
						[
							{ name: "chest", value: chest },
							{ name: "hips", value: hips },
							{ name: "waist", value: waist },
						]
					);

				res.status(200).json({ topMeasurements: result.recordset });
			}
		}
	} catch (error) {
		res.status(500).send(`${error}`);
	}
}

module.exports = { topMeasurements };
