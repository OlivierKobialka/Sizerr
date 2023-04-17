const sql = require("mssql");

async function getTableData(req, res, dbConfig) {
    const { table } = req.query;

    try {
        const pool = await sql.connect(dbConfig);

        let result;
    } catch (error) {
        console.log(`${error}`);
    }
}

module.exports = { getTableData };