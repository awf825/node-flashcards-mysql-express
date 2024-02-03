const express = require('express');
const mysql2 = require('mysql2');
const app = express();
require("dotenv").config();

app.use(express.json());

const connection = mysql2.createPool({
    host: process.env.DB_ENDPOINT || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "root",
    port: process.env.DB_PORT || 8889,
    database: process.env.DB
})

app.get("/words", async(req, res) => {
    try {
        const data = await connection.promise().query(
          `SELECT * from ${process.env.TABLE} LIMIT 250;`
        );

        res.status(202).json({
          words: data[0],
        });
      } catch (err) {
        console.log(err)
        res.status(500).json({
          message: err,
        });
      }
});

app.post("/remove", async(req,res) => {
    console.log('req.body: ', req.body)
    try {
        console.log(`deleting ${req.body.word}...`)
        const deleted = await connection.promise().query(
            `DELETE from ${process.env.TABLE} where english = ?`, req.body.word
        );
        console.log('delete finished: ', deleted)
        res.sendStatus(204);
    } catch (err) {
        console.log('err: ', err)
        res.status(500).json({
            message: err,
        });
    }
})

app.post("/promote", async(req, res) => {
    const { english, spanish, level } = req.body.data
    try {
        console.log(`promoting ${english}...`)
        const inserted = await connection.promise().query(
            `INSERT INTO confirmed (en, es, level) VALUES (?, ?, ?)`, [
                english, spanish, level
            ]
        )
        console.log('insert finished: ', inserted)

        console.log(`deleting ${english}...`)
        const deleted = await connection.promise().query(
            `DELETE from ${process.env.TABLE} where english = ?`, english
        );
        
        console.log('delete finished: ', deleted)

        res.sendStatus(204);
    } catch (err) {
        console.log('err: ', err)
        res.status(500).json({
            message: err,
        });
    }
})

app.get('/',(req,res)=>{
    res.send("Hi");
})

PORT = process.env.PORT || 4200
app.listen(PORT,()=>{
    console.log("Server listening")
})