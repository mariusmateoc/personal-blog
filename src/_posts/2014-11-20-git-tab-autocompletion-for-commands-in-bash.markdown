---
layout: post
title:  "Git Tab Autocompletion for Commands in Bash"
date:   2014-11-20 14:50
category: Coding
tags: Git Git-Completion Tab-Completion Bash Bash-Completion
comments: true
---

In OSX Bash you could use to autocomplete file paths. You can also use [My Dotfiles](https://github.com/mariusmateoc/dotfiles) to get tab completion for SSH hostnames based on ~/.ssh/config and many more commands.

You need to get the `.git-completion.bash` from [Repository](https://github.com/git/git/blob/master/contrib/completion/git-completion.bash) or you cand use this command in your terminal:

```bash
curl https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash -o ~/.git-completion.bash
```

Then you need to update your `.bash-profile` file with:

```bash
if [ -f ~/.git-completion.bash ]; then
  . ~/.git-completion.bash
fi
```

Now you need to restart your terminal and after you type `git c` then hit `TAB` key you can see all the git commands that start with *c* letter.

![Git Tab Autocompletion]({{ site.baseUrl }}/assets/images/git-tab-autocompletion/git-autocompletion.jpg)


### How to make it work with aliases

Let's say you have aliases for:

```bash
alias g ='git'
alias gco = 'git checkout'
```

You can use `__git_complete` function from `git-completion.bash` which can be used to set up completion for aliases. Update your `.bash-profile` file with:


```bash
if [ -f ~/.git-completion.bash ]; then
  . ~/.git-completion.bash

  # Add git completion to aliases
  __git_complete g __git_main
  __git_complete gco _git_checkout
fi
```



