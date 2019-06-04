#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const fs = require('fs');
const _ = require('lodash');
const yaml = require('js-yaml');
const { exec } = require('child_process');

const MAX_BRANCHES = 5;

/**
* Checkout a given branch.
*/
const checkoutBranch = (branchName) => {
console.info('Checking out:', branchName);
exec(`git checkout ${branchName}`, (err, stdout, stderr) => {
	    if (err) {
	      return;
	    }
	    console.info(`${stdout}`);
	    console.info(`${stderr}`);
});
saveBranches(branchName);
}

/**
* Load in a list of branch names to switch to.
*/
const loadBranches = () => {
	return yaml.safeLoad(fs.readFileSync(path, 'utf8'));
}

/**
* Add a branch to the historical list of branches and dump to file.
*/
const saveBranches = (recentBranch) => {
	branches.unshift(recentBranch);
	branches = _.uniq(branches).slice(0,MAX_BRANCHES);
	fs.writeFileSync(path, yaml.safeDump(branches));
}

const args = program.parse(process.argv).args;
const path = ".gch.yml";
let branches = loadBranches().slice(0,MAX_BRANCHES);

if (args.length > 0) {
	checkoutBranch(args[0]);
} else {
inquirer
  .prompt([
    {
      type: 'list',
      name: 'branches',
      message: 'Checkout which branch?',
      choices: branches,
    }
  ])
  .then(answers => {
	  checkoutBranch(answers.branches);
    });
}

