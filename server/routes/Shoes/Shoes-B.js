async function shoesBrand(req, res) {
	const brand = req.query.brand;
	const size = req.query.size;
	const gender = req.query.gender;
	const measurement = req.query.measurement;

	try {
		await sql.connect(dbConfig);

		if (gender === "male") {
			const result =
				await sql.query`SELECT * FROM dbo.shoesMan WHERE Size = ${size} AND Unit = ${unit}`;

			res.json(result.recordset);
		} else {
			const result =
				await sql.query`SELECT * FROM dbo.shoesWoman WHERE Size = ${size} AND Unit = ${unit}`;

			res.json(result.recordset);
		}
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	} finally {
		sql.close();
	}
}
