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
  password: "Bootcamp!",
  database: "employee.DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  start(); 
});

start();

function start(){
  inquirer
  .prompt ([
    {
      type: "list", 
      message: "What would you like to do?",
      name: "start",
      choices: ["View all Employees", "View All Employees by Department", "View all Employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager"]
    }
  ])
  .then (function(res){
    switch (res.start){
      case "View all Employees":
      viewAllEmployees();
      break; 
    
      case "View Employees by Department":
      viewEmployeeByDept(); 
      break; 
    
      case "Add Employee":
      addEmployee();
      break;
    
      case "Remove Employee": 
      removeEmployee(); 
      break;

      case "Update Employee Role":
      updateEmployeeRole(); 
      break;

      case "Update Employee Manager":
      updateEmployeeManager(); 
      break;
    }
  })
}

function viewAllEmployees() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}

function addEmployee() {
  console.log("Inserting a new employee.\n");
  inquirer 
    .prompt ([ 
      {
        type: "input", 
        message: "First Name?",
        name: "firstName",
      },
      {
        type: "input", 
        message: "Last Name?",
        name: "lastName"
      },
      {
        type: "list",
        message: "What is the employee's role?",
        name: "role", 
        choices: ["Sales Person", "Lead Engineer", "Lawyer"]
      },
      {
        type: "input", 
        message: "Who is their manager?",
        name: "employeeManager"
      }
    ])
    .then (function(res){
      const query = connection.query(
        "INSERT INTO employee SET ?", 
        {
          firstName: res.firstName, 
          lastName: res.lastName,
          role: res.role,
          manager: res.employeeManager, 
        },
        function(err, res) {
          if (err) throw err;
          console.log( "Employee inserted!\n");
          // Call updateProduct AFTER the INSERT completes
          start (); 
        }
      );    
    })
  }

function viewEmployeeByDept(){
  inquirer
  .prompt ({
    name: "viewDept", 
    type: "list", 
    message: "What department would you like to view?",
    choices: [
      "Sales",
      "Engineering", 
      "Legal"
    ]
  })
  .then(function(res){
    switch(res.viewDept){
      case "View Sales Employees":
      viewSalesEmployees(); 
      break;

      case "View Engineering Employees":
      viewEngineeringEmployees(); 
      break;

      case "View Legal Employees":
      viewLegalEmployees(); 
      break;
    }

  })
}
function viewSalesEmployees(){
  
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


