const mysql = require("mysql");
const cTable = require('console.table');
const inquirer = require ('inquirer'); 
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employee.DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  start(); 
});

function start(){
  inquirer
  .prompt ([
    {
      type: "list", 
      message: "What would you like to do?",
      name: "getInfo",
      choices: ["View all Employees", "View All Employees by Department", "View all Employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Empoyee Manager"]

    }
  ])
  .then (function(res){
    if (res.getInfo === "View all Employees"){
      readEmployee() 
    }
  })
}
function addEmployee() {
  console.log("Inserting a new employee.\n");
  var query = connection.query(
    "INSERT INTO employee SET ?", 
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " product inserted!\n");
      // Call updateProduct AFTER the INSERT completes
      updateEmployeeRoles();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function updateEmployeeRoles() {
  console.log("Updating all Rocky Road quantities...\n");
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " employee updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
      deleteEmployee();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function deleteEmployee() {
  console.log("Deleting employee...\n");
  connection.query(
    "DELETE FROM employee WHERE ?",
    {
      first_name: "Ellen"
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " person deleted!\n");
      // Call readProducts AFTER the DELETE completes
      readEmployee();
    }
  );
}

function readEmployee() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}
