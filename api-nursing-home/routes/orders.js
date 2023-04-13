const express = require('express')
const router = express.Router()
const { db } = require('../config/framework');

router.get('/', async (req, res) => {
    try {
        const pool = await db
        const result = await pool.request()
            .query("SELECT * from [dbo].[Order]")
        res.json(result.recordset)
    } catch (err) {
        res.status(500)
        res.send(err.message)
    }
})

module.exports = router