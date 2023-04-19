const sql = require("mssql");

async function getTableData(req, res, dbConfig) {
    try {
        const pool = await sql.connect(dbConfig);

        let result = await pool.request().query(`SELECT Brand.Brand, SizeCM, SizeIN, SizeEU, SizeUK, SizeUS
				FROM ShoesWoman 
				INNER JOIN Brand ON Brand.Id = ShoesWoman.BrandID
`);

        res.status(200).json({ tableDataFemale: result.recordset });
    } catch (error) {
        res.status(500).send(`${error}`);
    }
}

async function getTableDataMale(req, res, dbConfig) {
    try {
        const pool = await sql.connect(dbConfig);

        let result = await pool.request().query(`SELECT Brand.Brand, SizeCM, SizeIN, SizeEU, SizeUK, SizeUS
				FROM ShoesMan 
				INNER JOIN Brand ON Brand.Id = ShoesMan.BrandID
`);

        res.status(200).json({ tableDataMale: result.recordset });
    } catch (error) {
        res.status(500).send(`${error}`);
    }
}

async function getTableDataCustom(req, res, dbConfig) {
    const { tableType, gender, unit } = req.query;

    try {
        const pool = await sql.connect(dbConfig);

        let result;
        if (tableType === "Tops") {
            if (gender === true) {
                if (unit === false) {
                    result = await pool.request().query(`SELECT
    Brand.Brand, Size, ChestCM_min, ChestCM_max, WaistCM_min, WaistCM_max, HipCM_min, HipCM_max
FROM TopsMan INNER JOIN Brand ON Brand.Id = TopsMan.BrandId`);
                } else {
                    result = await pool.request().query(`SELECT
    Brand.Brand, Size, ChestIN_min, ChestIN_max, WaistIN_min, WaistIN_max, HipIN_min, HipIN_max
FROM TopsMan INNER JOIN Brand ON Brand.Id = TopsMan.BrandId`);
                }
            } else {
                if (unit === false) {

                } else {
                    result = await pool.request().query(`SELECT
    Brand.Brand, Size, ChestCM_min, ChestCM_max, WaistCM_min, WaistCM_max, HipCM_min, HipCM_max
FROM TopsWoman INNER JOIN Brand ON Brand.Id = TopsWoman.BrandId`);
                }
                result = await pool.request().query(`SELECT
    Brand.Brand, Size, ChestIN_min, ChestIN_max, WaistIN_min, WaistIN_max, HipIN_min, HipIN_max
FROM TopsWoman INNER JOIN Brand ON Brand.Id = TopsWoman.BrandId`);
            }
            // 
        } else {
            if (gender === true) {
                result = await pool.request().query(`SELECT
    Brand.Brand, Size, HeightCM_min, HeightCM_max, WaistCM_min, WaistCM_max, HipCM_min, HipCM_max
FROM BottomsMan INNER JOIN Brand ON Brand.Id = BottomsMan.BrandId`)
            } else {
                result = await pool.request().query(`SELECT
    Brand.Brand, Size, HeightCM_min, HeightCM_max, WaistCM_min, WaistCM_max, HipCM_min, HipCM_max
FROM BottomsWoman INNER JOIN Brand ON Brand.Id = BottomsWoman.BrandId`)
            }
        }

        res.status(200).json({ tableDataCustom: result.recordset });
    } catch (error) {
        res.status(500).send(`${error}`);
    }
}
module.exports = { getTableData, getTableDataMale, getTableDataCustom };