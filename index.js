// Run the application
const {mainMenu, subMenus} = require("./util/inquirer");
const queries = require("./util/queries");
const View = new queries.View;

const start = async () => {
        let choice = await mainMenu()
        while(choice != "exit") {
                await subMenus(choice)
               choice = await mainMenu()
        }
}

start();