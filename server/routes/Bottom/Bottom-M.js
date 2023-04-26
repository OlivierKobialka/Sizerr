const sql = require("mssql");

async function bottomMeasurements(req, res, dbConfig) {
    const { gender, cherst, hips, inseam, waist } = req.query;

    try {
        const pool = await sql.connect(dbConfig);

        let result;
        if (gender === "male") {
            
        } else {
            
        }
    } catch (error) {
        res.status(500).send(`${error}`)
    }
}

module.exports = { bottomMeasurements }
