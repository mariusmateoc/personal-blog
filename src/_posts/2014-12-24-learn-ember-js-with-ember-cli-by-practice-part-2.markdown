---
layout: post
title:  "Learn Ember.js with Ember-CLI by Practice Part 2"
date:   2015-01-08 16:45
category: Coding
tags: javascript ember.js ember-cli learning
comments: true
---

In [first part](http://mariusmateoc.com/blog/learn-ember-js-with-ember-cli-by-practice-part-1/) we've made project setup and generate our resources for **clients, projects** and **employees**, now in this part I will create the interface for our application. You will learn how to add dependencies like [bootstrap](http://getbootstrap.com/) to our ember application using ember-cli also how to add support for `sass` or `coffescript`.


**Let's add sass support for our project**

```bash
npm install --save-dev broccoli-sass
```

Now we need to rename our file from `/app/styles/app.css` to `/app/styles/app.scss`. You can also install `coffeescript` [support](http://www.ember-cli.com/#coffeescript) with `npm install --save-dev ember-cli-coffeescript` if you want but I'll use plain JavaScript.


### Let's install some dependencies

I will use [bootstrap](http://getbootstrap.com/) and for now we'll use bower, just type the following command:

```bash
bower install --save bootstrap
```

Now in your project folder open `brocfile.js` and edit like so:

```js
/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import('bower_components/bootstrap/dist/js/bootstrap.min.js');
app.import('bower_components/bootstrap/dist/css/bootstrap.min.css');

module.exports = app.toTree();
```

After we added `bootstrap.min.js` and `bootstrap.min.css` to our `brocfile.js` please restart you ember server then navigate to [http://0.0.0.0:4200/assets/vendor.js](http://0.0.0.0:4200/assets/vendor.js) you will notice that our `bootstrap.min.js` file was appended to our `vendor.js` file and same thing happened to `bootstrap.min.css` file, it was appended to our `vendor.css`.

**By default `app.import()` will append:**

  * any stylesheet file of format `*.css` to our `vendor.css` file
  * any javascript file of format `*.js` to our `vendor.js` file

If we modify our application template to use a button with an icon it won't work and if we look in the console we get some errors

```handlebars
{% raw %}
{{!-- /app/templates/application.hbs --}}
<h2 id='title'>Welcome to Ember.js</h2>

<button type="button" class="btn btn-default" aria-label="Left Align">
  <span class="glyphicon glyphicon-align-left" aria-hidden="true"></span>
</button>

{{outlet}}

{% endraw %}
```

This is how our console will look:

![Console Missing Fonts Error]({{ site.baseUrl }}/assets/images/learn-ember-js/missing-fonts-error.png)

To fix this we need to add the fonts to our `brocfile.js`:

```js
/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import('bower_components/bootstrap/dist/js/bootstrap.min.js');
app.import('bower_components/bootstrap/dist/css/bootstrap.min.css');

app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.eot', {
  destDir: 'fonts'
});
app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.svg', {
  destDir: 'fonts'
});
app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf', {
  destDir: 'fonts'
});
app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff', {
  destDir: 'fonts'
});

module.exports = app.toTree();
```

We can pass an option to `import`, the `destDir` means **destination directory** so this option tells ember-cli that we want to put those files under a directory called `fonts`. I choose this directory because if we look in the console we can see that bootstrap expect fonts in `fonts` directory. If we restart our `ember server` our font should be added and our button will have an icon also the console errors should disappear. You can also check the font files by going to [http://localhost:4200/fonts](http://localhost:4200/fonts).

Adding Bootstrap in this way was to show how you can add dependency to your project using bower, but with [ember-addons](http://www.emberaddons.com/) is even simple than this. I will add [ember-cli-bootstrap-sass](https://www.npmjs.com/package/ember-cli-bootstrap-sass) to our project as an addon.

```bash
npm install --save-dev ember-cli-bootstrap-sass
```

Don't forget to update your `brocfile.js` by removing all the imports and also run the `bower uninstall bootstrap --save`.

Now for this to work you need to update your `app/styles/app.scss`, add the following at the top of the file:

```scss
@import "bootstrap";
```


### Application template

In our `application.hbs` we will put the elements that appear on every page like **navigation and footer**. Any changes in the application template will be visible on any page.

```handlebars
{{!-- /app/templates/application.hbs --}}
{% raw %}
<nav class="navbar navbar-default navbar-inverse navbar-fixed-top">
  <div class="container">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">SCRUD</a>
    </div>

    <ul class="nav navbar-nav navbar-right">
      <li class="active"><a href="#">Clients</a></li>
      <li><a href="#">Projects</a></li>
      <li><a href="#">Employees</a></li>
    </ul>
  </div>
</nav>

<div class="container">
<h2 id='title'>Welcome to Ember.js</h2>
  {{outlet}}
</div>

<nav class="navbar navbar-default navbar-fixed-bottom">
  <div class="container">
    <ul class="nav navbar-nav">
      <li><a href="#">Clients</a></li>
      <li><a href="#">Projects</a></li>
      <li><a href="#">Employees</a></li>
    </ul>
  </div>
</nav>
{% endraw %}
```

### Clients template

Make sure you are at [http://0.0.0.0:4200/clients](http://0.0.0.0:4200/clients) to see the changes. As you can see the header from clients template is rendered in the `{{outlet}}` from the application template. Now let's edit this template to view a list of clients. I will implement automatic serial number to the rows using scss, for more information read [previous post.](http://mariusmateoc.com/blog/automatic-serial-number-row-in-html-table/)

```handlebars
{{!-- /app/clients/template.hbs --}}
{% raw %}
<div class="row page-header">
  <div class="col-xs-3">
    <h2>Clients</h2>
  </div>
  <div class="col xs-3 pull-right">
    <button type="button" class="btn btn-success">Add New Client</button>
  </div>
</div>

<table class="table table-hover css-serial">
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Email</th>
      <th>Created At</th>
      <th>Projects</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <!--intentionally left blank-->
      <td class="text-bold"></td>
      <td>Apple.Inc</td>
      <td>apple@mail.com</td>
      <td>10.10.2014</td>
      <td>4</td>
    </tr>
    <tr>
      <!--intentionally left blank-->
      <td class="text-bold"></td>
      <td>Telefonica</td>
      <td>telefonica@mail.com</td>
      <td>08.12.2014</td>
      <td>2</td>
    </tr>
    <tr>
      <!--intentionally left blank-->
      <td class="text-bold"></td>
      <td>Delloite</td>
      <td>delloite@mail.com</td>
      <td>09.07.2014</td>
      <td>3</td>
    </tr>
  </tbody>
</table>
{% endraw %}
```

and our `app.scss` file will look like this:

```scss
//app/styles/app.scss
@import "bootstrap";

html,
body {
  margin-top: 2rem;
}

.css-serial {
  counter-reset: serial-number;

  td:first-child:before {
    content: counter(serial-number);
    counter-increment: serial-number;
  }
}

.page-header {
  margin-bottom: 4rem;

  button {
    margin-top: 1.25rem;
  }
}

.text-bold {
  font-weight: bold;
}
```

### Projects Page

This will be pretty much the same as clients template. To see the page you need to navigate to [http://0.0.0.0:4200/projects](http://0.0.0.0:4200/projects) and make sure your ember server is running.

```handlebars

{{!-- /app/projects/template.hbs --}}
{% raw %}
<div class="row page-header">
  <div class="col-xs-3">
    <h2>Projects</h2>
  </div>
  <div class="col xs-3 pull-right">
    <button type="button" class="btn btn-success">Add New Project</button>
  </div>
</div>

<table class="table table-hover css-serial">
  <thead>
    <tr>
      <th>#</th>
      <th>Project Name</th>
      <th>Type</th>
      <th>Amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <!--intentionally left blank-->
      <td class="text-bold"></td>
      <td>Website Redesign</td>
      <td>Design</td>
      <td>12000</td>
    </tr>
    <tr>
      <!--intentionally left blank-->
      <td class="text-bold"></td>
      <td>Backend Development</td>
      <td>Development</td>
      <td>23400</td>
    </tr>
    <tr>
      <!--intentionally left blank-->
      <td class="text-bold"></td>
      <td>Social Media Presence</td>
      <td>Marketing</td>
      <td>7800</td>
    </tr>
  </tbody>
</table>
{% endraw %}
```

Your task will be to **update the employees template** with the following headers for table:

 * First Name
 * Last Name
 * Email
 * Occupation


**NOTE!** If you want to skip this part or meet troubles when following this tutorial you can always clone the git repository to keep up.

```bash
git clone git@github.com:mariusmateoc/ember-scrud.git
git checkout part-2
```

**[Next: Learn Ember.js with Ember-CLI by Practice Part 3](http://mariusmateoc.com/blog/learn-ember-js-with-ember-cli-by-practice-part-3/)**
