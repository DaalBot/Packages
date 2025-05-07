const { select } = require('@inquirer/prompts');
const fs = require('fs');

async function run() {
    const modules = fs.readdirSync(`${__dirname}/templates`).map((file) => {
        const module = require(`${__dirname}/templates/${file}`);

        return {
            name: file.replace('.js', ''),
            description: module.description,
            run: module.run
        };
    });

    const choices = modules.filter(c => !c.name.endsWith('.disabled')).map((mod) => ({
        name: `${mod.name}: ${mod.description}`,
        value: mod,
    }));

    const selectedModule = await select({
        message: 'Select a module to run:',
        choices,
    });
    console.log(`Running module: ${selectedModule.name}`);
    await selectedModule.run();
}

module.exports = {
    description: 'Create a new template project in the current directory',
    run
}