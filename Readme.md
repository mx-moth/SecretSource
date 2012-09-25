Secret Source - Easily write about HTML, JavaScript and CSS
===========================================================

Writing about - and demoing - JavaScript, CSS and HTML on the one page is a very
effective way of demonstrating your new awesome script, but it does require
duplicating your code. This is not optimal!

By using Secret Source, you can write your demo, and include its own source
code on the page right next to it with no extra effort.

Usage
-----

* Include the `secret-source.js` file on your page.
* Mark any elements on your page that should be printed with
  `class="secret-source"`
* Run secret source by invoking it:

	```javascript
	SecretSource(document.querySelectorAll('.secret-source'));
	```

Configuring
-----------

Secret Source can be configured with the following options, by including an
options hash as the second parameter. Available options are:

* `className` - Class to apply to the generated `<pre>` element that wraps
	the code.
* `includeTag` - Whether to include the wrapping element in the printed
	source code.
* `wrap` - If the options above are not enough, you can completely control
	the generated element by overriding this function. The function is passed
	the original element and its source code. It should return an HTML element
	that will be inserted after the original element in the DOM.
* `getSource` - A function that is used to extract the source code of an
	element, which is then passed to `wrap`. Override this if you want to
	modify the source code before it is displayed.
* `fixWhitespace` - A function that munges whitespace to fix indentation
	issues. Say you have a `<div>` that you want to show, buried in your DOM
	somewhere. It will be indented, as will its contents. The indentation will
	look stupid on its own, certainly when combined with `fixWhitespace`. This
	function attempts to fix these issues by stripping out enough whitespace to
	make first line of code sit flush against the left border, and making all
	other lines match. If this screws up your formatting, either replace this
	function with something that does work (and submit a pull request!), or set
	`fixWhitespace` to `false` to disable it completely.

jQuery
------

Secret Source does NOT require jQuery. However, if you already have jQuery
installed, there is `jquery.secretsource.js` for you. It has the same
`className` and `includeTag` above, and the `fixWhitespace` options can also be
disable as above. Use it like so:

	```javascript
	jQuery(function($) {

		$('.secret-source').secretSource({
			className: 'code',
			includeTag: false,
		});

	});

`$.secretSource()` returns a new jQuery object containing all of the generated
`<pre>` blocks. You can then pretty print all of these `<pre>`s using the
pretty printer of your choice.
