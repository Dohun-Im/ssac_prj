const con = require("../../modules/mysql");

const AuthController = {
  signup: (req, res) => {
    const { id, name, password } = req.body;
    const sql = "insert into user ( id, name, password ) values (?, ?, ?)";
    const params = [id, name, password];

    con.query(sql, params, (err, result) => {
      const sql2 = "select id from user where id=?";
      const params2 = [id];
      con.query(sql2, params2, (err, result) => {
        if (id)
          return res.status(400).json({
            message: "중복된 아이디가 존재합니다",
          });
      });

      res.status(200).json({
        message: "회원가입이 완료되었습니다",
        data: result,
      });
    });
  },

  login: (req, res) => {
    const { id, password } = req.body;
    const sql = "select (id, password) from user where (?,?)";
    const params = [id, password];
    // if (id === id && password === password) {
    const check = [];
    con.query(sql, params, (err, result) => {
      if (err)
        return res.status(400).json({
          message: "오류 발생",
        });
      if (req.body === result) {
        res.status(200).json({
          message: "로그인 성공",
          data: result,
        });
      } else {
        res.status(401).json({
          message: "아이디 또는 비밀번호가 일치하지 않습니다.",
        });
      }
    });
  },
};

module.exports = AuthController;
