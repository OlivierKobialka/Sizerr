async function userComment(req, res) {
	const email = req.query.email;
	const comment = req.query.comment;
	const category = req.query.category;

	try {
		await sql.connect(dbConfig);

		const result =
			await sql.query`INSERT INTO Comment (email, comment, category) VALUES (${email}, ${comment}, ${category})`;

		res.json(result.recordset);
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	} finally {
		sql.close();
	}
}
