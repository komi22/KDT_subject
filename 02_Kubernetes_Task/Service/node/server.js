const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');
const app = express();

app.use(bodyParser.json());

app.get('/api/values',function(req,res){
    db.pool.query('SELECT * FROM lists;',
    (err,results,fields) => {
        if(err){
            console.log("Table error");
            console.log(err);
            return res.status(500).send(err)
        }
        else{
            return res.json(results)
        }
    })
})


app.post('/api/value',function(req,res,next){
    db.pool.query(`INSERT INTO lists(value) VALUES("${req.body.value}");`,
    (err,results,fields)=>{
        if(err){
            console.log("Insert error");
            console.log(err);
            return res.status(500).send(err)
        }
        else{
            return res.json({ success: true, value: req.body.value})
        } 
    })
})  

app.listen(5000,()=>{
    console.log('run');
})
