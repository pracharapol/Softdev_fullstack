var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const secret = 'fullstack-login2022'


app.use(cors())

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mydb'
});


const checkEmailError = (req, res, results) => {
    if (results.length > 0) {
        results.forEach(element => {
            if (((element.email.toLowerCase() == req.body.email.toLowerCase()))) {
                res.json({ status: 'emailDuplecate' })
                return;
            }
            else if ((element.fname.toLowerCase() == req.body.fname.toLowerCase()) && (element.Iname.toLowerCase() == req.body.Iname.toLowerCase())) {
                res.json({ status: 'nameDuplecate' })
                return;
            }
        }

        );
    }
}


app.post('/register', jsonParser, function (req, res, next) {
    connection.execute(
        'SELECT * FROM users WHERE email=? or fname=?', [req.body.email, req.body.fname],
        function (err, results) {
            if (err) {
                res.json({ status: 'error', message: err })
                return
            }
            else {
                if (results.length > 0) {
                    checkEmailError(req, res, results)
                }

                else {
                    if (0 == 1) {

                    }
                    else {
                        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                            connection.execute(
                                'INSERT INTO users (email, password, fname, Iname) VALUES (?, ?, ?, ?)',

                                [req.body.email, hash, req.body.fname, req.body.Iname],
                                function (err, results, fields) {
                                    if (err) {
                                        res.json({ status: 'error', message: err })
                                        return
                                    }
                                    res.json({ status: 'ok' })
                                }
                            );
                        });
                    }
                }
            }
        }
    )

})


app.post('/login', jsonParser, function (req, res, next) {
    connection.execute(
        'SELECT * FROM users WHERE email=?',
        [req.body.email],
        function (err, users, fields) {
            if (err) {
                res.json({ status: 'error', message: err })
                return
            }
            if (users.length == 0) {
                res.json({ status: 'error', message: 'no user found' })
                return
            }
            bcrypt.compare(req.body.password, users[0].password, function (err, isLogin) {
                if (isLogin) {
                    var token = jwt.sign({ email: users[0].email }, secret, { expiresIn: '1h' });
                    res.json({ status: 'ok', message: 'login success', token })

                }
                else {
                    res.json({ status: 'error', message: 'login failed' })
                }
            });
        }
    );
})


app.post('/authen', jsonParser, function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]
        var decoded = jwt.verify(token, secret);
        res.json({ status: 'ok', decoded })
    } catch (err) {
        res.json({ status: 'error', message: err.message })
    }
})


app.get('/getname/:token', function (req, res) {
    try {
        const decode = jwt.verify(req.params.token, secret);
        const { email } = decode
        connection.execute(
            'SELECT fname,Iname FROM users WHERE email=?',
            [email],
            function (err, results) {
                if (err) {
                    res.json({ status: 'error', message: err })
                    return
                }
                if (results.length == 0) {
                    res.json({ status: 'error', message: 'no user found' })
                    return
                }
                let Usname = results[0].fname + ["   "] + results[0].Iname
                res.json({ status: 'ok', message: 'success', usname: Usname })
                return
            }

        )

    } catch (err) {
        res.json({ status: 'error', message: err.message })
    }

})


app.get('/getscore/:token', function (req, res) {
    try {
        const decode = jwt.verify(req.params.token, secret);
        const { email } = decode
        connection.execute(
            'SELECT score FROM users WHERE email=?',
            [email],
            function (err, results,) {
                if (err) {
                    res.json({ status: 'error', message: err })
                    return
                }
                if (results.length == 0) {
                    res.json({ status: 'error', message: 'no user found' })
                    return
                }
                let Uscore = results[0].score
                res.json({ status: 'ok', message: ' get usname sussess', Uscore: Uscore })
            }
        )
    } catch (err) {
        res.json({ status: 'error', message: err.message })
    }
})


app.put('/newPassword', jsonParser, function (req, res) {
    const decode = jwt.verify(req.body.token, secret);
    const { email } = decode
    connection.query(
        'SELECT password FROM users WHERE email=?', [email],
        function (err, users, fields) {
            bcrypt.compare(req.body.password, users[0].password, function (err, isLogin) {
                
                if (isLogin) {

                    bcrypt.hash(req.body.newPassword, saltRounds, function (err, hash) {

                        connection.execute(
                            'UPDATE users SET password =? WHERE email=? ', [hash, email],

                            function (err, results) {

                                if (err) {
                                    res.json({ status: 'error', message: err })
                                    return
                                }
                                if (results.length == 0) {
                                    res.json({ status: 'not found user ' })
                                    return
                                }
                                if (req.body.password == hash) {
                                    res.json({ status: 'error', message: err })
                                    return
                                }
                                else {
                                   
                                    res.send(results)
                                    return
                                }
                            }
                        );
                    });
                }
                else {
                    res.json({ status: 'error', message: 'Your password is incorrect.' })
                }
                if (err) {
                    res.json({ status: 'error', message: err })
                    return
                }


            }
            );
        });
})


const check = async (type) => {
    if (type == 'Green') {
        
        return 10
    }
    else if (type == 'Yellow') {
        
        return 5
    }
    else if (type == 'Red') {
        
        return 1
    }
    return 0
}

app.put('/updatescore', jsonParser, async function (req, res) {
    try {
        console.log(req.body)
        const decode = jwt.verify(req.body.token, secret);
        const { email } = decode
        const type = req.body.type
        const count = await check(type)
        connection.query(
            'SELECT score, id FROM users WHERE email=?',
            [email],
            function (err, results, fields) {
                if (err) {
                    res.json({ status: 'error', message: err })
                    return
                }
                console.log(results)
                if (results.length == 0) {
                    res.json({ status: 'error', message: 'no user found' })
                    return
                }
                else{
                    let Uscore = results[0].score + count
                connection.query(
                    "UPDATE users SET score = ? WHERE id = ?",
                    [Uscore, results[0].id],
                    function (errors1, results1, fields1) {
                        if (errors1 || results1.length == 0) {
                            res.json({ status: 'error', message: err })
                            return
                        }
                        if (results1) {
                            
                            return res.json({ status: 'ok', message: ' get usname sussess', Uscore: Uscore })
                        }
                    })
                }
            })
    } catch (err) {
        return res.json({ status: 'error', message: err.message })
    }
})


app.get('/ranking', function (req, res) {

    connection.connect(function(err) {
        if (err) throw err;
        
        connection.query('SELECT Iname,fname, score FROM users ORDER BY score DESC', function (err, results) {
          if (err) throw err;
          
          let Usrank = results[0].fname + ["   "] + ["   "] + results[0].Iname 
          let Usrank1 = results[1].fname + ["   "] + ["   "] + results[1].Iname 
          let Usrank2 = results[2].fname + ["   "] + ["   "] + results[2].Iname 
          let Usrank3 = results[3].fname + ["   "] + ["   "] + results[3].Iname 
          let Usrank4 = results[4].fname + ["   "] + ["   "] + results[4].Iname
          let Usrank5 = results[5].fname + ["   "] + ["   "] + results[5].Iname
          let Usrank6 = results[6].fname + ["   "] + ["   "] + results[6].Iname 
          let Usrank7 = results[7].fname + ["   "] + ["   "] + results[7].Iname 
          let Usrank8 = results[8].fname + ["   "] + ["   "] + results[8].Iname
          let Usrank9 = results[9].fname + ["   "] + ["   "] + results[9].Iname
          let Srank =results[0].score 
          let Srank1 =results[1].score 
          let Srank2 =results[2].score 
          let Srank3 =results[3].score 
          let Srank4 =results[4].score 
          let Srank5 =results[5].score
          let Srank6 =results[6].score
          let Srank7 =results[7].score
          let Srank8 =results[8].score
          let Srank9 =results[9].score 
                res.json({ status: 'ok', message: 'success', usrank: Usrank, usrank1:Usrank1, usrank2:Usrank2, usrank3:Usrank3, usrank4:Usrank4, usrank5:Usrank5, usrank6: Usrank6, usrank7: Usrank7, usrank8: Usrank8, usrank9: Usrank9, srank:Srank, srank1:Srank1, srank2:Srank2, srank3:Srank3, srank4:Srank4,srank5:Srank5 ,srank6:Srank6, srank7:Srank7, srank8:Srank8, srank9:Srank9, })
                  
        });
      });
})

app.listen(3333, function () {
    console.log('CORS-enabled web server listening on port 3333')
})