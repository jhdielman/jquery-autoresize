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
		$textClone = $('<span></span>')
			.css({
				'display': 'block',
				'position': 'absolute',
				'visibility': 'hidden',
				'word-wrap': 'break-word'
			})
			.attr('id', 'text_clone')
			.appendTo(settings.appendToElement),
		textareaLastIndex = (this.length - 1),
		textareas = [],
		textareaRows = [];

		return this.each(function(index) {

			var
			textarea = this,
			$textarea = $(this),
			defaultRowCount = parseInt( $textarea.attr('rows') || settings.defaultRowCount );

			// Self explanitory
			settextAreaStyles($textarea);

			// Assign the events to each textarea
			$textarea.on(settings.events, function() {
				adjustHeight($textarea, defaultRowCount);
			});

			// Load textarea objects and corresponding rows
			textareas.push($textarea);
			textareaRows.push(defaultRowCount);

			if (index == textareaLastIndex) {
				$(window).on('resize', function() {
					for (var i = 0; i <= textareaLastIndex; i++) {
						adjustHeight(textareas[i], textareaRows[i]);
					}
				});
			}

			// Initialize on each textarea
			adjustHeight($textarea, defaultRowCount);
		});

		function settextAreaStyles($textarea) {

			var
			textareaMaxWidth = $textarea.css('max-width');

			// Hide scrollbar
			if ($textarea.css('overflow') != 'hidden') {
				$textarea.css({'overflow':'hidden'});
			}

			// Set max width
			if (textareaMaxWidth == 'none') {
				$textarea.css({'max-width': parseMaxWidth(settings.maxWidth)});
			} else {
				$textarea.css({'max-width': parseMaxWidth(textareaMaxWidth)});
			}
		}

		function parseMaxWidth(maxWidth) {
			
			return (
				isPercent(maxWidth) && parseFloat(maxWidth) <= 100 ?
				maxWidth : '100%'
			);
		}

		function adjustHeight($textarea, defaultRows) {

			var
			defaultHeight = 0,
			lineHeight = 0,
			textCloneHeight = 0,
			leadingRowsHtml = addLeadingRows(settings.leadingRows),
			textareaHtml = $textarea.val().replace(/\n/g, '<br>'),
			textCloneHtml = textareaHtml + leadingRowsHtml;

			// Apply dimensional styles of for accurate calulations.
			$textClone.css(applyDimensionalStyles($textarea));

			// After all styles have been applied get the height
			// using a test character.
			lineHeight = $textClone.html('A').height();

			// Calculate the default height.
			defaultHeight = ((defaultRows + settings.leadingRows) * lineHeight);

			// Set the span HTML to the contents of the textarea
			// and store the resulting height.
			$textClone.html(textCloneHtml);
			textCloneHeight = $textClone.height();
				
			// Adjust textarea height by calculated span height if
			// span height is greater than default height.
			if (textCloneHeight > defaultHeight) {
				$textarea.height(textCloneHeight);
			} else {
				$textarea.height(defaultHeight);
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

		function applyDimensionalStyles($textarea) {

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
				css[properties[i]] = $textarea.css(properties[i]);
			}

			return css;
		}
	};
})(jQuery);
