---
layout: post
title: "Useful NPM and NVM commands"
date: "2016-06-14 14:27:44 +0300"
category: Coding
tags: nvm npm nodejs
comments: true
---

**[NPM](https://www.npmjs.com/)** is the node package manager that comes with [node.js](https://nodejs.org/en/) and you can use it right away after you have node installed.

**[NVM](https://github.com/creationix/nvm)** is used to manage your node versions. Don't have nvm installed? Check out [install guide](https://github.com/creationix/nvm#install-script) or you can use my [dotfiles](https://github.com/mariusmateoc/dotfiles) to install and setup node version manager.

### Listing globally installed NPM packages without dependencies

```bash
$ npm ls -g --depth=0

/Users/Marius/.nvm/versions/node/v5.11.0/lib
├── bower@1.7.9
├── ember-cli@2.5.0
├── grunt-cli@1.2.0
├── npm@3.8.8
├── phantomjs-prebuilt@2.1.7
├── sails@0.12.3
└── sane-cli@0.0.24
```


### Instal new version of Node.js with NVM and make it default

In place of a version pointer like `6.0`, you can use the following special default aliases with `nvm install`, `nvm use`, `nvm run`, `nvm exec`, `nvm which`, etc:

* `node`: this installs the latest version of node

```bash
# this will install the latest node.js
nvm install node

# make and alias
nvm alias default node

# use the default version
nvm use default
```

If you set a `default` alias for specific version of nodejs than any new terminal window will use that nodejs version.


### Migrate npm packages from a previous version of Node.js:

```bash
nvm install node --reinstall-packages-from=node
```

### Change Node.js version with .nvmrc file

Create a .nvmrc file containing version number in the project root directory. Now you can use `nvm use`, `nvm install`, `nvm exec`, `nvm run`, and `nvm which` will all respect an .nvmrc file when a version is not supplied.

Run the following commands from your project root directory

```bash
# Create .nvmrc file with node version in it
echo "6.0" > .nvmrc

# Use this to change the version if you have it installed
nvm use

# Install the nodejs version from .nvmrc file
nvm install
```

#### Automatic change nodejs version when you `cd` in your project
[AVN](https://github.com/wbyoung/avn) is Automatic Version Switching for Node.js. Now when you cd into a directory with a `.node-version` file, avn will automatically detect the change and use your installed version manager to switch to that version of node.
