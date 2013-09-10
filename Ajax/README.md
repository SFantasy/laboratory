Ajax.js
---

Simple encapsulation of Ajax actions.

## Get it

`<script src="Ajax.js"></script>`

## Usage

* GET

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

* POST
```
Ajax.ajax({
    type: 'POST',
    datatype: 'JSON',
    data: {
        // what you want to post
    },
    url: '/ajaxtest',
    async: 'true',
    callback: function(JSON) {
        // handle data received
    }
});
```
