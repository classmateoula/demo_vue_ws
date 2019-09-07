const connection = require('../common')
connection.connect()
var sql = 'SELECT * FROM user_list'

module.exports = function () {
  return new Promise((resolve, rej) => {
    connection.query(sql, function (err, res) {
      return err ? rej(err) : resolve(res)
    })
  })
}