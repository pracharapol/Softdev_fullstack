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
const req = require('express/lib/request');
const { timeout } = require('nodemon/lib/config')
const connection = mysql.createConnection({
    // password: 'Kongilllk5555',
    host: 'localhost',
    user: 'root',
    database: 'mydb'
});


const checkEmailError = (req, res, results) => {
    if (results.length > 0) {
        for (let i = 0; i < results.length; i++) {
            if (((results[i].email.toLowerCase() == req.body.email.toLowerCase())) || [((results[i].fname.toLowerCase() == req.body.fname.toLowerCase()) && (results[i].Iname.toLowerCase() == req.body.Iname.toLowerCase()))]) {
                return true
            }
        }
        return false
    }
}


app.post('/register', jsonParser, function (req, res, next) {
    connection.execute(
        'SELECT * FROM users WHERE email=? or fname=? and Iname=?', [req.body.email, req.body.fname, req.body.Iname],
        function (err, results) {
            if (err) {
                return res
                    .json({ status: 'error', message: err })
            }
            else {
                if (checkEmailError(req, res, results)) {
                    return res.json({ status: 'email or name Duplecate' });
                }
                else {
                    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                        connection.execute(
                            'INSERT INTO users (email, password, fname, Iname) VALUES (?, ?, ?, ?)',
                            [req.body.email, hash, req.body.fname, req.body.Iname],
                            function (err, results, fields) {
                                if (err) {
                                    return res
                                        .json({ status: 'error', message: err })

                                }
                                return res
                                    .json({ status: 'ok' })
                            }
                        );
                    });
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
    )
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
            'SELECT fname,Iname,email FROM users WHERE email=?',
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
                let Usemail = results[0].email
                res.json({ status: 'ok', message: 'success', usname: Usname, usemail: Usemail })
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

app.get('/getcoin/:token', function (req, res) {
    try {
        const decode = jwt.verify(req.params.token, secret);
        const { email } = decode
        connection.execute(
            'SELECT coin FROM users WHERE email=?',
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
                let Uscoinn = results[0].coin
                res.json({ status: 'ok', message: ' get usname sussess', Uscoinn: Uscoinn })
            }
        )
    } catch (err) {
        res.json({ status: 'error', message: err.message })
    }
})

app.get('/getscoref/:token', function (req, res) {
    try {
        const decode = jwt.verify(req.params.token, secret);
        const { email } = decode
        connection.execute(
            'SELECT scoref FROM users WHERE email=?',
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
                let Uscoref = results[0].scoref
                res.json({ status: 'ok', message: ' get usname sussess', Uscoref: Uscoref })
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

        return 3
    }
    else if (type == 'Yellow') {

        return 2
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
                else {
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


app.put('/updatescoref', jsonParser, async function (req, res) {
    try {
        console.log(req.body)
        const decode = jwt.verify(req.body.token, secret);
        const { email } = decode
        const type = req.body.type
        const count = await check(type)
        connection.query(
            'SELECT scoref, id FROM users WHERE email=?',
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
                else {
                    let Uscoref = results[0].scoref + count
                    connection.query(
                        "UPDATE users SET scoref = ? WHERE id = ?",
                        [Uscoref, results[0].id],
                        function (errors1, results1, fields1) {
                            if (errors1 || results1.length == 0) {
                                res.json({ status: 'error', message: err })
                                return
                            }
                            if (results1) {

                                return res.json({ status: 'ok', message: ' get usname sussess', Uscoref: Uscoref })
                            }
                        })
                }
            })
    } catch (err) {
        return res.json({ status: 'error', message: err.message })
    }
})


app.put('/updatecoin', jsonParser, async function (req, res) {
    try {
        console.log(req.body)
        const decode = jwt.verify(req.body.token, secret);
        const { email } = decode
        const type = req.body.type
        const count = await check(type)
        connection.query(
            'SELECT coin, id FROM users WHERE email=?',
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
                else {
                    let Uscoin = results[0].coin + count
                    connection.query(
                        "UPDATE users SET coin = ? WHERE id = ?",
                        [Uscoin, results[0].id],
                        function (errors1, results1, fields1) {
                            if (errors1 || results1.length == 0) {
                                res.json({ status: 'error', message: err })
                                return
                            }
                            if (results1) {

                                return res.json({ status: 'ok1', message: ' get usname sussess', Uscoin: Uscoin })
                            }
                        })
                }
            })
    } catch (err) {
        return res.json({ status: 'error', message: err.message })
    }
})


const checkcoin = async (type) => {

    if (type == 'discount10') {

        return 100
    }
    else if (type == 'discount20') {

        return 200
    }
    else if (type == 'discount50') {

        return 500
    }
    else if (type == 'discount100') {

        return 1000
    }
    return 0
}


app.put('/deletecoin', jsonParser, async function (req, res) {
    try {
        console.log(req.body)
        const decode = jwt.verify(req.body.token, secret);
        const { email } = decode
        const type = req.body.type
        const count = await checkcoin(type)
        connection.query(
            'SELECT coin, id FROM users WHERE email=?',
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
                else if (type == 'discount10' && results[0].coin >= 100) {

                    let Uscoin1 = results[0].coin - count

                    connection.query(
                        "UPDATE users SET coin = ? WHERE id = ?",
                        [Uscoin1, results[0].id],
                        function (errors1, results1, fields1) {
                            if (errors1 || results1.length == 0) {
                                res.json({ status: 'error', message: err })

                                return
                            }
                            if (results1) {

                                return res.json({ status: 'ok1', message: ' get usname sussess', Uscoin1: Uscoin1 })
                            }
                        })
                }
                else if (type == 'discount20' && results[0].coin >= 200) {

                    let Uscoin1 = results[0].coin - count

                    connection.query(
                        "UPDATE users SET coin = ? WHERE id = ?",
                        [Uscoin1, results[0].id],
                        function (errors1, results1, fields1) {
                            if (errors1 || results1.length == 0) {
                                res.json({ status: 'error', message: err })
                                return
                            }
                            if (results1) {

                                return res.json({ status: 'ok1', message: ' get usname sussess', Uscoin1: Uscoin1 })
                            }
                        })
                }
                else if (type == 'discount50' && results[0].coin >= 500) {

                    let Uscoin1 = results[0].coin - count

                    connection.query(
                        "UPDATE users SET coin = ? WHERE id = ?",
                        [Uscoin1, results[0].id],
                        function (errors1, results1, fields1) {
                            if (errors1 || results1.length == 0) {
                                res.json({ status: 'error', message: err })
                                return
                            }
                            if (results1) {

                                return res.json({ status: 'ok1', message: ' get usname sussess', Uscoin1: Uscoin1 })
                            }
                        })
                }
                else if (type == 'discount100' && results[0].coin >= 1000) {

                    let Uscoin1 = results[0].coin - count

                    connection.query(
                        "UPDATE users SET coin = ? WHERE id = ?",
                        [Uscoin1, results[0].id],
                        function (errors1, results1, fields1) {
                            if (errors1 || results1.length == 0) {
                                res.json({ status: 'error', message: err })
                                return
                            }
                            if (results1) {

                                return res.json({ status: 'ok1', message: ' get usname sussess', Uscoin1: Uscoin1 })
                            }
                        })
                }
                else {

                    res.json({ status: 'error', message: err })
                    return
                }
            })
    } catch (err) {
        return res.json({ status: 'error', message: err.message })
    }
})


app.get('/ranking', function (req, res) {

    connection.connect(function (err) {
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
            let Srank = results[0].score
            let Srank1 = results[1].score
            let Srank2 = results[2].score
            let Srank3 = results[3].score
            let Srank4 = results[4].score
            let Srank5 = results[5].score
            let Srank6 = results[6].score
            let Srank7 = results[7].score
            let Srank8 = results[8].score
            let Srank9 = results[9].score
            res.json({ status: 'ok', message: 'success', usrank: Usrank, usrank1: Usrank1, usrank2: Usrank2, usrank3: Usrank3, usrank4: Usrank4, usrank5: Usrank5, usrank6: Usrank6, usrank7: Usrank7, usrank8: Usrank8, usrank9: Usrank9, srank: Srank, srank1: Srank1, srank2: Srank2, srank3: Srank3, srank4: Srank4, srank5: Srank5, srank6: Srank6, srank7: Srank7, srank8: Srank8, srank9: Srank9, })

        });
    });
})



app.put('/resetscore', jsonParser, async function (req, res) {
    connection.connect(function (err) {

        if (err) throw err;
        connection.query('SELECT coin, id FROM users ORDER BY score DESC', function (err, results) {
            if (err) throw err;
            let top1 = results[0].coin + 200
            let top2 = results[1].coin + 100
            let top3 = results[2].coin + 50
            connection.query(
                "UPDATE users SET coin = ? WHERE id = ?",
                [top1, results[0].id],
                function (errors1, results1, fields1) {
                    if (errors1 || results1.length == 0) {
                        res.json({ status: 'error', message: err })
                        return
                    }
                    connection.query(
                        "UPDATE users SET coin = ? WHERE id = ?",
                        [top2, results[1].id],
                        function (errors1, results1, fields1) {
                            if (errors1 || results1.length == 0) {
                                res.json({ status: 'error', message: err })
                                return
                            }
                            connection.query(
                                "UPDATE users SET coin = ? WHERE id = ?",
                                [top3, results[2].id],
                                function (errors1, results1, fields1) {
                                    if (errors1 || results1.length == 0) {
                                        res.json({ status: 'error', message: err })
                                        return
                                    }
                                    connection.query('UPDATE users SET score = 0 WHERE score >= 0', function (err, result) {
                                        if (err) throw err;
                                        res.json({ status: 'ok', message: 'Delete success', top1:top1, top2:top2, top3:top3})
                        
                                    });
                                })

                        })

                })
            
           
            

        });
    });
})



app.listen(3333, function () {
    console.log('CORS-enabled web server listening on port 3333')
})