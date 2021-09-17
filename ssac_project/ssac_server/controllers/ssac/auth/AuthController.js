const con = require("../../../modules/mysql");

//순서
const AuthController = {
  signup: (req, res) => {
    const { id, name, password } = req.body;
    // 중복된 유저 존재하는지
    const sql = "select id from user where id=?";
    const params = [id];

    const sql2 = "insert into user ( id, name, password ) values (?, ?, ?) ";
    const params2 = [id, name, password];
    con.query(sql, params, (err, result) => {
      if (err)
        return res.status(400).json({
          message: "error",
        });

      if (result.length !== 0) {
        res.status(400).json({
          message: " 중복된 아이디 존재합니다.",
        });
      } else {
        con.query(sql2, params2, (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "DB 서버 에러",
            });
          }

          res.status(200).json({
            message: "회원가입이 완료되었습니다.",
          });
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
        return res.status(500).json({
          message: "DB 서버 에러",
        });
      if (result.length !== 0) {
        res.status(200).json({
          message: "로그인 성공",
        });
      } else {
        res.status(400).json({
          message: "아이디 또는 비밀번호가 일치하지 않습니다.",
        });
      }
    });
  },
};

module.exports = AuthController;
