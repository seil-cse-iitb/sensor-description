'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const config = require('./config.json')
var mysql = require('mysql');

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
  con.query("SELECT * FROM "+config.mysql_table_name+" where sensor_id='"+req.query.description_sensor_id+"'", function (err, result, fields) {
    if (err) res.send(err);
    console.log(result);
    res.send(result);
  }); 
});
app.use('/',express.static("files"));
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
