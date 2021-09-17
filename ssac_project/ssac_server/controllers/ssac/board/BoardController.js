const con = require("../../modules/mysql");

const BoardController = {
  readAlldata: (req, res) => {
    const sql = "select * from boardr";
    con.query(sql, (err, result) => {
      if (err)
        return res.status(400).json({
          message: "조회 실패",
        });

      res.status(200).json({
        message: "조회 성공",
        data: result,
      });
    });
  },

  readIdxdata: (req, res) => {
    const { idx } = req.params;
    const sql = "select * from board where boardIdx =?";
    const params = [idx];
    con.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({
          message: "error",
        });
      } else if (Number(idx)) {
        res.status(200).json({
          data: result,
        });
      } else {
        res.status(401).json({
          message: "error",
        });
      }
    });
  },

  saveData: (req, res) => {
    const { title, content, boardPw, writer } = req.body;
    const sql = "insert into board values (?, ?, ?, ?, ?, ?)";
    const params = [boardIdx, writer, title, content, writeTime, boardPw];
    con.query(sql, params, (err, result) => {
      if (err)
        return res.status(400).json({
          message: "error",
        });

      res.status(200).json({
        data: {
          boardIdx: boardIdx,
          writer: writer,
          title: title,
          content: content,
          writeTime: Date(),
          boardPw: boardPw,
        },
      });
    });
  },

  deleteData: (req, res) => {
    const { idx } = req.params;
    const sql = "delete from board where boardIdx=?";
    const params = [idx];
    con.query(sql, params, (err, result) => {
      if (Number(idx)) {
        res.status(200).json({
          message: "삭제 완료",
        });
      } else {
        res.status(400).json({
          message: "error",
        });
      }
    });
  },
};

module.exports = BoardController;
