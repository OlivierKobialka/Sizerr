
// describe("Shoe-Req", () => {
// 	it("Shoe by measurements", () => {
// 		app.get("/form-data-S-M", async (req, res) => {
// 			const gender = req.query.gender;
// 			try {
// 				await pool.connect();
// 				const result = await pool
// 					.request()
// 					.query(`SELECT * FROM test WHERE gender = @gender`, { gender });
// 				const users = result.recordset;
// 				res.json(users);
// 			} catch (error) {
// 				console.log(error);
// 				res.sendStatus(500);
// 			} finally {
// 				pool.close();
// 			}
// 		});
// 	});
// });