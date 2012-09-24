/*globals jQuery:false Node:false */
(function($) {
	"use strict";
	var name = 'secretSource';

	$[name] = function(el, options){

		var $el = $(el),
			data = $el.data(name),
			source, $display;

		// Dont run twice
		if (data) return data;

		options = $.extend({}, $[name].defaultOptions, options);

		source = $[name].getSource($el, options);
		$display = $[name].wrap($el, source, options);
		$display.insertAfter($el);

		data = {
			original: $el,
			source: source,
			display: $display
		};

		$el.data(name, data);
		return data;
	};

	$[name].getSource = function($el, options) {
		var source = options.includeTag ? $el[0].outerHTML : source = $el.html();
		if (options.fixWhitespace) {
			source = $[name].fixWhitespace($el, source, options);
		}
		return source;
	};
	$[name].fixWhitespace = function($el, source, options) {
		source = $[name].fixWhitespace.trim($el, source, options);
		source = $[name].fixWhitespace.fixIndent($el, source, options);
		return source;
	},
	// Strip out an empty first line
	$[name].fixWhitespace.trim = function($el, source, options) {
		return source.replace(/^\s*\n|\n\s*$/g, '');
	},
	$[name].fixWhitespace.fixIndent = function($el, source, options) {
		if (options.includeTag) {
			// Damn. This means we have to find the indent of the tag itself,
			// which is not an easy task! We have to look at the preceding
			// element, work out if it is a text node, and then find the amount
			// of whitespace in the last line of it.

			// We need to examine the parent node. There may not be one, so...
			var $parent = $el.parent();
			if ($parent.length === 0) {
				return source;
			}

			// First off, normalize the text nodes. It makes life easier.
			$parent.get(0).normalize();

			// Then, get the previous node. Bail if it is not a text node.
			var previous = $el.get(0).previousSibling;
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

	},

	$[name].wrap = function($el, source, options) {
		var $pre = $('<pre>').addClass(options.className),
			$code = $('<code>').appendTo($pre),
			type = $el.data('language') || $el.attr('type') || '';

		$code.text(source);

		if (type) {
			type = 'language-' + type.replace(/^.*\/(.*)$/, '$1');
			$code.addClass(type);
		}

		return $pre;
	};

	$[name].defaultOptions = {
		className: 'secret-source',
		includeTag: false,
		fixWhitespace: true
	};

	$.fn[name] = function(options){
		return this.map(function(){
			var data = $[name](this, options);
			return data.display;
		});
	};

})(jQuery);
