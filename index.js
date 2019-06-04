#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const fs = require('fs');
const yaml = require('js-yaml');
const { exec } = require('child_process');

const path = ".gch.yml";
let branches = yaml.safeLoad(fs.readFileSync(path, 'utf8'));

inquirer
  .prompt([
    {
      type: 'list',
      name: 'branches',
      message: 'Checkout which branch?',
      choices: branches,
    },
  ])
  .then(answers => {
    console.info('Answer:', answers.branches);
    exec(`git checkout ${answers.branches}`);
  });
