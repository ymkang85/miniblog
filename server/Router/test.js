const express = require('express');
const router = express.Router();

const mysqlConnObj = require("../config/mysql");
const conn = mysqlConnObj.init();
mysqlConnObj.open(conn);

router.get('/', (req, res)=>{
  const sql = "select * from datadb";
  conn.query(sql, (err, row, fields) =>{
    if(err){
      console.log(err);
    } else{
      res.json(row);
    }
  })
});

module.exports = router;