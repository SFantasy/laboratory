/*
 *   Name: Data.js
 *   Author: https://github.com/SFantasy
 *   Version: 1.0.0 alpha
 *   Update: 2013-09-10
 *   License: the MIT license
 */
var Data = function() {};

Data.prototype = {
    init: function() {
        //
    },
    setLocalStorage: function(key, value) {
        localStorage.key = JSON.stringify(value);

        return true;
    },
    getLocalStorage: function(key) {
        return JSON.parse(localStorage.key) || null;
    },
    delLocalStorage: function(key) {
        if(localStorage.removeItem(key)) {
            return true;
        } else {
            return false;
        }
    },
    setCookie: function(key, value, expires, domain, path) {
        document.cookie = encodeURLComponent(key) + '=' + encodeURLComponent(value) +
                            (expires ? '; expires=' + expires.toUTCString() : '') +
                            (domain ? ';domain=' + domain : '') +
                            (path ? '; path=' + path : '');

        return true;
    },
    /* Reference: https://developer.mozilla.org/en-US/docs/Web/API/document.cookie#A_little_framework.3A_a_complete_cookies_reader.2Fwriter_with_full_unicode_support
     * 
     */
    getCookie: function(key) {
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    /*
     *  @Description: update the specified cookie which is a simple queue in the Browsers.
     *  @Params divider: character divides data,
     *            limit: number you want to limit your cookie.
     *          
     *  e.g. 1. 'test=1a2a3a' => updateCookie(test, 1) => 'test=2a3a1a'
     *       2. 'test=1a2a3a' => updateCookie(test, 4) => 'test=1a2a3a4'
     */
    updateCookie: function(key, value, expires, domain, path, divider, limit) {
        var currentCookie = this.getCookie(key),
            cookieArray;

        if(currentCookie) {
            cookieArray = currentCookie.split(divider);
            // value in the array
            if(cookieArray.indexOf(value) != -1) {
                cookieArray.splice(cookieArray.indexOf(value), 1);
            }

            cookieArray.push(value);

            if(limit && cookieArray.length > limit) {
                cookieArray.splice(0, 1);
            }

            cookieArray.join(divider);

            this.setCookie(key, value, expires, domain, path);

            return true;
        } else {
            return false;
        }
    }
};

var D = new Data();