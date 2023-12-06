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
  let sql = "select * from datadb where id = ?";
  const id = req.params.id;
  conn.query(sql, id, (err, rs, fields) => {
    if (err) {
      console.log(err);
    } else {
      sql = "select * from commentdb where datadb_id = ?";
      conn.query(sql, id, (err, row, fields) => {
        if (err) {
          console.log(err);
        } else {
          res.send(rs);
        }
      })
    }
  })
})

router.get('/post/:id', (req, res) => {
  const num = req.params.id;
  const sql = "select * from commentdb where datadb_id = ?";
  conn.query(sql, num, (err, rs, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.send(rs);
    }
  })
})

router.get('/post-write', (req, res) => {
  res.render("/post-write");
})

router.post("/post-write", (req, res) => {
  const rs = req.body;
  console.log(rs);
  const sql = "insert into datadb(title, content) values(?,?)";
  conn.query(sql, [rs.title, rs.content], (err, row, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  })
})

router.get('/comment-write', (req, res) => {
  res.render("/comment-write");
})

router.post("/comment-write", (req, res) => {
  const rs = req.body;
  let sql = "select max(id) as max from commentdb where datadb_id = ? ";
  conn.query(sql, rs.id, (err, row, fields) => {
    if (err) {
      console.log(err);
    } else {
      if (row[0].max === null) {
        row[0].max = (rs.id * 10);
      }
      sql = "insert into commentdb(id, content, datadb_id) values(?,?,?)";
      conn.query(sql, [row[0].max + 1, rs.content, rs.id], (err, rows, fields) => {
        if (err) {
          console.log(err);
        } else {
          console.log('코멘트 입력완료!!');
          res.redirect('/');
        }
      });
    }
  });
});

module.exports = router;