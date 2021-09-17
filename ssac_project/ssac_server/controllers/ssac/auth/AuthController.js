const con = require("../../../modules/mysql");

//순서
const AuthController = {
  signup: (req, res) => {
    const { id, name, password } = req.body;
    const sql = "select id from user where id=?";
    const params = [id];
    con.query(sql, params, (err, result) => {
      if (err) {
        return res.status(400).json({
          message: "error",
        });
      }
      if (result.length === 0) {
        const sql2 =
          "insert into user ( id, name, password ) values (?, ?, ?) ";
        const params2 = [id, name, password];
        con.query(sql2, params2, (err, result) => {
          if (err) {
            return res.status(400).json({
              message: "error",
            });
          }

          res.status(200).json({
            message: "회원가입이 완료되었습니다.",
            data: result,
          });
        });
      } else {
        res.status(401).json({
          message: "중복된 아이디가 존재합니다",
        });
      }
    });
  },

  login: (req, res) => {
    const { id, password } = req.body;
    const sql = "select * from user where id = ? and password = ?";
    const params = [id, password];
    con.query(sql, params, (err, result) => {
      if (err)
        return res.status(400).json({
          message: "오류 발생",
        });
      if (result.length === 0) {
        res.status(401).json({
          message: "아이디 또는 비밀번호가 일치하지 않습니다.",
        });
      } else {
        res.status(200).json({
          message: "로그인 성공",
        });
      }
    });
  },
};

module.exports = AuthController;
