var express = require('express');
var bodyParser = require("body-parser");
var mysql = require('mysql');
var app = express();

var FCM = require('fcm-node')

var serverKey ={
    
        "type": "service_account",
        "project_id": "hostelfood-88be6",
        "private_key_id": "e849b33c11d1bad18b55258566d997ef1f708c11",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC2DnFsnBpKOX9w\nX0F6eBGR+SgdexVYExta/EBJyLQC3RXXsrf2KNSnDuMlnfPI2NLfGl4fxULS/IhK\nTtvAsyCvi9o0lo7aLioBXm5VbvMLFw9tycadYMoB6zDTPAKcaYhSIsmcK2pGycpc\nv3BuSLTNrdrt5bLs9egdx2jBB/nKXPJl2dMkMvr5Idc38B15EwIsjumimK2V1Jh6\nsbfqCsc8ENoMiSaM3twxA+jO+HfYR+pVNYWR/5xmq7aEDAckQQ95GVAJlmhjtARQ\n3iOTMs+0AKa5ztgbdz02h+Nih5PtjhbeIaeCzGDlIvvrAbcqoWkq2nA9UNNNhHOh\n+9+QnvIRAgMBAAECggEAFJBEEoL9WzXsZZp00GsAfQ76D35oFkcuN1Q3xL3FS2+C\neJcovUa2YlpFoOma8CxBgU6+o/MJjcBVeqM2oij5f6qZzofVAeLl/rqWVtMN48pK\nhVmdtAgLOTVCEhH8r4MiETj5scibm/xN/bTn86UFuxewm19vGuHZwodUFz2Z4tf0\n/F6AhCKLKoxEx1kXkCli55fV7gf6rpZrTDs89A3Hf/A5VgVcuI2bwVsfkUihc2UM\nc1atmkPa7FOXW38V0enhELlR7g6sqpO/Z9yTKpmjbqr1wDDxENOu2cUyCbXBkjl/\n7+6zCw3ebM4RhO93EswDG8dSdxnpep8ypJ4sAqki2QKBgQDiRBaCJHl22S+xbPeO\nMLeZDBMd0p8HC3m+pnxnMwcvaqn5Xs2DI0Gj/whqFnlw8X2qXuEnS4WEehZCgbFU\n/qOhFStUWya3MoFSn54E5QxmNbHMPXG3CXBKXBLprlTEcDm1wDDPLt2Qq7UVaL4H\nn43Rk1st/k8HeJ+sYRmvBrgcTQKBgQDN+xUXdywG6giLyoacsSmOnY/IxhIBwCUl\nyPwgRXzSUyHFgVsyDX29B4k8V42ul9rEv0lSMMcRiY4dfzwzOknlnILf4YdohlgY\nm3svvarPx2/zvk6GvCHC9SdBxygzfJnVYxWozVtEH3mc4ba5uAgHBnEE/DJznAQV\ngPAAREf+1QKBgGy4DqCl6f8jSHlWRHT8D5voY18XDvaRmwPydyAXMsKj29xIozL5\nw9aK+n4PIncUci9ku4boENWg3AVEz/JpEDKcO1+jFK0+BUmwDHuJmzWZYz8h3vv1\n+xCfwS6rZ2ukCPa9zDYg7LFQ8AfDdluvXLNwvIUTBuIuIXrwhSjGb7yZAoGARfDE\nl6QqeeqLnlPVY20wjDFp+iVvRdLlii/1lEuj95Ksu/CRc6xrDn15ltivziHX8ch1\n8AeKAKVxcQib+1UGdIWxVq2wmchML4bTzEEdt9GjbOMorM1CtX0iqE4kk17yqScs\n2pVoMPhzBdcKgYNAjoocZDHyO5k1NcwDMkP9IkUCgYBy4cpz7Ga0KKLpBsExG0Rb\nY1IDlmN1MjDU9XgdS75qFt5Z+MamJL/3rNEyYlNe6eFJBoP6rEK3ro2qRVAfcwzf\nJCP+z+nodLenXxQbKP1ErBVPOosy+deXJcYAweXJlY8JF7PpXXhxt2ICtQ5Mk/Zb\nAuYUs8knMIaRN/meh/P01A==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-mvyvi@hostelfood-88be6.iam.gserviceaccount.com",
        "client_id": "108245412344627362196",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-mvyvi%40hostelfood-88be6.iam.gserviceaccount.com"
      
} //put the generated private key path here    
var fcm = new FCM(serverKey)
const PORT = process.env.PORT || 5000
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/public'));
var con = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: "sql12238535",
    password: "nuL2BRunqm",
    database: "sql12238535"
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
});

//Register
app.post('/register', function (req, res) {
    console.log(req.body.username);
    var uname = req.body.username;
    var pass = req.body.username;
    var data = {
        username: req.body.username,
        passw: req.body.password
    }
    con.query('insert into user set ?', data, function (err, result) {
        if (err) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({
                sucess: false
            }));
        } else if (result.affectedRows) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({
                sucess: true
            }));
        }
    });
})


//login
app.post('/login', function (req, res) {
    console.log(req.body.username);
    var uname = req.body.username;
    var pass = req.body.password;
    var sql = "select * from user where username = '" + uname + "' and passw='" + pass + "'";
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({
                sucess: false
            }));
            console.log(err);
        } else if (result[0]) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({
                sucess: true
            }));

        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({
                sucess: false
            }));
        }
        console.log(result.length);
    });
})
//add curries to data base
app.post('/adcurries', function (req, res) {
    var data = req.body;
    con.query('DELETE FROM `curries` WHERE 1',function(err,result){
        if(err){
            console.log("error occured");
        }
    });
    con.query('DELETE FROM `lastupdated` WHERE 1',function(err,result){
        if(err){
            console.log("error ocurred");
        }
    });
    var d = new Date();
    con.query("INSERT INTO `lastupdated`(`dt`) VALUES ('" + d + "')");
    var dt = [];
    Object.keys(data).forEach(key =>
        dt.push(data[key])
    );
    console.log(dt);
    con.query('DROP TABLE  todayorders', function (err, result) {
        if (err) {
            console.log("table not exist");
        }
    });
    var crsql = "CREATE TABLE `todayorders` (`username` VARCHAR(30) NOT NULL , `rice15` INT(1) NOT NULL , `rice20` INT(1) NOT NULL ,";
    for (i = 0; i < dt.length; i = i + 2) {
        crsql += "`" + dt[i] + "` INT(1) NOT NULL ,";
    }
    crsql += " `sambar` INT(1) NOT NULL ,`curd` INT(1) NOT NULL ,`total` INT(3) NOT NULL , UNIQUE (`username`)) ENGINE = InnoDB";
    console.log(crsql);
    con.query(crsql, function (err, result) {
        if (err) {
            console.log("table already exist");
        }
    });
    var sql = "INSERT INTO `curries`(`curry`, `cost`) VALUES ";
    for (i = 0; i < dt.length - 2; i++) {
        sql += "('" + dt[i] + "',";
        i = i + 1;
        sql += dt[i] + "),";
    }
    sql += "('" + dt[i] + "',";
    i = i + 1;
    sql += dt[i] + ")";
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({
                sucess: false
            }));
            console.log(err);
        } else if (result.affectedRows > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({
                sucess: true
            }));
            sendFCMPush();
        }
    });
});

//sending fcm messages
function sendFCMPush() {
    console.log("fcm");
    var fcms=[];
    con.query('SELECT * from `fcmtokens`',function(err,result){
        for(i=0;i<result.length;i++){
            fcms.push(result[i].token);
        }
    })
    setTimeout(function(){
        console.log(fcm);
        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            registration_ids: fcms, 
            
            notification: {
                title: 'Hostel Food', 
                body: 'Today Curries updated Place your order as early as possible' 
            }
        }
        fcm.send(message, function(err, response){
            if (err) {
                console.log(err)
            } else {
                console.log("Successfully sent with response: ", response)
            }
        })
    }
    ,1000)
}



// send list of curries 
app.get('/listofcurries', function (req, res) {
    con.query("SELECT * FROM `curries`", function (err, result) {
        if(err){
            console.log("error occured");
        }
        var objs = [];

        for (var i = 0; i < result.length; i++) {
            objs.push({
                curry: result[i].curry
            });
        }
        console.log(JSON.stringify(objs));
        res.send(JSON.stringify(objs));
    });
})

//add order to data base
app.post('/adorder', function (req, res) {
    //getASSarray();
    var arr = [];
    arr['rice15'] = 15;
    arr['rice20'] = 20;
    arr['sambar'] = 10;
    arr['curd'] = 5;
    con.query("select * from curries", function (err, result) {
        console.log(result);
        for (i = 0; i < result.length; i++) {
            console.log(result[i].curry);
            arr[result[i].curry] = result[i].cost;
        }
    })
    setTimeout(function () {
        var data = req.body;
        console.log(arr);
        var total = 0;
        Object.keys(data).forEach(function (key) {
            if (key != 'username') {
                console.log(arr[key]);
                total = total + (arr[key] * data[key]);
            }
        });
        console.log(total);
        // console.log(req.body.username);
        //console.log(arr);
        //var data = req.body;
        var col = "(";
        var vals = "("
        Object.keys(data).forEach(function (key) {
            if (key == 'username') {
                col += "`" + key + "`,";
                vals += "'" + data[key] + "',";
            } else {
                col += "`" + key + "`,";
                vals += data[key] + ",";
            }
        });
        col += "`total`)";
        vals += total + ")";
        var qr = "INSERT INTO `todayorders`" + col + " VALUES " + vals;
        console.log(qr);
        con.query(qr, function (err, result) {
            if (err) {
                res.send("U already entered or ");
            } else if (result.affectedRows > 0) {
                res.send("Total Amount :" + total);
            }
        })
    }, 1000);
})
var tdd;
app.get("/colnames", function (req, res) {
    var columnnames = [];
    con.query('DESCRIBE todayorders', function (err, result) {
        if(err){
            console.log("err");
        }
        console.log(result);
        for (i = 0; i < result.length; i++) {
            console.log(result[i].Field);
            columnnames.push(result[i].Field);
        }
        console.log(columnnames);
        setTimeout(function () {
            tdd = columnnames;
            res.send(columnnames);
        }, 100);

    })

})

app.get('/tabledata', function (req, res) {
    con.query('select * from todayorders', function (err, result) {
        // console.log(result);
        if(err){
            console.log("err");
        }
        var obj = []
        for (i = 0; i < result.length; i++) {
            obj.push(result[i]);
        }
        console.log(obj);
        console.log(tdd);
        res.send(JSON.stringify(result))
    })
})

app.get("/total", function (req, res) {
    var tot = [];
    var sql = "select ";
    for (i = 1; i < tdd.length - 1; i++) {
        sql += "sum(" + tdd[i] + "),"
    }
    sql += "sum(" + tdd[tdd.length - 1] + ") from todayorders";
    console.log(sql);
    con.query(sql, function (err, result) {
        if(err){
            console.log("err occured");
        }
        console.log(result);
        var data = result[0];
        Object.keys(data).forEach(function (key) {
            console.log(data[key]);
            tot.push(data[key]);
        });

        res.send(tot);

    })
})
app.get('/lupdate', function (req, res) {
    con.query('SELECT * from `lastupdated`', function (err, result) {
        console.log(result[0].dt);
        res.send(JSON.stringify(result[0].dt));
    })
})

app.post('/fcm', function (req, res) {
    console.log(req.body.token);
    var tkn = req.body.token;
    con.query("INSERT INTO `fcmtokens`(`token`) VALUES ('" + tkn + "')", function (err, result) {
        if (err) {
            console.log("token already exists");
        } else if (result.affectedRows > 0) {
            console.log("New device");
        }

    })
    res.send("sucess");
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
