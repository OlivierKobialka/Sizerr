const sql = require("mssql");

//! SHOES
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

//! TOPS
async function getTableDataTopsMale(req, res, dbConfig) {
    try {
        const pool = await sql.connect(dbConfig);

        let result = await pool.request().query(`SELECT
    Brand.Brand, Size, ChestCM_min, ChestCM_max, WaistCM_min, WaistCM_max, HipCM_min, HipCM_max, ChestIN_min, ChestIN_max, WaistIN_min, WaistIN_max, HipIN_min, HipIN_max
FROM TopsMan INNER JOIN Brand ON Brand.Id = TopsMan.BrandId`)

        res.status(200).json({ tableDataTopsMale: result.recordset });
    } catch (error) {
        res.status(500).send(`${error}`);
    }
}
async function getTableDataTopsFemale(req, res, dbConfig) {
    try {
        const pool = await sql.connect(dbConfig);

        let result = await pool.request().query(`SELECT
    Brand.Brand, Size, ChestCM_min, ChestCM_max, WaistCM_min, WaistCM_max, HipCM_min, HipCM_max, ChestIN_min, ChestIN_max, WaistIN_min, WaistIN_max, HipIN_min, HipIN_max
FROM TopsWoman INNER JOIN Brand ON Brand.Id = TopsWoman.BrandId`)

        res.status(200).json({ tableDataTopsFemale: result.recordset });
    } catch (error) {
        res.status(500).send(`${error}`);
    }
}

//! BOTTOMS
async function getTableDataBottomsMale(req, res, dbConfig) {
    try {
        const pool = await sql.connect(dbConfig);

        let result = await pool.request().query(`SELECT
    Brand.Brand, Size, WaistCM_min, WaistCM_max, HipCM_min, HipCM_max, Waistin_min, Waistin_max, Hipin_min, Hipin_max
FROM BottomsMan INNER JOIN Brand ON Brand.Id = BottomsMan.BrandId`)

        res.status(200).json({ tableDataBottomsMale: result.recordset });
    } catch (error) {
        res.status(500).send(`${error}`);
    }
}
async function getTableDataBottomsFemale(req, res, dbConfig) {
    try {
        const pool = await sql.connect(dbConfig);

        let result = await pool.request().query(`SELECT
    Brand.Brand, Size, WaistCM_min, WaistCM_max, HipCM_min, HipCM_max, Waistin_min, Waistin_max, Hipin_min, Hipin_max
FROM BottomsWoman INNER JOIN Brand ON Brand.Id = BottomsWoman.BrandId`)

        res.status(200).json({ tableDataBottomsFemale: result.recordset });
    } catch (error) {
        res.status(500).send(`${error}`);
    }
}

module.exports = { getTableData, getTableDataMale, getTableDataTopsMale, getTableDataTopsFemale, getTableDataBottomsMale, getTableDataBottomsFemale };
