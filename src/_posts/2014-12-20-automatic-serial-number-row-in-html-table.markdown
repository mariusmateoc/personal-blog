---
layout: post
title:  "Automatic Serial Number Row in HTML Table"
date:   2014-12-20 17:33
category: Coding
tags: javascript css jquery automatic serial-number
comments: true
---

In this post I will explain how to add automatic serial numbers to rows in HTML table with CSS and then how you can do it with JavaScript.

### CSS Method for adding automating serial number for each row

We can do it very easy with CSS but on each row we need to create an empty `td` tag where our automatic number will be inserted as in the following:

```html
<table class="css-serial">
  <thead>
    <tr>
      <th>#</th>
      <th>1st Column</th>
      <th>2nd Column</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <!--intentionally left blank-->
      <td></td>
      <td>Column 1</td>
      <td>Column 2</td>
    </tr>
    <tr>
      <!--intentionally left blank-->
      <td></td>
      <td>Column 1</td>
      <td>Column 2</td>
    </tr>
    <tr>
      <!--intentionally left blank-->
      <td></td>
      <td>Column 1</td>
      <td>Column 2</td>
    </tr>
  </tbody>
</table>
```

And now our CSS file will look like this:

```css
.css-serial {
  counter-reset: serial-number;  /* Set the serial number counter to 0 */
}

.css-serial td:first-child:before {
  counter-increment: serial-number;  /* Increment the serial number counter */
  content: counter(serial-number);  /* Display the counter */
}
```

As you can see above I use a class for the table on which I want to add automatic serial number because there are a table where you don't need serial number. Also you can use `table` direct to reset the counter then also change the `.css-serial td:first-child:before` with `table td:first-child:before` to apply automatic serial number on every table.


### jQuery Method to add automating serial number for each row

I prefer this method because the markup is cleaner and don't need to left any `td` tags empty, also the `th` tag will be added automatically.

```html
<table class="js-serial" border="2">
  <thead>
    <tr>
      <th>1st Column</th>
      <th>2nd Column</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Column 1</td>
      <td>Column 2</td>
    </tr>
    <tr>
      <td>Column 1</td>
      <td>Column 2</td>
    </tr>
    <tr>
      <td>Column 1</td>
      <td>Column 2</td>
    </tr>
  </tbody>
</table>
```

And our javascript file will look like this:

```javascript
function addRowCount(tableAttr) {
  $(tableAttr).each(function(){
    $('th:first-child, thead td:first-child', this).each(function(){
      var tag = $(this).prop('tagName');
      $(this).before('<'+tag+'>#</'+tag+'>');
    });
    $('td:first-child', this).each(function(i){
      $(this).before('<td>'+(i+1)+'</td>');
    });
  });
}

// Call the function with table attr on which you want automatic serial number
addRowCount('.js-serial');
```

For more tips on how to add automatic serial number with jQuery please see [this post.](http://jquery-howto.blogspot.ro/2013/09/jquery-add-table-row-count-column.html)
