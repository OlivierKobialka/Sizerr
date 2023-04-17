const sql = require("mssql");

async function getTableData(req, res, dbConfig) {
    const { tableCategory } = req.query;

    try {
        const pool = await sql.connect(dbConfig);

        let result;
        if (tableCategory === "shoes") {
            result = await pool.request().query(`SELECT Brand.Brand, SizeCM, SizeIN, SizeEU, SizeUK, SizeUS
				FROM ShoesMan 
				INNER JOIN Brand ON Brand.Id = ShoesMan.BrandID
`);
        }
        if (tableCategory === "tops") {
            result = await pool.request().query(`SELECT
    Brand.Brand, Size, ChestCM_min, ChestCM_max, WaistCM_min, WaistCM_max, HipCM_min, HipCM_max
FROM TopsMan INNER JOIN Brand ON Brand.Id = TopsMan.BrandId
`);
        }
        if (tableCategory === "bottoms") {
            result = await pool.request().query(`SELECT
    Brand.Brand, Size, HeightCM_min, HeightCM_max, WaistCM_min, WaistCM_max, HipCM_min, HipCM_max
FROM BottomsMan INNER JOIN Brand ON Brand.Id = BottomsMan.BrandId
`);
        }

        res.status(200).json({ tableData: result.recordset });
    } catch (error) {
        res.status(500).send(`${error}`);
    }
}

module.exports = { getTableData };