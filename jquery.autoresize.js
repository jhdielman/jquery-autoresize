/**
 * jQuery TextareaAutoResize Plugin v1.0
 *
 *
 * Copyright (c) 2012 Jason Dielman
 *
 * Triple licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * AND...
 *
 * Because this is oringinally inspired by Jevin O. Sewaruth's <jevin9@gmail.com>
 * Autogrow Textarea Plugin Version v2.0
 * http://www.technoreply.com/autogrow-textarea-plugin-version-2-0
 * 
 * I have decided to honor his "Beer-Ware" licence agreement.
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 43-JHD):
 * <jhdielman@gmail.com> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy Jevin O. Sewaruth and I a beer in return.
 * 
 * Jason H. Dielman
 * ----------------------------------------------------------------------------
 *
 * So, big thanks to Jevin because I'll be buying you a beer someday.
 *
 * Date: Dec 17, 2012
 */
;
(function ($) {

	$.fn.autoResize = function (options) {

		var defaults = {
				'appendToElement'	: 'body',
				'defaultRowCount'	: 2,
				'events'			: 'blur focus keyup',
				'leadingRows'		: 0,
				'maxWidth'			: '95%'
			},
			settings = $.extend(defaults, options),
			textClone = $('<span></span>')
				.css({
					'display'	: 'block',
					'position'	: 'absolute',
					'visibility': 'hidden',
					'word-wrap'	: 'break-word'
				})
				.attr('id', 'text_clone')
				.appendTo(settings.appendToElement),
			textAreaLastIndex = (this.length - 1),
			textAreaObjs = [],
			textAreaRows = [];

		//------------------------------------------------
		// I left this text from jQuery's documentation as
		// a reminder...
		// 
		// "there's no need to do $(this) because 'this'
		// is already a jquery textAreaect. $(this) would be
		// the same as $($('#element'));"
		//------------------------------------------------

		return this.each(function(index) {

			var textArea 		= this,
				defaultRowCount = parseInt( $(textArea).attr('rows') || settings.defaultRowCount ),
				events 			= settings.events + ' mouseup';

			// Self explanitory
			setTextAreaStyles(textArea);

			// Assign the events to each textarea
			$(textArea).off(events).on(events, function() {
				adjustHeight(textArea, defaultRowCount);
			});

			// We only want to attach the window resize event once, so we'll
			// push each textarea textAreaect and rowCount to use as arguments on
			// the window resize event which we assign when we are in the
			// final loop
			textAreaObjs.push(textArea);
			textAreaRows.push(defaultRowCount);
			if (index == textAreaLastIndex) {
				$(window).off('resize').on('resize', function() {
					for (var i = 0; i < textAreaLastIndex; i++) {
						adjustHeight(textAreaObjs[i], textAreaRows[i]);
					}
				});
			}

			// Perform on each textarea to start
			adjustHeight(textArea, defaultRowCount);
		});

		function setTextAreaStyles(textArea) {

			var textAreaMaxWidth = $(textArea).css('max-width');
			// Set overflow:hidden if not already to hide
			// the scroll bar
			if ($(textArea).css('overflow') != 'hidden') {
				$(textArea).css({'overflow':'hidden'});
			}

			// Also, lets make this responsive and set the
			// default max-width as well. I'm placing this
			// in a function because...
			if (textAreaMaxWidth == 'none') {
				$(textArea).css({'max-width': parseMaxWidth(settings.maxWidth)});
			} else {
				$(textArea).css({'max-width': parseMaxWidth(textAreaMaxWidth)});
			}
		}

		function parseMaxWidth(maxWidth) {
			return (
				isPercent(maxWidth) && parseFloat(maxWidth) <= 100 ?
				maxWidth : '100%'
			);
		}

		function adjustHeight(textArea, defaultRows) {

			var	defaultHeight 	= 0,
				lineHeight 		= 0,
				textCloneHeight = 0,
				leadingRowsHtml	= addLeadingRows(settings.leadingRows),
				textAreaHtml 	= $(textArea).val().replace(/\n/g, '<br>'),
				textCloneHtml	= textAreaHtml + leadingRowsHtml;

			// Apply styling matching the dimensional styles of
			// the textarea for accurate calulations. Namely,
			// font styling and padding.
			textClone.css(applyDimensionalStyles($(textArea)));

			// Get line height after all styles have been applied
			// using a test character, then get the height.
			lineHeight = textClone.html('A').height();

			// Calculate the default height for the textarea.
			defaultHeight = ((defaultRows + settings.leadingRows) * lineHeight);

			// Set the span HTML to the contents of the textarea
			// and store it.
			textClone.html(textCloneHtml);
			textCloneHeight = textClone.height();
				
			// Adjust textarea height by calculated span height if
			// span height is greater than default height
			if (textCloneHeight > defaultHeight) {
				$(textArea).height(textCloneHeight);
			} else {
				$(textArea).height(defaultHeight);
			}
		}

		function isPercent(val) {
			return (val.charAt((val.length - 1)) == '%');
		}

		function addLeadingRows(rowsCount) {

			var newlines = '';

			for (var i = 0, j = rowsCount; i < j; i++) {
				newlines += '<br>.';
			}

			return newlines;
		}

		function applyDimensionalStyles(textArea) {

			var css = {},
				properties = [
					'font-family',
					'font-size'	,
					'font-weight',
					'line-height',
					'padding',
					'width'
				];

			for (var i = 0, j = properties.length; i < j; i++) {
				css[properties[i]] = textArea.css(properties[i]);
			}

			return css;
		}
	};
})(jQuery);