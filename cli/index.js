#!/usr/bin/env node
const { select } = require('@inquirer/prompts');
const fs = require('fs');

const modules = fs.readdirSync(`${__dirname}/modules`).filter(i => i.includes('.js')).map((file) => {
    const module = require(`${__dirname}/modules/${file}`);

    return {
        name: file.replace('.js', ''),
        description: module.description,
        run: module.run
    };
});

const choices = modules.filter(c => !c.name.endsWith('.disabled')).map((mod) => ({
    name: mod.name,
    description: mod.description,
    value: mod,
}));

const runModule = async (module) => {
    try {
        await module.run();
    } catch (error) {
        console.error(`Error running module ${module.name}:`, error);
    }
};

const main = async () => {
    const module = await select({
        message: 'Select a module to run:',
        choices,
    });
    await runModule(module);
}
main()