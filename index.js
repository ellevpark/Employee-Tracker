const mysql = require("mysql");
const cTable = require('console.table');
const inquirer = require ('inquirer'); 
const connection = mysql.createConnection({
  host: "localhost",

  // Your port;
  port: 3306,

  // Your username
  user: "root",

  password: "Bootcamp!",
  database: "employee_DB"
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
      name: "start",
      choices: [
      "Add Employee", 
      "View all Employees", 
      "Add Department", 
      "View all Departments",
      "View all Employees by Department", 
      "Add Roles", 
      "View all Roles", 
      "Update Employee Role", 
      "Exit"
    ]
    }
  ])
  .then (function(res){
    switch (res.start){

      case "Add Employee":
      addEmployee();
      break;

      case "View all Employees":
      viewAllEmployees();
      break; 

      case "Remove Employee": 
      removeEmployee(); 
      break;
    
      case "Add Department": 
      addDept(); 
      break;

      case "View all Departments":
      viewAllDept();
      break;
    
      case "View Employees by Department":
      viewEmployeeByDept(); 
      break; 
    
      case "Delete Department": 
      deleteDept(); 
      break;

      case "Add Roles": 
      addRole(); 
      break;

      case "Delete Roles": 
      deleteRole(); 
      break;

      case "View all Roles": 
      viewAllRoles(); 
      break;
    
      case "Update Employee Role":
      updateEmployeeRole(); 
      break;

      case "Update Employee Manager":
      updateEmployeeManager(); 
      break;

      case "Exit":
      connection.end(); 
      break; 
    }
  })
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
function viewAllEmployees() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM employees", 
  function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    start();
  });
}

function removeEmployee(){
  //remove employee
}

function addDept(){
  inquirer
  .prompt([
    {
      type: "input",
      name: "deptName", 
      message: "What Department would you like to add?"
    }
  ])
  .then(function(res){
    console.log(res);
    const query = connection.query(
      "INSERT INTO departments SET ?", 
      {
        name: res.deptName
      }, 
      function(err, res){
        connection.query("SELECT * FRO departments", function(err, res){
          console.table(res); 
          start(); 
        })
      }
    )
  })
}

function viewAllDept(){
  // view dept
}

function viewEmployeeByDept(){
  let departments= [];
  connection.query ("SELECT name FROM departments", function(err, res){
    console.log (res); 
    dept.forEach(element => {
      departments.push(res[i].name); 
    });
  })
  inquirer
  .prompt ({
    name: "viewDept", 
    type: "list", 
    message: "What department would you like to view?",
    choices: departments 
  })
  .then(function(res){
  console.log (res.deptName)
  connection.query ("SELECT id FROM departments WHERE name = `${res.deptName}`"), 
  function(err,res){
    connection.query("SELECT * FROM employees, roles.title, roles.salary, departments.name FROM ((roles INNER JOIN departments ON departments.id = roles.department_id) INNER JOIN employees ON roles.id = employees.role_id) WHERE department_id = `${res[0].id} "),
    function(err, res){
      console.table (res); 
      start();
    }
   }
  })
}
function deleteDept (){
  
}
function addRole() {
inquirer
.prompt([
  {
    type: "input", 
    name: "role",
    message: "What role would you like to add?"
  },
  {
    type: "input",
    name: "salary",
    message: "What is the salary for the role?"
  }
])
.then (function(res){
  console.log(res); 
  const query = connection.query(
    "INSERT INTO roles SET ?",
    {
      role: res.role,
      salary: res.salary 
    }, 
    function (err, res){
      const id = res.insertId;
      updateRoleDepartment(id)
    }
  )
})
}
function updateRoleDepartment(){

}
function viewAllRoles(){

}
function updateEmployeeRole(){

}


