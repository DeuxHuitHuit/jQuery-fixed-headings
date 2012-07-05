/*
*	Mobile Scroll Event v1.0 - jQuery plugin
*
*	Copyright (c) 2012 Deux Huit Huit (http://www.nitriques.com/open-source/)
*	Licensed under the MIT (https://raw.github.com/DeuxHuitHuit/jQuery-mobile-scroll-event/master/LICENSE.txt)
*/

(function ($, undefined) {
	
	"use strict"; // es5 strict mode
	
	// Declare everything in one block
	var
	
	// name
	name = 'fixed-headings',
	
	// namespace
	ns = '.' + name,
	
	// log/err prefix,
	prefix = '[' + name + ']',
	
	// Default options
	_defaults = {
		
		
		debug: true // ONLY VALID IN DEFAULTS
	},
	
	// private functions
	_log = function (s) {
		if (!!_defaults.debug && !!window.console && !!console.log) {
			console.log(prefix + ' ' + s);
		}
	},
	_err = function (s) {
		if (!!_defaults.debug && !!window.console && !!console.err) {
			console.err(prefix + ' ' + s);
		}
	},
	
	_fixedheadings = function (options) {
		
	},
	
	
	// Plugin objects
	_plugin = {
		fixedheadings: _fixedheadings
	},
	_static_plugin = {
		fixedheadings: {
			defaults: _defaults,
			_private: {
				
			}
		}
	};
	
	// Make our plugin public
	$.fn.extend(_plugin);
	// Make our defaults public
	$.extend(_static_plugin);
	
})(jQuery);