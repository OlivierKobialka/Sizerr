const sql = require("mssql");

async function getTableData(req, res, dbConfig) {
    const { table } = req.query;

    try {
        const pool = await sql.connect(dbConfig);

        let result;

        result = await pool.request().query(`SELECT Brand.Brand, SizeCM, SizeIN, SizeEU, SizeUK, SizeUS
				FROM ShoesMan 
				INNER JOIN Brand ON Brand.Id = ShoesMan.BrandID
`);

        res.status(200).json({ tableData: result.recordset });
    } catch (error) {
        res.status(500).send(`${error}`);
    }
}

module.exports = { getTableData };