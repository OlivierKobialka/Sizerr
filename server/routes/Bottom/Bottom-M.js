const sql = require("mssql");

async function bottomMeasurements(req, res, dbConfig) {
    const { gender, hips, inseam, waist } = req.query;

    try {
        const pool = await sql.connect(dbConfig);

        let result;
        if (gender === "male") {
            result = await pool
                .request()
                .input("hips", hips)
                // .input("inseam", inseam)
                .input("waist", waist)
                .query(`SELECT
    Brand.Brand, Size, HeightCM_min, HeightCM_max, WaistCM_min, WaistCM_max, HipCM_min, HipCM_max, Heightin_min, Heightin_max, Waistin_min, Waistin_max, Hipin_min, Hipin_max
FROM BottomsMan INNER JOIN Brand ON Brand.Id = BottomsMan.BrandId
WHERE HipCM_min <= @hips AND HipCM_max >= @hips AND WaistCM_min <= @waist AND WaistCM_max >= @waist`, [
                    { name: "hips", value: hips },
                    { name: "inseam", value: inseam },
                    { name: "waist", value: waist },
                ])

            res.status(200).json({ bottomMeasurements: result.recordset });
        } else {

        }
    } catch (error) {
        res.status(500).send(`${error}`)
    }
}

module.exports = { bottomMeasurements }
