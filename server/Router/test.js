const express = require('express');
const router = express.Router();

const mysqlConnObj = require("../config/mysql");
const conn = mysqlConnObj.init();
mysqlConnObj.open(conn);

router.get('/', (req, res) => {
  const sql = "select * from datadb";
  conn.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.json(row);
    }
  })
});

router.get('/:id', (req, res) => {
  const sql = "select d.id as id, d.title as title, d.content as content, c.content as comments, c.id as c_id from commentdb as c  join datadb as d on c.datadb_id=d.id where d.id = ?";
  const id = req.params.id;
  conn.query(sql, id, (err, rs, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.send(rs);
    }
  })
})

router.get('/post/:id', (req, res) => {
  const num = req.params.id;
  console.log(num);
  const sql = "select * from commentdb where datadb_id = ?";
  conn.query(sql, num, (err, res, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.send(res);
    }
  })
})

router.get('/post-write', (req, res) => {
  res.render("post-write");
})

router.post("/post-write", (req, res) => {
  const rs = req.body;
  console.log(rs);
  const sql = "insert into datadb(title, content) values(?,?)";
  conn.query(sql, [rs.title, rs.content], (err, res, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  })
})

module.exports = router;