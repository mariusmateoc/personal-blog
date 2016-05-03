---
layout: post
title:  "Learn Ember.js with Ember-CLI by Practice Part 4"
date:   2015-02-03 18:45
category: Coding
tags: javascript ember.js ember-cli ember component
comments: true
---

In this part you will learn how to edit or delete an existing project, client or employee also how you can use the component in multiple templates for creating new clients, projects or employee. So let's start by modify our individual client template to show the edit options only when we click on edit button.

```handlebars
{% raw %}
{{!-- /app/client/template.hbs --}}

<!-- ... additional lines truncated for brevity ... -->

  {{#if isEditing}}
  {{!-- This will apper when user click on edit button --}}
  <div class="col-md-6 col-md-offset-1">
    <form class="form-horizontal">
      <div class="form-group">
        <label for="companyName" class="col-sm-3 control-label">Company Name</label>
        <div class="col-sm-9">
          <input type="text" class="form-control" placeholder="company name">
        </div>
      </div>co
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
  {{/if}}

</div>
{% endraw %}
```

I wrapped the edit from in an `{% raw %}{{#if}}{% endraw %}` block helper which is watching for the property `isEditing`. Now if we click on an individual client the edit form is no longer there because we didn't define `isEditing` property so it's `false` and when the property `isEditing` is true the template will appear on the screen. Now let's generate the `client controller` to add this property.

```bash
ember g controller client --type=object
```

our client controller:

```js

// /app/client/controller.js
import Ember from 'ember';

export default Ember.ObjectController.extend({
  isEditing: false
});

```

If we change `isEditing` property to `true` the edit form template will appear on our individual client page. So now I want to change this property to `true` when I click on edit button and change it back to `false` when I click on **Cancel or Save** buttons. Let's add an action to edit button:


```handlebars
{% raw %}
{{!-- /app/client/template.hbs --}}
<div class="row page-header">
  <div class="col-xs-3">
    <h2>{{companyName}}</h2>
  </div>
  <div class="col xs-3 pull-right">
    <button type="button" class="btn btn-success" {{action 'editClient'}}>Edit</button>
    <button type="button" class="btn btn-danger">Delete</button>
  </div>
</div>

<!-- ... additional lines truncated for brevity ... -->
{% endraw %}
```

and our controller will look like this:

```js

// /app/client/controller.js
import Ember from 'ember';

export default Ember.ObjectController.extend({
  isEditing: false,

  actions: {
    editClient: function() {
      this.set('isEditing', true);
    }
  }
});

```

This action `editClient` that is assign to our **Edit** button will take `isEditing` property and will set it to `true` so our edit form appear on the screen. Now let's update to change it back when the user click on the **Cancel or Save** buttons. First we need to add actions to our buttons in the template:

```handlebars
{% raw %}
{{!-- /app/client/template.hbs --}}

<!-- ... additional lines truncated for brevity ... -->

{{#if isEditing}}
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
          <button type="submit" class="btn btn-primary" {{action 'saveChanges'}}>Save</button>
          <button type="submit" class="btn btn-default" {{action 'cancelChanges'}}>Cancel</button>
        </div>
      </div>
    </form>
  </div>
  {{/if}}
{% endraw %}
```

Now let's edit our controller:

```js

// /app/client/controller.js
import Ember from 'ember';

export default Ember.ObjectController.extend({
  isEditing: false,

  actions: {
    editClient: function() {
      this.set('isEditing', true);
    },
    saveChanges: function() {
      this.set('isEditing', false);
    },
    cancelChanges: function() {
      this.set('isEditing', false);
    }
  }
});

```

Now we need to bind input fields to our client company and email property to be able to edit them then save the changes when we click on save.

```handlebars
{% raw %}
{{!-- /app/client/template.hbs --}}
<!-- ... additional lines truncated for brevity ... -->

  {{#if isEditing}}
  {{!-- This will apper when user click on edit button --}}
  <div class="col-md-6 col-md-offset-1">
    <form class="form-horizontal">
      <div class="form-group">
        <label for="companyName" class="col-sm-3 control-label">Company Name</label>
        <div class="col-sm-9">
          {{input type="text" class="form-control" value=companyName placeholder="company name"}}
        </div>
      </div>
      <div class="form-group">
        <label for="email" class="col-sm-3 control-label">Email</label>
        <div class="col-sm-9">
          {{input type="email" class="form-control" value=email placeholder="email"}}
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-3 col-sm-9">
          <button type="submit" class="btn btn-primary" {{action 'saveChanges'}}>Save</button>
          <button class="btn btn-default" {{action 'cancelChanges'}}>Cancel</button>
        </div>
      </div>
    </form>
  </div>
  {{/if}}

</div>
{% endraw %}
```

also let's add an `action` to our delete button:

```handlebars
{% raw %}
{{!-- /app/client/template.hbs --}}
<!-- ... additional lines truncated for brevity ... -->

  <div class="col xs-3 pull-right">
    <button type="button" class="btn btn-success" {{action 'editClient'}}>Edit</button>
    <button type="button" class="btn btn-danger" {{action 'deleteClient'}}>Delete</button>
  </div>

<!-- ... additional lines truncated for brevity ... -->
{% endraw %}
```

Now after we modify our template if you change the name of our client in the field it will update the left side right away. But now we need to update our actions from our controller:

```js

// /app/client/controller.js
import Ember from 'ember';

export default Ember.ObjectController.extend({
  isEditing: false,

  actions: {
    editClient: function() {
      this.set('isEditing', true);
    },
    saveChanges: function() {
      var self = this;
      this.get('model').save().then(function() {
        console.log('SUCCESS');
        self.set('isEditing', false);
      }, function() {
        console.log('FAIL');
      });
    },
    cancelChanges: function() {
      this.get('model').rollback();
      this.set('isEditing', false);
    },
    deleteClient: function() {
      var client = this.get('model');
      client.deleteRecord();
      if (confirm("Are you sure you want to delete this client?")) {
        client.save();
        this.transitionToRoute('clients');
      } else {
        client.rollback();
      }
    }
  }
});

```

Let's take each action to explain it:

  * `editClient` will set `isEditing` to `true` to appear our fields from template
  * `saveChanges` first retrive the model from the page then persist the changes with the `save()` method and after is saved will change the `isEditing` property to `false` to hide the edit fields.
  * `cancelChanges` will get the current model and if the model `isDirty` means that if the model properties was changed will restore to previous prop with `rollback()` method
  * `deleteClient` we get the model then we delete the model from our store with `deleteRecord()` then we ask for the user to confirm and if he confirm this we use `save()` to persist the change then transition to clients route otherwise we use `rollback()` to restore the changes.


**Your task will be to modify individual project and employee template then create the controller for each and create the same functionality as individual client page**
If you completed the task you will see that on the employee page we have `Full Name` that doesn't update when we change first name or last name so for that to work we will need to use [computed properties](http://emberjs.com/guides/object-model/computed-properties/) and we will use it on our model:

```js

// /app/employee/model.js
import DS from 'ember-data';

var Employee = DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  email: DS.attr('string'),
  occupation: DS.attr('string'),

  fullName: function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }.property('firstName', 'lastName')
});

// ... additional lines truncated for brevity ...
```

then we need to update our employee template:

```handlebars
{% raw %}
{{!-- /app/employee/template.hbs --}}
<div class="row page-header">
  <div class="col-xs-3">
    <h2>{{fullName}}</h2>
  </div>
  <div class="col xs-3 pull-right">
    <button type="button" class="btn btn-success" {{action 'editEmployee'}}>Edit</button>
    <button type="button" class="btn btn-danger" {{action 'deleteEmployee'}}>Delete</button>
  </div>
</div>

<!-- ... additional lines truncated for brevity ... -->
{% endraw %}
```

If we navigate to an individual employee now and we edit the first name or last name the full name from top left will be updated.

#### Create modal for the creation of clients

First we need to update our brocfile.js to import bootstrap.js file:

```js
/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

var app = new EmberApp({
  'ember-cli-bootstrap-sass': {
    'importBootstrapJS': true
  }
});

module.exports = app.toTree();
```

Now let's generate some assets for our application:

```bash
ember g component crud-modal
ember g route clients/new
ember g controller clients/new
```

Let's update our component template

```handlebars
{% raw %}
{{!-- /app/components/crud-modal/template.hbs --}}

<div class="crud-modal modal fade">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">{{title}}</h4>
      </div>
      <div class="modal-body">
        {{yield}}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" {{action 'submit'}}>{{submitButtonLabel}}</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">{{cancelButtonLabel}}</button>
      </div>
    </div>
  </div>
</div>
{% endraw %}
```

We create a component for the modal because we will use this modal for the new employee and new project too. As you can see in the code from above I use `{% raw %}{{title}}{% endraw %}` as modal title so I can modify the modal title for my needs, same thing with the buttons label. Add the `{% raw %}{{outlet}}{% endraw %}` in your clients template because this route is a nested route and will appear in the outlet of our clients template and a link to the new route like in the following template:

```handlebars
{% raw %}
{{!-- /app/clients/template.hbs --}}

<div class="row page-header">
  <div class="col-xs-3">
    <h2>Clients</h2>
  </div>
  <div class="col xs-3 pull-right">
    {{#link-to 'clients.new' tagName="button" type="button" class="btn btn-success"}}Add New Client{{/link-to}}
  </div>
</div>

{{outlet}}

<!-- ... additional lines truncated for brevity ... -->
{% endraw %}
```


```js

// /app/components/crud-modal/component.js
import Ember from 'ember';

export default Ember.Component.extend({
  // Set default names for our buttons
  cancelButtonLabel: "Cancel",
  submitButtonLabel: "Yes",

  actions: {
    submit: function() {
      this.$('.crud-modal').modal('hide');
      this.sendAction('submit');
    }
  },

  showModal: function() {
    this.$('.crud-modal').modal().on('hidden.bs.modal', function() {
      this.sendAction('cancel');
    }.bind(this));
  }.on('didInsertElement')
});

```

In the first two lines we set the default text label for the buttons. In the `submit` action we hide the modal and then send the `submit` action, this action will trigger the action from the controller that we assign in the component like this:

```handlebars
{% raw %}
{{!-- /app/clients/new/template.hbs --}}

{{#crud-modal
  title="Create New Client"
  submitButtonLabel="Add New Client"
  submit="createNewClient"
  cancel="cancelNewClient"
}}

  <form class="form-horizontal">
    <div class="form-group">
      <label for="companyName" class="col-sm-3 control-label">Company Name:</label>
      <div class="col-sm-9">
        {{input type="text" class="form-control" value=companyName placeholder="Please insert company name"}}
      </div>
    </div>
    <div class="form-group">
      <label for="email" class="col-sm-3 control-label">Email:</label>
      <div class="col-sm-9">
        {{input type="email" class="form-control" value=email placeholder="Please insert company email"}}
      </div>
    </div>
  </form>
{{/crud-modal}}
{% endraw %}
```


* `{% raw %}{{title}}{% endraw %}` will be replaced with **Create New Client**
* `{% raw %}{{submitButtonLabel}}{% endraw %}` will be **Add New Client**
* `submit` action from the component will call the `createNewClient` action in the `/app/clients/new/controller.js`
* same for the `cancel` action

Now let's edit the controller:

```js

// /app/clients/new/controller.js
import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createNewClient: function() {
      var client = this.store.createRecord('client', {
        companyName: this.get('companyName'),
        email: this.get('email'),
        totalProjects: 0,
        createdAt: new Date()
      });
      // Clear the fields
      this.set('companyName', '');
      this.set('email', '');

      client.save();
      this.transitionToRoute('clients');
    },
    cancelNewClient: function() {
      this.transitionToRoute('clients');
    }
  }
});

```


**Your task will be to create the pages that we will use to create new employee and new project using the `crud-modal` with the right parameters for each component.**

***Note** that you do not need to create a new component for new project modal!*


**NOTE!** If you want to skip this part or meet troubles when following this tutorial you can always clone the git repository to keep up.

```bash
git clone git@github.com:mariusmateoc/ember-scrud.git
git checkout part-4
```































