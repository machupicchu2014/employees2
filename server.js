const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

let employees = [];
let id = 0;

app.get("/api/employees", (req,res) => {
    employees.sort((a,b) => {
      return a.name.localeCompare(b.name);
    })
    res.send(employees);
});

app.post("/api/employees", (req,res) => {
  id = id + 1;
  let employee = {id: id, name: req.body.name, email: req.body.email, job: req.body.job,
    salary: req.body.salary, notes: req.body.notes };
  employees.push(employee);
  employees.sort((a,b) => {
    return a.name.localeCompare(b.name);
  })
  res.send(employee);
});

app.put("/api/employees/:id", (req,res) => {
    let id = parseInt(req.params.id);
    let employeeMap = employees.map(employee => { return employee.id });
    let index = employeeMap.indexOf(id);
    let employee = employees[index];
    employee.name = req.body.name;
    employee.email = req.body.email;
    employee.salary = req.body.salary;
    employee.job = req.body.job;
    employee.notes = req.body.notes;
    employees.sort((a,b) => {
      return a.name.localeCompare(b.name);
    })
    res.send(employee);
});

app.delete("/api/employees/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let employeeMap = employees.map(employee => {return employee.id; });
  let index = employeeMap.indexOf(id);
  employees.splice(index, 1);
  res.sendStatus(200);
});


app.listen(8000, () => console.log('Server listening on port 3000!'));
