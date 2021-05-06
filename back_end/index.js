const express = require('express');
const mysql = require('mysql');
const {generatePassword} = require('./helper_methods');

//db connection
//note: modify this information to connect to your database
let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'passwordmanager'
});

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('database connected')
});

let sql;

sql = 'CREATE TABLE user(username VARCHAR(20) UNIQUE,password VARCHAR(50) NOT NULL, PRIMARY KEY(username));';

//auto generates table if it does not exists in the database
db.query(sql, (err,result)=>{
    if(err){
        console.log(err);
    }else{
        console.log('table has been created');
    }
});
sql = 'CREATE TABLE account(username VARCHAR(20), accountname VARCHAR(50), accountpassword VARCHAR(50), PRIMARY KEY(username, accountname))';
db.query(sql, (err,result)=>{
    if(err){
        console.log(err);
    }else{
        console.log('table has been created');
    }
});

const validateUser = (username, password) =>{

};

const app = express();

app.get('/test', (req,res)=>{
    res.send('hello there')
});

//creates user for password manager application
app.post('/createuser', (req,res)=>{

});

//retrieves list of accounts associated with the given username
app.get('/accountlist',(req,res)=>{

});

//creates account for the user that will be stored in the database
//optional: If password not specifiy, it will auto generate a password
app.post('createaccount', (req,res)=>{

});

//updates the specified account tied to the user
app.post('updateaccount', (req,res)=>{

});

//deletes the specifiy account tied to the user
app.post('deleteaccount', (req,res)=>{

});


app.listen('3000', ()=>{
    console.log('server has started on port 3000');
});