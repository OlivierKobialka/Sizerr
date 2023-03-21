async function shoesMeasurements(req, res) {
	const gender = req.query.gender;
	const unit = req.query.unit;
	const size = req.query.size;

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
