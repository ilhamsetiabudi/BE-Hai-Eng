const pg = require("pg");
const bcrypt = require("bcryptjs");
const DatabaseConnection = require("../Config/dbp.config.json");
var DB = new pg.Pool(DatabaseConnection.config);

const dt = {
  //USER DATA LAYER
  readUserAllHandlerData: callback => {
    DB.connect(function(err, client, done) {
      var data = "";
      if (err) {
        data = err;
      }
      client.query("SELECT * FROM user1 WHERE is_deleted = (false)", function(
        err,
        result
      ) {
        // console.log(err);

        done();
        if (err) {
          data = err;
        } else {
          data = result.rows;
        }
        callback(data);
      });
    });
  },
  createUserAllHandlerData: (callback, docs) => {
    DB.connect(function(err, client, done) {
      var data = "";
      if (err) {
        data = err;
      }

      var salt = bcrypt.genSaltSync(10);
      let pashash = bcrypt.hashSync(docs.password, salt);

      const query = {
        text:
          "INSERT INTO user1 (username, password, is_deleted, status, login_ke, email) VALUES ($1, $2, $3, $4, $5, $6)",
        values: [docs.username, pashash, docs.is_deleted, docs.status, docs.login_ke, docs.email]
      };
      console.log(JSON.stringify(query))

      client.query(query, function(err, result) {

        done();
        console.log(result);
        if (err) {
          data = err;
        } else {
          data = result.rows;
        }
        callback(data);
      });
    });
  },
  updateUserAllHandlerData: (callback, docs) => {
    DB.connect(function(err, client, done) {
      var data = "";
      if (err) {
        data = err;
      }

      var salt = bcrypt.genSaltSync(10);
      let pashash = bcrypt.hashSync(docs.password, salt);

      const query = {
        text: "UPDATE user1 SET username = ($1), is_deleted = ($2), status = ($3), email = ($4) where id = ($5)",
        values: [docs.username, docs.is_deleted, docs.status, docs.email, docs.id]
      };
      console.log(JSON.stringify(query));

      client.query(query, function(err, result) {
        done();
        if (err) {
          data = err;
        } else {
          data = result.rows;
        }
        callback(data);
      });
    });
  },
  deletUserAllHandlerData: (callback, docs) => {
    DB.connect(function(err, client, done) {
      var data = "";
      if (err) {
        data = err;
      }

      const query = {
        text: "UPDATE user1 SET is_deleted = (true) WHERE username = ($1)",
        values: [docs.username]
      };

      client.query(query, function(err, result) {
        done();
        if (err) {
          data = err;
        } else {
          data = result.rows;
        }
        callback(data);
      });
    });
  },
  readOneUserByIdData: (callback, username) => {
    // console.log(username);
    DB.connect(function(err, client, done) {
      var data = "";
      if (err) {
        data = err;
      }
      // console.log(JSON.stringify(data));

      const query = {
        text: "SELECT * FROM user1 WHERE username = ($1)",
        values: [username]
      };
      // console.log(JSON.stringify(query));

      client.query(query, function(err, result) {
        done();

        if (err) {
          data = err;
        } else {
          data = result.rows;
        }
        // console.log(JSON.stringify(data.username));

        callback(data);
      });
    });
  },

  registeruser: (callback, docs) => {
    DB.connect(function(err, client, done) {
      var data = "";
      if (err) {
        data = err;
      }

      var salt = bcrypt.genSaltSync(10);
      let pashash = bcrypt.hashSync(docs.password, salt);

      const query = {
        text:
          "INSERT INTO user1 (username, password, is_deleted, status, login_ke, email) VALUES ($1, $2, $3, $4, $5, $6)",
        values: [docs.username, pashash, docs.is_deleted, docs.status, docs.login_ke, docs.email]
      };
      console.log(JSON.stringify(query))

      client.query(query, function(err, result) {

        done();
        console.log(result);
        if (err) {
          data = err;
        } else {
          data = result.rows;
        }
        callback(data);
      });
    });
  },

  updateAttemptUser: username => {
    DB.connect(function(err, client, done) {
      var data = "";
      if (err) {
        data = err;
      }

      const query = {
        text:
          "UPDATE user1 SET login_ke = (login_ke + 1), login_terakhir = now() where username = ($1)",
        values: [username]
      };

      client.query(query, function(err, result) {
        done();
        if (err) {
          data = err;
        } else {
          data = result.rows;
        }
        // callback(data);
      });
    });
  },
  resetAttemptUser: username => {
    DB.connect(function(err, client, done) {
      var data = "";
      if (err) {
        data = err;
      }

      const query = {
        text:
          "UPDATE user1 SET login_ke = 0, status = 'unlocked' where username = ($1)",
        values: [username]
      };

      client.query(query, function(err, result) {
        done();
        if (err) {
          data = err;
        } else {
          data = result.rows;
        }
        //callback(data);
      });
    });
  },
  lockUser: username => {
    DB.connect(function(err, client, done) {
      var data = "";
      if (err) {
        data = err;
      }

      const query = {
        text: "UPDATE user1 SET status = 'locked' where username = ($1)",
        values: [username]
      };

      console.log(JSON.stringify(query));
      client.query(query, function(err, result) {
        done();
        if (err) {
          data = err;
        } else {
          data = result.rows;
        }
        //callback(data);
      });
    });
  },
  unlockUser: username => {
    DB.connect(function(err, client, done) {
      var data = "";
      if (err) {
        data = err;
      }

      const query = {
        text: "UPDATE user1 SET status = 'unlocked' where username = ($1)",
        values: [username]
      };

      console.log(JSON.stringify(query));
      client.query(query, function(err, result) {
        done();
        if (err) {
          data = err;
        } else {
          data = result.rows;
        }
        //callback(data);
      });
    });
  },
  readProvinsiAllHandlerData: callback => {
    DB.connect(function(err, client, done) {
      var data = "";
      if (err) {
        data = err;
      }
      client.query("SELECT * FROM provinsi", function(err, result) {
        // console.log(err);

        done();
        if (err) {
          data = err;
        } else {
          data = result.rows;
        }
        callback(data);
      });
    });
  },
  readKotaAllHandlerData: callback => {
    DB.connect(function(err, client, done) {
      var data = "";
      if (err) {
        data = err;
      }
      client.query("SELECT * FROM kota", function(err, result) {
        //console.log(err);

        done();
        if (err) {
          data = err;
        } else {
          data = result.rows;
        }
        callback(data);
      });
    });
  },

  createNilaiMahasiswa: (kode_mahasiswa) => {
    DB.connect(function (err, client, done) {
        console.log(kode_mahasiswa)
        const query = {
            text: 'INSERT INTO nilai(kode_mahasiswa) VALUES($1)',
            values: [kode_mahasiswa],
        }
        client.query(query)
        done()

    })
},

//   readAlamat: (callback, docs) => {
//     DB.connect(function(err, client, done) {
//       var data = "";
//       if (err) {
//         data = err;
//       }
//       const query = {
//         text:
//           "SELECT * FROM kota k inner join provinsi p on k.kode_provinsi = p.kode_provinsi WHERE kode_provinsi = ($1)",
//         values: [
//           docs.kode_provinsi,
//           docs.nama_provinsi,
//           docs.kota_kota,
//           docs.nama_kota
//         ]
//       };
//       client.query(query, function(err, result) {
//         done();
//         if (err) {
//           data = err;
//         } else {
//           data = result.rows;
//         }
//         callback(data);
//       });
//     });
//   }
};

module.exports = dt
