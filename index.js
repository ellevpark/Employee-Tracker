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
      "Remove Employee",
      "Add Department", 
      "View all Departments",
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

      case "Add Roles": 
      addRole(); 
      break;

      case "View all Roles": 
      viewAllRoles(); 
      break;
    
      case "Update Employee Role":
      updateEmployeeRole(); 
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
      name: "first_name",
    },
    {
      type: "input", 
      message: "Last Name?",
      name: "last_name"
    },
    {
      type: "list",
      message: "What is the employee's role?",
      name: "role_id", 
      choices: [1,2,3]
    },
    {
      type: "input", 
      message: "Who is their manager?",
      name: "manager_id"
    }
  ])
  .then (function(res){
    const query = connection.query(
      "INSERT INTO employees SET ?", 
     res,
      function(err, res) {
        if (err) throw err;
        console.log( "Employee added!\n");

        start (); 
      }
    );    
  })
}
function viewAllEmployees() {

  connection.query("SELECT employees.first_name, employees.last_name, roles.title AS \"role\", managers.first_name AS \"manager\" FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN employees managers ON employees.manager_id = managers.id GROUP BY employees.id",  
  function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    start();
  });
}

function removeEmployee(){
  let employeeList = [];
  connection.query(
    "SELECT employees.first_name, employees.last_name FROM employees", (err,res) => {
      for (let i = 0; i < res.length; i++){
        employeeList.push(res[i].first_name + " " + res[i].last_name);
      }
  inquirer 
  .prompt ([ 
    {
      type: "list", 
      message: "Which employee would you like to delete?",
      name: "employee",
      choices: employeeList

    },
  ])
  .then (function(res){
    const query = connection.query(
      `DELETE FROM employees WHERE concat(first_name, ' ' ,last_name) = '${res.employee}'`,
        function(err, res) {
        if (err) throw err;
        console.log( "Employee deleted!\n");
    start();
    });
    });
    }
      );
      };


  

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
        connection.query("SELECT * FROM departments", function(err, res){
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


