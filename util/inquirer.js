// Inquirer Functions
const inquirer = require("inquirer");
const { update } = require("lodash");
const queries = require("./queries");
const View = new queries.View;
const Add = new queries.Add;
const getDepartmentNames = queries.getDepartmentNames
const getRoleTitles = queries.getRoleTitles
const updateEmployee = queries.updateEmployee

// A list of inquirer prompts to be used in the subMenus func
// TODO insert the choices lists within the object
// TODO How do you convert query data into js objects?
const prompts = {
        department: [{
                type: "input",
                name: "name",
                message: "Name of new department:"}],
        role: [{
                type: "input",
                name: "title",
                message: "Title of new role:"},
                {
                type: "list",
                name: "department_name",
                message: "Which department is this role affiliated with?",
                choices: ["updates in function"]}],
        employee: [{
                type: "input",
                name: "first_name",
                message: "Employee first name:"},
                {
                type: "input",
                name: "last_name",
                message: "Employee last name:"},
                {
                type: "list",
                name: "emploee_role",
                message: "What role does this employee have?",
                choices: ["TODO make a tiny func that gives u all the names of roles"]}]
}

// Main menu
const mainMenu = async () => {
        try {
                let choice = await inquirer.prompt([
                        {
                                type: 'list',
                                name: 'option',
                                message: 'What would you like to do?',
                                choices: ['view all departments', 'view all roles', 'view all employees', 'add department', 'add role', 'add employee', 'update', 'exit'] 
                        }
                ])

                choice = choice.option
                
                // checks if the user selected a view option.
                if (choice.includes("view")) {
                        // split the choice array so the 'view' and 'all' from choice can be ignored.
                        const arr = choice.split(" ")
                        // index through the split choice to select the correct method from View
                        if (arr[2] === "departments") {
                                View.departments();
                        } else if (arr[2] === "roles") {
                                View.roles();
                        } else {
                                View.employees()
                        }
                } else if(choice.includes("add")) {
                        // if 'view' isn't within the choice string returned from mainMenu, then you know the user wants to add something! The following code allows just that.
                        // we will need to split choices to identify what specifically they want to do.
                        const arr = choice.split(" ");
                        if (arr[1] === "department") {
                                const newObject = await inquirer.prompt([
                                        {
                                                type: "input",
                                                name: "name",
                                                message: "Name of new department:"
                                        }
                                 ]);
                                Add.department(newObject.name);
                                View.departments();
                        } else if (arr[1] === "role") {
                                const departments = await getDepartmentNames();
                                const newObject = await inquirer.prompt([
                                        {
                                                type: "input",
                                                name: "title",
                                                message: "Title of new role:"
                                        },
                                        {
                                                type: "input",
                                                name: "salary",
                                                message: "What is the salary of this position?"
                                        },
                                        {
                                                type: "list",
                                                name: "department_name",
                                                message: "Which department is this role affiliated with?",
                                                choices: departments.map((dpt) => {
                                                        return(`${dpt.id}. ${dpt.name}`);
                                                })
                                        }
                                 ]);
                                Add.role(newObject.title, newObject.salary, newObject.department_name.charAt());
                                View.roles();
                        } else {
                                const roles = await queries.getRoleTitles();
                                let employees = await queries.getEmployees();
                                employees = await employees.map((manager) => {
                                        return(`${manager.id}. ${manager.first_name}`);
                                })
                                employees.push("n/a")
                                const newObject = await inquirer.prompt([
                                        {
                                                type: "input",
                                                name: "first_name",
                                                message: "Employee first name:"
                                        },
                                        {
                                                type: "input",
                                                name: "last_name",
                                                message: "Employee last name:"
                                        },
                                        {
                                                type: "list",
                                                name: "employee_role",
                                                message: "What role does this employee have?",
                                                choices: roles.map((role) => {
                                                        return(`${role.id}. ${role.title}`);
                                                })
                                        },
                                        {
                                                type: "list",
                                                name: "manager",
                                                message: "Who is this employees manager?",
                                                choices: employees
                                        }
                                 ]);
                                 if(newObject.manager === "n/a") {
                                         await Add.employee(newObject.first_name, newObject.last_name, newObject.employee_role.charAt(), null);
                                        } else {
                                                await Add.employee(newObject.first_name, newObject.last_name, newObject.employee_role.charAt(), newObject.manager.charAt());
                                        }
                                await View.employees();
                        }
                } else if(choice.includes("update")) {
                        let employees = await queries.getEmployees();
                        employees = await employees.map((employee) => {
                                return(`${employee.first_name}`);
                        })
                        const roles = await queries.getRoleTitles();

                        const updatedObject = await inquirer.prompt([
                                {
                                        type: "list",
                                        name: "employee",
                                        message: "Which employee would you like to update?",
                                        choices: employees
                                },
                                {
                                        type: "list",
                                        name: "role",
                                        message: "What should their new role be?",
                                        choices: roles.map((role) => {
                                                return(`${role.id}. ${role.title}`);
                                        })
                                }
                        ])
                        
                        await updateEmployee(updatedObject.employee, updatedObject.role.charAt())
                        console.log("role updated")
                        await View.employees()

                } else {
                        return "exit"
                }
                return choice
        } 
        catch (error) {
                throw error
        }
}

module.exports = {mainMenu}