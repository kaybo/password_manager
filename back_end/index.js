const express = require('express');
const mysql = require('mysql');

//db connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'nodemysql'
});

// db.connect((err)=>{
//     if(err){
//         throw err;
//     }
//     console.log('database connected')
// });

const app = express();

app.get('/createdb', (req,res)=>{
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err,result)=>{
        if(err){
            throw err
        }
        console.log(result);
        res.send('database created')
    });
});

app.get('/test', (req,res)=>{
    res.send('hello there')
});

app.listen('3000', ()=>{
    console.log('server has started on port 3000');
});