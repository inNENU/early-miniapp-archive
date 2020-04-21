const { CLIEngine } = require('eslint');

const cli = new CLIEngine({});

module.exports = {
  '*.{js,ts}': (files) =>
    'eslint ' + files.filter((file) => !cli.isPathIgnored(file)).join(' '),
  '*.ts': 'prettier --write',
  '*.wxss': 'stylelint --fix'
};
