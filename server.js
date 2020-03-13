'use strict';

const express = require('express');
const path = require('path');
// Constants
const PORT = process.env.PORT || '8080';
const HOST = '0.0.0.0';
const config = require('./config.json')
var mysql = require('mysql');
console.log(`${HOST}:${PORT}`);
var con = mysql.createConnection({
  host: config.mysql_host_ip,
  user: config.mysql_username,
  password: config.mysql_password,
  database: config.mysql_database_name,
  port: config.mysql_port
});

con.connect(function(err) {
  if (err) console.log(err);
  console.log("Connected to mysql "+config.mysql_host_ip);
});

// App
const app = express();
app.get('/', (req, res) => {
  con.query("SELECT * FROM "+config.mysql_table_name+" ", function (err, result, fields) {
    if (err) res.send(err);
    console.log(result);
    res.send(result);
  }); 
});

app.get('/:column_name/:sensor_id', (req, res) => {
  con.query(`SELECT ${req.params.column_name} FROM `+config.mysql_table_name+` where sensor_id='${req.params.sensor_id}'`, function (err, result, fields) {
    if (err) res.send(err);
    console.log(result);
    if(result.length>0)
    res.send(`<span style="color:gray"><b>${req.params.sensor_id}:</b> `+result[0][req.params.column_name]+"</span>");
    else
    res.send(`<span style="color:gray"><b>${req.params.sensor_id}:</b> no description</span>`);

  }); 
});
app.use('/',express.static(path.join(__dirname, 'files')));
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
