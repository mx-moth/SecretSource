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

* **`className`** - Class to apply to the generated `<pre>` element that wraps
	the code.
* **`includeTag`** - Whether to include the wrapping element in the printed
	source code.
* **`wrap`** - If the options above are not enough, you can completely control
	the generated element by overriding this function. The function is passed
	the original element and its source code. It should return an HTML element
	that will be inserted after the original element in the DOM.
* **`getSource`** - A function that is used to extract the source code of an
	element, which is then passed to `wrap`. Override this if you want to
	modify the source code before it is displayed.
