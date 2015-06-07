# [pg-ng-range](http://pagarme.github.io/pg-ng-range/)
*[Pagar.me](http://pagar.me) directive to provide a custom range element*

### Check the demo [here](http://pagarme.github.io/pg-ng-range/)

#### Installation

Install via npm package manager:
```
$ npm install pg-ng-range
```

Or via Bower:
```
$ bower install pg-ng-range
```

Import the directive file into your project:
```html
<script src="bower_components/pg-ng-range/dest/pg-ng-range.min.js"></script>
```

Load the pg-ng-range module:
```javscript
angular.module('myApp', ['pg-ng-range']);
```


Call the directive in an element via attribute, class or tag name:
```html
<div pg-ng-range></div>
<div class="pg-ng-range"></div>
<pg-ng-range></pg-ng-range>
```

#### Directive Optionals

Like the regular html5 range input, you can set `min`, `max` and `value` attributes.
The dafault values when no attribute is set is `0` for `min`, `100` for `max` and `50%` of the max for `amount`.

```html
<div pg-ng-range min="100" max="500" value="230"></div>
```

All attributes can be set with custom variables.

```html
<div pg-ng-range min="myCustomMinimum" max="myCustomMaximun" value="myCustomValue"></div>
```

#### Retrieving the resulting value

It is necessary to pass a variable on the `value` attribute, so the user interaction will update it.

```html
<div pg-ng-range min="100" max="500" value="myCustomValue"></div>
```

And that's it :D

[Rafael Violato](http://rviolato.com) @ [pagar.me](http://pagar.me)
