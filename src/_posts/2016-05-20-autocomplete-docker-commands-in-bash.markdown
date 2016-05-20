---
layout: post
title: "Bash Completion for Docker Commands"
date: "2016-05-20 16:45:41 +0300"
category: Coding
tags: Docker Docker-Autocmpletion Tab-Completion Bash Bash-Completion
comments: true
---

I'm assuming that you have [Homebrew](http://brew.sh/) installed.

You can use [my dotfiles](https://github.com/mariusmateoc/dotfiles) to customize your terminal and get more features and autocompletion for many commands or you can follow this post to add bash completion for [docker](https://www.docker.com/).


```bash
# Tap homebrew/versions so you can install bash completion 2
brew tap homebrew/versions
brew install bash-completion2

# Tap homebrew/completion to gain access to these
brew tap homebrew/completions

# Install completions for docker suite
brew install docker-completion
brew install docker-compose-completion
brew install docker-machine-completion
```


You need to add the following to your `~/.bash_profile` file and reload your bash with `exec $SHELL -l` or restart your terminal.

```bash
# Bash additional completion scripts
if [ -f $(brew --prefix)/etc/bash_completion ]; then
. $(brew --prefix)/etc/bash_completion
fi
```

Want more completion scripts? Check out [Homebrew Completion](https://github.com/Homebrew/homebrew-completions) on GitHub.

Also worth seeing how you can add [Git Completion](http://mariusmateoc.com/blog/git-tab-autocompletion-for-commands-in-bash/) commands.
