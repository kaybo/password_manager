const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
var Mutex = require('async-mutex').Mutex;
const {generatePassword} = require('./helper_methods');
const crypto = require('crypto');
const mutex = new Mutex();

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

let sqlStart;

sqlStart = 'CREATE TABLE user(username VARCHAR(20) UNIQUE,password VARCHAR(100) NOT NULL, PRIMARY KEY(username));';

//auto generates table if it does not exists in the database
db.query(sqlStart, (err,result)=>{
    if(err){
        console.log(err);
    }else{
        console.log('table has been created');
    }
});
sqlStart = 'CREATE TABLE account(associateusername VARCHAR(20), accountname VARCHAR(50), accountpassword VARCHAR(100), PRIMARY KEY(associateusername, accountname), FOREIGN KEY(associateusername) REFERENCES user(username))';
db.query(sqlStart, (err,result)=>{
    if(err){
        console.log(err);
    }else{
        console.log('table has been created');
    }
});

let userMap = new Map();


//essentially, a session validation to make sure logged in users can access the api calls 
const validateUser = (username, password) =>{
    let hashedPassword = userMap.get(username);
    if(!hashedPassword){
        return false;
    }
    if(bcrypt.compareSync(password, hashedPassword)){
        return true;
    }
    return false;
};

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.post('/login', (req,res)=>{
    let sql = 
    `
        SELECT * FROM user
        where user.username = '${req.body.username}'
    `;
    db.query(sql, (err,result)=>{
        if(err){
            console.log(err);
        }else{
            if(result.length <= 0){
                res.send('user not found');
            }else{
               let hashedPassword = result[0].password
               if(bcrypt.compareSync(req.body.password, hashedPassword)){
                   mutex.acquire().then((release)=>{
                       userMap.set(req.body.username, hashedPassword);
                       res.send('login successful');
                       release();
                   });
               }else{
                   res.send('incorrect password');
               }
            }
        }
    });
});

//creates user for password manager application
app.post('/createuser', (req,res)=>{
    let sql = 
    `SELECT username 
    FROM user
    WHERE user.username = '${req.body.username}';`;
    db.query(sql, (err,result)=>{
        if(err){
            console.log(err);
        }else{
            if(result.length > 0){
                res.send('Username exists');
            }else{
                const hashedPassword = bcrypt.hashSync(req.body.password, 10);

                sql = `
                    INSERT INTO user VALUES('${req.body.username}', '${hashedPassword}');`;
                db.query(sql, (err,result)=>{
                    if(err){
                        console.log(err);
                    }else{
                        res.send('Username has been created');
                    }
                });

            }
        }
    });
});

//retrieves list of accounts associated with the given username
app.post('/accountlist',(req,res)=>{
    if(validateUser(req.body.username, req.body.password)){
        let sql = 
        `
        SELECT * 
        FROM account
        WHERE account.associateusername = '${req.body.username}';
        `;
        db.query(sql, (err,result)=>{
            if(err){
                console.log(err);
            }else{
                let processList = [];
                for(let index = 0; index < result.length; index++){
                    console.log(result[index]);
                    let tempObj = {accountname: result[index].accountname, accountpassword: result[index].accountpassword};
                    processList.push(tempObj);
                }
                let jsonProcessList = JSON.stringify(processList)
                res.send(jsonProcessList);
            }
        });
    }else{
        res.send('Please log in to access this command');
    }
});

//creates account for the user that will be stored in the database
//optional: If password not specifiy, it will auto generate a password
app.post('/createaccount', (req,res)=>{
    if(validateUser(req.body.username, req.body.password)){
        let sql = 
        `
        SELECT *
        FROM account
        WHERE account.associateusername = '${req.body.username}';
        `;
        db.query(sql, (err,result)=>{
            if(err){
                console.log(err);
            }else{
                let flag = false;
                for(let index = 0; index < result.length; index++){
                    if(req.body.accountname === result[index].accountname){
                        flag = true;
                        break;
                    }
                }
                if(flag === true){
                    res.send('Account names cannot be the same, try another account name');
                }else{
                    sql = 
                    `
                    INSERT INTO account VALUES('${req.body.username}','${req.body.accountname}', '${req.body.accountpassword}');
                    `;
                    db.query(sql, (err,result)=>{
                        if(err){
                            console.log(err);
                        }else{
                            res.send('New account name created');
                        }
                    });
                }
                
            }
        });
    }else{
        res.send('Please log in to access this command');
    }
});

//updates the specified account tied to the user
app.post('/updateaccount', (req,res)=>{
    if(validateUser(req.body.username, req.body.password)){
        let sql =
        `
        UPDATE account
        SET account.accountname = '${req.body.newaccountname}', accountpassword = '${req.body.newaccountpassword}'
        WHERE account.accountname = '${req.body.accountname}' AND account.associateusername = '${req.body.username}'
        `;
        db.query(sql, (err, result)=>{
            if(err){
                if(err.errno === 1062){
                    res.send('account name already exists, please try another one.');
                }else{
                    console.log(err);
                }
                
            }else{
                console.log(result);
                if(result.affectedRows === 0){
                    res.send('Account information has not been correctly updated.')
                }else{
                    res.send('Account information has been updated');
                }
                
            }
        });
    }else{
        res.send('Please log in to access this command');
    }
});

//deletes the specifiy account tied to the user
app.post('/deleteaccount', (req,res)=>{
    if(validateUser(req.body.username, req.body.password)){
        let sql = 
        `
        DELETE FROM account
        WHERE account.accountname = '${req.body.accountname}' AND account.associateusername = '${req.body.username}'
        `;
        db.query(sql, (err, result)=>{
            if(err){
                console.log(err);
            }else{
                console.log(result);
                if(result.affectedRows === 0){
                    res.send('Account removed failed');
                }else{
                    res.send('Account removed successfully');
                }
                
            }
        });
    }else{
        res.send('Please log in to access this command');
    }
});

//logs user out from session
app.post('/logout', (req,res)=>{
    if(validateUser(req.body.username, req.body.password)){
        mutex.acquire().then((release)=>{
            userMap.delete(req.body.username);
            res.send('You have successfully logged out');
            release();
        });
    }else{
        res.send('Please log in to access this command');
    }
});


app.listen('3000', ()=>{
    console.log('server has started on port 3000');
});
