---
layout: post
title:  "Learn Ember.js with Ember-CLI by Practice Part 1"
date:   2014-12-11 13:15
category: Coding
tags: javascript ember.js ember-cli learning mvc
comments: true
---

This will be a series of posts in which I'll try to build an [SCRUD](http://en.wikipedia.org/wiki/Create,_read,_update_and_delete) ember application from scratch. Please note that I'm not an expert with [Ember.js](http://emberjs.com/), so maybe I'll do some mistakes and please do not take my work as best practices. I hope this series of posts make it easy for you to get started with ember.js. Also you can find the code at [ember-scrud repository](https://github.com/mariusmateoc/ember-scrud) on [github](https://github.com/) and each part of the article will have his branch so anytime you can clone the repository and checkout the specific branch if you enconter problems or you just want to skip an specific part.

First you need to install [ember cli](http://www.ember-cli.com/), for that you need to have node 0.10.x already installed. To do so, either follow the installation instructions on [nodejs.org](http://nodejs.org), or use your preferred package manager (such as Homebrew on OS X) then run the following command:

```bash
npm install -g ember-cli
```
**In this project I use version `0.1.4` of ember-cli.**

### Start a new project

To start a new ember project with `ember-cli` just run:

```bash
ember new ember-scrud
cd ember-scrud
```

This command will install everything we need to run an ember application. After install you can run `ember server` in your terminal then open your bowser and visit `http://0.0.0.0:4200/` to view the application.


Let's configure the generator to use [pods](http://www.ember-cli.com/#pods) by default. Go to `config/environment.js` and add `usePodsByDefault: true` as in the following:

```js
module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ember-scrud',
    usePodsByDefault: true,
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
```

### Specify our ember-data adapter

By default our application will use [`RESTAdapter`](http://emberjs.com/guides/models/the-rest-adapter/) but we will use [`FIXTURES`](http://emberjs.com/guides/getting-started/using-fixtures/) in our application so we need to override our adapter to use [`FixtureAdapter`](http://emberjs.com/guides/models/the-fixture-adapter/). Let's generate our adapter with:

```bash
ember g adapter application
```

Please note that at the top of each file I like to write the file path for an easier identification. Now we need to modify our `adapter.js` file to use the `FixtureAdapter` like so:

```js
// /app/application/adapter.js
import DS from 'ember-data';

export default DS.FixtureAdapter.extend({
});
```


### Generate our resources

You can type `ember help` to see the available options for ember-cli. In the following examples I will use `ember g` where `g` is an alias for `generate`.

```bash
ember g resource clients companyName:string email:string totalProjects:number createdAt:date
```

In the above command after the clients we specify the attributes of our model in the form of `<attr:type>`, so if you go at `app/client/model.js` (**please note that the model will be client not clients**) you will see that this command filled in our model. You can run the command like `ember g resource clients` without attributes then open the file and fill in the attributes. This is what command generates:

```js
// /app/client/model.js
import DS from 'ember-data';

export default DS.Model.extend({
  companyName: DS.attr('string'),
  email: DS.attr('string'),
  totalProjects: DS.attr('number'),
  createdAt: DS.attr('date')
});
```

Also you can use the command without specifying `<attr:type>` just `ember g resource clients` and then you can update the model. The above command will also generate:

  * clients route in `/app/clients/route.js`
  * clients template in `/app/clients/template.hbs`
  * unit tests files for `/tests/unit/client/model-test.js` and `/tests/unit/clients/route-test.js`
  * and will add a new `resource` to our `/app/router.js`


**Now let's modify our model to use fxtures:**

```js
// /app/client/model.js
import DS from 'ember-data';

var Client = DS.Model.extend({
  companyName: DS.attr('string'),
  email: DS.attr('string'),
  totalProjects: DS.attr('number'),
  createdAt: DS.attr('date')
});

Client.reopenClass({
  FIXTURES: [
    {
      id: 1,
      companyName: 'Apple.Inc',
      email: 'apple@mail.com',
      totalProjects: 4,
      createdAt: new Date(2014, 10, 10)
    },{
      id: 2,
      companyName: 'Telefonica',
      email: 'telefonica@mail.com',
      totalProjects: 2,
      createdAt: new Date(2014, 8, 12)
    },{
      id: 3,
      companyName: 'Delloite',
      email: 'delloite@mail.com',
      totalProjects: 3,
      createdAt: new Date(2014, 9, 7)
    }
  ]
});

export default Client;
```

### Let's view our router

First please install ember inspector as extension for [chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi) or [firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/), this tool will help us to debug our application. In the `router.js` file at `Router.map(function() {` section we specify the links for our application. That means that with the current setup of our `router.js` if we navigate to [http://0.0.0.0:4200/clients](http://0.0.0.0:4200/clients)**(Please make sure that your ember server command is running)** our application will render the `/app/clients/template.hbs` in the outlet of `/app/templates/application.hbs`.

```js
import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('clients', function() { });
});

export default Router;
```

At [http://0.0.0.0:4200/clients](http://0.0.0.0:4200/clients) you will see the same text as [http://0.0.0.0:4200/](http://0.0.0.0:4200/) because our template is empty, so let's update the template:

```handlebars
{{!-- /app/clients/template.hbs --}}

<h1>Hello from Clients</h1>
```

Now at the [http://0.0.0.0:4200/clients](http://0.0.0.0:4200/clients) will see the new heading **Hello from Clients** rendered in the outlet of our application template. In our application template `/app/templates/application.hbs` will put the elements that we will want on every page, like navigation and footer.

**Your tasks:**

  * generate resources for `projects` and `employees`
  * projects will have the following attributes: **name, projectType** as `strings` and **amount** as `number`.
  * employees will have: **firstName, lastName, email** and **occupation** as `strings`.
  * add fixture data for each generated model
  * update their templates to show something. *For example when we visit [http://0.0.0.0:4200/projects](http://0.0.0.0:4200/projects) to see **Projects** heading.*

For reference you can always verify the [repository](https://github.com/mariusmateoc/ember-scrud/tree/part-1) to see the changes.

**If you encounter troubles or want to skip this part follow this commands to be up to date**

```bash
git clone git@github.com:mariusmateoc/ember-scrud.git
git checkout part-1
```

**[Next: Learn Ember.js with Ember-CLI by Practice Part 2](http://mariusmateoc.com/blog/learn-ember-js-with-ember-cli-by-practice-part-2/)**
