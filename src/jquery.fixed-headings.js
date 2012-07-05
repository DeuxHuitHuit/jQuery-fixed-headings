/*
*	Fixed Headings v1.0 - jQuery plugin
*
*	Copyright (c) 2012 Deux Huit Huit (http://www.deuxhuithuit.com)
*	Licensed under the MIT (https://github.com/DeuxHuitHuit/jQuery-fixed-headings/blob/master/LICENSE.txt)
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
	
	win = $(window),
	
	isInit = false,
	
	_inst = [],
	
	// Default options
	_defaults = {
		cloneCssClass: 'fixed-heading-clone',
		cloneIdPrefix: 'fixed-heading-',
		stopAtNext: true,
		
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
	
	_isOverlappingNextElement = function (element, s, off, index) {
		var nextIndex = index+1, next = null;
		if (nextIndex >= _inst.length) {
			return false;
		}
		
		next = _inst[nextIndex].element;
		
		return s >= next.offset().top - element.height() - next.height();
	},
	
	_scrollOne = function(index, elem) {
		var e = elem.element,
			o = elem.options,
			s = win.scrollTop(),
			off = e.offset(),
			id = '#' + o.cloneIdPrefix + index,
			clone = $(id),
			isOffset = s >= off.top + e.height(),
			isTooFar = !o.stopAtNext ? false : _isOverlappingNextElement(e, s, off, index);
		
		if (isOffset && !isTooFar) {
			clone.css('left', off.left).show();
			_log(id + ' show');
		} else {
			clone.hide();
			_log(id + ' hide');
		}
	},
	
	_scroll = function (e) {
		// scroll each elem
		$.each(_inst, _scrollOne);
	},
	
	_createClones = function (t, o) {
		return t.clone().each(function cloneEach (index, elem) {
			$(elem).attr('id', o.cloneIdPrefix + index)
					.addClass(o.cloneCssClass)
					.hide();
		});
	},
	
	_fixedheadings = function (options) {
		var t = $(this),
			o = $.extend({},_defaults,options),
			clones = _createClones(t, o);
		
		// first time call, register for scroll events
		if (!isInit) {
			// @todo: container should be in options
			win.scroll(_scroll).resize(_scroll);
		}
		
		// save current config for later
		t.each(function registerEachInstance (index, elem) {
			_inst.push({element:$(elem), options:o});
		});
		
		// append clone elements to body
		$('body').append(clones);
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