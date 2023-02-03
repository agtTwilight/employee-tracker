// Run the application
const {mainMenu} = require("./util/inquirer");
const queries = require("./util/queries");
const View = new queries.View;

const start = async () => {
        let choice = await mainMenu()
        while(choice != "exit") {
               choice = await mainMenu()
        }
}

start();