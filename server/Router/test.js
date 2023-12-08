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
      console.log("글 검색 성공");
    }
    res.json(row);
  })
});

router.get('/:id', (req, res) => {
  let sql = "select * from datadb where id = ?";
  const id = req.params.id;
  conn.query(sql, id, (err, rs, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rs);
    }
  })
});

router.get('/post/:id', (req, res) => {
  const num = req.params.id;
  const sql = "select * from commentdb where datadb_id = ?";
  conn.query(sql, num, (err, rs, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log('검색성공');
    }
    res.json(rs);
  })
});

router.get('/post-write', (req, res) => {
  res.render("/post-write");
});

router.post("/post-write", (req, res) => {
  const rs = req.body;
  console.log(rs);
  const sql = "insert into datadb(title, content) values(?,?)";
  conn.query(sql, [rs.title, rs.content], (err, row, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log('글쓰기 성공');
    }
    res.send(row);
  })
});

router.post("/delete", (req, res) => {
  const rs = req.body.id;
  console.log(rs);
  let sql = "delete from commentdb where datadb_id = ?";
  conn.query(sql, rs, (err, row, fields) => {
    if (err) {
      console.log(err);
    } else {
      sql = "delete from datadb where id = ?";
      conn.query(sql, rs, (err, row, fields) => {
        if (err) {
          console.log(err);
        } else {
          console.log('삭제성공');
        }
        res.json(row);
      })
    }
  })
});

router.post("/update/:id", (req, res) => {
  const rs = req.body;
  const { id } = req.params;
  const sql = "update datadb set ? where id = ?";
  conn.query(sql, [{
    title: rs.title,
    content: rs.content
  }, id],
    (err, row, fields) => {
      if (err)
        console.log(err);
      else {
        console.log('업데이트 성공');
      }
      res.json(row);
    });
});

router.get('/comment-write', (req, res) => {
  res.render("/comment-write");
});

router.post("/comment-write", (req, res) => {
  const rs = req.body;
  let sql = "select max(id) as max from commentDb where datadb_id = ? ";
  conn.query(sql, rs.id, (err, row, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log(rs.content);
      row[0].max === null ? row[0].max = 0 : row[0].max = parseInt((row[0].max).toString().substr(rs.id.length));
      sql = "insert into commentDb(id, content, datadb_id) values(?,?,?)";
      conn.query(sql, [rs.id + (row[0].max + 1), rs.content, parseInt(rs.id)], (err, rows, fields) => {
        if (err) {
          console.log(err);
        } else {
          console.log('코멘트 입력완료!!');
        }
        res.json(rows);
      });
    }
  });
});

router.post("/comment_delete", (req, res) => {
  const rs = req.body;
  const id = rs.comment.id;
  let sql = "delete from commentdb where id = ?";
  conn.query(sql, id, (err, row, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log('삭제성공!!');
    }
    res.send(row);
  })
});

router.post("/comment_update/:id", (req, res) => {
  const rs = req.body;
  const content = rs.commentData;
  const id = rs.comment.id;

  const sql = "update commentdb set ? where id = ?";
  conn.query(sql, [{
    content: content
  }, id],
    (err, row, fields) => {
      if (err)
        console.log(err);
      else {
        console.log('댓글 업데이트 !! ');
      }
      res.send(row);
    });
});

module.exports = router;