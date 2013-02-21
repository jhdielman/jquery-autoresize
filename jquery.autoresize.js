/**
 * jQuery AutoResize Plugin v1.0
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
 * Autogrow textArea Plugin Version v2.0
 * http://www.technoreply.com/autogrow-textArea-plugin-version-2-0
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
;(function ($) {

	$.fn.autoResize = function (options) {

		var
		defaults = {
			appendToElement: 'body',
			defaultRowCount: 2,
			events: 'blur focus keyup mouseup',
			leadingRows: 0,
			maxWidth: '95%'
		},
		settings = $.extend(defaults, options),
		textClone = $('<span></span>')
			.css({
				'display': 'block',
				'position': 'absolute',
				'visibility': 'hidden',
				'word-wrap': 'break-word'
			})
			.attr('id', 'text_clone')
			.appendTo(settings.appendToElement),
		textAreaLastIndex = (this.length - 1),
		textAreaObjs = [],
		textAreaRows = [];

		return this.each(function(index) {

			var
			textArea = this,
			defaultRowCount = parseInt( $(textArea).attr('rows') || settings.defaultRowCount );

			// Self explanitory
			settextAreaStyles(textArea);

			// Assign the events to each textarea
			$(textArea).off(settings.events).on(settings.events, function() {
				adjustHeight(textArea, defaultRowCount);
			});

			// Load textarea objects and corresponding rows
			textAreaObjs.push(textArea);
			textAreaRows.push(defaultRowCount);

			if (index == textAreaLastIndex) {
				$(window).on('resize', function() {
					for (var i = 0; i <= textAreaLastIndex; i++) {
						adjustHeight(textAreaObjs[i], textAreaRows[i]);
					}
				});
			}

			// Initialize on each textarea
			adjustHeight(textArea, defaultRowCount);
		});

		function settextAreaStyles(textArea) {

			var
			textAreaMaxWidth = $(textArea).css('max-width');

			// Hide scrollbar
			if ($(textArea).css('overflow') != 'hidden') {
				$(textArea).css({'overflow':'hidden'});
			}

			// Set max width
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

			var
			defaultHeight = 0,
			lineHeight = 0,
			textCloneHeight = 0,
			leadingRowsHtml = addLeadingRows(settings.leadingRows),
			textAreaHtml = $(textArea).val().replace(/\n/g, '<br>'),
			textCloneHtml = textAreaHtml + leadingRowsHtml;

			// Apply dimensional styles of for accurate calulations.
			textClone.css(applyDimensionalStyles($(textArea)));

			// After all styles have been applied get the height
			// using a test character.
			lineHeight = textClone.html('A').height();

			// Calculate the default height.
			defaultHeight = ((defaultRows + settings.leadingRows) * lineHeight);

			// Set the span HTML to the contents of the textarea
			// and store the resulting height.
			textClone.html(textCloneHtml);
			textCloneHeight = textClone.height();
				
			// Adjust textarea height by calculated span height if
			// span height is greater than default height.
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

			var
			newlines = '';

			for (var i = 0, j = rowsCount; i < j; i++) {
				newlines += '<br>.';
			}

			return newlines;
		}

		function applyDimensionalStyles(textArea) {

			var
			css = {},
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