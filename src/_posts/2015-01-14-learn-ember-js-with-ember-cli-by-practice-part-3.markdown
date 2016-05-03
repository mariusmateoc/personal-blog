---
layout: post
title:  "Learn Ember.js with Ember-CLI by Practice Part 3"
date:   2015-01-14 15:00
category: Coding
tags: javascript ember.js ember-cli learning
comments: true
---


Now let's update the templates created in [part 2](http://mariusmateoc.com/blog/learn-ember-js-with-ember-cli-by-practice-part-2/) to use our fixture data from the [first part](http://mariusmateoc.com/blog/learn-ember-js-with-ember-cli-by-practice-part-1/). Then we will build the UI for individual client, project and employee. If you're stuck you can visit the [github repository](https://github.com/mariusmateoc/ember-scrud/) and select branch `part-3` to see how I made it or if you want to skip this step just follow the instructions at the end of the article to be ready for next part.


### Update the ember-cli

As the new version of ember-cli was released let's see how we can update our project to use latest version.

```bash
# Remove old global ember-cli
npm uninstall -g ember-cli

# Clear NPM cache
npm cache clean

# Clear Bower cache
bower cache clean

# Install a new global ember-cli
npm install -g ember-cli@0.1.5

# Delete temporary development folders
rm -rf node_modules bower_components dist tmp

# Update your project’s package.json file to use the latest version of ember-cli
ember install:npm ember-cli@0.1.5

# Reinstall NPM and Bower dependencies
ember install

# Run the new project blueprint on your projects directory. Please follow the
# prompts, and review all changes (tip: you can see a diff by pressing d).
ember init
```

**Make sure you overwrite the package.json and bower.json files then you will need to install sass support and bootstrap sass again:**

```bash
npm install --save-dev broccoli-sass
npm install --save-dev ember-cli-bootstrap-sass
```

### Update clients template

On this template we want to use our fixtures data from the client model. In the [previous part](http://mariusmateoc.com/blog/learn-ember-js-with-ember-cli-by-practice-part-2/) I hard codded the template and now I'll modify the template to use fixtures.

First we need to specify the model that will be used on our clients route like so:

```js
// /app/clients/route.js
import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('client');
  }
});
```

Above I use `model` hook then use the store `find()` method, for this to work you need to specify a record type using the model name, now after we specify the model for our route let's update our clients template:

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
    {{#each}}
    <tr>
      <!--intentionally left blank-->
      <td class="text-bold"></td>
      <td>{{companyName}}</td>
      <td>{{email}}</td>
      <td>{{createdAt}}</td>
      <td>{{totalProjects}}</td>
    </tr>
    {{/each}}
  </tbody>
</table>
{% endraw %}
```
As you can see I use `each` helper, this will iterate over each object in the client `FIXTURES` array and you can display a property by wrapping the property name in curly braces.

**Your Tasks will be to update the projects and employees pages to use FIXTURES**

It's annoying that every time we need to type the address to navigate to an specific page so let's fix this and update our `application.hbs` template where is our navigation:

```handlebars
{{!-- /app/templates/application.hbs --}}
{% raw %}
<nav class="navbar navbar-default navbar-inverse navbar-fixed-top">
  <div class="container">
    <div class="navbar-header">
        {{#link-to 'index' classNames="navbar-brand"}}SCRUD{{/link-to}}
    </div>

    <ul class="nav navbar-nav navbar-right">
      {{#link-to 'clients' tagName='li'}}<a href="#">Clients</a>{{/link-to}}
      {{#link-to 'projects' tagName='li'}}<a href="#">Projects</a>{{/link-to}}
      {{#link-to 'employees' tagName='li'}}<a href="#">Employees</a>{{/link-to}}
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
      <li>{{#link-to 'clients'}}Clients{{/link-to}}</li>
      <li>{{#link-to 'projects'}}Projects{{/link-to}}</li>
      <li>{{#link-to 'employees'}}Employees{{/link-to}}</li>
    </ul>
  </div>
</nav>
{% endraw %}
```

I use `link-to` helper to create links to specific pages so, in the `link-to` helper you'll need to specify the name to the page that you want, you can find the page name in the `router.js` file. By default link-to will create an `a` tag and will add an `active` class to the respective link. To keep the bootstrap style I'll need to change the tag name for the link to because I'll need the active class on the `li` not on `a` tag. You can notify the difference at the bottom navigation where I don't want to highlight the active page.(You can inspect elements to see the difference)


### Let's build individual client page

I want to be able to visit **http://0.0.0.0:4200/client/client_id** to view the client with specific id. For that we will need a new resource `client`, so let's generate one.

```bash
ember g resource client
```
**NOTE** Do not override the client model!

Open your `router.js` and for now update your router to look like this:

```js
// /app/router.js
import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('clients', function() {});
  this.resource('projects', function() { });
  this.resource('employees', function() { });
  this.resource('client', { path: 'client/1' }, function() { });
});

export default Router;
```

Now let's update our `client/template.hbs` template. In the address bar make sure you're at [http://0.0.0.0:4200/client/1](http://0.0.0.0:4200/client/1) then start update our file to see the changes.

```handlebars
{{!-- /app/client/template.hbs --}}
{% raw %}
<div class="row page-header">
  <div class="col-xs-3">
    <h2>Company Name</h2>
  </div>
  <div class="col xs-3 pull-right">
    <button type="button" class="btn btn-success">Edit</button>
    <button type="button" class="btn btn-danger">Delete</button>
  </div>
</div>

<div class="row">
  <div class="col-md-5">
    <dl class="dl-horizontal">
      <dt>Company Name:</dt>
      <dd>companyName</dd>
      <hr>
      <dt>Email:</dt>
      <dd>email</dd>
      <hr>
      <dt>Created At:</dt>
      <dd>createdAt</dd>
      <hr>
      <dt>Projects:</dt>
      <dd>totalProjects</dd>
      <hr>
    </dl>
  </div>

  {{!-- This will apper when user click on edit button --}}
  <div class="col-md-6 col-md-offset-1">
    <form class="form-horizontal">
      <div class="form-group">
        <label for="companyName" class="col-sm-3 control-label">Company Name</label>
        <div class="col-sm-9">
          <input type="text" class="form-control" placeholder="company name">
        </div>
      </div>
      <div class="form-group">
        <label for="email" class="col-sm-3 control-label">Email</label>
        <div class="col-sm-9">
          <input type="email" class="form-control" placeholder="email">
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-3 col-sm-9">
          <button type="submit" class="btn btn-primary">Save</button>
          <button type="submit" class="btn btn-default">Cancel</button>
        </div>
      </div>
    </form>
  </div>

</div>
{% endraw %}
```

I created the template for edit client too, for now will be visible but later on we will make it appear only when user click on the edit button and disappear after you save the changes or press cancel button.


**Your tasks will be to create individual pages for project and employee.**


### Update individual pages to get information from fixtures

I'll show you how to update the client page then you will need to modify the individual page for project and employee to use fixtures. So let's get started and update our router:

```javascript

// /app/router.js
import Ember from "ember";
import config from "./config/environment";

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource("clients", function() {});
  this.resource("client", { path: 'client/:client_id'}, function() {});
  this.resource("projects", function() {});
  this.resource("employees", function() {});

  this.resource("project", { path: "project/1" }, function() {});
  this.resource("employee", { path: "employee/1" }, function() {});
});

export default Router;
```

The `:client_id` represent a [dynamic segment](http://emberjs.com/guides/routing/defining-your-routes/#toc_dynamic-segments) and now we need to specify the model in the client route then update our `client` template to use our fixture data.

```javascript
// /app/client/route.js
import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('client', params.client_id);
  }
});
```


```handlebars
{{!-- /app/client/template.hbs --}}
{% raw %}
<div class="row page-header">
  <div class="col-xs-3">
    <h2>{{companyName}}</h2>
  </div>
  <div class="col xs-3 pull-right">
    <button type="button" class="btn btn-success">Edit</button>
    <button type="button" class="btn btn-danger">Delete</button>
  </div>
</div>

<div class="row">
  <div class="col-md-5">
    <dl class="dl-horizontal">
      <dt>Company Name:</dt>
      <dd>{{companyName}}</dd>
      <hr>
      <dt>Email:</dt>
      <dd>{{email}}</dd>
      <hr>
      <dt>Created At:</dt>
      <dd>{{createdAt}}</dd>
      <hr>
      <dt>Projects:</dt>
      <dd>{{totalProjects}}</dd>
      <hr>
    </dl>
  </div>
{% endraw %}
<!-- ... additional lines truncated for brevity ... -->
```

If we navigate at [http://0.0.0.0:4200/client/1](http://0.0.0.0:4200/client/1) we will see the information from our fixtures with the `id: 1` and if we change the URL with [http://0.0.0.0:4200/client/2](http://0.0.0.0:4200/client/2) the page will be updated using data from fixture with `id: 2` and so on.

We don't want to type the URL every time so let's update `clients` so when we click on a client in clients table to redirect us to that specific client, we need to add an `link-to` helper.

```handlebars

{{!-- /app/clients/template.hbs --}}

<!-- ... additional lines truncated for brevity ... -->
{% raw %}
  <tbody>
    {{#each}}
      {{#link-to 'client' this tagName='tr'}}
        <!--intentionally left blank-->
        <td class="text-bold"></td>
        <td>{{companyName}}</td>
        <td>{{email}}</td>
        <td>{{createdAt}}</td>
        <td>{{totalProjects}}</td>
      {{/link-to}}
    {{/each}}
  </tbody>
</table>
{% endraw %}
```

Don't forget to complete your tasks before moving to next part. You'll need to update individual project and employee page and also update projects and employees tables so when we click on specific project to redirect us to that project page and same for employees


**NOTE!** If you want to skip this part or meet troubles when following this tutorial you can always clone the git repository to keep up.

```bash
git clone git@github.com:mariusmateoc/ember-scrud.git
git checkout part-3
```

**[Next: Learn Ember.js with Ember-CLI by Practice Part 4](http://mariusmateoc.com/blog/learn-ember-js-with-ember-cli-by-practice-part-4/)**
