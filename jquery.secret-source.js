(function($) {
	"use strict";
	var name ='secretSource';

	$[name] = function(el, options){

		var $el = $(el);
		options = $.extend({}, $[name].defaultOptions, options);

		// Dont run twice

		var data = $el.data(name);
		if (data) return data;

		var source = $[name].getSource($el, options);
		var $display = $[name].wrap($el, source, options);
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
		// Strip out an empty first line
		source = source.replace(/^\s*\n/, '');
		return source;
	};

	$[name].wrap = function($el, source, options) {
		var $pre = $('<pre>').addClass(options.className);
		var $code = $('<code>').appendTo($pre);

		$code.text(source);
		var type = $el.data('language') || $el.attr('type') || '';

		if (type) {
			type = 'language-' + type.replace(/^.*\/(.*)$/, '$1');
			$code.addClass(type);

		}
		return $pre;
	};

	$[name].defaultOptions = {
		className: 'secret-source',
		includeTag: false
	};

	$.fn[name] = function(options){
		return this.map(function(){
			var data = $[name](this, options);
			return data.display;
		});
	};

})(jQuery);
