const express = require("express");
const mysql = require("mysql");
const app = express();
const cors  = require("cors");
const port = process.env.port || 5001

app.use(cors());
app.use(express.json());

app.listen(port,() => {
  console.log("Server has connected");
})

const database  = mysql.createConnection({
  user:"root",
  host:"localhost",
  password:"",
  database:"crud_db"
})

app.get('/employees',(req,res) => {
  database.query("SELECT * FROM employees",(error,rows) => {
    if (error) {
      console.log(error)
      console.log("Connection is Failed")
    } else {
      console.log(rows)
      res.send(rows)
    }
  })
})

app.post('/getbyname',(req,res) => {
  const name = req.body.name;
  database.query("SELECT * FROM employees WHERE name = ? ",[name],(error,rows) => {
    if (error) {
      console.log(error)
      console.log("Connection is Failed")
    } else {
      console.log(rows)
      res.send(rows)  
    }
  })
})

app.post('/create',(req,res) => {
  const id = req.body.id;
  const name = req.body.name;
  const email = req.body.email;
  database.query("INSERT INTO employees (id,name,email) VALUES (?,?,?)",[id,name,email],(err,rows) => {
    if(err) {
      console.log(err)
    } else {
      console.log("Insert Successes")
      res.send(rows)
    }
  })
})
