// import { dbConfig } from " ../../../index";

// async function userComment(req, res) {
// 	const email = req.body.email;
// 	const comment = req.body.comment;
// 	const category = req.body.category;

// 	try {
// 		await sql.connect(dbConfig);

// 		const result =
// 			await sql.query`INSERT INTO Comment (email, comment, category) VALUES (${email}, ${comment}, ${category})`;

// 		res.status(200).json({ message: "Comment added successfully" });
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).send("Server Error");
// 	} finally {
// 		sql.close();
// 	}
// }
