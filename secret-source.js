/*globals Node:false */
(function (window, document) {
	"use strict";
	var appendChild = "appendChild";
	var createElement = "createElement";
	var className = 'className';
	var getAttribute = 'getAttribute';

	var SecretSource = window.SecretSource = function(els, options) {
		options = _extend({}, SecretSource.options, options);

		return _toArray(els).map(function(el) {
			var source = options.getSource(el, options);
			var out = options.wrap(el, source, options);
			_insertAfter(out, el);
			return {
				element: el,
				source: source,
				display: out
			};
		});
	};

	var _toArray = function(arrayish) {
		return [].slice.call(arrayish);
	};

	var _extend = function() {
		return _toArray(arguments).reduce(function(base, obj) {
			for (var k in obj) {
				if ([].hasOwnProperty.call(obj, k)) {
					base[k] = obj[k];
				}
			}
			return base;
		});
	};

	var _insertAfter = function(newEl, relativeTo) {
		var parent = relativeTo.parentNode;
		var sibling = relativeTo.nextSibling;
		if (!parent) { return; }
		if (sibling) {
			parent.insertBefore(newEl, sibling);
		} else {
			parent[appendChild](newEl);
		}
	};

	var fixWhitespace = function(el, source, options) {
		source = fixWhitespace.trim(el, source, options);
		source = fixWhitespace.fixIndent(el, source, options);
		return source;
	};
	// Strip out empty first or last lines
	fixWhitespace.trim = function(el, source, options) {
		return source.replace(/^\s*\n|\n\s*$/g, '');
	};

	// Munge the source to remove leading indent
	fixWhitespace.fixIndent = function(el, source, options) {
		if (options.includeTag) {
			// Damn. This means we have to find the indent of the tag itself,
			// which is not an easy task! We have to look at the preceding
			// element, work out if it is a text node, and then find the amount
			// of whitespace in the last line of it.

			// We need to examine the parent node. There may not be one, so...
			var parent = el.parentNode;
			if (parent === null) {
				return source;
			}

			// First off, normalize the text nodes. It makes life easier.
			parent.normalize();

			// Then, get the previous node. Bail if it is not a text node.
			var previous = el.previousSibling;
			if (!previous || previous.nodeType !== Node.TEXT_NODE) {
				return source;
			}

			// Work out how much indentation is just before this element
			var preceding = previous.nodeValue.match(/\n\r?([ \t]+)$/);
			if (!preceding) {
				return source;
			}

			// Strip it out
			return source.replace(new RegExp('^' + preceding[1], 'mg'), '');

		} else {
			// Not including the tag makes life so much easier!
			var leadingSpace = source.match(/^\s+/);
			if (!leadingSpace) {
				return source;
			}

			return source.replace(new RegExp('^' + leadingSpace[0], 'mg'), '');
		}

	};
	SecretSource.options = {
		className: 'secret-source',
		includeTag: false,
		fixWhitespace: fixWhitespace,
		wrap: function(el, src, options) {
			var pre = document[createElement]('pre');
			var code = document[createElement]('code');
			var type = (el[getAttribute]('data-language') || el[getAttribute]('type')) || '';
			pre[className] = this[className];

			if (type) {
				type = 'language-' + type.replace(/^.*\//, '');
				code[className] = type;
			}

			pre[appendChild](code);
			code[appendChild](document.createTextNode(src));

			return pre;
		},

		getSource: function(el, options) {
			var source = el[this.includeTag ? 'outerHTML' : 'innerHTML'];
			if (options.fixWhitespace) {
				source = options.fixWhitespace(el, source, options);
			}
			return source;
		}
	};

	SecretSource.show = SecretSource;
})(window, document);
