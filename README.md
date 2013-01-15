# jQuery-autoresize

jQuery plugin to automatically resize textareas on focus, blur, keyup, or window resize.

## Options
***

#### `appendToElement :[Default: 'body']`
Set this value to append the clone element to any element of your choice..

#### `defaultRowCount : [Default: row attribute or 2]`
This will assign the default number of rows the textarea will have when empty. The row attribute take precedence over this value.

#### `events : [Default: 'blur focus keyup']`
The default textarea events to trigger the autoresize functions. Currently, the **mouseup** event is not configurable.

#### `leadingRows : [Default: 0]`
This is the number of rows to lead with. If this is set to 1 or '1', there will be an empty leading row in addition to the rows the text will occupy.

#### `maxWidth : [Default: '95%']`
This value will restrict the textarea from being resized beyond the confines of the containing element. This comes in really handy when resizing the window or viewing the textarea on a mobile device.