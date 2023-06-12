const express = require('express');
const db = require('./db.js');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { response } = require('express');
const jwt = require('jsonwebtoken');
// const { Users } = require('./db.js');

const saltRounds = 10

const port = 1337
var t_name;
var t_count;

// app.get('/', function(req, res){
    // const sqlInsert = "INSERT INTO CUSTOMER (FIRST_NAME, LAST_NAME, CUSTOMER_ID, SEX, AGE, EMAIL, PHONE_NUMBER, PASSWORD) VALUES ('Abdul', 'Rehman', '','MALE', 21, 'ABDULLAH@420@GMAIL.COM', 11223333, 'ABC123');"
    // db.query("SELECT * FROM CUSTOMER", function(error, rows, fields){
      //     if(!!error){
        //         console.log('Error in the query');
    //     }
    //     else{
    //         console.log('Successful query')
    //         console.log(rows);
    //         res.send('Hello, '+ rows);
    //     }
    // });
    // db.query(sqlInsert, (error, rows, fields)=>{
      //   if(!!error){
        //             console.log('Error in the query');
        //         }
        //     else{
          //             console.log('Successful query')
          //             console.log(rows);
        //             res.send('Hello');
        //     }
        // });
        // })

        app.use(cors({
          origin: ["http://localhost:3000"],
          methods: ["GET", "POST", "DELETE"],
          credentials: true
        }));

        app.use(cookieParser());

        app.use(express.json());
        app.use(express.urlencoded({ extended: true}))

        app.use(session({
          key: "userId",
          secret: "DBproject",
          resave: false,
          saveUninitialized: false,
          cookie: {
            expires: 60 * 60 * 24,
          },
        })
        );

        app.get("/api/get", (req, res)=>{
          const sqlSelect = "SELECT * FROM CUSTOMER where 1";
          db.query(sqlSelect, (err, result)=>{
            res.send(result);
          });
        })
        
        app.post("/signup", async(req, res)=>{
          const FIRST_NAME = req.body.FIRST_NAME;
          const LAST_NAME = req.body.LAST_NAME;
          const CNIC = req.body.CNIC;
          const SEX = req.body.SEX;
          const AGE = req.body.AGE;
          const EMAIL = req.body.EMAIL;
          const PHONE_NUMBER = req.body.PHONE_NUMBER;
          const PASSWORD = req.body.PASSWORD;

          // const user = await Users.findOne({where: {CNIC: CNIC}});

          // if(user) res.status(400).json({error: "User already exists"});


          bcrypt.hash(PASSWORD, saltRounds, (err, hash)=>{
          if(err){
              res.json({error: err})
            }

            const sqlInsert = "INSERT INTO metroDB.CUSTOMER (FIRST_NAME, LAST_NAME, CNIC, SEX, AGE, EMAIL, PHONE_NUMBER, PASSWORD) VALUES (?,?,?,?,?,?,?,?);"
            db.query(sqlInsert, [FIRST_NAME, LAST_NAME, CNIC, SEX, AGE, EMAIL, PHONE_NUMBER, hash], (err, result)=>{
              console.log(result);
              if(!result){
                res.status(400).send({message: "Error"});
              }
            });

          })
        })

        const verifyJWT = (req, res, next)=>{
          const token = req.headers["x-access-token"]

          if(!token){
            res.send("Please verify yourself!")
          } else {
            jwt.verify(token, "jwtSecret", (err, decoded)=>{
              if(err){
                res.json({auth: false, message: "You failed to authenticate"});
              } else{
                req.userId = decoded.id;
                next();
              }
            })
          }
        }

        app.get('/isUserAuth', verifyJWT, (req, res)=>{
          res.send("You have been authentiated!")
        })

        app.get("/login", (req, res)=>{
          if (req.session.user) {
            res.send({loggedIn: true, user: req.session.user})
          } else {
            res.send({loggedIn: false})
          }
        })

        app.post("/login", (req, res)=>{
          const EMAIL = req.body.EMAIL;
          const PASSWORD = req.body.PASSWORD;
          // console.log(PASSWORD);
          db.query( "SELECT * FROM metroDB.CUSTOMER WHERE EMAIL = ?",
          EMAIL,
          (err, result) => {
            if(err){
              res.send({err: err});
              console.log(err);
            }
            if(result.length>0){
                bcrypt.compare(PASSWORD, result[0].PASSWORD, (err, response)=>{
                  if(response){
                    const id = result[0].id
                    const token = jwt.sign({id}, "jwtSecret", {
                      expiresIn: 300,
                    });
                    req.session.user = result;
                    // console.log(result);
                    res.json({auth: true, token: token, result: result});
                  }else{
                    res.json({auth: false, message: "Wrong email or password!"});
                  }
                })
            }
            else{
              res.json({auth: false, message: "No such user exists!"});
            }
            }
          )
        })

        var SOURCE_LOCATION;
        var DESTINATION_LOCATION;
        var DEPARTURE_TIME;

        app.post("/train", (req, res)=>{
          SOURCE_LOCATION = req.body.SOURCE_LOCATION;
          DESTINATION_LOCATION = req.body.DESTINATION_LOCATION;
          DEPARTURE_TIME = req.body.DEPARTURE_TIME;
          // console.log(SOURCE_LOCATION)
          // console.log(DESTINATION_LOCATION)
          // console.log(PASSWORD);
         const sqlSearch = "SELECT * FROM metroDB.TRAIN WHERE SOURCE_LOCATION LIKE SOURCE_LOCATION and DESTINATION_LOCATION LIKE DESTINATION_LOCATION AND DEPARTURE_TIME LIKE DEPARTURE_TIME";
          db.query(sqlSearch, (err, result) => {
            if(err){
              res.send({err: err});
              console.log(err);
            }
            if(result.length>0){
              if(response){
                res.json(result)

              }
                // console.log(result)
            }
            else{
              res.json({message: "No such train exists!"});
            }
            }
          )
        })
      
 
        app.get("/train", (req, res)=>{
          // const SOURCE_LOCATION = req.body.SOURCE_LOCATION;
          // const DESTINATION_LOCATION = req.body.DESTINATION_LOCATION;
          // console.log(SOURCE_LOCATION)
          // console.log(DESTINATION_LOCATION)
          // // const DESTINATION_LOCATION = req.body.DESTINATION_LOCATION;
          const sqlSelect = `SELECT * FROM metroDB.TRAIN WHERE SOURCE_LOCATION = "${SOURCE_LOCATION}" AND DESTINATION_LOCATION = "${DESTINATION_LOCATION}" AND CAST(DEPARTURE_TIME AS VARCHAR(11)) = "${DEPARTURE_TIME}"`;
          db.query(sqlSelect, (err, result) =>{
            if(err){
               console.log(err)
              
              // res.send("No trains available")
            }else{
              res.send(result)
              // console.log(result)
            }
          })
          // res.send("hello world")
        })
 
        var identity;

        app.post("/ticketbook", (req, res)=>{
          const TRAIN_NUMBER = req.body.TRAIN_NUMBER;
          const EMAIL = req.body.EMAIL;
          const number = req.body.aNumber;

          const sqlSearch = `SELECT CNIC FROM metroDB.CUSTOMER WHERE EMAIL = "${EMAIL}"`;
          db.query(sqlSearch, (err, result) =>{
            if(err){
               console.log(err)
              
              // res.send("No trains available")
            }else{
              // res.send(sqlSearch)
              var json = JSON.parse(JSON.stringify(result))
              var NIC = (json[0].CNIC)
              identity = (json[0].CNIC)
              console.log(identity)

              db.query(`SELECT BOOKED_SEATS FROM metroDB.train WHERE TRAIN_NUMBER = "${TRAIN_NUMBER}"` , (err, result)=>{
                var book = JSON.parse(JSON.stringify(result))
                var seat = (book[0].BOOKED_SEATS)
                // console.log(seat)
                
               db.query(`SELECT AVAILABLE_SEATS FROM metroDB.train WHERE TRAIN_NUMBER = "${TRAIN_NUMBER}"`,(err, result)=>{
                var avail = JSON.parse(JSON.stringify(result))
                var available = (avail[0].AVAILABLE_SEATS)
                // console.log(seat)

                db.query(`SELECT FARE FROM metroDB.class JOIN metroDB.train ON class.TYPE = train.TYPE WHERE TRAIN_NUMBER = "${TRAIN_NUMBER}"`, (err, result)=>{
                  var fare = JSON.parse(JSON.stringify(result))
                  var cost = (fare[0].FARE)
                  // console.log(cost)

                  // console.log(number+seat)
                  //   console.log(avail)
                  if(number+seat>available){
                    res.status(400);
                    res.send('Tickets not available');
                    console.log(number+seat)
                    console.log(available)
                  }else{
                    for(var i=1; i<=number; i++){
                      let count = i + seat;
                      // console.log(count)
                      db.query(`INSERT INTO metroDB.ticket (CNIC, FARE, TRAIN_NUMBER) VALUES ("${NIC}", ${cost} ,"${TRAIN_NUMBER}")`);
                      // console.log(i)
                    }
  
                    var totalBook = number;
  
                    db.query(`UPDATE metroDB.train SET BOOKED_SEATS = ${seat+totalBook} WHERE TRAIN_NUMBER = "${TRAIN_NUMBER}"`);
                    db.query(`UPDATE metroDB.train SET AVAILABLE_SEATS = ${available-totalBook} WHERE TRAIN_NUMBER = "${TRAIN_NUMBER}"`);
                  }
                })
               })
              })
              
              
              // db.query(`UPDATE metroDB.train SET BOOKED_SEATS = BOOKED_SEATS+number`);
              // db.query(`UPDATE metroDB.train SET AVAILABLE_SEATS = AVAILABLE_SEATS-number`);
              
            }
          })
          // console.log(identity)
          // console.log(TRAIN_NUMBER)
          // console.log(EMAIL)
          // // console.log(result)
          // console.log(number)
          // var NIC = result;
          // console.log(NIC);

          // const sqlInsert = `INSERT INTO metroDB.ticket VALUES ()`
        })
        
        app.get("/viewbooked", (req, res)=>{
          const user = req.query.user;
          // console.log(user);
          const sqlSearch = `SELECT CNIC FROM metroDB.CUSTOMER WHERE EMAIL = "${user}"`;
          db.query(sqlSearch, (err, result) =>{
            if(err){
               console.log(err)
              
              // res.send("No trains available")
            }else{

              try{
              var cn = JSON.parse(JSON.stringify(result))
              var NIC = (cn[0].CNIC)

              const sqlFind = `SELECT * FROM metroDB.ticket join metroDB.train on ticket.TRAIN_NUMBER = train.TRAIN_NUMBER where CNIC = "${NIC}"`;
              db.query(sqlFind, (err, result) =>{
                if(err){
                  console.log(err)
                  
                  // res.send("No trains available")
                }else{
                  res.send(result)
                  // console.log(result)
                }
                
              })
            }catch(e){
              console.log(e)
            }
            }

         
        })
      })

      app.post("/admin", (req, res)=>{
        const ADMIN_NAME = req.body.ADMIN_NAME;
        const ADMIN_KEY = req.body.ADMIN_KEY;

        console.log(ADMIN_KEY)
        console.log(ADMIN_NAME)

        db.query(`SELECT * FROM metroDB.admin WHERE ADMIN_NAME = "${ADMIN_NAME}" AND ADMIN_KEY = "${ADMIN_KEY}"`, (err, result)=>{
          if(err){
            console.log(err)
          }else{
            if(result.length>0){
              res.send(result)
            }
          }
        })
      })

      app.post("/inserttrain", async(req, res)=>{
        const TRAIN_NUMBER = req.body.TRAIN_NUMBER;
        const TRAIN_NAME = req.body.TRAIN_NAME;
        const ARRIVAL_TIME = req.body.ARRIVAL_TIME;
        const DEPARTURE_TIME = req.body.DEPARTURE_TIME;
        const SOURCE_LOCATION = req.body.SOURCE_LOCATION;
        const DESTINATION_LOCATION = req.body.DESTINATION_LOCATION;
        const AVAILABLE_SEATS = req.body.AVAILABLE_SEATS;
        const BOOKED_SEATS = req.body.BOOKED_SEATS;
        const ADMIN_KEY = req.body.ADMIN_KEY;
        const TYPE = req.body.TYPE;
        const STATION_NAME = req.body.STATION_NAME;

        console.log(TRAIN_NUMBER)
        console.log(TRAIN_NAME)
        console.log(ARRIVAL_TIME)
        console.log(BOOKED_SEATS)
        console.log(TYPE)
        console.log(ADMIN_KEY)
        console.log(STATION_NAME)

          const sqlInsert = "INSERT INTO metroDB.train (TRAIN_NUMBER, TRAIN_NAME, ARRIVAL_TIME, DEPARTURE_TIME, SOURCE_LOCATION, DESTINATION_LOCATION, AVAILABLE_SEATS, BOOKED_SEATS, ADMIN_KEY, TYPE, STATION_NAME) VALUES (?,?,?,?,?,?,?,?,?,?,?);"
          db.query(sqlInsert, [TRAIN_NUMBER, TRAIN_NAME, ARRIVAL_TIME, DEPARTURE_TIME, SOURCE_LOCATION, DESTINATION_LOCATION, AVAILABLE_SEATS, BOOKED_SEATS, ADMIN_KEY, TYPE,STATION_NAME], (err, result)=>{
            if(err){
              console.log(err)
            }else{
              console.log(result)
            }
          });
      })

      app.post("/modifytrain", async(req, res)=>{
        const TRAIN_NUMBER = req.body.TRAIN_NUMBER;
        const TRAIN_NAME = req.body.TRAIN_NAME;
        const ARRIVAL_TIME = req.body.ARRIVAL_TIME;
        const DEPARTURE_TIME = req.body.DEPARTURE_TIME;
        const SOURCE_LOCATION = req.body.SOURCE_LOCATION;
        const DESTINATION_LOCATION = req.body.DESTINATION_LOCATION;
        const AVAILABLE_SEATS = req.body.AVAILABLE_SEATS;
        const BOOKED_SEATS = req.body.BOOKED_SEATS;
        const ADMIN_KEY = req.body.ADMIN_KEY;
        const TYPE = req.body.TYPE;
        const STATION_NAME = req.body.STATION_NAME;

        // console.log(TRAIN_NUMBER)
        // console.log(TRAIN_NAME)
        // console.log(ARRIVAL_TIME)
        // console.log(BOOKED_SEATS)
        // console.log(TYPE)
        // console.log(ADMIN_KEY)
        // console.log(STATION_NAME)

          const sqlUpdate = `UPDATE metroDB.train SET TRAIN_NUMBER = "${TRAIN_NUMBER}", TRAIN_NAME = "${TRAIN_NAME}", ARRIVAL_TIME = "${ARRIVAL_TIME}", DEPARTURE_TIME = "${DEPARTURE_TIME}", SOURCE_LOCATION = "${SOURCE_LOCATION}", DESTINATION_LOCATION = "${DESTINATION_LOCATION}", AVAILABLE_SEATS = "${AVAILABLE_SEATS}", BOOKED_SEATS = "${BOOKED_SEATS}", ADMIN_KEY = "${ADMIN_KEY}", TYPE = "${TYPE}", STATION_NAME = "${STATION_NAME}" WHERE TRAIN_NUMBER = "${TRAIN_NUMBER}"`;
          db.query(sqlUpdate, (err, result)=>{
            if(err){
              console.log(err)
            }else{
              console.log(result)
            }
          });
      })


      app.get("/viewtrains", (req, res)=>{

            const sqlFind = `SELECT * FROM metroDB.train join metroDB.station on train.STATION_NAME = station.STATION_NAME`;
            db.query(sqlFind, (err, result) =>{
              if(err){
                console.log(err)
                
                // res.send("No trains available")
              }else{
                res.send(result)
                // console.log(result)
              }
            })
    })

      app.get("/viewtickets", (req, res)=>{

            const sqlFind = `SELECT * FROM metroDB.ticket join metroDB.customer on ticket.CNIC = customer.CNIC`;
            db.query(sqlFind, (err, result) =>{
              if(err){
                console.log(err)
                
                // res.send("No trains available")
              }else{
                res.send(result)
                // console.log(result)
              }
            })
    })
        

    app.post("/feedback", async(req, res)=>{
      const SUBJECT = req.body.SUBJECT;
      const MESSAGE = req.body.MESSAGE;
      const user = req.body.user;

      console.log(SUBJECT);
      console.log(MESSAGE);
      console.log(user);

       db.query(`SELECT CNIC FROM metroDB.customer where EMAIL = "${user}"`, (err, result)=>{
        var feedback = JSON.parse(JSON.stringify(result))
        var contact = (feedback[0].CNIC)

        const sqlInsert = `INSERT INTO metroDB.feedback (CNIC, MESSAGE, SUBJECT) VALUES ("${contact}", "${MESSAGE}" ,"${SUBJECT}")`;
        db.query(sqlInsert, (err, result)=>{
          if(err){
            console.log(err)
          }
          // else{
          //   console.log(result)
          // }
        });
         
       })
    })

    app.get("/viewfeedback", (req, res)=>{

      const sqlFind = `SELECT * FROM metroDB.feedback join metroDB.customer on feedback.CNIC = customer.CNIC`;
      db.query(sqlFind, (err, result) =>{
        if(err){
          console.log(err)
          
          // res.send("No trains available")
        }else{
          res.send(result)
          // console.log(result)
        }
      })
})

app.delete("/deleteticket",(req,res)=>{
    const TRAIN_NUMBER = req.query.TRAIN_NUMBER;
    const TICKET_NUMBER = req.query.TICKET_NUMBER;
    const user = req.query.user;

    console.log(user)
    console.log(TRAIN_NUMBER)
    console.log(TICKET_NUMBER)

    db.query(`SELECT CNIC FROM metroDB.CUSTOMER WHERE EMAIL = "${user}"`, (err, result)=>{
        var info = JSON.parse(JSON.stringify(result))
        var myInfo = (info[0].CNIC)

      const sqlDelete = `DELETE FROM metroDB.ticket WHERE TRAIN_NUMBER = "${TRAIN_NUMBER}" AND TICKET_NUMBER = "${TICKET_NUMBER}" AND CNIC = "${myInfo}"`;
      db.query(sqlDelete, (err, result) =>{
        if(err){
          console.log(err)
          
          // res.send("No trains available")
        }else{
          res.send(result)
          var num = 1;
  
          db.query(`SELECT AVAILABLE_SEATS FROM metroDB.train WHERE TRAIN_NUMBER = "${TRAIN_NUMBER}"`, (err, result)=>{
            var bookinfo = JSON.parse(JSON.stringify(result))
            var book = (bookinfo[0].BOOKED_SEATS)


            if(book<=0){
              console.log("Can not book")
            }else{
              db.query(`UPDATE metroDB.train SET AVAILABLE_SEATS = AVAILABLE_SEATS+${num}, BOOKED_SEATS = BOOKED_SEATS-${num} WHERE TRAIN_NUMBER = "${TRAIN_NUMBER}"`, (err, result) =>{
                if(err){
                  console.log(err)
                }else{
                  console.log(result)
                }
              })
            }
          })
          // console.log(result)
        }
      })
  
    });

})

        // app.get('/api/v1/login', function(req, res){
          //     res.send('Hello login');
          // })

// app.get('/api/v1/signup', function(req, res){
//     res.send('Hello signup');
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})