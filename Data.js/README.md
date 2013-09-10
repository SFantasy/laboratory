Data.js
---

Handle data in the browsers easily.

## Usage

* Download and embed it

`<script src="Data.js"></script>`

* Use GitHub CDN

`<script src="http://rawgithub.com/SFantasy/laboratory/master/Data.js/Data.js"></script>`

### localStorage

* setLocalStorage

```
D.setLocalStorage(key, value)
```

* getLocalStorage

```
D.getLocalStorage(key)
// return => Object
```

* delLocalStorage

```
D.delLocalStorage(key)
```

### Cookie

* setCookie

```
D.setCookie(key, value[, expires] [, domain] [, path])
```
* getCookie

> reference: [MDN](https://developer.mozilla.org/en-US/docs/Web/API/document.cookie#A_little_framework.3A_a_complete_cookies_reader.2Fwriter_with_full_unicode_support)

```
D.getCookie(key);
```

* updateCookie

```
D.updateCookie(key, value[, expires] [, domain] [, path] [, divider] [, limit])
```

## License

See the LICENSE file.