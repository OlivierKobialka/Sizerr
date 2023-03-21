function shoesBrand(req, res) {
	const fetchedData = {
		gender: req.query.gender,
		unit: req.query.unit,
		size: req.query.size,
	};
	console.log(fetchedData);
	res.send(fetchedData);
}
