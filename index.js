const fs = require('fs')
const inquirer = require('inquirer')

const badges = {
  'Apache License 2.0':
    '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',
  'GNU LGPLv3':
    '[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)',
  'GNU AGPLv3':
    '[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)',
  'MIT License':
    '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
}

// function to initialize program
function init() {
  // array of questions for user

  function promptUser() {
    return inquirer.prompt([
      {
        type: 'input',
        message: 'What is the title of your project?',
        name: 'title',
      },
      {
        type: 'input',
        message: 'Write a brief description of the project.',
        name: 'description',
      },
      {
        type: 'input',
        message: 'What are the installation instructions?',
        name: 'instructions',
      },
      {
        type: 'input',
        message: 'What is the usage information?',
        name: 'usage',
      },
      {
        type: 'input',
        message: 'What are the contribution guidlines?',
        name: 'guidelines',
      },
      {
        type: 'input',
        message: 'What are the testing instructions?',
        name: 'tests',
      },
      {
        type: 'checkbox',
        message: 'What license did you use for this project?',
        choices: [
          'Apache License 2.0',
          'GNU LGPLv3',
          'GNU AGPLv3',
          'MIT License',
        ],
        name: 'license',
      },
      {
        type: 'input',
        message: 'What is your GitHub username?',
        name: 'username',
      },
      {
        type: 'input',
        message: 'What is your email address?',
        name: 'email',
      },
    ])
  }

  function generateReadMe(answers) {
    return `
${badges[answers.license]}

# ${answers.title}

## Table of contents:
- [Installation](#Installation)
- [Description](#Description)
- [License](#License)
- [Contributors](#Contributors)
- [Tests](#Tests)
- [Questions](#Questions)

## Description

${answers.description}

## License

${answers.license}

## Installation

${answers.instructions}

## Usage

${answers.usage}

## Contributors

${answers.guidelines}

## Tests

${answers.tests}

## Questions

You can reach me on GitHub at [${answers.username}](https://www.github.com/${
      answers.username
    }) 
 or by email at ${answers.email}.
    `
  }

  promptUser()
    .then(function (answers) {
      let readMe = generateReadMe(answers)
      return writeToFile('README.md', readMe)
    })
    .then(function () {
      console.log('Successfully wrote to README.md')
    })
    .catch(function (err) {
      console.log(err)
    })

  // function to write README file
  const writeToFile = (fileName, data) => {
    fs.writeFile(fileName, data, (error) =>
      error ? console.error(error) : console.log(`${fileName} generated!`)
    )
  }
}

// function call to initialize program
init()
