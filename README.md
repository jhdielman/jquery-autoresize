# jQuery-autoresize

jQuery plugin to automatically resize textareas on focus, blur, keyup, or window resize.

## Options

#### `appendToElement :[Default: 'body']`
Set this value to append the clone element to any element of your choice..

#### `defaultRowCount : [Default: row attribute or 2]`
This will assign the default number of rows the textarea will have when empty. The row attribute takes precedence over this value.

#### `events : [Default: 'blur focus keyup mouseup']`
The default textarea events to trigger the autoresize function.

#### `leadingRows : [Default: 0]`
Set the number of leading rows. Example: If this is set to 1 or '1', there will be an empty leading row in addition to the rows the text will occupy.

#### `maxWidth : [Default: '95%']`
Sets css max-width property.

## Example Usage

```js
$(document).ready(function() {
	
	// To use default options
	$('#my_textarea_selector').autoResize();

	// Override the defaults
	$('#my_other_textarea_selector').autoResize({
		appendToElement: 'div#my_clone_container',
		defaultRowCount: 3,
		events: 'keyup',
		leadingRows: 1,
		maxWidth: '80%'
	});
	
});
```