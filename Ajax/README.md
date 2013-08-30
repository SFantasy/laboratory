Ajax.js
---

## Get it

`<script src="Ajax.js"></script>`

## Usage

* Example

```
Ajax.ajax({
	type: 'GET',
	datatype: 'JSON',
	url: '/ajaxtest',
	async: 'true',
	callback: function(JSON) {
		// handle data received
	}
});
```