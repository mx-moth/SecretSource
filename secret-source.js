(function (window, document) {
	"use strict";
	var appendChild = "appendChild";
	var createElement = "createElement";
	var className = 'className';
	var getAttribute = 'getAttribute';

	var SecretSource = window.SecretSource = function(els, options) {
		options = _extend({}, SecretSource.options, options);

		return _toArray(els).map(function(el) {
			var source = options.getSource(el);
			var out = options.wrap(el, source);
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

	SecretSource.options = {
		className: 'secret-source',
		includeTag: false,
		wrap: function(el, src) {
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

		getSource: function(el) {
			return el[this.includeTag ? 'outerHTML' : 'innerHTML'];
		}
	};

	SecretSource.show = SecretSource;
})(window, document);
