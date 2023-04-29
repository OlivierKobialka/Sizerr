const sql = require("mssql");

async function bottomBrand(req, res, dbConfig) {
    const { gender, size } = req.query;

    try {
        const pool = await sql.connect(dbConfig);

        let result;``
        if (gender === "male") {
            result = await pool
                .request()
                .input("size", size)
                .query(
                    `SELECT
    Brand.Brand, Size, HeightCM_min, HeightCM_max, WaistCM_min, WaistCM_max, HipCM_min, HipCM_max, Heightin_min, Heightin_max, Waistin_min, Waistin_max, Hipin_min, Hipin_max
FROM BottomsMan INNER JOIN Brand ON Brand.Id = BottomsMan.BrandId
WHERE Size = @size`,
                    [
                        { name: "size", value: size },
                    ]
                );

            res.status(200).json({ bottomBrand: result.recordset });
        } else {
            result = await pool
                .request()
                .input("size", size)
                .query(
                    `SELECT
    Brand.Brand, Size, HeightCM_min, HeightCM_max, WaistCM_min, WaistCM_max, HipCM_min, HipCM_max, Heightin_min, Heightin_max, Waistin_min, Waistin_max, Hipin_min, Hipin_max
FROM BottomsWoman INNER JOIN Brand ON Brand.Id = BottomsWoman.BrandId
WHERE Size = @size`,
                    [
                        { name: "size", value: size },
                    ]
                );

            res.status(200).json({ bottomBrand: result.recordset });
        }
    } catch (error) {
        res.status(500).send(`${error}`);
    }
}

module.exports = { bottomBrand }
